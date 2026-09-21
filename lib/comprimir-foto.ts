export const LIMITE_FOTO = 500 * 1024;

/** Compactacao local: nunca envia o original como fallback. */
export async function comprimirFoto(arquivo: File): Promise<File> {
  if (!arquivo.type.startsWith("image/")) throw new Error("Selecione um arquivo de imagem.");
  if (arquivo.size > 5 * 1024 * 1024) throw new Error("A foto original deve ter até 5 MB.");
  const imagem = await createImageBitmap(arquivo);
  try {
    const canvas = document.createElement("canvas");
    const contexto = canvas.getContext("2d");
    if (!contexto) throw new Error("Seu navegador não conseguiu preparar a foto.");
    const maiorLado = Math.max(imagem.width, imagem.height);
    if (!maiorLado) throw new Error("Imagem inválida.");
    for (const limite of [1600, 1280, 1024, 800, 640]) {
      const escala = Math.min(1, limite / maiorLado);
      canvas.width = Math.max(1, Math.round(imagem.width * escala));
      canvas.height = Math.max(1, Math.round(imagem.height * escala));
      contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);
      for (const qualidade of [0.85, 0.75, 0.65, 0.55]) {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", qualidade));
        if (!blob || blob.type !== "image/webp") throw new Error("Seu navegador não conseguiu converter a foto para WebP. Use um navegador atualizado.");
        if (blob.size > 0 && blob.size <= LIMITE_FOTO) {
          return new File([blob], `${arquivo.name.replace(/\.[^.]+$/, "")}.webp`, { type: "image/webp" });
        }
      }
    }
    throw new Error("Não foi possível reduzir esta foto a 500 KB. Escolha outra imagem. Nenhum upload desta foto foi realizado.");
  } finally {
    imagem.close();
  }
}
