export default function SearchBox() {
  return (
    <section className="-mt-14 relative z-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🔍 Encontre seu próximo veículo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            <select className="border rounded-lg p-3">
              <option>Marca</option>
            </select>

            <select className="border rounded-lg p-3">
              <option>Modelo</option>
            </select>

            <select className="border rounded-lg p-3">
              <option>Ano</option>
            </select>

            <select className="border rounded-lg p-3">
              <option>Preço</option>
            </select>

            <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold">
              Buscar
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}