import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div>

            <span className="inline-block bg-red-600 px-4 py-2 rounded-full text-sm font-semibold">
              🚗 Lourdes Veículos
            </span>

            <h1 className="mt-8 text-5xl lg:text-6xl font-bold leading-tight">
              Encontre o carro
              <br />
              ideal para você.
            </h1>

            <p className="mt-6 text-lg text-gray-300">
              Trabalhamos com veículos revisados, procedência garantida e as melhores condições de financiamento.
            </p>

            <div className="mt-8 space-y-2 text-gray-200">
              <p>✔ Veículos revisados</p>
              <p>✔ Financiamento facilitado</p>
              <p>✔ Avaliação do seu usado</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/estoque"
                className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold transition"
              >
                Ver Estoque
              </Link>

              <a
                href="https://wa.me/5521999999999"
                className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-bold transition"
              >
                WhatsApp
              </a>
            </div>

          </div>

          {/* Imagem */}
          <div className="relative h-[450px]">
            <Image
              src="/banner/hero-car.png"
              alt="Carro em destaque"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain drop-shadow-2xl"
            />
          </div>

        </div>

      </div>
    </section>
  );
}