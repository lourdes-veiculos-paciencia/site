import Image from "next/image";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-24 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/logo.png"
            alt={CONFIG.empresa}
            width={260}
            height={85}
            priority
            style={{
              width: "260px",
              height: "auto",
            }}
          />
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className="font-semibold text-gray-700 hover:text-red-600 transition"
          >
            Início
          </Link>

          <Link
            href="/estoque"
            className="font-semibold text-gray-700 hover:text-red-600 transition"
          >
            Estoque
          </Link>

          <Link
            href="/sobre"
            className="font-semibold text-gray-700 hover:text-red-600 transition"
          >
            Sobre
          </Link>

          <Link
            href="/contato"
            className="font-semibold text-gray-700 hover:text-red-600 transition"
          >
            Contato
          </Link>

        </nav>

        {/* Redes Sociais */}
        <div className="flex items-center gap-3">

          <a
            href={CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white transition px-4 py-3 rounded-xl font-semibold"
          >
            Instagram
          </a>

          <a
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(
              CONFIG.whatsapp.mensagem
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
          >
            WhatsApp
          </a>

        </div>

      </div>
    </header>
  );
}