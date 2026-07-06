import {
  Calendar,
  Fuel,
  Gauge,
  Cog,
  MapPin,
  Palette,
  Car,
  DoorOpen,
} from "lucide-react";

import { formatarKm } from "@/lib/format";
import { Veiculo } from "@/types/veiculo";

type Props = {
  veiculo: Veiculo;
};

export default function VehicleSpecs({ veiculo }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <Spec
        icon={<Calendar size={20} />}
        titulo="Ano"
        valor={String(veiculo.ano)}
      />

      <Spec
        icon={<Gauge size={20} />}
        titulo="KM"
        valor={formatarKm(veiculo.km)}
      />

      <Spec
        icon={<Fuel size={20} />}
        titulo="Combustível"
        valor={veiculo.combustivel}
      />

      <Spec
        icon={<Cog size={20} />}
        titulo="Câmbio"
        valor={veiculo.cambio}
      />

      <Spec
        icon={<Car size={20} />}
        titulo="Motor"
        valor={veiculo.motor}
      />

      <Spec
        icon={<DoorOpen size={20} />}
        titulo="Portas"
        valor={String(veiculo.portas)}
      />

      <Spec
        icon={<Palette size={20} />}
        titulo="Cor"
        valor={veiculo.cor}
      />

      <Spec
        icon={<MapPin size={20} />}
        titulo="Cidade"
        valor={veiculo.cidade}
      />

    </div>
  );
}

type SpecProps = {
  icon: React.ReactNode;
  titulo: string;
  valor: string;
};

function Spec({
  icon,
  titulo,
  valor,
}: SpecProps) {
  return (
    <div className="rounded-xl border bg-gray-50 p-4">

      <div className="flex items-center gap-2 text-red-600">

        {icon}

        <span className="text-sm font-semibold">
          {titulo}
        </span>

      </div>

      <p className="mt-2 font-bold text-gray-800">
        {valor}
      </p>

    </div>
  );
}