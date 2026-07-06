import Image from "next/image";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-semibold inline-block">
              🚗 {CONFIG.empresa}
            </span>

            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold leading-tight">
              Encontre o carro
              <br />
              ideal para você.
            </h1>

            <p className="mt-6 text-xl text-gray-300">
              Trabalhamos com veículos revisados, procedência garantida e financiamento facilitado.
            </p>

            <div className="mt-8 space-y-3">

              <p>✔ Veículos revisados</p>
              <p>✔ Procedência garantida</p>
              <p>✔ Aceitamos seu usado na troca</p>

            </div>

            <div className="mt-10 flex gap-4">

              <Link
                href="/estoque"
                className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold transition"
              >
                Ver Estoque
              </Link>

              <a
                href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(
                  CONFIG.whatsapp.mensagem
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-bold transition"
              >
                WhatsApp
              </a>

            </div>

          </div>

          <div className="relative h-[500px]">

            <Image
              src="/banner/hero-car.png"
              alt="Veículo em destaque"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />

          </div>

        </div>

      </div>

    </section>
  );
}