import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-24 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/logo.png"
            alt="Lourdes Veículos"
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

        {/* WhatsApp */}
        <a
          href="https://wa.me/5521999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-700"
        >
          WhatsApp
        </a>

      </div>
    </header>
  );
}