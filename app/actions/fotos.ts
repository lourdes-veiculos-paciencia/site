"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdminAutorizado } from "@/lib/supabase/admin";
import { excluirFotoSemVinculo } from "@/lib/supabase/fotos";

export async function excluirFoto(caminho: string) {
  try {
    const admin = await supabaseAdminAutorizado();
    await excluirFotoSemVinculo(admin, process.env.NEXT_PUBLIC_SUPABASE_URL!, caminho);
  } catch (error) {
    console.error("Falha ao excluir foto sem vínculo:", error);
    return { error: error instanceof Error ? error.message : "Não foi possível confirmar a exclusão. Atualize a página." };
  }
  revalidatePath("/admin/fotos");
  return { error: null };
}
