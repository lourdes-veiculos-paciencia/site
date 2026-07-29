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
            className="w-full max-w-md rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-bold">
                  Escolha um vendedor
                </h2>

                <p className="text-sm text-gray-500">
                  Selecione o WhatsApp desejado.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4 p-5">

              <a
                href={`https://wa.me/5521999132358?text=${texto}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 rounded-xl border p-4 transition hover:border-green-500 hover:bg-green-50"
              >
                <MessageCircle className="text-green-600" />

                <div>
                  <p className="font-bold">
                    WhatsApp Vendas 1
                  </p>

                  <p className="text-sm text-gray-500">
                    (21) 99913-2358
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/5521965654406?text=${texto}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 rounded-xl border p-4 transition hover:border-green-500 hover:bg-green-50"
              >
                <MessageCircle className="text-green-600" />

                <div>
                  <p className="font-bold">
                    WhatsApp Vendas 2
                  </p>

                  <p className="text-sm text-gray-500">
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
