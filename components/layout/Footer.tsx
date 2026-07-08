import Link from "next/link";
import { CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-12 sm:mt-16 md:mt-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">

          <div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-600">
              {CONFIG.empresa}
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400">
              Trabalhamos com veículos de procedência,
              oferecendo qualidade, confiança e as melhores condições de financiamento.
            </p>

          </div>

          <div>

            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Navegação
            </h3>

            <div className="flex flex-col gap-2 text-sm sm:text-base">

              <Link href="/">Início</Link>

              <Link href="/estoque">Estoque</Link>

              <Link href="/sobre">Sobre</Link>

              <Link href="/contato">Contato</Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Contato
            </h3>

            <p className="text-sm sm:text-base">📍 {CONFIG.endereco}</p>

            <p className="mt-2 text-sm sm:text-base">
              📞 {CONFIG.telefone}
            </p>

            <p className="mt-2 text-sm sm:text-base">
              ✉ {CONFIG.email}
            </p>

            <a
              href={CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-xs sm:text-sm text-pink-400 hover:text-pink-300"
            >
              📸 @lourdesveiculos_paciencia
            </a>

          </div>

        </div>

        <hr className="my-6 sm:my-8 md:my-10 border-gray-800" />

        <div className="text-center text-xs sm:text-sm text-gray-500">

          © {new Date().getFullYear()} {CONFIG.empresa}. Todos os direitos reservados.

        </div>

      </div>

    </footer>
  );
}