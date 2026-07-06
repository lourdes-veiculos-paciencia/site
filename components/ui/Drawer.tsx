"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Drawer({
  open,
  onClose,
  children,
}: Props) {

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Impede rolagem do body quando o menu estiver aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Fundo escuro */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/50 transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Painel */}
      <aside
        className={`
          fixed top-0 right-0 z-50
          flex h-full w-80 max-w-[85vw] flex-col
          bg-white shadow-2xl
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-lg font-bold">
            Menu
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>

        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-5">

          {children}

        </div>

      </aside>
    </>
  );
}