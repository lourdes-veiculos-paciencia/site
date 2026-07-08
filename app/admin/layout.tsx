import { ReactNode } from "react";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminHeader from "@/components/admin/AdminHeader";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-gray-100">

      <div className="flex flex-col lg:flex-row">

        {/* Menu - Hidden no mobile, visível em lg */}

        <aside className="hidden lg:flex w-full lg:w-72 bg-gray-900 text-white flex-col min-h-screen">

          <div className="border-b border-gray-700 p-4 sm:p-6">

            <h1 className="text-lg sm:text-2xl font-bold">
              Lourdes Veículos
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-gray-400">
              Painel Administrativo
            </p>

          </div>

          <nav className="space-y-2 p-3 sm:p-4 flex-1">

            <a
              href="/admin"
              className="block rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base hover:bg-gray-800 transition"
            >
              🚗 Veículos
            </a>

            <a
              href="#"
              className="block rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base hover:bg-gray-800 transition"
            >
              📷 Fotos
            </a>

            <a
              href="#"
              className="block rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base hover:bg-gray-800 transition"
            >
              ⚙ Configurações
            </a>

          </nav>

          <div className="border-t border-gray-700 p-3 sm:p-4">

            <LogoutButton />

          </div>

        </aside>

        {/* Conteúdo */}

        <section className="flex-1 flex flex-col">

          {/* Header Mobile */}
          <AdminHeader />

          {/* Conteúdo Principal */}
          <div className="flex-1 p-4 sm:p-6 md:p-10">
            {children}
          </div>

        </section>

      </div>

    </main>
  );
}