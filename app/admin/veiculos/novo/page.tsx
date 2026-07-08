import VehicleForm from "@/components/admin/VehicleForm";

export default function NovoVeiculoPage() {
  return (
    <>
      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Novo Veículo
        </h1>

        <p className="mt-2 text-gray-500">
          Cadastre um novo veículo.
        </p>

      </div>

      <VehicleForm />
    </>
  );
}