"use client";

import { useEffect, useRef, useState } from "react";
import { renovarSessaoAdmin } from "@/app/actions/auth";

export default function AdminIdleSession({ expiresAt }: { expiresAt: number }) {
  const deadline = useRef(expiresAt);
  const lastRequest = useRef(0);
  const pending = useRef(false);
  const [remaining, setRemaining] = useState(300);
  const [error, setError] = useState(false);

  useEffect(() => {
    deadline.current = expiresAt;
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("admin-session") : null;
    let alive = true;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemaining(seconds);
      if (!seconds) window.location.replace("/login?expirada=1");
    };
    const renew = async (event: Event) => {
      if (!event.isTrusted || document.visibilityState !== "visible" || pending.current) return;
      const now = Date.now();
      if (now >= deadline.current) { tick(); return; }
      if (now - lastRequest.current < 15000 && deadline.current - now > 60000) return;
      lastRequest.current = now;
      pending.current = true;
      try {
        const expiry = await renovarSessaoAdmin();
        if (!alive) return;
        if (!expiry) { window.location.replace("/login?expirada=1"); return; }
        deadline.current = expiry;
        channel?.postMessage(expiry);
        setError(false);
        tick();
      } catch { if (alive) setError(true); }
      finally { pending.current = false; }
    };
    if (channel) channel.onmessage = event => {
      if (typeof event.data === "number" && Number.isFinite(event.data)) {
        deadline.current = Math.max(deadline.current, event.data);
        tick();
      }
    };
    const events = ["click", "pointerdown", "keydown", "scroll", "pointermove"];
    events.forEach(name => window.addEventListener(name, renew, { passive: true }));
    document.addEventListener("visibilitychange", tick);
    const timer = window.setInterval(tick, 1000);
    tick();
    return () => {
      alive = false;
      clearInterval(timer);
      events.forEach(name => window.removeEventListener(name, renew));
      document.removeEventListener("visibilitychange", tick);
      channel?.close();
    };
  }, [expiresAt]);

  if (remaining > 60 && !error) return null;
  return <div role="alert" className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-xl border border-amber-300 bg-white p-5 shadow-xl">
    <p className="font-semibold">Sua sessão expira em {remaining} segundos.</p>
    <p className="mt-2 text-sm text-gray-600">Salve suas alterações. Dados não salvos podem ser perdidos ao sair.</p>
    {error && <p className="mt-2 text-sm text-red-700">Não foi possível renovar a sessão. Verifique sua conexão e tente novamente.</p>}
    <button type="button" className="mt-3 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white">Continuar conectado</button>
  </div>;
}
