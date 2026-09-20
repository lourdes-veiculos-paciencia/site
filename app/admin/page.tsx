import Link from "next/link";

import VehicleTable from "@/components/admin/VehicleTable";
import { buscarVeiculos } from "@/lib/supabase/queries/veiculos";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const veiculos = await buscarVeiculos();
  const { aviso } = await searchParams;

  return (
    <>
      {aviso === "storage" && (
        <p role="alert" className="mb-4 rounded-lg bg-amber-50 p-4 text-amber-900">
          A alteração do veículo foi salva, mas algumas fotos não puderam ser removidas do Storage. Confira as permissões do bucket veiculos e remova os arquivos pendentes no Supabase.
        </p>
      )}
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
