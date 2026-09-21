"use client";

import { useMemo, useState } from "react";

import VehicleCard from "@/components/vehicle/VehicleCard";

import EstoqueSidebar from "@/components/estoque/EstoqueSidebar";
import { aplicarFiltros, erroFiltros, filtrosVazios } from "@/lib/filtros-estoque";
import EstoqueSort from "@/components/estoque/EstoqueSort";

import { Veiculo } from "@/types/veiculo";
import { filtrarPorTipo, type TipoVeiculo } from "@/lib/tipo-veiculo";

type Props = {
  veiculos: Veiculo[];
};

export default function EstoqueContent({ veiculos }: Props) {
  const [tipo, setTipo] = useState<TipoVeiculo | "todos">("todos");
  const [filtros, setFiltros] = useState(filtrosVazios);
  const [aplicados, setAplicados] = useState(filtrosVazios);
  const [erro, setErro] = useState<string | null>(null);
  function limpar() { setFiltros(filtrosVazios); setAplicados(filtrosVazios); setErro(null); setOrdenacao("relevancia"); }
  const [ordenacao, setOrdenacao] = useState("relevancia");

  const lista = useMemo(() => {
    const resultado = aplicarFiltros(filtrarPorTipo(veiculos, tipo), aplicados);
    switch (ordenacao) {
      case "menor-preco":
        resultado.sort((a, b) => a.preco - b.preco);
        break;

      case "maior-preco":
        resultado.sort((a, b) => b.preco - a.preco);
        break;

      case "mais-novo":
        resultado.sort((a, b) => b.ano - a.ano);
        break;

      case "mais-antigo":
        resultado.sort((a, b) => a.ano - b.ano);
        break;

      case "marca":
        resultado.sort((a, b) => a.marca.localeCompare(b.marca));
        break;

      case "km":
        resultado.sort((a, b) => a.km - b.km);
        break;
    }

    return resultado;
  }, [aplicados, ordenacao, veiculos, tipo]);

  return (
    <>
      <div role="group" aria-label="Tipo de veículo" className="mb-6 flex flex-wrap gap-3">
        {([ ["todos", "Todos"], ["carro", "Carros"], ["moto", "Motos"] ] as const).map(([valor, label]) => (
          <button key={valor} type="button" aria-pressed={tipo === valor} onClick={() => { setTipo(valor); limpar(); }} className={`rounded-xl border px-5 py-3 font-semibold transition ${tipo === valor ? "border-red-600 bg-red-600 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-red-600"}`}>
            {label} ({filtrarPorTipo(veiculos, valor).length})
          </button>
        ))}
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
        <EstoqueSidebar veiculos={filtrarPorTipo(veiculos, tipo)} filtros={filtros} erro={erro} onChange={setFiltros} onReset={limpar} onSubmit={() => { const mensagem = erroFiltros(filtros); setErro(mensagem); if (!mensagem) setAplicados({ ...filtros }); }} />
        <div className="min-w-0">

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <p aria-live="polite" className="text-gray-600">
          <strong>{lista.length}</strong>{" "}
          {lista.length === 1
            ? "veiculo encontrado"
            : "veiculos encontrados"}
        </p>
        <div className="w-full sm:w-56"><EstoqueSort ordenacao={ordenacao} onChange={setOrdenacao} /></div>
      </div>

      {lista.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Nenhum veiculo encontrado
          </h2>

          <p className="mt-3 text-gray-500">
            Tente alterar os filtros ou limpar a pesquisa.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1 sm:grid-cols-2
            gap-4
            lg:gap-5
          "
        >
          {lista.map((veiculo) => (
            <VehicleCard key={veiculo.id} {...veiculo} />
          ))}
        </div>
      )}
        </div>
      </div>
    </>
  );
}
