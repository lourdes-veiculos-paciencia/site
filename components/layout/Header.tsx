"use client";

import { useState } from "react";
import { Camera, CarFront, Home, Mail, Menu, MessageCircle } from "lucide-react";

import { CONFIG } from "@/lib/config";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Drawer from "@/components/ui/Drawer";
import Logo from "@/components/ui/Logo";
import NavItem from "@/components/ui/NavItem";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between md:h-20">
            <Logo size="md" />

            <nav className="hidden items-center gap-8 lg:flex">
              <NavItem href="/">Inicio</NavItem>
              <NavItem href="/estoque">Estoque</NavItem>
              <NavItem href="/contato">Contato</NavItem>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Camera size={20} />
              </a>

              <Button
                className="gap-2"
                href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(
                  CONFIG.whatsapp.mensagem
                )}`}
              >
                <MessageCircle size={18} />
                WhatsApp
              </Button>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 text-zinc-900 transition hover:bg-zinc-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </Container>
      </header>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="mb-8">
          <Logo size="sm" />
        </div>

        <div className="space-y-2">
          <NavItem href="/" mobile>
            <span className="flex items-center gap-3">
              <Home size={19} />
              Inicio
            </span>
          </NavItem>

          <NavItem href="/estoque" mobile>
            <span className="flex items-center gap-3">
              <CarFront size={19} />
              Estoque
            </span>
          </NavItem>

          <NavItem href="/contato" mobile>
            <span className="flex items-center gap-3">
              <Mail size={19} />
              Contato
            </span>
          </NavItem>
        </div>

        <div className="my-8 border-t" />

        <div className="space-y-3">
          <a
            href={CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 font-medium text-zinc-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Camera size={20} />
            Instagram
          </a>

          <Button
            className="w-full gap-2"
            href={`https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(
              CONFIG.whatsapp.mensagem
            )}`}
          >
            <MessageCircle size={18} />
            WhatsApp
          </Button>
        </div>
      </Drawer>
    </>
  );
}
