const MAX_DIMENSAO = 1600;
const TAMANHO_ALVO = 700 * 1024;

export async function comprimirImagem(file: File): Promise<File> {
  const imagem = await createImageBitmap(file);
  try {
    const escala = Math.min(1, MAX_DIMENSAO / Math.max(imagem.width, imagem.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(imagem.width * escala));
    canvas.height = Math.max(1, Math.round(imagem.height * escala));
    const contexto = canvas.getContext("2d");
    if (!contexto) throw new Error("Não foi possível preparar a foto.");
    contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);

    let blob: Blob | null = null;
    for (const qualidade of [0.82, 0.72, 0.62]) {
      blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", qualidade));
      if (!blob) throw new Error("Não foi possível compactar a foto.");
      if (blob.size <= TAMANHO_ALVO) break;
    }
    if (!blob) throw new Error("Não foi possível compactar a foto.");
    if (escala === 1 && blob.size >= file.size) return file;
    const extensao = blob.type === "image/webp" ? "webp" : "png";
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.${extensao}`, { type: blob.type });
  } finally {
    imagem.close();
  }
}
