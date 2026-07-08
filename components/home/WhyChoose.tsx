import { BadgeCheck, CreditCard, ShieldCheck, Wrench } from "lucide-react";

const itens = [
  {
    icon: ShieldCheck,
    titulo: "Procedencia garantida",
    descricao:
      "Cada veiculo passa por uma avaliacao criteriosa antes de entrar no estoque.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: CreditCard,
    titulo: "Financiamento facilitado",
    descricao:
      "Ajudamos voce a encontrar condicoes claras e adequadas para o seu momento.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Wrench,
    titulo: "Veiculos revisados",
    descricao:
      "Carros vistoriados, revisados e preparados para uma compra mais tranquila.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: BadgeCheck,
    titulo: "Atendimento especializado",
    descricao:
      "Um atendimento direto para ajudar voce a comparar, escolher e fechar negocio.",
    color: "text-zinc-700",
    bg: "bg-zinc-100",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-zinc-950 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-red-400">
              Diferenciais
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Uma compra mais clara, segura e bem acompanhada
            </h2>

            <p className="mt-4 text-base leading-8 text-zinc-300">
              Mais do que vender carros, a Lourdes Veiculos organiza a jornada
              para voce entender as opcoes e sair confiante.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {itens.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.titulo}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:bg-white/[0.07]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.bg}`}
                  >
                    <Icon size={23} className={item.color} />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-white">
                    {item.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-zinc-300">
                    {item.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
