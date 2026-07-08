import { MessageCircle } from "lucide-react";

import { CONFIG } from "@/lib/config";
import { formatarPreco } from "@/lib/format";

import { Veiculo } from "@/types/veiculo";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import VehicleSpecs from "./VehicleSpecs";
import VehicleDescription from "./VehicleDescription";

type Props = {
  veiculo: Veiculo;
};

export default function VehicleInfo({
  veiculo,
}: Props) {

  const mensagem = encodeURIComponent(
    `Olá! Tenho interesse no ${veiculo.marca} ${veiculo.modelo} ${veiculo.versao} anunciado no site da Lourdes Veículos.`
  );

  return (
    <div>

      <div className="rounded-lg sm:rounded-xl md:rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-lg">

        <div className="flex gap-2">

          {veiculo.destaque && (
            <Badge>
              ⭐ Destaque
            </Badge>
          )}

          {!veiculo.vendido && (
            <Badge color="green">
              Disponível
            </Badge>
          )}

        </div>

        <h1 className="mt-4 sm:mt-5 md:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">

          {veiculo.marca} {veiculo.modelo}

        </h1>

        <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-500">

          {veiculo.versao}

        </p>

        <div className="mt-6 sm:mt-8 md:mt-10">

          <span className="text-sm sm:text-base text-gray-500">
            Preço
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-600">

            {formatarPreco(veiculo.preco)}

          </h2>

        </div>

        <div className="mt-6 sm:mt-8 md:mt-10">

          <VehicleSpecs veiculo={veiculo} />

        </div>

        <div className="mt-6 sm:mt-8 md:mt-10">

          <a
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
          >

            <Button className="w-full flex justify-center items-center gap-2 text-sm sm:text-base">

              <MessageCircle size={18} className="sm:w-5 sm:h-5" />

              Tenho Interesse

            </Button>

          </a>

        </div>

      </div>

      <VehicleDescription
        descricao={veiculo.descricao}
      />

    </div>
  );
}