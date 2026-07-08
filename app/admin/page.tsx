import Link from "next/link";

import VehicleTable from "@/components/admin/VehicleTable";
import { buscarVeiculos } from "@/lib/supabase/queries/veiculos";

export default async function AdminPage() {
  const veiculos = await buscarVeiculos();

  return (
    <>
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Veículos
          </h1>

          <p className="mt-2 text-gray-500">
            Gerencie os veículos cadastrados.
          </p>

        </div>

        <Link
          href="/admin/veiculos/novo"
          className="
            rounded-xl
            bg-red-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-700
          "
        >
          + Novo veículo
        </Link>

      </div>

      <div className="mt-10">

        <VehicleTable veiculos={veiculos} />

      </div>

    </>
  );
}