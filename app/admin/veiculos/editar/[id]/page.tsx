import { notFound } from "next/navigation";

import EditVehicleForm from "@/components/admin/EditVehicleForm";
import { buscarVeiculo } from "@/lib/supabase/queries/veiculos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarVeiculoPage({
  params,
}: Props) {
  const { id } = await params;

  const veiculo = await buscarVeiculo(id);

  if (!veiculo) {
    notFound();
  }

  return (
    <>
      <div className="mb-6 sm:mb-8 md:mb-10">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Editar Veículo
        </h1>

        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">
          Atualize as informações do veículo.
        </p>

      </div>

      <EditVehicleForm
        veiculo={veiculo}
      />

    </>
  );
}