"use client";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";

export default function VehicleForm() {
  return (
    <form className="space-y-8">

      {/* Informações Básicas */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Informações Básicas
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <FormInput
            label="Marca"
            name="marca"
            placeholder="Ex.: Fiat"
            required
          />

          <FormInput
            label="Modelo"
            name="modelo"
            placeholder="Ex.: Uno"
            required
          />

          <FormInput
            label="Versão"
            name="versao"
            placeholder="Ex.: Attractive"
          />

          <FormInput
            label="Ano"
            name="ano"
            type="number"
            required
          />

        </div>

      </section>

      {/* Valores */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Valores
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <FormInput
            label="Preço"
            name="preco"
            type="number"
            required
          />

          <FormInput
            label="Quilometragem"
            name="km"
            type="number"
            required
          />

        </div>

      </section>

      {/* Especificações */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Especificações
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <FormInput
            label="Motor"
            name="motor"
          />

          <FormInput
            label="Portas"
            name="portas"
            type="number"
          />

          <FormSelect
            label="Combustível"
            name="combustivel"
            options={[
              "Flex",
              "Gasolina",
              "Diesel",
              "Elétrico",
              "Híbrido",
            ]}
          />

          <FormSelect
            label="Câmbio"
            name="cambio"
            options={[
              "Manual",
              "Automático",
              "CVT",
            ]}
          />

          <FormInput
            label="Cor"
            name="cor"
          />

          <FormInput
            label="Cidade"
            name="cidade"
          />

          <FormInput
            label="Final da placa"
            name="final_placa"
            type="number"
          />

        </div>

      </section>

      {/* Descrição */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Descrição
        </h2>

        <FormTextarea
          label="Descrição"
          name="descricao"
        />

      </section>

      {/* Status */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Status
        </h2>

        <div className="flex gap-10">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="destaque"
            />

            Destaque

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="vendido"
            />

            Vendido

          </label>

        </div>

      </section>

      {/* Botões */}

      <div className="flex justify-end gap-4">

        <button
          type="button"
          className="rounded-xl border px-6 py-3"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700"
        >
          Salvar Veículo
        </button>

      </div>

    </form>
  );
}