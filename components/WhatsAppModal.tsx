"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppModalProps {
  children: React.ReactNode;
  mensagem?: string;
}

export default function WhatsAppModal({
  children,
  mensagem,
}: WhatsAppModalProps) {
  const [open, setOpen] = useState(false);

  const texto = encodeURIComponent(
    mensagem ?? "Olá! Gostaria de falar com um vendedor."
  );

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        {children}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white text-zinc-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-zinc-200 p-5">
              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Escolha um vendedor
                </h2>

                <p className="mt-1 text-sm text-zinc-600">
                  Selecione o WhatsApp desejado.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                <X size={22} />
              </button>
            </div>

            {/* Lista */}
            <div className="space-y-4 p-5">

              <a
                href={`https://wa.me/5521999132358?text=${texto}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4 transition-all duration-200 hover:border-green-500 hover:bg-green-50 hover:shadow-md"
              >
                <MessageCircle
                  size={26}
                  className="shrink-0 text-green-600"
                />

                <div>
                  <p className="text-base font-bold text-zinc-900">
                    WhatsApp Vendas 1
                  </p>

                  <p className="text-sm text-zinc-600">
                    (21) 99913-2358
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/5521965654406?text=${texto}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4 transition-all duration-200 hover:border-green-500 hover:bg-green-50 hover:shadow-md"
              >
                <MessageCircle
                  size={26}
                  className="shrink-0 text-green-600"
                />

                <div>
                  <p className="text-base font-bold text-zinc-900">
                    WhatsApp Vendas 2
                  </p>

                  <p className="text-sm text-zinc-600">
                    (21) 96565-4406
                  </p>
                </div>
              </a>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
