type Props = {
  ordenacao: string;
  onChange: (valor: string) => void;
};

export default function EstoqueSort({
  ordenacao,
  onChange,
}: Props) {
  return (
    <div>

      <label
        htmlFor="ordenacao"
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        Ordenar por
      </label>

      <select
        id="ordenacao"
        value={ordenacao}
        onChange={(e) => onChange(e.target.value)}
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
        <option value="relevancia">Relevância</option>
        <option value="menor-preco">Menor preço</option>
        <option value="maior-preco">Maior preço</option>
        <option value="mais-novo">Mais novo</option>
        <option value="mais-antigo">Mais antigo</option>
        <option value="marca">Marca (A-Z)</option>
        <option value="km">Menor quilometragem</option>
      </select>

    </div>
  );
}