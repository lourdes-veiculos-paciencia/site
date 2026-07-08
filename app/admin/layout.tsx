import { ReactNode } from "react";
import LogoutButton from "@/components/admin/LogoutButton";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-gray-100">

      <div className="flex">

        {/* Menu */}

        <aside className="w-72 bg-gray-900 text-white min-h-screen flex flex-col">

          <div className="border-b border-gray-700 p-6">

            <h1 className="text-2xl font-bold">
              Lourdes Veículos
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Painel Administrativo
            </p>

          </div>

          <nav className="space-y-2 p-4 flex-1">

            <a
              href="/admin"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              🚗 Veículos
            </a>

            <a
              href="#"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              📷 Fotos
            </a>

            <a
              href="#"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              ⚙ Configurações
            </a>

          </nav>

          <div className="border-t border-gray-700 p-4">

            <LogoutButton />

          </div>

        </aside>

        {/* Conteúdo */}

        <section className="flex-1 p-10">
          {children}
        </section>

      </div>

    </main>
  );
}