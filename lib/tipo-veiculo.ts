export type TipoVeiculo = "carro" | "moto";

export function validarTipoVeiculo(valor: unknown, obrigatorio = true): TipoVeiculo | null {
  if (!obrigatorio && (valor === "" || valor === null)) return null;
  if (valor === "carro" || valor === "moto") return valor;
  throw new Error("Selecione o tipo de veículo: Carro ou Moto.");
}

export function filtrarPorTipo<T extends { tipo?: TipoVeiculo | null }>(veiculos: T[], tipo: TipoVeiculo | "todos") {
  return tipo === "todos" ? [...veiculos] : veiculos.filter(veiculo => veiculo.tipo === tipo);
}
