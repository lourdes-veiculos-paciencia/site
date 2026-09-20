"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { removerImagensVeiculo } from "@/lib/supabase/storage-veiculos";
import { excluirVeiculo as excluirRegistroVeiculo } from "@/lib/supabase/queries/veiculos";

function lerImagens(valor: FormDataEntryValue | null): string[] | null {
  if (valor === null || valor === "") return null;
  if (typeof valor !== "string") throw new Error("Lista de imagens inválida.");
  const imagens: unknown = JSON.parse(valor);
  if (!Array.isArray(imagens) || !imagens.every((imagem) => typeof imagem === "string")) {
    throw new Error("Lista de imagens inválida.");
  }
  return imagens;
}

async function limparFotos(imagens: string[]) {
  try {
    await removerImagensVeiculo(imagens);
    return false;
  } catch (error) {
    console.error("Falha ao limpar fotos do Storage:", error);
    return true;
  }
}

function revalidarVeiculos(id?: string) {
  revalidatePath("/");
  revalidatePath("/estoque");
  revalidatePath("/admin");

  if (id) {
    revalidatePath(`/veiculo/${id}`);
  }
}

export async function criarVeiculo(formData: FormData) {
  const imagens = lerImagens(formData.get("imagens")) ?? [];

  const { error } = await supabaseServer.from("veiculos").insert({
    marca: formData.get("marca"),
    modelo: formData.get("modelo"),
    versao: formData.get("versao"),
    ano: Number(formData.get("ano")),
    preco: Number(formData.get("preco")),
    km: Number(formData.get("km")),
    motor: formData.get("motor"),
    combustivel: formData.get("combustivel"),
    cambio: formData.get("cambio"),
    cor: formData.get("cor"),
    cidade: formData.get("cidade"),
    portas: Number(formData.get("portas") || 0),
    final_placa: Number(formData.get("final_placa") || formData.get("finalPlaca") || 0),
    descricao: formData.get("descricao"),
    imagens: imagens.length > 0 ? imagens : null,
    destaque: formData.get("destaque") === "on",
    vendido: formData.get("vendido") === "on",
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidarVeiculos();

  redirect("/admin");
}

export async function editarVeiculo(
  id: string,
  formData: FormData
) {
  const imagens = lerImagens(formData.get("imagens"));
  const { data: anterior, error: erroBusca } = await supabaseServer
    .from("veiculos").select("imagens").eq("id", id).maybeSingle();
  if (erroBusca) throw new Error(erroBusca.message);
  if (!anterior) throw new Error("Veículo não encontrado.");

  const { data, error } = await supabaseServer
    .from("veiculos")
    .update({
      marca: formData.get("marca"),
      modelo: formData.get("modelo"),
      versao: formData.get("versao"),
      ano: Number(formData.get("ano")),
      preco: Number(formData.get("preco")),
      km: Number(formData.get("km")),
      motor: formData.get("motor"),
      combustivel: formData.get("combustivel"),
      cambio: formData.get("cambio"),
      cor: formData.get("cor"),
      cidade: formData.get("cidade"),
      portas: Number(formData.get("portas") || 0),
      final_placa: Number(formData.get("final_placa") || formData.get("finalPlaca") || 0),
      descricao: formData.get("descricao"),
      ...(imagens && { imagens }),
      destaque: formData.get("destaque") === "on",
      vendido: formData.get("vendido") === "on",
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data) throw new Error("O Supabase não permitiu atualizar o veículo.");
  const antigas: string[] = Array.isArray(anterior.imagens) ? anterior.imagens : [];
  const aviso = imagens !== null && await limparFotos(antigas.filter((imagem) => !imagens.includes(imagem)));
  revalidarVeiculos(id);
  redirect(aviso ? "/admin?aviso=storage" : "/admin");
}

export async function excluirVeiculo(id: string) {
  try {
    const veiculo = await excluirRegistroVeiculo(id);
    const aviso = await limparFotos(Array.isArray(veiculo.imagens) ? veiculo.imagens : []);
    revalidarVeiculos(id);
    return { error: null, aviso };
  } catch (err) {
    console.error(err);
    return { error: err instanceof Error ? err.message : "Erro ao excluir veículo.", aviso: false };
  }
}
