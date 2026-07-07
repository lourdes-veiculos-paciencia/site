type Props = {
  pesquisa: string;
  onChange: (valor: string) => void;
};

export default function EstoqueSearch({
  pesquisa,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <label
        htmlFor="pesquisa"
        className="mb-3 block text-sm font-semibold text-gray-700"
      >
        Pesquisar veículo
      </label>

      <input
        id="pesquisa"
        type="text"
        placeholder="Ex.: Honda Civic, Corolla, Argo..."
        value={pesquisa}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          transition
          focus:border-red-600
          focus:ring-2
          focus:ring-red-200
        "
      />

    </div>
  );
}