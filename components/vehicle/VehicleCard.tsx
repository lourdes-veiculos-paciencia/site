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
    <article className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Foto */}
      <div className="relative h-64 overflow-hidden">

        <Image
          src={imagens[0]}
          alt={`${marca} ${modelo}`}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-cover transition-transform duration-500 hover:scale-110"
        />

        <div className="absolute left-3 top-3 flex gap-2">

          {destaque && (
            <Badge>
              ⭐ Destaque
            </Badge>
          )}

        </div>

        <div className="absolute right-3 top-3">

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
      <div className="p-6">

        <h3 className="text-2xl font-bold text-gray-900">
          {marca} {modelo}
        </h3>

        <p className="text-gray-500">
          {versao}
        </p>

        {/* Informações */}
        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={18} className="text-red-600" />
            {ano}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Gauge size={18} className="text-red-600" />
            {formatarKm(km)}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Fuel size={18} className="text-red-600" />
            {combustivel}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Star size={18} className="text-red-600" />
            {cambio}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={18} className="text-red-600" />
            {cidade}
          </div>

          {!vendido && (
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <CheckCircle size={18} />
              Pronta entrega
            </div>
          )}

        </div>

        {/* Preço */}
        <div className="mt-8">

          <span className="text-gray-500 text-sm">
            Preço
          </span>

          <h2 className="text-4xl font-extrabold text-red-600">
            {formatarPreco(preco)}
          </h2>

        </div>

        {/* Botões */}
        <div className="mt-8 grid grid-cols-2 gap-3">

          <a
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full">
              WhatsApp
            </Button>
          </a>

          <Link href={`/veiculo/${id}`}>
            <Button
              variant="secondary"
              className="w-full"
            >
              Detalhes
            </Button>
          </Link>

        </div>

      </div>

    </article>
  );
}