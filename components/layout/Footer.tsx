import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

import { CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-black text-white">
              {CONFIG.empresa}
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">
              Veiculos de procedencia, atendimento objetivo e condicoes para
              voce comprar com mais confianca.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-zinc-300">
              Navegacao
            </h3>

            <div className="flex flex-col gap-3 text-sm text-zinc-400">
              <Link className="transition hover:text-white" href="/">
                Inicio
              </Link>
              <Link className="transition hover:text-white" href="/estoque">
                Estoque
              </Link>
              <Link className="transition hover:text-white" href="/contato">
                Contato
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-zinc-300">
              Contato
            </h3>

            <div className="space-y-3 text-sm text-zinc-400">
              <p className="flex items-center gap-3">
                <MapPin size={17} className="text-red-400" />
                {CONFIG.endereco}
              </p>

              <p className="flex items-center gap-3">
                <Phone size={17} className="text-red-400" />
                {CONFIG.telefone}
              </p>

              <p className="flex items-center gap-3">
                <Mail size={17} className="text-red-400" />
                {CONFIG.email}
              </p>

              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-300 transition hover:text-white"
              >
                <Camera size={17} className="text-red-400" />
                @lourdesveiculos_paciencia
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} {CONFIG.empresa}. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
