const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function load(file, globals = {}) {
  const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, URL, Set, File, process: { env: { NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co" } }, ...globals });
  return exports;
}

test("Storage: ignores external/local URLs and preserves shared photos", async () => {
  const removed = [];
  const storage = load("lib/supabase/storage-veiculos.ts", {
    require: () => ({ supabaseServer: {
      from: () => ({ select: () => ({ contains: (_, [url]) => ({ limit: async () => ({ data: url.includes("shared") ? [{ id: 2 }] : [], error: null }) }) }) }),
      storage: { from: () => ({ remove: async (paths) => { removed.push(...paths); return { data: paths.map(name => ({ name })), error: null }; } }) },
    } }),
  });
  const prefix = "https://example.supabase.co/storage/v1/object/public/veiculos/";
  await storage.removerImagensVeiculo([prefix + "imagens/a%20b.webp", prefix + "imagens/a%20b.webp", prefix + "shared.webp", "https://other.test/storage/v1/object/public/veiculos/photo.webp", "/banner/local.png"]);
  assert.deepEqual(removed, ["imagens/a b.webp"]);
});

test("Storage: reports denied or incomplete deletion", async () => {
  const storage = load("lib/supabase/storage-veiculos.ts", {
    require: () => ({ supabaseServer: {
      from: () => ({ select: () => ({ contains: () => ({ limit: async () => ({ data: [], error: null }) }) }) }),
      storage: { from: () => ({ remove: async () => ({ data: [], error: null }) }) },
    } }),
  });
  await assert.rejects(storage.removerImagensVeiculo(["https://example.supabase.co/storage/v1/object/public/veiculos/a.webp"]), /Algumas fotos/);
});

test("Database: a blocked delete must not report success", async () => {
  const queries = load("lib/supabase/queries/veiculos.ts", {
    require: () => ({ supabaseServer: { from: () => ({ delete: () => ({ eq: () => ({ select: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }) }) }) } }),
  });
  await assert.rejects(queries.excluirVeiculo("123"), /exclusão não permitida/);
});

test("Compression: resizes to 1600 px, encodes WebP and releases the bitmap", async () => {
  let closed = false;
  const canvas = { width: 0, height: 0, getContext: () => ({ drawImage() {} }), toBlob: (callback) => callback(new Blob(["compressed"], { type: "image/webp" })) };
  const { comprimirImagem } = load("lib/comprimir-imagem.ts", {
    createImageBitmap: async () => ({ width: 4000, height: 3000, close: () => { closed = true; } }),
    document: { createElement: () => canvas },
  });
  const result = await comprimirImagem(new File([new Uint8Array(5000)], "photo.jpg", { type: "image/jpeg" }));
  assert.equal(canvas.width, 1600);
  assert.equal(canvas.height, 1200);
  assert.equal(result.name, "photo.webp");
  assert.equal(result.type, "image/webp");
  assert.equal(closed, true);
});

test("Compression: keeps a small original when encoding would increase its size", async () => {
  const canvas = { getContext: () => ({ drawImage() {} }), toBlob: callback => callback(new Blob(["larger encoded file"], { type: "image/webp" })) };
  const { comprimirImagem } = load("lib/comprimir-imagem.ts", {
    createImageBitmap: async () => ({ width: 100, height: 100, close() {} }),
    document: { createElement: () => canvas },
  });
  const original = new File(["small"], "photo.jpg", { type: "image/jpeg" });
  assert.equal(await comprimirImagem(original), original);
});
