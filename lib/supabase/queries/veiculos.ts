import { supabaseServer } from "../server";
import { Veiculo } from "@/types/veiculo";
import { connection } from "next/server";

export async function buscarVeiculos() {
  await connection();
  const { data, error } = await supabaseServer
    .from("veiculos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Falha ao consultar veiculos no Supabase:", error);
    throw new Error("Não foi possível carregar os veículos do Supabase.");
  }

  return data;
}

export async function buscarVeiculo(id: number | string) {
  await connection();
  const { data, error } = await supabaseServer
    .from("veiculos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Falha ao consultar veiculo no Supabase:", error);
    throw new Error("Não foi possível carregar o veículo do Supabase.");
  }

  return data;
}

export async function atualizarVeiculo(
  id: number | string,
  dados: Partial<Veiculo>
) {
  const { error } = await supabaseServer
    .from("veiculos")
    .update(dados)
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function excluirVeiculo(
  id: number | string
) {
  const { error } = await supabaseServer
    .from("veiculos")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
