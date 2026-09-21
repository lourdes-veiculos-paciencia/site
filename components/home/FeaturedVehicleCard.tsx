import Image from "next/image";
import Link from "next/link";
import { Calendar, Gauge } from "lucide-react";

import Badge from "@/components/ui/Badge";
import { formatarPreco } from "@/lib/format";
import { Veiculo } from "@/types/veiculo";

type Props = {
  veiculo: Veiculo;
};

export default function FeaturedVehicleCard({ veiculo }: Props) {
  return (
    <Link
      href={`/veiculo/${veiculo.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-zinc-200/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={veiculo.imagens[0]}
          alt={`${veiculo.marca} ${veiculo.modelo}`}
          fill
          priority={false}
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {veiculo.destaque && <Badge>Destaque</Badge>}

          <Badge color={veiculo.vendido ? "red" : "green"}>
            {veiculo.vendido ? "Vendido" : "Disponível"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 tracking-tight text-zinc-950">
          {veiculo.marca} {veiculo.modelo}
        </h3>

        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
          {veiculo.versao}
        </p>

        <div className="mb-4 mt-4 grid grid-cols-2 gap-2 text-xs font-medium text-gray-600">
          <span className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-2">
            <Calendar size={14} className="text-red-600" />
            {veiculo.ano}
          </span>

          <span className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-2">
            <Gauge size={14} className="text-red-600" />
            {veiculo.km.toLocaleString("pt-BR")} km
          </span>
        </div>

        <div className="mt-auto border-t border-gray-100 pt-4">
          <p className="text-xl font-black text-red-600 sm:text-2xl">
            {formatarPreco(veiculo.preco)}
          </p>
          <span className="mt-3 inline-flex text-sm font-semibold text-zinc-600 transition group-hover:text-red-600">Conhecer veículo →</span>
        </div>
      </div>
    </Link>
  );
}
