"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppModalProps {
  children: React.ReactNode;
}

export default function WhatsAppModal({
  children,
}: WhatsAppModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        {children}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

            <div className="flex items-center justify-between p-5 border-b">

              <div>
                <h2 className="text-xl font-bold">
                  Escolha um vendedor
                </h2>

                <p className="text-gray-500 text-sm">
                  Selecione o WhatsApp desejado.
                </p>
              </div>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>

            </div>

            <div className="p-5 space-y-4">

              <a
                href="https://wa.me/5521999132358"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border rounded-xl p-4 hover:bg-green-50 hover:border-green-500 transition"
              >
                <MessageCircle className="text-green-600" />

                <div>
                  <p className="font-bold">
                    WhatsApp Vendas 1
                  </p>

                  <p className="text-gray-500">
                    (21) 99913-2358
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/5521965654406"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border rounded-xl p-4 hover:bg-green-50 hover:border-green-500 transition"
              >
                <MessageCircle className="text-green-600" />

                <div>
                  <p className="font-bold">
                    WhatsApp Vendas 2
                  </p>

                  <p className="text-gray-500">
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
