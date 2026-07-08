import Link from "next/link";
import DeleteVehicleButton from "./DeleteVehicleButton";
import { Veiculo } from "@/types/veiculo";

type Props = {
  veiculos: Veiculo[];
};

export default function VehicleTable({
  veiculos,
}: Props) {
  if (veiculos.length === 0) {
    return (
      <div className="rounded-lg sm:rounded-2xl bg-white p-4 sm:p-8 shadow">
        <p className="text-sm sm:text-base text-gray-500">
          Nenhum veículo cadastrado.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg sm:rounded-2xl bg-white shadow">

      <table className="w-full min-w-max sm:min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-base">
              Marca
            </th>

            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-base">
              Modelo
            </th>

            <th className="hidden sm:table-cell px-6 py-4 text-left">
              Ano
            </th>

            <th className="hidden md:table-cell px-6 py-4 text-left">
              Preço
            </th>

            <th className="hidden lg:table-cell px-6 py-4 text-left">
              Status
            </th>

            <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-base">
              Ações
            </th>

          </tr>

        </thead>

        <tbody>

          {veiculos.map((veiculo) => (

            <tr
              key={veiculo.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">
                {veiculo.marca}
              </td>

              <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">
                {veiculo.modelo}
              </td>

              <td className="hidden sm:table-cell px-6 py-4">
                {veiculo.ano}
              </td>

              <td className="hidden md:table-cell px-6 py-4">
                {Number(veiculo.preco).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td className="hidden lg:table-cell px-6 py-4">

                {veiculo.vendido ? (

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs sm:text-sm text-red-700">
                    Vendido
                  </span>

                ) : (

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs sm:text-sm text-green-700">
                    Disponível
                  </span>

                )}

              </td>

              <td className="px-3 sm:px-6 py-3 sm:py-4">

                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">

                  <Link
                    href={`/admin/veiculos/editar/${veiculo.id}`}
                    className="rounded-lg bg-blue-600 px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    ✏️ Editar
                  </Link>

                  <div className="w-full sm:w-auto">
                    <DeleteVehicleButton
                      id={veiculo.id}
                      marca={veiculo.marca}
                      modelo={veiculo.modelo}
                    />
                  </div>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
