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

      <div className="rounded-2xl bg-white p-8 shadow-lg">

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

        <h1 className="mt-5 text-4xl font-bold">

          {veiculo.marca} {veiculo.modelo}

        </h1>

        <p className="mt-2 text-xl text-gray-500">

          {veiculo.versao}

        </p>

        <div className="mt-8">

          <span className="text-gray-500">
            Preço
          </span>

          <h2 className="text-5xl font-extrabold text-red-600">

            {formatarPreco(veiculo.preco)}

          </h2>

        </div>

        <div className="mt-10">

          <VehicleSpecs veiculo={veiculo} />

        </div>

        <div className="mt-10">

          <a
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
          >

            <Button className="w-full flex justify-center items-center gap-2">

              <MessageCircle size={20} />

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