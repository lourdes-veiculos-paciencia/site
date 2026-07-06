export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-4">
          <img
            src="/logo/logo.png"
            alt="Lourdes Veículos"
            className="h-14"
          />

          <div>
            <h1 className="text-2xl font-bold text-red-600">
              Lourdes Veículos
            </h1>

            <p className="text-gray-500 text-sm">
              Compra • Venda • Financiamento
            </p>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#">Início</a>
          <a href="#">Estoque</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>

        <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition">
          WhatsApp
        </button>

      </div>
    </header>
  );
}