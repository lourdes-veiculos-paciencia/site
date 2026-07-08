"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

function revalidarVeiculos(id?: string) {
  revalidatePath("/");
  revalidatePath("/estoque");
  revalidatePath("/admin");

  if (id) {
    revalidatePath(`/veiculo/${id}`);
  }
}

export async function criarVeiculo(formData: FormData) {
  const imagensStr = formData.get("imagens") as string;
  const imagens = imagensStr ? JSON.parse(imagensStr) : [];

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
  const imagensStr = formData.get("imagens") as string;
  const imagens = imagensStr ? JSON.parse(imagensStr) : null;

  const { error } = await supabaseServer
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
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidarVeiculos(id);

  redirect("/admin");
}

export async function excluirVeiculo(id: string) {
  try {
    const { error } = await supabaseServer
      .from("veiculos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidarVeiculos(id);

    redirect("/admin");
  } catch (err) {
    console.error(err);
    throw err;
  }
}
