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
      className="group overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-zinc-200/80"
    >
      <div className="relative h-40 overflow-hidden bg-zinc-100 sm:h-52 md:h-60">
        <Image
          src={veiculo.imagens[0]}
          alt={`${veiculo.marca} ${veiculo.modelo}`}
          fill
          priority={false}
          sizes="(max-width:768px) 50vw,25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {veiculo.destaque && <Badge>Destaque</Badge>}

          <Badge color={veiculo.vendido ? "red" : "green"}>
            {veiculo.vendido ? "Vendido" : "Disponivel"}
          </Badge>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="line-clamp-1 text-base font-black text-gray-950 sm:text-lg">
          {veiculo.marca} {veiculo.modelo}
        </h3>

        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
          {veiculo.versao}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-medium text-gray-600">
          <span className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-2">
            <Calendar size={14} className="text-red-600" />
            {veiculo.ano}
          </span>

          <span className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-2">
            <Gauge size={14} className="text-red-600" />
            {veiculo.km.toLocaleString("pt-BR")} km
          </span>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-xl font-black text-red-600 sm:text-2xl">
            {formatarPreco(veiculo.preco)}
          </p>
        </div>
      </div>
    </Link>
  );
}
