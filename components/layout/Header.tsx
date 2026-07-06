import Image from "next/image";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export default function Header() {
  return (
    <>
      {/* Barra superior */}
      <div className="hidden md:block bg-black text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          <div className="flex gap-6">
            <span>📞 {CONFIG.telefone}</span>
            <span>📍 {CONFIG.endereco}</span>
          </div>

          <div className="flex gap-4">
            <a
              href={CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition"
            >
              📸 Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex h-24 items-center justify-between px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo.png"
              alt={CONFIG.empresa}
              width={260}
              height={90}
              priority
            />
          </Link>

          {/* Menu */}
          <nav className="hidden lg:flex items-center gap-8">

            <Link
              href="/"
              className="font-semibold text-gray-700 hover:text-red-600 transition-colors"
            >
              Início
            </Link>

            <Link
              href="/estoque"
              className="font-semibold text-gray-700 hover:text-red-600 transition-colors"
            >
              Estoque
            </Link>

            <Link
              href="/sobre"
              className="font-semibold text-gray-700 hover:text-red-600 transition-colors"
            >
              Sobre
            </Link>

            <Link
              href="/contato"
              className="font-semibold text-gray-700 hover:text-red-600 transition-colors"
            >
              Contato
            </Link>

          </nav>

          {/* Botões */}
          <div className="flex items-center gap-3">

            <a
              href={CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-pink-500 px-4 py-3 font-semibold text-pink-600 transition hover:bg-pink-500 hover:text-white"
            >
              📸 Instagram
            </a>

            <a
              href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(
                CONFIG.whatsapp.mensagem
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700"
            >
              💬 WhatsApp
            </a>

          </div>

        </div>
      </header>
    </>
  );
}