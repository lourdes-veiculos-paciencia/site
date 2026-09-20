import { supabaseServer } from "./server";

// Somente URLs do bucket deste projeto podem ser removidas.
export function caminhoImagemVeiculo(imagem: string, supabaseUrl: string) {
  try {
    const url = new URL(imagem);
    const prefixo = "/storage/v1/object/public/veiculos/";
    if (url.origin !== new URL(supabaseUrl).origin || !url.pathname.startsWith(prefixo)) {
      return null;
    }
    return decodeURIComponent(url.pathname.slice(prefixo.length)) || null;
  } catch {
    return null;
  }
}

export async function removerImagensVeiculo(imagens: string[]) {
  const caminhos = new Set<string>();
  for (const imagem of imagens) {
    const caminho = caminhoImagemVeiculo(imagem, process.env.NEXT_PUBLIC_SUPABASE_URL!);
    if (!caminho) continue;

    // Nao apagar uma foto ainda utilizada por outro anuncio.
    const { data, error } = await supabaseServer.from("veiculos")
      .select("id").contains("imagens", [imagem]).limit(1);
    if (error) throw new Error(error.message);
    if (data.length === 0) caminhos.add(caminho);
  }

  if (caminhos.size === 0) return;
  const { data, error } = await supabaseServer.storage.from("veiculos").remove([...caminhos]);
  if (error) throw new Error(error.message);
  if (data?.length !== caminhos.size) {
    throw new Error("Algumas fotos não foram removidas. Confira as permissões do Storage.");
  }
}
