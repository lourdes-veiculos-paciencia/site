"use client";

import { useState } from "react";
import { excluirVeiculo } from "@/app/actions/veiculos";

type Props = {
  id: string | number;
  marca: string;
  modelo: string;
};

export default function DeleteVehicleButton({
  id,
  marca,
  modelo,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o ${marca} ${modelo}? Esta ação não pode ser desfeita.`
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      setError(null);
      await excluirVeiculo(String(id));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao excluir veículo"
      );
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isLoading}
        className="w-full rounded-lg bg-red-600 px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Excluindo..." : "🗑 Excluir"}
      </button>

      {error && (
        <p className="text-sm text-red-600 mt-2">
          {error}
        </p>
      )}
    </>
  );
}
