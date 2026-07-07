import Image from "next/image";
import Link from "next/link";

import Badge from "@/components/ui/Badge";
import { formatarPreco } from "@/lib/format";
import { Veiculo } from "@/types/veiculo";

type Props = {
  veiculo: Veiculo;
};

export default function FeaturedVehicleCard({
  veiculo,
}: Props) {
  return (
    <Link
      href={`/veiculo/${veiculo.id}`}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* FOTO */}
      <div
        className="
          relative
          h-44
          sm:h-52
          md:h-60
          lg:h-64
          overflow-hidden
          bg-gray-100
        "
      >
        <Image
          src={veiculo.imagens[0]}
          alt={`${veiculo.marca} ${veiculo.modelo}`}
          fill
          priority={false}
          sizes="(max-width:768px) 50vw,25vw"
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {veiculo.destaque && (
            <Badge>
              ⭐ Destaque
            </Badge>
          )}

          <Badge color={veiculo.vendido ? "red" : "green"}>
            {veiculo.vendido ? "Disponível" : "Disponível"}
          </Badge>
        </div>
      </div>

      {/* DADOS */}
      <div className="p-4">

        <h3 className="text-center text-lg font-bold text-gray-900 line-clamp-1">
          {veiculo.marca} {veiculo.modelo}
        </h3>

        <p className="mt-1 text-center text-sm text-gray-500 line-clamp-1">
          {veiculo.versao}
        </p>

        <div className="mt-4 border-t border-gray-100 pt-4">

          <p className="text-center text-2xl font-extrabold text-red-600">
            {formatarPreco(veiculo.preco)}
          </p>

        </div>

      </div>
    </Link>
  );
}