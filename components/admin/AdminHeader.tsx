"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminHeader() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="lg:hidden bg-gray-900 text-white border-b border-gray-700">

      <div className="flex items-center justify-between p-4">

        <div>
          <h1 className="text-lg font-bold">
            Lourdes Veículos
          </h1>
          <p className="text-xs text-gray-400">
            Painel
          </p>
        </div>

        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="rounded-lg p-2 hover:bg-gray-800 transition"
        >
          {menuAberto ? "✕" : "☰"}
        </button>

      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <nav className="border-t border-gray-700 space-y-2 p-4">

          <Link
            href="/admin"
            onClick={() => setMenuAberto(false)}
            className="block rounded-lg px-4 py-3 text-sm hover:bg-gray-800 transition"
          >
            🚗 Veículos
          </Link>

          <a
            href="#"
            onClick={() => setMenuAberto(false)}
            className="block rounded-lg px-4 py-3 text-sm hover:bg-gray-800 transition cursor-not-allowed opacity-50"
          >
            📷 Fotos
          </a>

          <a
            href="#"
            onClick={() => setMenuAberto(false)}
            className="block rounded-lg px-4 py-3 text-sm hover:bg-gray-800 transition cursor-not-allowed opacity-50"
          >
            ⚙ Configurações
          </a>

          <div className="border-t border-gray-700 pt-4 mt-4">
            <LogoutButton />
          </div>

        </nav>
      )}

    </header>
  );
}
