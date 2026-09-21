"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FotoStorage } from "@/lib/supabase/fotos";
import DeletePhotoButton from "./DeletePhotoButton";

function formatarTamanho(bytes: number | null) {
  if (bytes === null) return "Tamanho não informado";
  if (bytes < 1024) return `${bytes} B`;
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function FotosGallery({ fotos, aviso }: { fotos: FotoStorage[]; aviso: string | null }) {
  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [ordem, setOrdem] = useState("maiores");
  const [pagina, setPagina] = useState(1);
  const lista = fotos.filter((foto) => {
    const texto = `${foto.caminho} ${foto.veiculos.map(v => v.nome).join(" ")}`.toLocaleLowerCase("pt-BR");
    if (!texto.includes(pesquisa.trim().toLocaleLowerCase("pt-BR"))) return false;
    return filtro === "todas" || (!aviso && (filtro === "sem" ? foto.veiculos.length === 0 : filtro === "compartilhadas" ? foto.veiculos.length > 1 : foto.veiculos.length > 0));
  }).sort((a, b) => ordem === "nome" ? a.caminho.localeCompare(b.caminho) : ordem === "recentes" ? (b.criadaEm ?? "").localeCompare(a.criadaEm ?? "") : (b.tamanho ?? -1) - (a.tamanho ?? -1));
  const paginas = Math.max(1, Math.ceil(lista.length / 24));
  const atual = Math.min(pagina, paginas);
  const total = fotos.reduce((soma, foto) => soma + (foto.tamanho ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Fotos do Storage</h1><p className="mt-2 text-sm text-gray-600">Veja os arquivos e os veículos associados a cada foto.</p></div>
        <a href="/admin/fotos" className="rounded-lg border bg-white px-4 py-2 font-semibold">Atualizar</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Arquivos visíveis</p><p className="text-2xl font-bold">{fotos.length}</p></div>
        <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Espaço dos arquivos listados</p><p className="text-2xl font-bold">{formatarTamanho(total)}</p><p className="text-xs text-gray-500">{fotos.filter(f => f.tamanho === null).length} com tamanho não informado</p></div>
        <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Sem vínculo encontrado</p><p className="text-2xl font-bold">{aviso ? "Indisponível" : fotos.filter(f => !f.veiculos.length).length}</p></div>
      </div>
      <p className="text-sm text-gray-600">Os vínculos consideram os veículos visíveis pelas permissões atuais. “Sem vínculo encontrado” não significa que o arquivo pode ser apagado. Miniaturas ajudam na comparação visual; tamanho igual não comprova fotos repetidas.</p>
      {aviso && <p role="alert" className="rounded-lg bg-amber-100 p-4 text-amber-950">{aviso}</p>}
      <div className="grid gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-3">
        <label className="text-sm font-medium">Pesquisar arquivo ou veículo<input value={pesquisa} onChange={e => { setPesquisa(e.target.value); setPagina(1); }} className="mt-2 w-full rounded-lg border p-3" placeholder="Nome da foto, marca ou modelo" /></label>
        <label className="text-sm font-medium">Vínculo<select disabled={!!aviso} value={filtro} onChange={e => { setFiltro(e.target.value); setPagina(1); }} className="mt-2 w-full rounded-lg border p-3"><option value="todas">Todos os arquivos</option><option value="com">Com veículo</option><option value="sem">Sem vínculo encontrado</option><option value="compartilhadas">Compartilhadas entre veículos</option></select></label>
        <label className="text-sm font-medium">Ordenar<select value={ordem} onChange={e => { setOrdem(e.target.value); setPagina(1); }} className="mt-2 w-full rounded-lg border p-3"><option value="maiores">Maiores arquivos</option><option value="recentes">Mais recentes</option><option value="nome">Nome do arquivo</option></select></label>
      </div>
      <p className="text-sm text-gray-600">{lista.length} arquivos encontrados</p>
      {!lista.length && <p className="rounded-xl bg-white p-8 text-center">Nenhum arquivo encontrado na consulta atual. Confira os filtros e as permissões de leitura caso esperasse encontrar fotos.</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {lista.slice((atual - 1) * 24, atual * 24).map(foto => (
          <article key={foto.caminho} className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <a href={foto.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${foto.caminho}`} className="relative flex h-44 items-center justify-center bg-gray-200">
              {foto.imagem ? <Image src={foto.url} alt={foto.caminho} fill unoptimized className="object-contain" sizes="(max-width: 640px) 100vw, 33vw" /> : <span>Arquivo sem prévia de imagem</span>}
            </a>
            <div className="space-y-3 p-4">
              <p className="break-all text-sm font-semibold">{foto.caminho}</p>
              <p className="text-sm text-gray-600">{formatarTamanho(foto.tamanho)} · {foto.criadaEm ? new Date(foto.criadaEm).toLocaleDateString("pt-BR", { timeZone: "UTC" }) : "Data não informada"}</p>
              <p className={`text-sm font-semibold ${aviso || !foto.veiculos.length ? "text-amber-800" : "text-emerald-700"}`}>{aviso ? "Vínculos não verificados" : !foto.veiculos.length ? "Sem vínculo encontrado" : foto.veiculos.length > 1 ? "Compartilhada entre veículos" : "Vinculada a veículo"}</p>
              {foto.veiculos.map(v => <Link key={v.id} href={`/admin/veiculos/editar/${encodeURIComponent(v.id)}`} className="block text-sm text-blue-700 underline">{v.nome}</Link>)}
              {!aviso && foto.imagem && foto.veiculos.length === 0 && foto.caminho.startsWith("imagens/") && <DeletePhotoButton caminho={foto.caminho} />}
              <a href={foto.url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-red-600">Abrir original ↗</a>
            </div>
          </article>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button disabled={atual <= 1} onClick={() => setPagina(atual - 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40">Anterior</button>
        <span className="text-sm">Página {atual} de {paginas}</span>
        <button disabled={atual >= paginas} onClick={() => setPagina(atual + 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40">Próxima</button>
      </div>
    </div>
  );
}
