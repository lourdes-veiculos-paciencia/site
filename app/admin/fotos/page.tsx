import { exigirAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { consultarFotos } from "@/lib/supabase/fotos";
import FotosGallery from "@/components/admin/FotosGallery";

export default async function FotosPage() {
  try { await exigirAdmin(); } catch { redirect("/login"); }
  let resultado;
  try {
    resultado = await consultarFotos(supabaseServer, process.env.NEXT_PUBLIC_SUPABASE_URL!);
  } catch {
    return (
      <div role="alert" className="rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Fotos do Storage</h1>
        <p className="my-4">Não foi possível carregar todos os arquivos. Confira a conexão e as permissões de leitura do bucket veiculos.</p>
        <a href="/admin/fotos" className="font-semibold text-red-600">Tentar novamente</a>
      </div>
    );
  }
  return <FotosGallery {...resultado} />;
}
