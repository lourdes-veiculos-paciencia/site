import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-red-600">
              Lourdes Veículos
            </h2>

            <p className="mt-4 text-gray-400">
              Trabalhamos com veículos de procedência,
              oferecendo qualidade, confiança e as melhores
              condições de financiamento.
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

            <p>📍 Rio de Janeiro - RJ</p>

            <p className="mt-2">
              📞 (21) 99999-9999
            </p>

            <p className="mt-2">
              ✉ contato@lourdesveiculos.com.br
            </p>
          </div>

        </div>

        <hr className="my-10 border-gray-800" />

        <div className="text-center text-gray-500">

          © {new Date().getFullYear()} Lourdes Veículos.
          Todos os direitos reservados.

        </div>

      </div>
    </footer>
  );
}