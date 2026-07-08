"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export async function criarVeiculo(formData: FormData) {
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
    final_placa: Number(formData.get("final_placa") || 0),
    descricao: formData.get("descricao"),
    destaque: formData.get("destaque") === "on",
    vendido: formData.get("vendido") === "on",
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect("/admin");
}

export async function editarVeiculo(
  id: string,
  formData: FormData
) {
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
      final_placa: Number(formData.get("final_placa") || 0),
      descricao: formData.get("descricao"),
      destaque: formData.get("destaque") === "on",
      vendido: formData.get("vendido") === "on",
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect("/admin");
}