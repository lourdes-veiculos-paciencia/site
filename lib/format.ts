export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarKm(valor: number) {
  return valor.toLocaleString("pt-BR") + " km";
}