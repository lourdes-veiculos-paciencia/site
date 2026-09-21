import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "veiculos";
const PAGINA = 100;
class ErroExclusao extends Error {}

function imagensValidas(valor: unknown): string[] {
  if (valor === null) return [];
  if (!Array.isArray(valor) || !valor.every((item) => typeof item === "string")) {
    throw new Error("Lista de imagens inválida. Exclusão interrompida para proteger os arquivos.");
  }
  return valor;
}

// A identidade do arquivo e o caminho, nao os parametros da URL.
export function caminhoImagem(imagem: string, origem: string): string | null {
  if (imagem.startsWith("/") && !imagem.startsWith("//")) return null;
  let url: URL;
  try {
    url = new URL(imagem);
  } catch {
    throw new Error("Referência de imagem desconhecida. Exclusão interrompida.");
  }
  if (url.origin !== origem) return null;
  const prefixos = [
    `/storage/v1/object/public/${BUCKET}/`,
    `/storage/v1/object/sign/${BUCKET}/`,
    `/storage/v1/render/image/public/${BUCKET}/`,
    `/storage/v1/render/image/sign/${BUCKET}/`,
  ];
  const prefixo = prefixos.find((item) => url.pathname.startsWith(item));
  if (!prefixo) throw new Error("URL de Storage desconhecida. Exclusão interrompida.");
  let caminho: string;
  try {
    caminho = decodeURIComponent(url.pathname.slice(prefixo.length));
  } catch {
    throw new Error("Caminho de imagem inválido.");
  }
  if (!caminho.startsWith("imagens/") || caminho.split("/").some((parte) => !parte || parte === "." || parte === "..") || /[\\\u0000-\u001f%]/.test(caminho)) {
    throw new Error("Imagem fora da pasta permitida ou caminho ambíguo.");
  }
  return caminho;
}

async function buscarAlvo(client: SupabaseClient, id: string) {
  const { data, error } = await client.from("veiculos").select("id, imagens")
    .eq("id", id).maybeSingle();
  if (error || !data) throw new Error("Não foi possível localizar o veículo no Supabase. Nenhum arquivo foi excluído.");
  imagensValidas(data.imagens);
  return data;
}

/** Requer visibilidade de todos os veiculos pelas policies existentes.
 * Banco e Storage nao compartilham transacao: falhas parciais sao reportadas.
 */
export async function excluirVeiculoComImagens(client: SupabaseClient, id: string, supabaseUrl: string) {
  if (!id.trim()) throw new Error("Veículo inválido.");
  const origem = new URL(supabaseUrl).origin;
  const alvo = await buscarAlvo(client, id);
  const candidatas = new Set(imagensValidas(alvo.imagens)
    .map((imagem) => caminhoImagem(imagem, origem)).filter((caminho): caminho is string => caminho !== null));

  if (candidatas.size > 0) {
    let inicio = 0;
    let totalEsperado: number | null = null;
    while (true) {
      const { data, error, count } = await client.from("veiculos")
        .select("id, imagens", { count: "exact" }).neq("id", id)
        .order("id", { ascending: true }).range(inicio, inicio + PAGINA - 1);
      if (error || !data || count === null || (totalEsperado !== null && count !== totalEsperado)) {
        throw new Error("Não foi possível conferir todas as referências das imagens. Nenhum arquivo foi excluído.");
      }
      totalEsperado = count;
      for (const outro of data) {
        for (const imagem of imagensValidas(outro.imagens)) {
          const caminho = caminhoImagem(imagem, origem);
          if (caminho) candidatas.delete(caminho);
        }
      }
      inicio += data.length;
      if (inicio >= count) break;
      if (data.length === 0) throw new Error("Consulta incompleta de imagens. Exclusão interrompida.");
    }
  }

  const atual = await buscarAlvo(client, id);
  if (JSON.stringify(atual.imagens) !== JSON.stringify(alvo.imagens)) {
    throw new Error("As fotos do veículo foram alteradas durante a operação. Atualize a página e tente novamente.");
  }

  let storageIniciado = false;
  try {
    const caminhos = [...candidatas];
    for (let inicio = 0; inicio < caminhos.length; inicio += 1000) {
      const lote = caminhos.slice(inicio, inicio + 1000);
      storageIniciado = true;
      const { data, error } = await client.storage.from(BUCKET).remove(lote);
      const removidas = new Set(data?.map((arquivo) => arquivo.name));
      if (error || lote.some((caminho) => !removidas.has(caminho))) {
        throw new ErroExclusao("O Storage não confirmou a remoção de todas as fotos. O registro foi mantido; algumas fotos podem ter sido removidas. Verifique as permissões e os arquivos antes de tentar novamente.");
      }
    }

    const { data, error } = await client.from("veiculos").delete().eq("id", id).select("id").maybeSingle();
    if (error || !data || String(data.id) !== id) {
      throw new ErroExclusao(storageIniciado
        ? "As fotos exclusivas foram removidas, mas a exclusão do registro não foi confirmada. Verifique o veículo no Supabase."
        : "O Supabase não confirmou a exclusão do veículo. Verifique as permissões ou se ele ainda existe.");
    }
  } catch (error) {
    if (error instanceof ErroExclusao) throw error;
    throw new Error(storageIniciado
      ? "A operação foi interrompida e pode ter sido concluída parcialmente. Confira o veículo e as fotos no Supabase antes de tentar novamente."
      : "Não foi possível concluir a exclusão. Confira o veículo no Supabase antes de tentar novamente.");
  }
}
