import VehicleCard from "@/components/vehicle/VehicleCard";
import SectionTitle from "@/components/ui/SectionTitle";

import { Veiculo } from "@/types/veiculo";

type Props = {
  atual: number;
  veiculos: Veiculo[];
};

export default function RelatedVehicles({
  atual,
  veiculos,
}: Props) {
  const relacionados = veiculos
    .filter((v) => v.id !== atual && !v.vendido)
    .slice(0, 3);

  if (relacionados.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">

      <SectionTitle
        title="Você também pode gostar"
        subtitle="Confira outros veículos disponíveis na Lourdes Veículos."
      />

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {relacionados.map((veiculo) => (
          <VehicleCard
            key={veiculo.id}
            {...veiculo}
          />
        ))}

      </div>

    </section>
  );
}