"use client";

import { useEffect, useState } from "react";
import WhatsAppModal from "@/components/WhatsAppModal";

let invitationShown = false;

export default function VehicleEngagement({ id, nome }: { id: string; nome: string }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    let visibleMs = 0;
    let previous = performance.now();
    let visible = document.visibilityState === "visible";
    let recorded = false;
    let recording = false;
    let attempts = 0;
    let visitor = "";
    try {
      visitor = sessionStorage.getItem("vehicle-visit") || "";
      if (!visitor) {
        // getRandomValues também funciona no teste local por HTTP na rede.
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        bytes[6] = (bytes[6] & 15) | 64;
        bytes[8] = (bytes[8] & 63) | 128;
        const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
        visitor = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
      }
      sessionStorage.setItem("vehicle-visit", visitor);
      invitationShown = invitationShown || sessionStorage.getItem("vehicle-help-shown") === "1";
    } catch { /* Sem armazenamento, o convite ainda funciona nesta página. */ }
    const record = async () => {
      if (!visitor || recorded || recording || attempts >= 2) return;
      recording = true;
      attempts++;
      try {
        const response = await fetch("/api/visualizacoes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, visitor }) });
        recorded = response.ok;
      } catch { /* Estatísticas indisponíveis não interrompem a página. */ }
      finally { recording = false; }
    };
    const tick = () => {
      const now = performance.now();
      if (visible) visibleMs += now - previous;
      previous = now;
      visible = document.visibilityState === "visible";
      if (visible && visibleMs >= 1000) void record();
      if (visible && visibleMs >= 180000 && !invitationShown) {
        invitationShown = true;
        try { sessionStorage.setItem("vehicle-help-shown", "1"); } catch {}
        setUrl(window.location.href);
        setOpen(true);
      }
    };
    document.addEventListener("visibilitychange", tick);
    const timer = window.setInterval(tick, 1000);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", tick); };
  }, [id]);

  if (!open) return null;
  return <aside aria-label="Ajuda com este veículo" className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">
    <button type="button" aria-label="Fechar convite" onClick={() => setOpen(false)} className="absolute right-3 top-2 rounded p-2 text-xl text-zinc-500">×</button>
    <p className="pr-8 text-lg font-bold">Ficou com alguma dúvida?</p>
    <p className="my-3 text-sm text-zinc-600">Fale com nossa equipe sobre {nome}. Estamos à disposição para ajudar!</p>
    <WhatsAppModal mensagem={`Olá! Tenho interesse no veículo ${nome}. Pode me ajudar? ${url}`}>
      <button type="button" className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800">Conversar pelo WhatsApp</button>
    </WhatsAppModal>
  </aside>;
}
