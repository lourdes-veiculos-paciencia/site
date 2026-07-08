import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import FeaturedVehicleCard from "@/components/home/FeaturedVehicleCard";

import { buscarVeiculosPublicos } from "@/lib/veiculos";

export default async function FeaturedVehicles() {
  const veiculos = await buscarVeiculosPublicos();
  const destaques = veiculos
    .filter((veiculo) => veiculo.destaque && !veiculo.vendido)
    .slice(0, 8);

  return (
    <section className="bg-gray-50 py-16">

      <Container>

        <SectionTitle
          title="Veículos em Destaque"
          subtitle="Confira alguns veículos selecionados pela Lourdes Veículos."
        />

        <div
          className="
            grid
            grid-cols-2
            gap-4
            md:grid-cols-3
            xl:grid-cols-4
          "
        >
          {destaques.map((veiculo) => (
            <FeaturedVehicleCard
              key={veiculo.id}
              veiculo={veiculo}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">

          <Button href="/estoque">
            Ver todo o estoque →
          </Button>

        </div>

      </Container>

    </section>
  );
}
