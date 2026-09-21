import type { Veiculo } from "@/types/veiculo";
import { contarMarcas, normalizarMarca, type FiltrosEstoque } from "@/lib/filtros-estoque";
import { Search, SlidersHorizontal } from "lucide-react";

type Props = { veiculos: Veiculo[]; filtros: FiltrosEstoque; erro: string | null; onChange: (f: FiltrosEstoque) => void; onSubmit: () => void; onReset: () => void };
const campo = "mt-2 w-full min-w-0 rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100";

export default function EstoqueSidebar({ veiculos, filtros, erro, onChange, onSubmit, onReset }: Props) {
  const modelos = [...new Set(veiculos.filter(v => !filtros.marcas.length || filtros.marcas.includes(normalizarMarca(v.marca))).map(v => v.modelo).filter(Boolean))].sort();
  const anos = [...new Set(veiculos.map(v => v.ano).filter(ano => Number.isFinite(ano) && ano > 0))].sort((a,b) => b-a);
  return <aside aria-label="Filtros do estoque" className="self-start overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
    <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-5 py-4"><SlidersHorizontal size={17} className="text-red-600" /><h2 className="text-sm font-bold uppercase tracking-wider">Filtros</h2></div>
    <form className="space-y-5 p-5" onSubmit={event => { event.preventDefault(); onSubmit(); }}>
      <label className="block text-sm font-semibold">Pesquisar<input className={campo} placeholder="Modelo, versão ou ano" value={filtros.pesquisa} onChange={e => onChange({ ...filtros, pesquisa: e.target.value })} /></label>
      <details open className="border-y border-zinc-100 py-3">
        <summary className="cursor-pointer text-sm font-bold uppercase tracking-wider text-zinc-700">Marcas</summary>
        <p className="mt-2 text-xs leading-5 text-zinc-500">Quantidades na categoria selecionada. Selecione uma ou mais marcas.</p>
        <div className="mt-3 max-h-80 overflow-y-auto pr-1">
          {contarMarcas(veiculos).map(([marca, quantidade]) => <label key={marca} className="flex cursor-pointer items-center gap-2 border-b border-zinc-100 py-2 text-xs text-zinc-600 last:border-0 hover:text-red-700">
            <input type="checkbox" className="h-4 w-4 shrink-0 accent-red-600" checked={filtros.marcas.includes(marca)} onChange={e => onChange({ ...filtros, modelo: "", marcas: e.target.checked ? [...filtros.marcas, marca] : filtros.marcas.filter(m => m !== marca) })} />
            <span className="flex-1">{marca}</span><span className="min-w-6 rounded-full bg-red-600 px-1.5 py-0.5 text-center text-xs font-bold text-white">{quantidade}</span>
          </label>)}
        </div>
      </details>
      <label className="block text-sm font-semibold">Modelo<select className={campo} value={filtros.modelo} onChange={e => onChange({ ...filtros, modelo: e.target.value })}><option value="">Todos os modelos</option>{modelos.map(m => <option key={m}>{m}</option>)}</select></label>
      <fieldset><legend className="text-sm font-semibold">Ano</legend><div className="grid grid-cols-2 gap-2">{([ ["anoDe", "Ano de"], ["anoAte", "Ano até"] ] as const).map(([key, label]) => <select key={key} aria-label={label} className={campo} value={filtros[key]} onChange={e => onChange({ ...filtros, [key]: e.target.value })}><option value="">{label}</option>{anos.map(ano => <option key={ano}>{ano}</option>)}</select>)}</div></fieldset>
      <fieldset><legend className="text-sm font-semibold">Preço (R$)</legend><div className="grid grid-cols-2 gap-2">{([ ["precoDe", "Mínimo"], ["precoAte", "Máximo"] ] as const).map(([key, label]) => <input key={key} aria-label={`Preço ${label}`} type="number" min="0" step="0.01" inputMode="decimal" placeholder={label} className={campo} value={filtros[key]} onChange={e => onChange({ ...filtros, [key]: e.target.value })} />)}</div></fieldset>
      {([ ["combustivel", "Combustível"], ["cambio", "Câmbio"] ] as const).map(([key, label]) => <label key={key} className="block text-sm font-semibold">{label}<select className={campo} value={filtros[key]} onChange={e => onChange({ ...filtros, [key]: e.target.value })}><option value="">Todos</option>{[...new Set(veiculos.map(v => v[key]).filter(Boolean))].sort().map(v => <option key={v}>{v}</option>)}</select></label>)}
      {erro && <p role="alert" className="text-sm text-red-700">{erro}</p>}
      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-bold uppercase text-white hover:bg-red-700"><Search size={17} />Localizar</button>
      <button type="button" onClick={onReset} className="w-full text-sm font-medium text-zinc-500 hover:text-red-600">Limpar filtros</button>
    </form>
  </aside>;
}
