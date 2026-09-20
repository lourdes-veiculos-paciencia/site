import { supabaseServer } from "../server";
import { Veiculo } from "@/types/veiculo";

export async function buscarVeiculos() {
  const { data, error } = await supabaseServer
    .from("veiculos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function buscarVeiculo(id: number | string) {
  const { data, error } = await supabaseServer
    .from("veiculos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
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
