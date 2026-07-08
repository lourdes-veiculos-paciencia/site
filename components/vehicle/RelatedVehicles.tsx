import SectionTitle from "@/components/ui/SectionTitle";
import VehicleCard from "@/components/vehicle/VehicleCard";
import { Veiculo } from "@/types/veiculo";

type Props = {
  atual: number | string;
  veiculos: Veiculo[];
};

export default function RelatedVehicles({ atual, veiculos }: Props) {
  const relacionados = veiculos
    .filter((v) => String(v.id) !== String(atual) && !v.vendido)
    .slice(0, 3);

  if (relacionados.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <SectionTitle
        title="Voce tambem pode gostar"
        subtitle="Confira outros veiculos disponiveis na Lourdes Veiculos."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {relacionados.map((veiculo) => (
          <VehicleCard key={veiculo.id} {...veiculo} />
        ))}
      </div>
    </section>
  );
}
