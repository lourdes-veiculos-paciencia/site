import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const exports = {};
vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../lib/supabase/fotos.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { exports, URL, Map, Set, Error });
const origem = "https://teste.supabase.co";
const url = `${origem}/storage/v1/object/public/veiculos/imagens/a.jpg`;
const arquivo = { id: "foto", name: "a.jpg", created_at: null, metadata: { size: 1234, mimetype: "image/jpeg" } };

function client({ veiculos = [], erroVeiculos = false, erroStorage = false, arquivos = [arquivo], remocao } = {}) {
  const chamadas = [];
  return { chamadas, from() { return {
    select() { return this; }, order() { return this; },
    async range(inicio, fim) { chamadas.push(`veiculos:${inicio}`); return { data: erroVeiculos ? null : veiculos.slice(inicio, fim + 1), error: erroVeiculos, count: veiculos.length }; },
  }; }, storage: { from() { return {
    async remove(caminhos) {
      chamadas.push(`remove:${caminhos.join(",")}`);
      return remocao ?? { data: caminhos.map(name => ({ name })), error: null };
    },
    async list(pasta, { offset, limit }) {
      chamadas.push(`${pasta}:${offset}`);
      const lista = pasta === "" ? [{ name: "imagens", id: null, metadata: null }] : arquivos;
      return { data: lista.slice(offset, offset + limit), error: erroStorage };
    },
    getPublicUrl(caminho) { return { data: { publicUrl: `${origem}/storage/v1/object/public/veiculos/${caminho}` } }; },
  }; } } };
}

test("cruza fotos com varios veiculos e deduplica referencias do mesmo veiculo", async () => {
  const c = client({ veiculos: [{ id: 1, marca: "Fiat", modelo: "Uno", ano: 2020, imagens: [url, url] }, { id: 2, imagens: [url.replace("/public/", "/sign/") + "?token=x"] }] });
  const r = await exports.consultarFotos(c, origem);
  assert.equal(r.aviso, null);
  assert.equal(r.fotos[0].veiculos.length, 2);
  assert.equal(r.fotos[0].tamanho, 1234);
});
test("percorre paginas de veiculos e Storage", async () => {
  const veiculos = Array.from({ length: 101 }, (_, id) => ({ id, imagens: id === 100 ? [url] : [] }));
  const arquivos = Array.from({ length: 101 }, (_, id) => ({ ...arquivo, name: id === 100 ? "a.jpg" : `${id}.jpg` }));
  const c = client({ veiculos, arquivos });
  const r = await exports.consultarFotos(c, origem);
  assert.equal(r.fotos.length, 101);
  assert.equal(r.fotos[100].veiculos[0].id, "100");
  assert.ok(c.chamadas.includes("imagens:100"));
  assert.ok(c.chamadas.includes("veiculos:100"));
});
test("erro de vinculos sinaliza indisponibilidade", async () => {
  const r = await exports.consultarFotos(client({ erroVeiculos: true }), origem);
  assert.ok(r.aviso);
  assert.equal(r.fotos.length, 1);
});
test("Storage com erro nao retorna resultado parcial", async () => {
  await assert.rejects(exports.consultarFotos(client({ erroStorage: true }), origem));
});
test("imagem malformada impede classificacao de sem vinculo", async () => {
  const r = await exports.consultarFotos(client({ veiculos: [{ id: 1, imagens: "invalido" }] }), origem);
  assert.ok(r.aviso);
});
test("metadados ausentes nao viram tamanho zero", async () => {
  const r = await exports.consultarFotos(client({ arquivos: [{ ...arquivo, metadata: null }] }), origem);
  assert.equal(r.fotos[0].tamanho, null);
  assert.equal(r.fotos[0].imagem, true);
});
test("ignora fotos locais e externas no cruzamento", () => {
  assert.equal(exports.caminhoFoto("/carros/a.jpg", origem), null);
  assert.equal(exports.caminhoFoto("https://externo.test/a.jpg", origem), null);
});

test("exclui somente o arquivo solicitado apos verificar os vinculos", async () => {
  const c = client();
  await exports.excluirFotoSemVinculo(c, origem, "imagens/a.jpg");
  assert.equal(c.chamadas.at(-1), "remove:imagens/a.jpg");
  assert.equal(c.chamadas.filter(x => x.startsWith("remove:")).length, 1);
});
for (const [nome, config] of [
  ["foto vinculada", { veiculos: [{ id: 1, imagens: [url] }] }],
  ["erro na consulta", { erroVeiculos: true }],
  ["erro no Storage", { erroStorage: true }],
  ["foto ausente", { arquivos: [] }],
  ["dados invalidos", { veiculos: [{ id: 1, imagens: "invalido" }] }],
]) test(`bloqueia exclusao: ${nome}`, async () => {
  const c = client(config);
  await assert.rejects(exports.excluirFotoSemVinculo(c, origem, "imagens/a.jpg"));
  assert.equal(c.chamadas.some(x => x.startsWith("remove:")), false);
});
test("rejeita caminho externo, local, traversal e URL", async () => {
  for (const caminho of ["/local.jpg", url, "imagens/../a.jpg", "imagens/%2e%2e/a.jpg", "outro/a.jpg", "imagens/", "imagens/a\\b.jpg"]) {
    const c = client();
    await assert.rejects(exports.excluirFotoSemVinculo(c, origem, caminho));
    assert.equal(c.chamadas.length, 0);
  }
});
test("nao informa sucesso se Storage recusa ou nao confirma arquivo exato", async () => {
  for (const remocao of [{ data: [], error: null }, { data: null, error: {} }, { data: [{ name: "outro" }], error: null }]) {
    await assert.rejects(exports.excluirFotoSemVinculo(client({ remocao }), origem, "imagens/a.jpg"), /não confirmou/);
  }
});
