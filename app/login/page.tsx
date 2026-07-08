import { login } from "@/app/actions/auth";

type Props = {
  searchParams: Promise<{
    erro?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: Props) {
  const { erro } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold">
            Lourdes Veículos
          </h1>

          <p className="mt-2 text-gray-500">
            Painel Administrativo
          </p>

        </div>

        {erro && (
          <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-700">
            Usuário ou senha inválidos.
          </div>
        )}

        <form
          action={login}
          className="space-y-6"
        >

          <div>

            <label
              htmlFor="usuario"
              className="mb-2 block font-semibold"
            >
              Usuário
            </label>

            <input
              id="usuario"
              name="usuario"
              required
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            />

          </div>

          <div>

            <label
              htmlFor="senha"
              className="mb-2 block font-semibold"
            >
              Senha
            </label>

            <input
              id="senha"
              name="senha"
              type="password"
              required
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            />

          </div>

          <button
            type="submit"
            className="
              w-full
              rounded-xl
              bg-red-600
              py-3
              font-bold
              text-white
              transition
              hover:bg-red-700
            "
          >
            Entrar
          </button>

        </form>

      </div>

    </main>
  );
}