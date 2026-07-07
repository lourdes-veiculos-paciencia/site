import Link from "next/link";

import VehicleCard from "@/components/vehicle/VehicleCard";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

import veiculos from "@/data/veiculos.json";
import { Veiculo } from "@/types/veiculo";

export default function FeaturedVehicles() {
  // Apenas veículos em destaque e disponíveis
  const destaques = (veiculos as Veiculo[])
    .filter((veiculo) => veiculo.destaque && !veiculo.vendido)
    .slice(0, 6);

  return (
    <section className="bg-gray-50 py-20">

      <Container>

        <SectionTitle
          title="Veículos em Destaque"
          subtitle="Confira algumas oportunidades selecionadas pela Lourdes Veículos."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {destaques.map((veiculo) => (

            <VehicleCard
              key={veiculo.id}
              {...veiculo}
            />

          ))}

        </div>

        <div className="mt-14 flex justify-center">

          <Button
            href="/estoque"
            className="px-10"
          >
            Ver todo o estoque →
          </Button>

        </div>

      </Container>

    </section>
  );
}