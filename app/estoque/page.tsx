"use client";

import { useMemo, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import VehicleCard from "@/components/vehicle/VehicleCard";

import EstoqueToolbar from "@/components/estoque/EstoqueToolbar";
import EstoqueSearch from "@/components/estoque/EstoqueSearch";
import EstoqueFilters from "@/components/estoque/EstoqueFilters";
import EstoqueSort from "@/components/estoque/EstoqueSort";

import veiculos from "@/data/veiculos.json";
import { Veiculo } from "@/types/veiculo";

export default function EstoquePage() {
  const [pesquisa, setPesquisa] = useState("");
  const [marca, setMarca] = useState("");
  const [combustivel, setCombustivel] = useState("");
  const [cambio, setCambio] = useState("");
  const [ordenacao, setOrdenacao] = useState("relevancia");

  const lista = useMemo(() => {
    let resultado = [...(veiculos as unknown as Veiculo[])];

    // Pesquisa
    if (pesquisa.trim()) {
      const texto = pesquisa.toLowerCase();

      resultado = resultado.filter((v) =>
        `${v.marca} ${v.modelo} ${v.versao} ${v.ano}`
          .toLowerCase()
          .includes(texto)
      );
    }

    // Marca
    if (marca) {
      resultado = resultado.filter((v) => v.marca === marca);
    }

    // Combustível
    if (combustivel) {
      resultado = resultado.filter(
        (v) => v.combustivel === combustivel
      );
    }

    // Câmbio
    if (cambio) {
      resultado = resultado.filter((v) => v.cambio === cambio);
    }

    // Ordenação
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
        resultado.sort((a, b) =>
          a.marca.localeCompare(b.marca)
        );
        break;

      case "km":
        resultado.sort((a, b) => a.km - b.km);
        break;
    }

    return resultado;
  }, [
    pesquisa,
    marca,
    combustivel,
    cambio,
    ordenacao,
  ]);

  return (
    <>
      <Header />

      <main className="bg-gray-100 py-12">

        <Container>

          <SectionTitle
            title="Nosso Estoque"
            subtitle="Encontre o veículo ideal para você."
          />

          <EstoqueToolbar>

            <div className="space-y-6">

              <EstoqueSearch
                pesquisa={pesquisa}
                onChange={setPesquisa}
              />

              <div className="grid gap-6 lg:grid-cols-2">

                <EstoqueFilters
                  veiculos={veiculos as unknown as Veiculo[]}
                  marca={marca}
                  combustivel={combustivel}
                  cambio={cambio}
                  onMarcaChange={setMarca}
                  onCombustivelChange={setCombustivel}
                  onCambioChange={setCambio}
                />

                <EstoqueSort
                  ordenacao={ordenacao}
                  onChange={setOrdenacao}
                />

              </div>

              <div className="flex justify-end">

                <button
                  onClick={() => {
                    setPesquisa("");
                    setMarca("");
                    setCombustivel("");
                    setCambio("");
                    setOrdenacao("relevancia");
                  }}
                  className="
                    rounded-xl
                    border
                    border-red-600
                    px-5
                    py-3
                    font-semibold
                    text-red-600
                    transition-all
                    duration-300
                    hover:bg-red-600
                    hover:text-white
                  "
                >
                  Limpar filtros
                </button>

              </div>

            </div>

          </EstoqueToolbar>

          <div className="mb-6 flex items-center justify-between">

            <p className="text-gray-600">

              <strong>{lista.length}</strong>{" "}

              {lista.length === 1
                ? "veículo encontrado"
                : "veículos encontrados"}

            </p>

          </div>

          {lista.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">

              <h2 className="text-2xl font-bold text-gray-800">
                Nenhum veículo encontrado
              </h2>

              <p className="mt-3 text-gray-500">
                Tente alterar os filtros ou limpar a pesquisa.
              </p>

            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-2
                gap-4
                lg:grid-cols-3
                xl:grid-cols-4
                lg:gap-8
              "
            >

              {lista.map((veiculo) => (

                <VehicleCard
                  key={veiculo.id}
                  {...veiculo}
                />

              ))}

            </div>

          )}

        </Container>

      </main>

      <Footer />
    </>
  );
}