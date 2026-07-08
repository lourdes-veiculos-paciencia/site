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

          </tr>

        </thead>

        <tbody>

          {veiculos.map((veiculo) => (

            <tr
              key={veiculo.id}
              className="border-t"
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
                R$ {Number(veiculo.preco).toLocaleString("pt-BR")}
              </td>

              <td className="px-6 py-4">

                {veiculo.vendido ? (

                  <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
                    Vendido
                  </span>

                ) : (

                  <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                    Disponível
                  </span>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}