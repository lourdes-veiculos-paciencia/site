import VehicleForm from "@/components/admin/VehicleForm";

export default function NovoVeiculoPage() {
  return (
    <>
      <div className="mb-6 sm:mb-8 md:mb-10">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Novo Veículo
        </h1>

        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">
          Cadastre um novo veículo.
        </p>

      </div>

      <VehicleForm />
    </>
  );
}