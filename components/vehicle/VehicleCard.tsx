import Image from "next/image";
import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { formatarPreco, formatarKm } from "@/lib/format";

type Props = {
  id: number;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  km: number;
  preco: number;
  imagens: string[];
  combustivel: string;
  cambio: string;
  cidade: string;
  destaque: boolean;
  vendido: boolean;
};

export default function VehicleCard({
  id,
  marca,
  modelo,
  versao,
  ano,
  km,
  preco,
  imagens,
  combustivel,
  cambio,
  cidade,
  destaque,
  vendido,
}: Props) {
  const mensagem = encodeURIComponent(
    `Olá! Tenho interesse no ${marca} ${modelo} ${versao} que vi no site da Lourdes Veículos.`
  );

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="relative h-64 overflow-hidden">

        <Image
          src={imagens[0]}
          alt={`${marca} ${modelo}`}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-cover transition duration-500 hover:scale-110"
        />

        {destaque && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            ⭐ Destaque
          </span>
        )}

        {vendido ? (
          <span className="absolute right-3 top-3 rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
            Vendido
          </span>
        ) : (
          <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
            Disponível
          </span>
        )}
      </div>

      <div className="p-6">

        <h3 className="text-2xl font-bold">
          {marca} {modelo}
        </h3>

        <p className="text-gray-500">
          {versao}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-600">

          <span>📅 {ano}</span>

          <span>🛣 {formatarKm(km)}</span>

          <span>⚙ {cambio}</span>

          <span>⛽ {combustivel}</span>

          <span>📍 {cidade}</span>

        </div>

        <p className="mt-6 text-3xl font-extrabold text-red-600">
          {formatarPreco(preco)}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">

          <a
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green-600 py-3 text-center font-bold text-white transition hover:bg-green-700"
          >
            WhatsApp
          </a>

          <Link
            href={`/veiculo/${id}`}
            className="rounded-xl bg-red-600 py-3 text-center font-bold text-white transition hover:bg-red-700"
          >
            Detalhes
          </Link>

        </div>

      </div>

    </div>
  );
}