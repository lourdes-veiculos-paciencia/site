"use client";

import { useMemo, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import VehicleCard from "@/components/vehicle/VehicleCard";

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
    let resultado = [...(veiculos as Veiculo[])];

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
      resultado = resultado.filter(
        (v) => v.cambio === cambio
      );
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

          <div className="space-y-6">

            <EstoqueSearch
              pesquisa={pesquisa}
              onChange={setPesquisa}
            />

            <EstoqueFilters
              veiculos={veiculos as Veiculo[]}
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

          <div className="mt-8">

            <p className="text-gray-600">
              <strong>{lista.length}</strong>{" "}
              {lista.length === 1
                ? "veículo encontrado"
                : "veículos encontrados"}
            </p>

          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {lista.map((veiculo) => (

              <VehicleCard
                key={veiculo.id}
                {...veiculo}
              />

            ))}

          </div>

        </Container>

      </main>

      <Footer />
    </>
  );
}