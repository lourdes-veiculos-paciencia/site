"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Camera,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

import { CONFIG } from "@/lib/config";
import Container from "@/components/ui/Container";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      <Container>

        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">

            <Image
              src="/logo/logo.png"
              alt={CONFIG.empresa}
              width={220}
              height={123}
              priority
              style={{
                width: "220px",
                height: "auto",
              }}
            />

          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-10">

            <Link
              href="/"
              className="font-semibold text-gray-700 hover:text-red-600 transition"
            >
              Início
            </Link>

            <Link
              href="/estoque"
              className="font-semibold text-gray-700 hover:text-red-600 transition"
            >
              Estoque
            </Link>

            <Link
              href="/sobre"
              className="font-semibold text-gray-700 hover:text-red-600 transition"
            >
              Sobre
            </Link>

            <Link
              href="/contato"
              className="font-semibold text-gray-700 hover:text-red-600 transition"
            >
              Contato
            </Link>

          </nav>

          {/* Botões Desktop */}
          <div className="hidden md:flex items-center gap-3">

            <a
              href={CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-500 text-pink-600 transition hover:bg-pink-500 hover:text-white"
            >
              <Camera size={20} />
            </a>

            <a
              href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(
                CONFIG.whatsapp.mensagem
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            {menuAberto ? <X size={30} /> : <Menu size={30} />}
          </button>

        </div>

      </Container>

      {/* Menu Mobile */}
      {menuAberto && (

        <div className="border-t bg-white shadow-lg md:hidden">

          <nav className="flex flex-col px-6 py-4">

            <Link
              href="/"
              onClick={() => setMenuAberto(false)}
              className="py-3"
            >
              Início
            </Link>

            <Link
              href="/estoque"
              onClick={() => setMenuAberto(false)}
              className="py-3"
            >
              Estoque
            </Link>

            <Link
              href="/sobre"
              onClick={() => setMenuAberto(false)}
              className="py-3"
            >
              Sobre
            </Link>

            <Link
              href="/contato"
              onClick={() => setMenuAberto(false)}
              className="py-3"
            >
              Contato
            </Link>

            <div className="mt-5 flex gap-3">

              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-pink-500 py-3 text-center font-semibold text-pink-600"
              >
                Instagram
              </a>

              <a
                href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(
                  CONFIG.whatsapp.mensagem
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-green-600 py-3 text-center font-semibold text-white"
              >
                WhatsApp
              </a>

            </div>

          </nav>

        </div>

      )}

    </header>
  );
}