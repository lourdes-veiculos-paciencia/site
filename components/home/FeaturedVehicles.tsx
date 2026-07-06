import VehicleCard from "@/components/vehicle/VehicleCard";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import veiculos from "@/data/veiculos.json";
import { Veiculo } from "@/types/veiculo";

type Props = {
  pesquisa: string;
};

export default function FeaturedVehicles({ pesquisa }: Props) {
  const pesquisaLower = pesquisa.toLowerCase().trim();

  const veiculosFiltrados = (veiculos as Veiculo[]).filter((veiculo) => {
    if (!pesquisaLower) return true;

    return (
      veiculo.marca.toLowerCase().includes(pesquisaLower) ||
      veiculo.modelo.toLowerCase().includes(pesquisaLower) ||
      veiculo.versao.toLowerCase().includes(pesquisaLower) ||
      veiculo.ano.toString().includes(pesquisaLower)
    );
  });

  return (
    <section className="py-20 bg-gray-50">

      <Container>

        <SectionTitle
          title="Veículos em Destaque"
          subtitle="Confira algumas oportunidades disponíveis na Lourdes Veículos."
        />

        <div className="mb-8 flex items-center justify-between">

          <p className="text-gray-600">
            <strong>{veiculosFiltrados.length}</strong>{" "}
            {veiculosFiltrados.length === 1
              ? "veículo encontrado"
              : "veículos encontrados"}
          </p>

        </div>

        {veiculosFiltrados.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">

            <h3 className="text-2xl font-bold text-gray-800">
              Nenhum veículo encontrado
            </h3>

            <p className="mt-3 text-gray-500">
              Tente pesquisar por outra marca, modelo ou ano.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {veiculosFiltrados.map((veiculo) => (

              <VehicleCard
                key={veiculo.id}
                {...veiculo}
              />

            ))}

          </div>

        )}

      </Container>

    </section>
  );
}