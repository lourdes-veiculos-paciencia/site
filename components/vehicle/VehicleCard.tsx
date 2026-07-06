import Image from "next/image";
import { formatarPreco, formatarKm } from "@/lib/format";

type Props = {
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  km: number;
  preco: number;
  imagens: string[];
  combustivel: string;
  cambio: string;
};

export default function VehicleCard({
  marca,
  modelo,
  versao,
  ano,
  km,
  preco,
  imagens,
  combustivel,
  cambio,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative h-56">
        <Image
          src={imagens[0]}
          alt={`${marca} ${modelo}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-5">

        <h3 className="text-2xl font-bold">
          {marca} {modelo}
        </h3>

        <p className="text-gray-500">
          {versao}
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">

          <span>📅 {ano}</span>

          <span>🛣 {formatarKm(km)}</span>

          <span>⛽ {combustivel}</span>

          <span>⚙ {cambio}</span>

        </div>

        <p className="text-red-600 text-3xl font-bold mt-6">
          {formatarPreco(preco)}
        </p>

        <button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition">
          Ver Detalhes
        </button>

      </div>

    </div>
  );
}