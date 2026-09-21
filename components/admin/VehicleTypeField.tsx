import type { TipoVeiculo } from "@/lib/tipo-veiculo";

export default function VehicleTypeField({ tipo, required = false }: { tipo?: TipoVeiculo | null; required?: boolean }) {
  return <div>
    <label htmlFor="tipo" className="mb-2 block text-sm font-semibold text-gray-700">Tipo de veículo</label>
    <select id="tipo" name="tipo" defaultValue={tipo ?? ""} required={required} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-600">
      <option value="">{required ? "Selecione..." : "Não classificado"}</option>
      <option value="carro">Carro</option>
      <option value="moto">Moto</option>
    </select>
  </div>;
}
