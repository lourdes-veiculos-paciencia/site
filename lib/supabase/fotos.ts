import type { SupabaseClient } from "@supabase/supabase-js";

export type VinculoFoto = { id: string; nome: string };
export type FotoStorage = {
  caminho: string;
  url: string;
  tamanho: number | null;
  criadaEm: string | null;
  imagem: boolean;
  veiculos: VinculoFoto[];
};

export async function excluirFotoSemVinculo(client: SupabaseClient, supabaseUrl: string, caminho: string) {
  if (typeof caminho !== "string" || !caminho.startsWith("imagens/") || /[\\%\u0000-\u001f]/.test(caminho) || caminho.split("/").some(parte => !parte || parte === "." || parte === "..")) {
    throw new Error("Caminho de foto inválido. Nenhum arquivo foi excluído.");
  }
  // Nunca confiar no status enviado pelo navegador. Reconsultar o Storage e o banco.
  const { fotos, aviso } = await consultarFotos(client, supabaseUrl);
  if (aviso) throw new Error("Não foi possível verificar todos os vínculos. Exclusão bloqueada.");
  const foto = fotos.find(item => item.caminho === caminho);
  if (!foto || !foto.imagem) throw new Error("Foto não encontrada no Storage. Atualize a página.");
  if (foto.veiculos.length) throw new Error("Esta foto está vinculada a um veículo e não pode ser excluída aqui.");

  const { data, error } = await client.storage.from("veiculos").remove([caminho]);
  if (error) {
    console.error("Storage remove retornou erro:", { message: error.message, name: error.name });
    throw new Error(`O Storage não confirmou a exclusão: ${error.message || "erro sem detalhes"}`);
  }
  if (!data?.length) {
    throw new Error("O Storage não confirmou a exclusão: retornou zero arquivos removidos. Isso pode ocorrer por falta de permissão DELETE ou porque o arquivo já não existe. O login do painel não autentica um usuário no Supabase Auth.");
  }
  if (data.length !== 1 || data[0].name !== caminho) {
    console.error("Storage remove retornou arquivos inesperados:", { solicitado: caminho, retornados: data.map(item => item.name) });
    throw new Error("O Storage não confirmou a exclusão do arquivo solicitado. O retorno foi diferente do esperado; atualize a galeria antes de tentar novamente.");
  }
}

export function caminhoFoto(valor: string, origem: string): string | null {
  if (valor.startsWith("/")) return null;
  const url = new URL(valor);
  if (url.origin !== origem) return null;
  const match = url.pathname.match(/^\/storage\/v1\/(?:object|render\/image)\/(?:public|sign)\/veiculos\/(.+)$/);
  if (!match) throw new Error("Referência de Storage não reconhecida.");
  return decodeURIComponent(match[1]);
}

export async function consultarFotos(client: SupabaseClient, supabaseUrl: string) {
  const origem = new URL(supabaseUrl).origin;
  const vinculos = new Map<string, Map<string, VinculoFoto>>();
  let aviso: string | null = null;
  try {
    let offset = 0;
    let total: number | null = null;
    while (true) {
      const { data, error, count } = await client.from("veiculos")
        .select("id, marca, modelo, ano, imagens", { count: "exact" })
        .order("id", { ascending: true }).range(offset, offset + 99);
      if (error || !data || count === null || (total !== null && total !== count)) throw new Error("Consulta incompleta.");
      total = count;
      for (const veiculo of data) {
        if (veiculo.imagens === null) continue;
        if (!Array.isArray(veiculo.imagens)) throw new Error("Imagens inválidas.");
        for (const imagem of veiculo.imagens) {
          if (typeof imagem !== "string") throw new Error("Imagem inválida.");
          const caminho = caminhoFoto(imagem, origem);
          if (!caminho) continue;
          const lista = vinculos.get(caminho) ?? new Map<string, VinculoFoto>();
          const id = String(veiculo.id);
          lista.set(id, { id, nome: `${veiculo.marca} ${veiculo.modelo} · ${veiculo.ano}` });
          vinculos.set(caminho, lista);
        }
      }
      offset += data.length;
      if (offset >= count) break;
      if (!data.length) throw new Error("Consulta incompleta.");
    }
  } catch {
    aviso = "Não foi possível conferir todos os veículos. Os vínculos estão indisponíveis; nenhuma foto será classificada como sem vínculo.";
    vinculos.clear();
  }

  const fotos: FotoStorage[] = [];
  const pastas = [""];
  const visitadas = new Set<string>();
  const bucket = client.storage.from("veiculos");
  for (let index = 0; index < pastas.length; index++) {
    const pasta = pastas[index];
    if (visitadas.has(pasta)) continue;
    visitadas.add(pasta);
    let offset = 0;
    while (true) {
      const { data, error } = await bucket.list(pasta, { limit: 100, offset, sortBy: { column: "name", order: "asc" } });
      if (error || !data) throw new Error("Não foi possível listar todos os arquivos do Storage. Confira as permissões de leitura do bucket veiculos e tente novamente.");
      if (!data.length) break;
      for (const arquivo of data) {
        const caminho = pasta ? `${pasta}/${arquivo.name}` : arquivo.name;
        if (arquivo.id === null && arquivo.metadata === null) {
          pastas.push(caminho);
          continue;
        }
        const tamanho = arquivo.metadata?.size;
        fotos.push({
          caminho,
          url: bucket.getPublicUrl(caminho).data.publicUrl,
          tamanho: typeof tamanho === "number" && Number.isFinite(tamanho) && tamanho >= 0 ? tamanho : null,
          criadaEm: arquivo.created_at,
          imagem: arquivo.metadata?.mimetype?.startsWith("image/") ?? /\.(jpe?g|png|webp|gif|avif|bmp)$/i.test(caminho),
          veiculos: [...(vinculos.get(caminho)?.values() ?? [])],
        });
      }
      offset += data.length;
    }
  }
  return { fotos, aviso };
}
