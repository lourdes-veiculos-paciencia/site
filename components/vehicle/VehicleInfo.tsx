import { MessageCircle } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CONFIG } from "@/lib/config";
import { formatarPreco } from "@/lib/format";
import { Veiculo } from "@/types/veiculo";
import VehicleDescription from "./VehicleDescription";
import VehicleSpecs from "./VehicleSpecs";

type Props = {
  veiculo: Veiculo;
};

export default function VehicleInfo({ veiculo }: Props) {
  const mensagem = encodeURIComponent(
    `Ola! Tenho interesse no ${veiculo.marca} ${veiculo.modelo} ${veiculo.versao} anunciado no site da Lourdes Veiculos.`
  );

  return (
    <div>
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
        <div className="flex flex-wrap gap-2">
          {veiculo.destaque && <Badge>Destaque</Badge>}

          {!veiculo.vendido && <Badge color="green">Disponivel</Badge>}
        </div>

        <h1 className="mt-5 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl md:text-5xl">
          {veiculo.marca} {veiculo.modelo}
        </h1>

        <p className="mt-3 text-base leading-7 text-zinc-500 sm:text-lg">
          {veiculo.versao}
        </p>

        <div className="mt-8 rounded-lg bg-zinc-950 p-5 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Preco
          </span>

          <h2 className="mt-2 text-3xl font-black text-white sm:text-5xl">
            {formatarPreco(veiculo.preco)}
          </h2>
        </div>

        <div className="mt-8">
          <VehicleSpecs veiculo={veiculo} />
        </div>

        <div className="mt-8">
          <a
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full gap-2 py-4 text-base">
              <MessageCircle size={19} />
              Tenho interesse
            </Button>
          </a>
        </div>
      </div>

      <VehicleDescription descricao={veiculo.descricao} />
    </div>
  );
}
