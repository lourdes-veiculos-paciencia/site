type Props = {
  descricao: string;
};

export default function VehicleDescription({
  descricao,
}: Props) {
  return (
    <section className="mt-10">

      <h2 className="text-2xl font-bold text-gray-900">
        Descrição
      </h2>

      <div className="mt-5 rounded-2xl border bg-gray-50 p-6">

        <p className="leading-8 text-gray-700 whitespace-pre-line">
          {descricao}
        </p>

      </div>

    </section>
  );
}