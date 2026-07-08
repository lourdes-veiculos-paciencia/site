export default function WhyChoose() {
  const itens = [
    {
      icon: "🛡️",
      titulo: "Procedência Garantida",
      descricao:
        "Todos os nossos veículos passam por uma rigorosa avaliação antes da venda.",
    },
    {
      icon: "💳",
      titulo: "Financiamento Facilitado",
      descricao:
        "Parcelamos com as melhores taxas e aprovação rápida.",
    },
    {
      icon: "🔧",
      titulo: "Veículos Revisados",
      descricao:
        "Carros revisados, vistoriados e prontos para rodar.",
    },
    {
      icon: "🤝",
      titulo: "Atendimento Especializado",
      descricao:
        "Nossa equipe ajuda você a encontrar o veículo ideal.",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center">

          <span className="text-sm sm:text-base text-red-600 font-semibold uppercase tracking-widest">
            Diferenciais
          </span>

          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Por que escolher a{" "}
            <span className="text-red-600">
              Lourdes Veículos?
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            Mais do que vender carros, oferecemos segurança,
            transparência e um atendimento diferenciado.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-14">

          {itens.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-lg sm:hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full bg-red-100 flex items-center justify-center text-2xl sm:text-2xl md:text-3xl">
                {item.icon}
              </div>

              <h3 className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl font-bold text-gray-900">
                {item.titulo}
              </h3>

              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
                {item.descricao}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}