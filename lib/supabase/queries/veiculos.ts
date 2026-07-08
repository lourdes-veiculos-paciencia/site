import { supabase } from "../client";

export async function buscarVeiculos() {
  const { data, error } = await supabase
    .from("veiculos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function buscarVeiculo(id: number) {
  const { data, error } = await supabase
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