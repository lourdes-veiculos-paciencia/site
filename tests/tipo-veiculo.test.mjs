import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const exports = {};
vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../lib/tipo-veiculo.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports, Error });
const { validarTipoVeiculo, filtrarPorTipo } = exports;
test("novo cadastro exige carro ou moto", () => {
  assert.equal(validarTipoVeiculo("carro"), "carro");
  assert.equal(validarTipoVeiculo("moto"), "moto");
  for (const tipo of [null, "", "Carro", "caminhao", {}, undefined]) assert.throws(() => validarTipoVeiculo(tipo));
});
test("edicao permite manter registro antigo nao classificado", () => {
  assert.equal(validarTipoVeiculo("", false), null);
  assert.equal(validarTipoVeiculo(null, false), null);
  assert.throws(() => validarTipoVeiculo("invalid", false));
});
test("Todos preserva registros antigos; abas separam categorias sem inferir por marca", () => {
  const lista = [{ id: 1, marca: "Honda", tipo: "carro" }, { id: 2, marca: "Honda", tipo: "moto" }, { id: 3, tipo: null }, { id: 4 }];
  assert.equal(filtrarPorTipo(lista, "todos").length, 4);
  assert.equal(filtrarPorTipo(lista, "carro")[0].id, 1);
  assert.equal(filtrarPorTipo(lista, "moto")[0].id, 2);
  assert.equal(filtrarPorTipo(lista, "carro").length, 1);
  assert.equal(lista.length, 4);
});
