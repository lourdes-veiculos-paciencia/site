import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <span className="inline-block bg-red-600 px-4 py-2 rounded-full text-sm font-semibold">
          Lourdes Veículos
        </span>

        <h2 className="mt-8 text-5xl md:text-6xl font-bold leading-tight">
          Encontre o carro
          <br />
          ideal para você.
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Trabalhamos com veículos revisados, procedência garantida e as melhores condições de financiamento.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/estoque"
            className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl font-bold"
          >
            Ver Estoque
          </Link>

          <Link
            href="/contato"
            className="border border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-xl font-bold"
          >
            Fale Conosco
          </Link>
        </div>

      </div>
    </section>
  );
}