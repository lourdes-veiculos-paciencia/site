import Image from "next/image";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      <Image
        src="/banner/hero-car.png"
        alt="Carro em destaque da Lourdes Veiculos"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center] opacity-70"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.95)_0%,rgba(24,24,27,0.78)_45%,rgba(24,24,27,0.22)_100%)]" />

      <Container>
        <div className="relative flex min-h-[540px] items-center py-16 md:min-h-[640px] md:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-2xl backdrop-blur-md">
              <Sparkles size={14} />
              Lourdes Veículos · Paciência, RJ
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Seu próximo destino<br />
              <span className="text-red-400">começa aqui.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-zinc-200 md:text-lg">
              Carros e motos para a sua próxima conquista. Explore nosso estoque
              e conte com a nossa equipe para escolher com tranquilidade.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/estoque" className="gap-2 px-7 py-4 text-base">
                Ver estoque
                <ArrowRight size={18} />
              </Button>

              <Button
                href="/contato"
                variant="secondary"
                className="border-white/25 bg-white/10 px-7 py-4 text-base text-white backdrop-blur-md hover:border-white hover:bg-white hover:text-zinc-950"
              >
                Falar com a loja
              </Button>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-md">
                <ShieldCheck size={20} className="text-emerald-300" />
                Procedência verificada
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-md">
                <BadgeCheck size={20} className="text-sky-300" />
                Atendimento especializado
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
