import VehicleCard from "@/components/vehicle/VehicleCard";
import veiculos from "@/data/veiculos.json";
export default function FeaturedVehicles() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold text-center">
        Veículos em Destaque
      </h2>

      <p className="text-center text-gray-500 mt-4 mb-12">
        Confira algumas oportunidades disponíveis.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        {veiculos.map((veiculo) => (
          <VehicleCard
            key={veiculo.id}
            {...veiculo}
          />
        ))}

      </div>

    </section>
  );
}