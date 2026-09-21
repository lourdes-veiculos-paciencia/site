import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import crypto from "node:crypto";
import ts from "typescript";

function carregar(file, mocks = {}, env = {}) {
  const exports = {};
  const code = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports, Buffer, Error, process: { env }, require: name => {
    if (name === "server-only") return {};
    if (name === "node:crypto") return crypto;
    if (name in mocks) return mocks[name];
    throw new Error(`Import inesperado ${name}`);
  } });
  return exports;
}
const configuracao = () => ({ ADMIN_USER: "teste", ADMIN_PASSWORD: "senha-de-teste", ADMIN_SESSION_SECRET: "a".repeat(64) });

test("sessao assinada funciona e expira em 5 minutos", () => {
  const s = carregar("lib/admin-session.ts", {}, configuracao());
  const agora = Date.now();
  const token = s.criarSessaoAdmin(agora);
  assert.equal(s.validarSessaoAdmin(token, agora), true);
  assert.equal(s.SESSION_SECONDS, 300);
  assert.equal(s.validarSessaoAdmin(token, agora + 299 * 1000), true);
  assert.equal(s.validarSessaoAdmin(token, agora + 5 * 60 * 1000), false);
});

test("renovacao rejeita sessao expirada e preserva cookie seguro em sessao valida", async () => {
  const env = configuracao();
  const session = carregar("lib/admin-session.ts", {}, env);
  let token = session.criarSessaoAdmin(Date.now() - 301000);
  let gravado;
  const actions = carregar("app/actions/auth.ts", {
    "next/headers": { cookies: async () => ({ get: () => ({ value: token }), set: value => { gravado = value; } }) },
    "next/navigation": { redirect: () => {} },
    "@/lib/admin-session": session,
  }, { NODE_ENV: "production" });
  assert.equal(await actions.renovarSessaoAdmin(), 0);
  assert.equal(gravado, undefined);
  token = session.criarSessaoAdmin(Date.now() - 150000);
  const expiry = await actions.renovarSessaoAdmin();
  assert.ok(expiry > Date.now() + 298000);
  assert.equal(gravado.httpOnly, true);
  assert.equal(gravado.secure, true);
  assert.equal(gravado.maxAge, 300);
  assert.equal(session.validarSessaoAdmin(gravado.value), true);
});
test("cookie true, adulterado e assinatura falsa sao rejeitados", () => {
  const s = carregar("lib/admin-session.ts", {}, configuracao());
  const token = s.criarSessaoAdmin();
  for (const falso of ["true", undefined, "", token + "x", token.replace(/^./, "x"), token.split(".")[0] + "." + "a".repeat(43)]) {
    assert.equal(s.validarSessaoAdmin(falso), false);
  }
});
test("trocar senha ou segredo invalida sessao anterior", () => {
  const env = configuracao();
  const s = carregar("lib/admin-session.ts", {}, env);
  const token = s.criarSessaoAdmin();
  env.ADMIN_PASSWORD = "outra";
  assert.equal(s.validarSessaoAdmin(token), false);
  env.ADMIN_PASSWORD = "senha-de-teste";
  env.ADMIN_SESSION_SECRET = "b".repeat(64);
  assert.equal(s.validarSessaoAdmin(token), false);
});
test("credenciais ausentes e incorretas nao autenticam", () => {
  const env = configuracao();
  const s = carregar("lib/admin-session.ts", {}, env);
  assert.equal(s.credenciaisValidas("teste", "senha-de-teste"), true);
  assert.equal(s.credenciaisValidas("teste", "errada"), false);
  delete env.ADMIN_PASSWORD;
  assert.equal(s.credenciaisValidas("teste", undefined), false);
  assert.throws(() => s.criarSessaoAdmin());
});
test("cliente privilegiado nao e criado sem sessao valida", async () => {
  let criou = false;
  const s = carregar("lib/supabase/admin.ts", {
    "@/lib/admin-auth": { exigirAdmin: async () => { throw new Error("Sessao invalida"); } },
    "@supabase/supabase-js": { createClient: () => { criou = true; } },
  }, { SUPABASE_SECRET_KEY: "sb_secret_teste" });
  await assert.rejects(s.supabaseAdminAutorizado());
  assert.equal(criou, false);
});
test("cliente exige secret key e nao usa publishable como fallback", async () => {
  const env = { NEXT_PUBLIC_SUPABASE_URL: "https://teste.supabase.co", NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_teste" };
  const s = carregar("lib/supabase/admin.ts", {
    "@/lib/admin-auth": { exigirAdmin: async () => {} },
    "@supabase/supabase-js": { createClient: (url, key, options) => ({ url, key, options }) },
  }, env);
  await assert.rejects(s.supabaseAdminAutorizado(), /SUPABASE_SECRET_KEY/);
  env.SUPABASE_SECRET_KEY = "sb_secret_teste";
  const c = await s.supabaseAdminAutorizado();
  assert.equal(c.key, "sb_secret_teste");
  assert.equal(c.options.auth.persistSession, false);
});

