import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/supabase/excluir-veiculo.ts", import.meta.url), "utf8");
const exports = {};
vm.runInNewContext(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { exports, URL, Set, Error });
const { excluirVeiculoComImagens, caminhoImagem } = exports;
const origem = "https://teste.supabase.co";
const foto = (nome) => `${origem}/storage/v1/object/public/veiculos/imagens/${nome}`;

function cenario(options = {}) {
  const events = [];
  const outros = options.outros ?? [];
  let reads = 0;
  const client = {
    from(table) {
      assert.equal(table, "veiculos");
      let deleting = false;
      return {
        select() { return this; },
        eq(key, id) { assert.equal(key, "id"); assert.equal(id, "alvo"); return this; },
        neq(key, id) { assert.equal(key, "id"); assert.equal(id, "alvo"); return this; },
        order() { return this; },
        delete() { deleting = true; return this; },
        async maybeSingle() {
          if (deleting) {
            events.push("delete");
            return options.deleteResult ?? { data: { id: "alvo" }, error: null };
          }
          reads++;
          return options.readError ? { data: null, error: {} } : {
            data: { id: "alvo", imagens: reads === 2 && options.changed ? [foto("changed.jpg")] : options.imagens ?? [foto("a.jpg")] }, error: null,
          };
        },
        async range(start, end) {
          events.push(`page:${start}`);
          return options.pageError ? { data: null, error: {}, count: null } : {
            data: outros.slice(start, end + 1), count: outros.length, error: null,
          };
        },
      };
    },
    storage: { from(bucket) {
      assert.equal(bucket, "veiculos");
      return { async remove(paths) {
        events.push([...paths]);
        if (options.networkError) throw new Error("network");
        return options.storageResult ?? { data: paths.map(name => ({ name })), error: null };
      } };
    } },
  };
  return { events, run: () => excluirVeiculoComImagens(client, "alvo", origem) };
}

test("remove apenas foto exclusiva, deduplica URLs e preserva externa/local", async () => {
  const c = cenario({ imagens: [foto("a.jpg"), foto("a.jpg") + "?v=1", "/local.jpg", "https://externo.test/a.jpg"] });
  await c.run();
  assert.deepEqual(c.events, ["page:0", ["imagens/a.jpg"], "delete"]);
});
test("preserva compartilhada mesmo na segunda pagina e com URL assinada", async () => {
  const outros = Array.from({ length: 101 }, (_, id) => ({ id, imagens: [] }));
  outros[100].imagens = [foto("a.jpg").replace("/public/", "/sign/") + "?token=x"];
  const c = cenario({ outros });
  await c.run();
  assert.deepEqual(c.events, ["page:0", "page:100", "delete"]);
});
test("falha na leitura impede qualquer exclusao", async () => {
  const c = cenario({ readError: true });
  await assert.rejects(c.run());
  assert.deepEqual(c.events, []);
});
test("falha na verificacao de referencias impede qualquer exclusao", async () => {
  const c = cenario({ pageError: true });
  await assert.rejects(c.run());
  assert.deepEqual(c.events, ["page:0"]);
});
test("alteracao concorrente nas fotos do alvo interrompe a operacao", async () => {
  const c = cenario({ changed: true });
  await assert.rejects(c.run(), /alteradas/);
  assert.deepEqual(c.events, ["page:0"]);
});
for (const [name, storageResult] of [
  ["permissao negada", { data: null, error: {} }],
  ["remocao vazia", { data: [], error: null }],
  ["arquivo diferente", { data: [{ name: "imagens/outro.jpg" }], error: null }],
]) test(`Storage: ${name} impede excluir registro`, async () => {
  const c = cenario({ storageResult });
  await assert.rejects(c.run(), /registro foi mantido/);
  assert.equal(c.events.includes("delete"), false);
});
test("exclusao parcial informa erro e preserva registro", async () => {
  const c = cenario({ imagens: [foto("a.jpg"), foto("b.jpg")], storageResult: { data: [{ name: "imagens/a.jpg" }], error: null } });
  await assert.rejects(c.run(), /algumas fotos/);
  assert.equal(c.events.includes("delete"), false);
});
test("falha de rede no Storage informa possivel conclusao parcial", async () => {
  const c = cenario({ networkError: true });
  await assert.rejects(c.run(), /parcialmente/);
  assert.equal(c.events.includes("delete"), false);
});
test("DELETE sem linha removida nao informa sucesso", async () => {
  const c = cenario({ deleteResult: { data: null, error: null } });
  await assert.rejects(c.run(), /fotos exclusivas foram removidas/);
});
test("sem fotos nao chama Storage", async () => {
  const c = cenario({ imagens: [] });
  await c.run();
  assert.deepEqual(c.events, ["delete"]);
});
test("dados malformados em outro veiculo impedem exclusao", async () => {
  const c = cenario({ outros: [{ id: "outro", imagens: "invalid" }] });
  await assert.rejects(c.run(), /inválida/);
  assert.deepEqual(c.events, ["page:0"]);
});
test("normaliza espacos, ignora outro projeto e bloqueia caminhos ambiguos", () => {
  assert.equal(caminhoImagem(foto("foto%20um.jpg"), origem), "imagens/foto um.jpg");
  assert.equal(caminhoImagem(foto("a.jpg").replace("teste.supabase.co", "outro.supabase.co"), origem), null);
  assert.throws(() => caminhoImagem(foto("%2e%2e%2fsegredo"), origem));
  assert.throws(() => caminhoImagem(foto("%252e%252e%252fsegredo"), origem));
});

function carregarAcao({ autenticado = true, falha = false } = {}) {
  const events = [];
  const actionExports = {};
  const code = readFileSync(new URL("../app/actions/veiculos.ts", import.meta.url), "utf8");
  vm.runInNewContext(ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, {
    exports: actionExports, Error,
    process: { env: { NEXT_PUBLIC_SUPABASE_URL: origem } },
    console: { error() {} },
    require(name) {
      if (name === "next/headers") return { cookies: async () => ({ get: () => autenticado ? { value: "true" } : undefined }) };
      if (name === "next/cache") return { revalidatePath: path => events.push(path) };
      if (name === "next/navigation") return { redirect: () => assert.fail("Exclusao nao deve lancar redirect") };
      if (name === "@/lib/supabase/server") return { supabaseServer: {} };
      if (name === "@/lib/tipo-veiculo") return { validarTipoVeiculo: valor => valor };
      if (name === "@/lib/admin-auth") return { exigirAdmin: async () => {} };
      if (name === "@/lib/supabase/admin") return { supabaseAdminAutorizado: async () => {
        if (!autenticado) throw new Error("Sessão inválida");
        return {};
      } };
      if (name === "@/lib/supabase/excluir-veiculo") return { excluirVeiculoComImagens: async () => {
        events.push("excluir");
        if (falha) throw new Error("Falha parcial simulada");
      } };
      throw new Error(`Import inesperado: ${name}`);
    },
  });
  return { events, run: () => actionExports.excluirVeiculo("alvo") };
}
test("acao exige a sessao administrativa antes de excluir", async () => {
  const c = carregarAcao({ autenticado: false });
  assert.match((await c.run()).error, /Sessão/);
  assert.deepEqual(c.events, []);
});
test("acao devolve erro parcial ao painel sem informar sucesso", async () => {
  const c = carregarAcao({ falha: true });
  assert.equal((await c.run()).error, "Falha parcial simulada");
  assert.deepEqual(c.events, ["excluir"]);
});
test("acao revalida as paginas somente apos concluir exclusao", async () => {
  const c = carregarAcao();
  assert.equal((await c.run()).error, null);
  assert.deepEqual(c.events, ["excluir", "/", "/estoque", "/admin", "/veiculo/alvo"]);
});
