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
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-red-600 font-semibold uppercase tracking-widest">
            Diferenciais
          </span>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Por que escolher a{" "}
            <span className="text-red-600">
              Lourdes Veículos?
            </span>
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Mais do que vender carros, oferecemos segurança,
            transparência e um atendimento diferenciado.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {itens.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {item.titulo}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {item.descricao}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}