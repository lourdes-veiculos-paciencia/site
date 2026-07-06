export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-28">

        <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-semibold">
          Lourdes Veículos
        </span>

        <h2 className="mt-8 text-6xl font-bold leading-tight">
          Encontre o carro
          <br />
          ideal para você.
        </h2>

        <p className="mt-8 max-w-2xl text-xl text-gray-300">
          Trabalhamos com veículos revisados,
          procedência garantida e as melhores
          condições de financiamento.
        </p>

        <button className="mt-10 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold transition">
          Ver Estoque
        </button>

      </div>
    </section>
  );
}