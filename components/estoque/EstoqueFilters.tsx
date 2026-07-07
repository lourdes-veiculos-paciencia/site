import { Veiculo } from "@/types/veiculo";

type Props = {
  veiculos: Veiculo[];

  marca: string;
  combustivel: string;
  cambio: string;

  onMarcaChange: (valor: string) => void;
  onCombustivelChange: (valor: string) => void;
  onCambioChange: (valor: string) => void;
};

export default function EstoqueFilters({
  veiculos,
  marca,
  combustivel,
  cambio,
  onMarcaChange,
  onCombustivelChange,
  onCambioChange,
}: Props) {

  const marcas = [...new Set(veiculos.map(v => v.marca))]
    .sort();

  const combustiveis = [...new Set(veiculos.map(v => v.combustivel))]
    .sort();

  const cambios = [...new Set(veiculos.map(v => v.cambio))]
    .sort();

  return (
    <div className="grid gap-4 md:grid-cols-3">

      {/* Marca */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Marca
        </label>

        <select
          value={marca}
          onChange={(e) => onMarcaChange(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-red-600
            focus:ring-2
            focus:ring-red-200
          "
        >

          <option value="">
            Todas
          </option>

          {marcas.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

      {/* Combustível */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Combustível
        </label>

        <select
          value={combustivel}
          onChange={(e) => onCombustivelChange(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-red-600
            focus:ring-2
            focus:ring-red-200
          "
        >

          <option value="">
            Todos
          </option>

          {combustiveis.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

      {/* Câmbio */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Câmbio
        </label>

        <select
          value={cambio}
          onChange={(e) => onCambioChange(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-red-600
            focus:ring-2
            focus:ring-red-200
          "
        >

          <option value="">
            Todos
          </option>

          {cambios.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

    </div>
  );
}