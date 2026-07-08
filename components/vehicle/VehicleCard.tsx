import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";

import { CONFIG } from "@/lib/config";
import { formatarPreco, formatarKm } from "@/lib/format";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type Props = {
  id: string | number;
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
    <article className="overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-md sm:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl">

      {/* Foto */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">

        <Image
          src={imagens[0]}
          alt={`${marca} ${modelo}`}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-cover transition-transform duration-500 hover:scale-110"
        />

        <div className="absolute left-2 sm:left-3 top-2 sm:top-3 flex gap-1 sm:gap-2">

          {destaque && (
            <Badge>
              ⭐ Destaque
            </Badge>
          )}

        </div>

        <div className="absolute right-2 sm:right-3 top-2 sm:top-3">

          {vendido ? (
            <Badge color="red">
              Vendido
            </Badge>
          ) : (
            <Badge color="green">
              Disponível
            </Badge>
          )}

        </div>

      </div>

      {/* Conteúdo */}
      <div className="p-4 sm:p-5 md:p-6 lg:p-8">

        <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900">
          {marca} {modelo}
        </h3>

        <p className="text-sm sm:text-base text-gray-500">
          {versao}
        </p>

        {/* Informações */}
        <div className="mt-4 sm:mt-5 md:mt-6 space-y-2 sm:space-y-3">

          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <Calendar size={16} className="sm:w-5 sm:h-5 text-red-600" />
            {ano}
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <Gauge size={16} className="sm:w-5 sm:h-5 text-red-600" />
            {formatarKm(km)}
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <Fuel size={16} className="sm:w-5 sm:h-5 text-red-600" />
            {combustivel}
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <Star size={16} className="sm:w-5 sm:h-5 text-red-600" />
            {cambio}
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <MapPin size={16} className="sm:w-5 sm:h-5 text-red-600" />
            {cidade}
          </div>

          {!vendido && (
            <div className="flex items-center gap-2 text-sm sm:text-base text-green-600 font-semibold">
              <CheckCircle size={16} className="sm:w-5 sm:h-5" />
              Pronta entrega
            </div>
          )}

        </div>

        {/* Preço */}
        <div className="mt-6 sm:mt-7 md:mt-8">

          <span className="text-xs sm:text-sm text-gray-500">
            Preço
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-extrabold text-red-600 break-words">
            {formatarPreco(preco)}
          </h2>

        </div>

        {/* Botões */}
        <div className="mt-6 sm:mt-7 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">

          <a
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full text-sm sm:text-base">
              WhatsApp
            </Button>
          </a>

          <Link href={`/veiculo/${id}`}>
            <Button
              variant="secondary"
              className="w-full text-sm sm:text-base"
            >
              Detalhes
            </Button>
          </Link>

        </div>

      </div>

    </article>
  );
}