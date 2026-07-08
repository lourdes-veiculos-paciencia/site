import Link from "next/link";

type Props = {
  veiculos: any[];
};

export default function VehicleTable({
  veiculos,
}: Props) {
  if (veiculos.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow">
        <p className="text-gray-500">
          Nenhum veículo cadastrado.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Marca
            </th>

            <th className="px-6 py-4 text-left">
              Modelo
            </th>

            <th className="px-6 py-4 text-left">
              Ano
            </th>

            <th className="px-6 py-4 text-left">
              Preço
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-center">
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

              <td className="px-6 py-4">
                {veiculo.marca}
              </td>

              <td className="px-6 py-4">
                {veiculo.modelo}
              </td>

              <td className="px-6 py-4">
                {veiculo.ano}
              </td>

              <td className="px-6 py-4">
                {Number(veiculo.preco).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td className="px-6 py-4">

                {veiculo.vendido ? (

                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                    Vendido
                  </span>

                ) : (

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Disponível
                  </span>

                )}

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <Link
                    href={`/admin/veiculos/editar/${veiculo.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    ✏️ Editar
                  </Link>

                  <button
                    type="button"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    🗑 Excluir
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}