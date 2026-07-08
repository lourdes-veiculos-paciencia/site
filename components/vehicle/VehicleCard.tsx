import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CheckCircle,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Settings,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CONFIG } from "@/lib/config";
import { formatarKm, formatarPreco } from "@/lib/format";

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
    `Ola! Tenho interesse no ${marca} ${modelo} ${versao} que vi no site da Lourdes Veiculos.`
  );

  const specs = [
    { icon: Calendar, label: ano },
    { icon: Gauge, label: formatarKm(km) },
    { icon: Fuel, label: combustivel },
    { icon: Settings, label: cambio },
  ];

  return (
    <article className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-zinc-200/80">
      <div className="relative h-52 overflow-hidden bg-zinc-100 sm:h-60 lg:h-64">
        <Image
          src={imagens[0]}
          alt={`${marca} ${modelo}`}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <div className="flex flex-wrap gap-2">
            {destaque && <Badge>Destaque</Badge>}
          </div>

          <Badge color={vendido ? "red" : "green"}>
            {vendido ? "Vendido" : "Disponivel"}
          </Badge>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="min-h-[76px]">
          <h3 className="line-clamp-1 text-xl font-black text-zinc-950">
            {marca} {modelo}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-500">
            {versao}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {specs.map((spec) => {
            const Icon = spec.icon;

            return (
              <div
                key={String(spec.label)}
                className="flex min-h-10 items-center gap-2 rounded-md bg-zinc-100 px-3 text-xs font-semibold text-zinc-700"
              >
                <Icon size={15} className="shrink-0 text-red-600" />
                <span className="truncate">{spec.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-zinc-600">
          <MapPin size={16} className="text-red-600" />
          {cidade || "Consulte a loja"}
        </div>

        {!vendido && (
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <CheckCircle size={16} />
            Pronta entrega
          </div>
        )}

        <div className="mt-5 border-t border-zinc-100 pt-5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Preco
          </span>

          <h2 className="mt-1 text-2xl font-black text-red-600">
            {formatarPreco(preco)}
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <a
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full gap-2 text-sm">
              <MessageCircle size={17} />
              WhatsApp
            </Button>
          </a>

          <Link href={`/veiculo/${id}`}>
            <Button variant="secondary" className="w-full text-sm">
              Detalhes
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
