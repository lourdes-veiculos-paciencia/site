"use client";

import { useState } from "react";
import { editarVeiculo } from "@/app/actions/veiculos";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import ImageUploadField from "./ImageUploadField";

type Props = {
  veiculo: any;
};

export default function EditVehicleForm({
  veiculo,
}: Props) {
  const [images, setImages] = useState<string[]>(
    veiculo.imagens || []
  );

  async function action(formData: FormData) {
    await editarVeiculo(
      veiculo.id,
      formData
    );
  }

  return (
    <form action={action} className="space-y-8">

      {/* Informações Básicas */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Informações Básicas
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <FormInput
            label="Marca"
            name="marca"
            required
            defaultValue={veiculo.marca}
          />

          <FormInput
            label="Modelo"
            name="modelo"
            required
            defaultValue={veiculo.modelo}
          />

          <FormInput
            label="Versão"
            name="versao"
            defaultValue={veiculo.versao}
          />

          <FormInput
            label="Ano"
            name="ano"
            type="number"
            required
            defaultValue={veiculo.ano}
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
            defaultValue={veiculo.preco}
          />

          <FormInput
            label="Quilometragem"
            name="km"
            type="number"
            required
            defaultValue={veiculo.km}
          />

        </div>

      </section>

      {/* Imagens */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Imagens
        </h2>

        <ImageUploadField
          label="Fotos do Veículo"
          name="imagens"
          defaultValues={images}
          onImagesChange={setImages}
        />

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
            defaultValue={veiculo.motor}
          />

          <FormInput
            label="Portas"
            name="portas"
            type="number"
            defaultValue={veiculo.portas}
          />

          <FormSelect
            label="Combustível"
            name="combustivel"
            defaultValue={veiculo.combustivel}
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
            defaultValue={veiculo.cambio}
            options={[
              "Manual",
              "Automático",
              "CVT",
            ]}
          />

          <FormInput
            label="Cor"
            name="cor"
            defaultValue={veiculo.cor}
          />

          <FormInput
            label="Cidade"
            name="cidade"
            defaultValue={veiculo.cidade}
          />

          <FormInput
            label="Final da placa"
            name="final_placa"
            type="number"
            defaultValue={veiculo.final_placa}
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
          defaultValue={veiculo.descricao}
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
              defaultChecked={veiculo.destaque}
            />

            Destaque

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="vendido"
              defaultChecked={veiculo.vendido}
            />

            Vendido

          </label>

        </div>

      </section>

      {/* Botões */}

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => history.back()}
          className="rounded-xl border px-6 py-3 transition hover:bg-gray-100"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Atualizar Veículo
        </button>

      </div>

    </form>
  );
}