"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { excluirFoto } from "@/app/actions/fotos";

export default function DeletePhotoButton({ caminho }: { caminho: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [erro, setErro] = useState<string | null>(null);
  const [excluida, setExcluida] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  function excluir() {
    setErro(null);
    startTransition(async () => {
      try {
        const resultado = await excluirFoto(caminho);
        if (resultado.error) setErro(resultado.error);
        else {
          setExcluida(true);
          setConfirmando(false);
          router.refresh();
        }
      } catch {
        setErro("Não foi possível confirmar a exclusão. Atualize a página antes de tentar novamente.");
      }
    });
  }

  return <div>
    <button type="button" onClick={() => { setErro(null); setConfirmando(true); }} disabled={pending || excluida || confirmando} className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50">
      {excluida ? "Foto excluída" : pending ? "Verificando e excluindo…" : "Excluir foto"}
    </button>
    {confirmando && <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
      <p className="text-sm font-semibold text-red-900">Excluir esta foto permanentemente?</p>
      <p className="mt-2 break-all text-xs text-gray-700">{caminho}</p>
      <p className="mt-2 text-sm text-gray-700">Confirme que ela não está em um cadastro ou edição ainda não salvo. A exclusão não pode ser desfeita.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={excluir} disabled={pending} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">{pending ? "Verificando vínculos…" : "Confirmar exclusão"}</button>
        <button type="button" onClick={() => { setConfirmando(false); setErro(null); }} disabled={pending} className="rounded-lg border bg-white px-3 py-2 text-sm disabled:opacity-50">Cancelar</button>
      </div>
      {pending && <p role="status" className="mt-2 text-sm">Aguarde: conferindo os veículos e o Storage.</p>}
    </div>}
    {erro && <p role="alert" className="mt-2 text-sm text-red-700">{erro}</p>}
  </div>;
}
