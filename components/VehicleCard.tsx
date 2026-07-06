type Props = {
  marca: string;
  modelo: string;
  ano: number;
  km: string;
  preco: string;
};

export default function VehicleCard({
  marca,
  modelo,
  ano,
  km,
  preco,
}: Props) {
  return (
    <div className="rounded-2xl bg-white shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="h-56 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Foto do veículo</span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold">
          {marca} {modelo}
        </h3>

        <p className="text-gray-500 mt-2">
          {ano} • {km} km
        </p>

        <p className="text-red-600 text-2xl font-bold mt-4">
          {preco}
        </p>

        <button className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}