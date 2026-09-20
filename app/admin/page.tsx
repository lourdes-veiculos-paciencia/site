import Link from "next/link";

import VehicleTable from "@/components/admin/VehicleTable";
import { buscarVeiculos } from "@/lib/supabase/queries/veiculos";
import veiculosJSON from "@/data/veiculos.json";
import { Veiculo } from "@/types/veiculo";

export default async function AdminPage() {
  // Tenta buscar do Supabase primeiro
  let veiculos = await buscarVeiculos();
  
  // Se não houver dados no Supabase, usa o JSON
  if (veiculos.length === 0) {
    veiculos = veiculosJSON as Veiculo[];
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">

        <div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Veículos
          </h1>

          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">
            Gerencie os veículos cadastrados.
          </p>

        </div>

        <Link
          href="/admin/veiculos/novo"
          className="
            w-full
            sm:w-auto
            rounded-lg
            sm:rounded-xl
            bg-red-600
            px-4
            sm:px-6
            py-2
            sm:py-3
            text-sm
            sm:text-base
            font-semibold
            text-white
            transition
            hover:bg-red-700
            text-center
          "
        >
          + Novo veículo
        </Link>

      </div>

      <div className="mt-6 sm:mt-8 md:mt-10">

        <VehicleTable veiculos={veiculos} />

      </div>

    </>
  );
}