import type { Veiculo } from "@/types/veiculo";
export type FiltrosEstoque = { pesquisa: string; marcas: string[]; modelo: string; combustivel: string; cambio: string; anoDe: string; anoAte: string; precoDe: string; precoAte: string };
export const filtrosVazios: FiltrosEstoque = { pesquisa: "", marcas: [], modelo: "", combustivel: "", cambio: "", anoDe: "", anoAte: "", precoDe: "", precoAte: "" };
export const normalizarMarca = (valor: string) => valor.trim().toLocaleUpperCase("pt-BR");
const texto = (valor: string) => valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
export function contarMarcas(veiculos: Veiculo[]) {
  const contagem = new Map<string, number>();
  for (const v of veiculos) { const marca = normalizarMarca(v.marca); if (marca) contagem.set(marca, (contagem.get(marca) ?? 0) + 1); }
  return [...contagem].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
}
export function erroFiltros(f: FiltrosEstoque) {
  for (const campo of ["anoDe", "anoAte", "precoDe", "precoAte"] as const) if (f[campo] && (!Number.isFinite(Number(f[campo])) || Number(f[campo]) < 0)) return "Informe valores válidos para ano e preço.";
  if (f.anoDe && f.anoAte && Number(f.anoDe) > Number(f.anoAte)) return "O ano inicial deve ser menor ou igual ao final.";
  if (f.precoDe && f.precoAte && Number(f.precoDe) > Number(f.precoAte)) return "O preço mínimo deve ser menor ou igual ao máximo.";
  return null;
}
export function aplicarFiltros(veiculos: Veiculo[], f: FiltrosEstoque) {
  return veiculos.filter(v => (!f.pesquisa.trim() || texto(`${v.marca} ${v.modelo} ${v.versao} ${v.ano}`).includes(texto(f.pesquisa))) &&
    (!f.marcas.length || f.marcas.includes(normalizarMarca(v.marca))) && (!f.modelo || v.modelo === f.modelo) &&
    (!f.combustivel || v.combustivel === f.combustivel) && (!f.cambio || v.cambio === f.cambio) &&
    (!f.anoDe || v.ano >= Number(f.anoDe)) && (!f.anoAte || v.ano <= Number(f.anoAte)) &&
    (!f.precoDe || v.preco >= Number(f.precoDe)) && (!f.precoAte || v.preco <= Number(f.precoAte)));
}
