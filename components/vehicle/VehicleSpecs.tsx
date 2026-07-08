import {
  Calendar,
  Car,
  Cog,
  DoorOpen,
  Fuel,
  Gauge,
  MapPin,
  Palette,
} from "lucide-react";

import { formatarKm } from "@/lib/format";
import { Veiculo } from "@/types/veiculo";

type Props = {
  veiculo: Veiculo;
};

export default function VehicleSpecs({ veiculo }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Spec icon={<Calendar size={18} />} titulo="Ano" valor={String(veiculo.ano)} />
      <Spec icon={<Gauge size={18} />} titulo="KM" valor={formatarKm(veiculo.km)} />
      <Spec icon={<Fuel size={18} />} titulo="Combustivel" valor={veiculo.combustivel} />
      <Spec icon={<Cog size={18} />} titulo="Cambio" valor={veiculo.cambio} />
      <Spec icon={<Car size={18} />} titulo="Motor" valor={veiculo.motor} />
      <Spec icon={<DoorOpen size={18} />} titulo="Portas" valor={String(veiculo.portas)} />
      <Spec icon={<Palette size={18} />} titulo="Cor" valor={veiculo.cor} />
      <Spec icon={<MapPin size={18} />} titulo="Cidade" valor={veiculo.cidade} />
    </div>
  );
}

type SpecProps = {
  icon: React.ReactNode;
  titulo: string;
  valor: string;
};

function Spec({ icon, titulo, valor }: SpecProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
      <div className="flex items-center gap-2 text-red-600">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wide">
          {titulo}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-black text-zinc-900 sm:text-base">
        {valor || "-"}
      </p>
    </div>
  );
}
