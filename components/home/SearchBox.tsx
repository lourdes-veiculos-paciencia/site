type Props = {
  pesquisa: string;
  setPesquisa: (valor: string) => void;
};

export default function SearchBox({
  pesquisa,
  setPesquisa,
}: Props) {
  return (
    <section className="bg-white py-8 sm:py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border p-4 sm:p-6 md:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-center">

            Encontre seu próximo veículo

          </h2>

          <p className="text-sm sm:text-base text-gray-500 text-center mt-2">

            Pesquise por marca, modelo ou versão.

          </p>

          <div className="mt-6 sm:mt-8">

            <input
              type="text"
              placeholder="Ex: Honda, Fiat, Argo..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="
                w-full
                border
                rounded-lg
                px-4
                sm:px-5
                py-3
                sm:py-4
                text-base
                sm:text-lg
                outline-none
                focus:ring-2
                focus:ring-red-600
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
}