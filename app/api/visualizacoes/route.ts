import { cookies } from "next/headers";
import { ADMIN_COOKIE, validarSessaoAdmin } from "@/lib/admin-session";
import { supabaseServer } from "@/lib/supabase/server";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return new Response(null, { status: 403 });
  if (validarSessaoAdmin((await cookies()).get(ADMIN_COOKIE)?.value)) return new Response(null, { status: 204 });
  const body = await request.text();
  if (body.length > 512) return new Response(null, { status: 413 });
  let dados;
  try { dados = JSON.parse(body); } catch { return new Response(null, { status: 400 }); }
  if (!dados || typeof dados.id !== "string" || typeof dados.visitor !== "string" || !uuid.test(dados.id) || !uuid.test(dados.visitor)) return new Response(null, { status: 400 });
  const { error } = await supabaseServer.rpc("registrar_visualizacao_veiculo", { p_veiculo: dados.id, p_visita: dados.visitor });
  return new Response(null, { status: error ? 503 : 204 });
}
