import Link from "next/link";
import { supabaseAdminAutorizado } from "@/lib/supabase/admin";

export default async function EstatisticasPage({ searchParams }: { searchParams: Promise<{ periodo?: string }> }) {
  const { periodo } = await searchParams;
  const dias = periodo === "7" ? 7 : periodo === "0" ? 0 : 30;
  const client = await supabaseAdminAutorizado();
  const { data, error } = await client.rpc("ranking_visualizacoes_veiculos", { p_dias: dias });
  const linhas = (data ?? []) as { id: string; nome: string; visualizacoes: number }[];
  const max = Math.max(1, ...linhas.map(linha => Number(linha.visualizacoes)));
  return <>
    <h1 className="text-3xl font-bold">Veículos mais vistos</h1>
    <p className="mt-2 text-gray-600">Até 20 veículos com mais visualizações no período.</p>
    <nav aria-label="Período das estatísticas" className="my-6 flex flex-wrap gap-3">
      {[[7, "7 dias"], [30, "30 dias"], [0, "Todo o período"]].map(([valor, label]) => <Link key={valor} href={`?periodo=${valor}`} aria-current={dias === valor ? "page" : undefined} className={`rounded-lg border px-4 py-2 ${dias === valor ? "bg-red-600 text-white" : "bg-white"}`}>{label}</Link>)}
    </nav>
    {error ? <p role="alert" className="rounded-xl border border-amber-300 bg-amber-50 p-5">Estatísticas indisponíveis. Verifique se a migração de visualizações foi aplicada ao Supabase e tente novamente.</p> : !linhas.length ? <p className="rounded-xl bg-white p-6">Ainda não há visualizações registradas neste período.</p> : <ol className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      {linhas.map((linha, index) => <li key={linha.id}>
        <div className="mb-2 flex justify-between gap-4 text-sm"><span>{index + 1}. {linha.nome}</span><strong>{linha.visualizacoes} visualizações</strong></div>
        <div aria-hidden="true" className="h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-red-600" style={{ width: `${Number(linha.visualizacoes) / max * 100}%` }} /></div>
      </li>)}
    </ol>}
    <p className="mt-5 text-sm text-gray-500">Uma visualização por veículo e sessão da aba. Recarregar a página não soma novamente. Acessos com sessão administrativa ativa são ignorados pelo site. Contagem aproximada, iniciada após a ativação; não representa pessoas únicas.</p>
  </>;
}
