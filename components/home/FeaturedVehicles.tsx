import VehicleCard from "@/components/vehicle/VehicleCard";
import veiculos from "@/data/veiculos.json";
import { Veiculo } from "@/types/veiculo";

type Props = {
  pesquisa: string;
};

export default function FeaturedVehicles({ pesquisa }: Props) {
  const pesquisaLower = pesquisa.toLowerCase();

  const veiculosFiltrados = (veiculos as Veiculo[]).filter((veiculo) => {
    return (
      veiculo.marca.toLowerCase().includes(pesquisaLower) ||
      veiculo.modelo.toLowerCase().includes(pesquisaLower) ||
      veiculo.versao.toLowerCase().includes(pesquisaLower) ||
      veiculo.ano.toString().includes(pesquisaLower)
    );
  });

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold text-center">
        Veículos em Destaque
      </h2>

      <p className="text-center text-gray-500 mt-4">
        {veiculosFiltrados.length} veículo(s) encontrado(s)
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">

        {veiculosFiltrados.length > 0 ? (
          veiculosFiltrados.map((veiculo) => (
            <VehicleCard
              key={veiculo.id}
              {...veiculo}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-16">

            <h3 className="text-2xl font-bold">
              Nenhum veículo encontrado.
            </h3>

            <p className="text-gray-500 mt-3">
              Tente pesquisar por outra marca ou modelo.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}