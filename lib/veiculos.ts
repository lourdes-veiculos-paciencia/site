import veiculosJSON from "@/data/veiculos.json";
import { buscarVeiculo, buscarVeiculos } from "@/lib/supabase/queries/veiculos";
import { Veiculo } from "@/types/veiculo";

const IMAGEM_PADRAO = "/banner/hero-car.png";

function normalizarVeiculo(veiculo: Partial<Veiculo>): Veiculo {
  return {
    id: veiculo.id ?? "",
    marca: veiculo.marca ?? "",
    modelo: veiculo.modelo ?? "",
    versao: veiculo.versao ?? "",
    ano: Number(veiculo.ano ?? 0),
    km: Number(veiculo.km ?? 0),
    preco: Number(veiculo.preco ?? 0),
    combustivel: veiculo.combustivel ?? "",
    cambio: veiculo.cambio ?? "",
    motor: veiculo.motor ?? "",
    cor: veiculo.cor ?? "",
    cidade: veiculo.cidade ?? "",
    portas: Number(veiculo.portas ?? 0),
    final_placa: Number(veiculo.final_placa ?? 0),
    descricao: veiculo.descricao ?? "",
    destaque: Boolean(veiculo.destaque),
    vendido: Boolean(veiculo.vendido),
    created_at: veiculo.created_at,
    updated_at: veiculo.updated_at,
    imagens:
      Array.isArray(veiculo.imagens) && veiculo.imagens.length > 0
        ? veiculo.imagens
        : [IMAGEM_PADRAO],
    opcionais: veiculo.opcionais,
  };
}

function normalizarLista(veiculos: Partial<Veiculo>[]) {
  return veiculos.map(normalizarVeiculo);
}

export async function buscarVeiculosPublicos() {
  const veiculosSupabase = await buscarVeiculos();

  if (veiculosSupabase.length > 0) {
    return normalizarLista(veiculosSupabase);
  }

  return normalizarLista(veiculosJSON as Veiculo[]);
}

export async function buscarVeiculoPublico(id: string) {
  const veiculoSupabase = await buscarVeiculo(id);

  if (veiculoSupabase) {
    return normalizarVeiculo(veiculoSupabase);
  }

  const veiculoJSON = (veiculosJSON as Veiculo[]).find(
    (veiculo) => String(veiculo.id) === id
  );

  return veiculoJSON ? normalizarVeiculo(veiculoJSON) : null;
}
