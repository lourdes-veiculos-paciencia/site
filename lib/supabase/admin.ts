import "server-only";
import { createClient } from "@supabase/supabase-js";
import { exigirAdmin } from "@/lib/admin-auth";

export async function supabaseAdminAutorizado() {
  // Verificar a sessao antes de construir qualquer cliente privilegiado.
  await exigirAdmin();
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key || !key.startsWith("sb_secret_")) {
    throw new Error("Configure SUPABASE_SECRET_KEY no servidor com a Secret key do Supabase. Não use NEXT_PUBLIC para essa chave.");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
}
