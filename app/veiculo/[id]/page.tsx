import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import VehicleGallery from "@/components/vehicle/VehicleGallery";
import VehicleInfo from "@/components/vehicle/VehicleInfo";
import RelatedVehicles from "@/components/vehicle/RelatedVehicles";

import {
  buscarVeiculoPublico,
  buscarVeiculosPublicos,
} from "@/lib/veiculos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VeiculoPage({
  params,
}: Props) {
  const { id } = await params;

  const [veiculo, lista] = await Promise.all([
    buscarVeiculoPublico(id),
    buscarVeiculosPublicos(),
  ]);

  if (!veiculo) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="bg-zinc-100 py-10">

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
