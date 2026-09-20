"use client";

export default function ErrorPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center" role="alert">
      <h1 className="text-2xl font-bold">Não foi possível carregar esta página</h1>
      <p className="mt-4 text-gray-600">
        Ocorreu uma falha ao carregar os dados. Tente novamente em instantes.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white"
      >
        Tentar novamente
      </button>
    </main>
  );
}
