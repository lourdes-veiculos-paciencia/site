import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import VehicleGallery from "@/components/vehicle/VehicleGallery";
import VehicleInfo from "@/components/vehicle/VehicleInfo";
import RelatedVehicles from "@/components/vehicle/RelatedVehicles";

import veiculos from "@/data/veiculos.json";
import { Veiculo } from "@/types/veiculo";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VeiculoPage({
  params,
}: Props) {
  const { id } = await params;

  const lista = veiculos as Veiculo[];

  const veiculo = lista.find(
    (v) => v.id === Number(id)
  );

  if (!veiculo) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="bg-gray-100 py-10">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid gap-10 lg:grid-cols-2">

            <VehicleGallery
              imagens={veiculo.imagens}
            />

            <VehicleInfo
              veiculo={veiculo}
            />

          </div>

          <RelatedVehicles
            atual={veiculo.id}
            veiculos={lista}
          />

        </div>

      </main>

      <Footer />
    </>
  );
}