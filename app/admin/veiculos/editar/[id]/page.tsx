import { notFound } from "next/navigation";

import EditVehicleForm from "@/components/admin/EditVehicleForm";
import { supabaseServer } from "@/lib/supabase/server";
import veiculos from "@/data/veiculos.json";
import { Veiculo } from "@/types/veiculo";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarVeiculoPage({
  params,
}: Props) {
  const { id } = await params;

  // Tenta buscar do Supabase primeiro (com UUID)
  let veiculo = null;
  
  try {
    const { data, error } = await supabaseServer
      .from("veiculos")
      .select("*")
      .eq("id", id)
      .single();
    
    if (!error && data) {
      veiculo = data;
    }
  } catch (e) {
    // Se falhar, continua para tentar no JSON
  }
  
  // Se não encontrar, tenta no arquivo JSON (com número)
  if (!veiculo) {
    const veiculoId = parseInt(id);
    veiculo = (veiculos as unknown as Veiculo[]).find(v => v.id === veiculoId);
  }

  if (!veiculo) {
    notFound();
  }

  return (
    <>
      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Editar Veículo
        </h1>

        <p className="mt-2 text-gray-500">
          Atualize as informações do veículo.
        </p>

      </div>

      <EditVehicleForm
        veiculo={veiculo}
      />

    </>
  );
}