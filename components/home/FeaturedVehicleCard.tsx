import Image from "next/image";
import Link from "next/link";

import Badge from "@/components/ui/Badge";
import { formatarPreco } from "@/lib/format";

import { Veiculo } from "@/types/veiculo";

export default function FeaturedVehicleCard({
  id,
  marca,
  modelo,
  versao,
  preco,
  imagens,
  destaque,
  vendido,
}: Veiculo) {
  return (
    <Link
      href={`/veiculo/${id}`}
      className="group overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Foto */}
      <div className="relative aspect-[4/3] overflow-hidden">

        <Image
          src={imagens[0]}
          alt={`${marca} ${modelo}`}
          fill
          sizes="(max-width:768px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3">

          {destaque && (
            <Badge>
              ⭐ Destaque
            </Badge>
          )}

        </div>

        <div className="absolute right-3 top-3">

          <Badge color={vendido ? "red" : "green"}>
            {vendido ? "Vendido" : "Disponível"}
          </Badge>

        </div>

      </div>

      {/* Informações */}
      <div className="p-4">

        <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
          {marca} {modelo}
        </h3>

        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
          {versao}
        </p>

        <div className="mt-4 border-t pt-4">

          <p className="text-2xl font-bold text-red-600">
            {formatarPreco(preco)}
          </p>

        </div>

      </div>

    </Link>
  );
}