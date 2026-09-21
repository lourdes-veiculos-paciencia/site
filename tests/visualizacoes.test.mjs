import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { webcrypto } from "node:crypto";

function carregar({ admin = false, error = null } = {}) {
  const calls = [];
  const exports = {};
  const mocks = {
    "next/headers": { cookies: async () => ({ get: () => undefined }) },
    "@/lib/admin-session": { ADMIN_COOKIE: "admin-auth", validarSessaoAdmin: () => admin },
    "@/lib/supabase/server": { supabaseServer: { rpc: async (...args) => { calls.push(args); return { error }; } } },
  };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../app/api/visualizacoes/route.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, { exports, Response, URL, require: name => mocks[name] });
  return { post: exports.POST, calls };
}
const id = "11111111-1111-4111-8111-111111111111";
function request(body = JSON.stringify({ id, visitor: id }), origin = "https://loja.test") {
  return new Request("https://loja.test/api/visualizacoes", { method: "POST", headers: { origin }, body });
}
test("registra IDs válidos via função limitada", async () => {
  const s = carregar();
  assert.equal((await s.post(request())).status, 204);
  assert.equal(s.calls.length, 1);
  assert.equal(s.calls[0][0], "registrar_visualizacao_veiculo");
  assert.equal(s.calls[0][1].p_veiculo, id);
});
test("origem externa, corpo inválido e IDs locais não chegam ao banco", async () => {
  const s = carregar();
  assert.equal((await s.post(request("{}", "https://outra.test"))).status, 403);
  assert.equal((await s.post(request("{"))).status, 400);
  assert.equal((await s.post(request(JSON.stringify({ id: "1", visitor: id })))).status, 400);
  assert.equal((await s.post(request("x".repeat(513)))).status, 413);
  assert.equal(s.calls.length, 0);
});
test("visita administrativa não conta; erro do banco não retorna sucesso", async () => {
  const s = carregar({ admin: true });
  assert.equal((await s.post(request())).status, 204);
  assert.equal(s.calls.length, 0);
  assert.equal((await carregar({ error: { message: "sem tabela" } }).post(request())).status, 503);
});

test("convite conta apenas 3 minutos visíveis e aparece uma vez", () => {
  let now = 0;
  let tick;
  let visibility;
  const effects = [];
  const updates = [];
  const storage = new Map();
  const document = { visibilityState: "visible", addEventListener: (_name, fn) => { visibility = fn; }, removeEventListener() {} };
  const exports = {};
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../components/vehicle/VehicleEngagement.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    exports, document, crypto: webcrypto, Uint8Array,
    performance: { now: () => now },
    sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    window: { setInterval: fn => { tick = fn; return 1; }, location: { href: "https://loja.test/veiculo/1" } },
    clearInterval() {}, fetch: async () => ({ ok: true }),
    require: name => name === "react" ? { useState: initial => [initial, value => updates.push(value)], useEffect: fn => effects.push(fn) } : {},
  });
  exports.default({ id, nome: "Honda Civic" });
  const cleanup = effects[0]();
  now = 90000; tick();
  document.visibilityState = "hidden"; visibility();
  now = 390000; tick();
  assert.equal(updates.includes(true), false);
  document.visibilityState = "visible"; visibility();
  now = 479000; tick();
  assert.equal(updates.includes(true), false);
  now = 480000; tick();
  assert.equal(updates.filter(value => value === true).length, 1);
  now = 700000; tick();
  assert.equal(updates.filter(value => value === true).length, 1);
  assert.equal(storage.get("vehicle-help-shown"), "1");
  cleanup();
});
