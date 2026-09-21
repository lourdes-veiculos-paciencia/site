import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const exports = {};
vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../lib/filtros-estoque.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { exports });
const { aplicarFiltros, contarMarcas, erroFiltros, filtrosVazios } = exports;
const lista = [
  { id: 1, marca: "Honda", modelo: "Civic", versao: "Automático", ano: 2020, preco: 80000, combustivel: "Flex", cambio: "Automático" },
  { id: 2, marca: " HONDA ", modelo: "Biz", versao: "", ano: 2022, preco: 15000, combustivel: "Flex", cambio: "Manual" },
  { id: 3, marca: "Ford", modelo: "Ka", versao: "", ano: 2018, preco: 40000, combustivel: "Gasolina", cambio: "Manual" },
];
test("contadores agrupam marcas independentemente de caixa e espaços", () => {
  assert.equal(JSON.stringify(contarMarcas(lista)), JSON.stringify([["FORD", 1], ["HONDA", 2]]));
});
test("sem filtros preserva todos; várias marcas aceitam qualquer marca selecionada", () => {
  assert.equal(aplicarFiltros(lista, filtrosVazios).length, 3);
  assert.equal(aplicarFiltros(lista, { ...filtrosVazios, marcas: ["HONDA", "FORD"] }).length, 3);
  assert.equal(aplicarFiltros(lista, { ...filtrosVazios, marcas: ["HONDA"] }).length, 2);
});
test("intervalos inclusivos combinam com modelo, marca e combustível", () => {
  const resultado = aplicarFiltros(lista, { ...filtrosVazios, marcas: ["HONDA"], modelo: "Civic", anoDe: "2020", anoAte: "2020", precoDe: "80000", precoAte: "80000", combustivel: "Flex", cambio: "Automático" });
  assert.equal(resultado.length, 1);
  assert.equal(resultado[0].id, 1);
  assert.equal(lista.length, 3);
});
test("pesquisa ignora acentos e caixa; combinação sem correspondência retorna vazio", () => {
  assert.equal(aplicarFiltros(lista, { ...filtrosVazios, pesquisa: "AUTOMATICO" })[0].id, 1);
  assert.equal(aplicarFiltros(lista, { ...filtrosVazios, marcas: ["FORD"], modelo: "Civic" }).length, 0);
});
test("rejeita intervalos invertidos e números inválidos", () => {
  assert.equal(erroFiltros(filtrosVazios), null);
  for (const alteracao of [{ anoDe: "2022", anoAte: "2020" }, { precoDe: "50000", precoAte: "40000" }, { precoDe: "-1" }, { precoAte: "abc" }]) {
    assert.ok(erroFiltros({ ...filtrosVazios, ...alteracao }));
  }
});
