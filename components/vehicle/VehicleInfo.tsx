import { MessageCircle } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import WhatsAppModal from "@/components/WhatsAppModal";
import { formatarKm, formatarPreco } from "@/lib/format";
import { Veiculo } from "@/types/veiculo";
import VehicleDescription from "./VehicleDescription";
import VehicleSpecs from "./VehicleSpecs";

type Props = {
  veiculo: Veiculo;
};

export default function VehicleInfo({ veiculo }: Props) {
  const mensagem = `Olá!

Tenho interesse no seguinte veículo:

🚗 ${veiculo.marca} ${veiculo.modelo}
📋 ${veiculo.versao}

📅 Ano: ${veiculo.ano}
⛽ Combustível: ${veiculo.combustivel}
⚙️ Câmbio: ${veiculo.cambio}
🚘 Quilometragem: ${formatarKm(veiculo.km)}
📍 Cidade: ${veiculo.cidade || "Consulte a loja"}

💰 Preço: ${formatarPreco(veiculo.preco)}

Gostaria de saber se o veículo ainda está disponível e se é possível agendar uma visita ou um test drive.`;

  return (
    <div>
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
        <div className="flex flex-wrap gap-2">
          {veiculo.destaque && <Badge>Destaque</Badge>}

          {!veiculo.vendido && (
            <Badge color="green">
              Disponível
            </Badge>
          )}
        </div>

        <h1 className="mt-5 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl md:text-5xl">
          {veiculo.marca} {veiculo.modelo}
        </h1>

        <p className="mt-3 text-base leading-7 text-zinc-500 sm:text-lg">
          {veiculo.versao}
        </p>

        <div className="mt-8 rounded-lg bg-zinc-950 p-5 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Preço
          </span>

          <h2 className="mt-2 text-3xl font-black text-white sm:text-5xl">
            {formatarPreco(veiculo.preco)}
          </h2>
        </div>

        <div className="mt-8">
          <VehicleSpecs veiculo={veiculo} />
        </div>

        <div className="mt-8">
          <WhatsAppModal mensagem={mensagem}>
            <Button className="w-full gap-2 py-4 text-base">
              <MessageCircle size={19} />
              Tenho interesse
            </Button>
          </WhatsAppModal>
        </div>
      </div>

      <VehicleDescription descricao={veiculo.descricao} />
    </div>
  );
}
