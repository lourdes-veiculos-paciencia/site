import Link from "next/link";
import { CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          <div>

            <h2 className="text-2xl font-bold text-red-600">
              {CONFIG.empresa}
            </h2>

            <p className="mt-4 text-gray-400">
              Trabalhamos com veículos de procedência,
              oferecendo qualidade, confiança e as melhores condições de financiamento.
            </p>

          </div>

          <div>

            <h3 className="font-bold text-lg mb-4">
              Navegação
            </h3>

            <div className="flex flex-col gap-2">

              <Link href="/">Início</Link>

              <Link href="/estoque">Estoque</Link>

              <Link href="/sobre">Sobre</Link>

              <Link href="/contato">Contato</Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold text-lg mb-4">
              Contato
            </h3>

            <p>📍 {CONFIG.endereco}</p>

            <p className="mt-2">
              📞 {CONFIG.telefone}
            </p>

            <p className="mt-2">
              ✉ {CONFIG.email}
            </p>

            <a
              href={CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-pink-400 hover:text-pink-300"
            >
              📸 @lourdesveiculos_paciencia
            </a>

          </div>

        </div>

        <hr className="my-10 border-gray-800" />

        <div className="text-center text-gray-500">

          © {new Date().getFullYear()} {CONFIG.empresa}. Todos os direitos reservados.

        </div>

      </div>

    </footer>
  );
}