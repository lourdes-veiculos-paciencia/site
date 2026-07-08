import { buscarVeiculos } from "@/lib/supabase/queries/veiculos";

export default async function TestePage() {
  const veiculos = await buscarVeiculos();

  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        Teste Supabase
      </h1>

      <p className="mb-6">
        Total de veículos encontrados:{" "}
        <strong>{veiculos.length}</strong>
      </p>

      <pre className="rounded-xl bg-gray-100 p-6 overflow-auto text-sm">
        {JSON.stringify(veiculos, null, 2)}
      </pre>
    </main>
  );
}