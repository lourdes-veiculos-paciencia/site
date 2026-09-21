import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const code = ts.transpileModule(readFileSync(new URL("../lib/comprimir-foto.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
function contexto({ width = 4000, height = 3000, encode = () => new Blob([new Uint8Array(400 * 1024)], { type: "image/webp" }) } = {}) {
  let fechado = false;
  const chamadas = [];
  const canvas = { width: 0, height: 0, getContext: () => ({ drawImage() {} }), toBlob(callback, type, quality) {
    chamadas.push({ width: canvas.width, height: canvas.height, quality });
    callback(encode(canvas, quality));
  } };
  const exports = {};
  vm.runInNewContext(code, { exports, File, Error, document: { createElement: () => canvas }, createImageBitmap: async () => ({ width, height, close() { fechado = true; } }) });
  return { ...exports, chamadas, fechado: () => fechado };
}
const original = () => new File([new Uint8Array(5 * 1024 * 1024)], "carro.jpg", { type: "image/jpeg" });
test("foto de 5 MB vira WebP abaixo de 500 KB mantendo proporcao", async () => {
  const c = contexto();
  const foto = await c.comprimirFoto(original());
  assert.equal(foto.type, "image/webp");
  assert.equal(foto.name, "carro.webp");
  assert.ok(foto.size <= c.LIMITE_FOTO);
  assert.deepEqual(c.chamadas[0], { width: 1600, height: 1200, quality: 0.85 });
  assert.equal(c.fechado(), true);
});
test("reduz qualidade e dimensoes quando necessario", async () => {
  const c = contexto({ encode: (canvas) => new Blob([new Uint8Array(canvas.width <= 1024 ? 500 * 1024 : 600 * 1024)], { type: "image/webp" }) });
  const foto = await c.comprimirFoto(original());
  assert.equal(foto.size, 500 * 1024);
  assert.equal(c.chamadas.at(-1).width, 1024);
  assert.ok(c.chamadas.some(v => v.quality === 0.55));
});
test("nao amplia fotos pequenas", async () => {
  const c = contexto({ width: 320, height: 240 });
  await c.comprimirFoto(original());
  assert.equal(c.chamadas[0].width, 320);
});
test("nao retorna arquivo maior que limite", async () => {
  const c = contexto({ encode: () => new Blob([new Uint8Array(600 * 1024)], { type: "image/webp" }) });
  await assert.rejects(c.comprimirFoto(original()), /500 KB/);
  assert.equal(c.fechado(), true);
  assert.equal(c.chamadas.length, 20);
});
test("falha de conversao nao envia original nem PNG com extensao WebP", async () => {
  for (const encode of [() => null, () => new Blob(["png"], { type: "image/png" })]) {
    const c = contexto({ encode });
    await assert.rejects(c.comprimirFoto(original()), /WebP/);
    assert.equal(c.fechado(), true);
  }
});
test("valida tipo e limite do original", async () => {
  const c = contexto();
  await assert.rejects(c.comprimirFoto(new File(["abc"], "a.txt", { type: "text/plain" })));
  await assert.rejects(c.comprimirFoto(new File([new Uint8Array(6 * 1024 * 1024)], "a.jpg", { type: "image/jpeg" })));
  assert.equal(c.chamadas.length, 0);
});
