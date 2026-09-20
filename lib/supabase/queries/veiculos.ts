import { supabaseServer } from "../server";
import { Veiculo } from "@/types/veiculo";

export async function buscarVeiculos() {
  console.log("========== DIAGNOSTICO SUPABASE ==========");
  console.log(
    "SUPABASE URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL || "NAO DEFINIDA"
  );
  console.log(
    "PUBLISHABLE KEY EXISTE:",
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  );

  const { data, error } = await supabaseServer
    .from("veiculos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ERRO AO BUSCAR VEICULOS NO SUPABASE:");
    console.error("CODE:", error.code);
    console.error("MESSAGE:", error.message);
    console.error("DETAILS:", error.details);
    console.error("HINT:", error.hint);
    console.log("==========================================");

    return [];
  }

  console.log(
    "TOTAL DE VEICULOS RECEBIDOS DO SUPABASE:",
    data?.length ?? 0
  );
  console.log("==========================================");

  return data ?? [];
}

export async function buscarVeiculo(id: number | string) {
  const { data, error } = await supabaseServer
    .from("veiculos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("ERRO AO BUSCAR VEICULO:", {
      id,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

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