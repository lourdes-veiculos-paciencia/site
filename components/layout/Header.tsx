"use client";

import { useState } from "react";
import {
  Camera,
  CarFront,
  Home,
  Mail,
  Menu,
  MessageCircle,
  MapPin,
} from "lucide-react";

import { CONFIG } from "@/lib/config";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Drawer from "@/components/ui/Drawer";
import Logo from "@/components/ui/Logo";
import NavItem from "@/components/ui/NavItem";
import WhatsAppModal from "@/components/WhatsAppModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/95 shadow-[0_4px_24px_-16px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <Container>
          <div className="flex min-h-20 items-center justify-between gap-4 py-3 lg:min-h-24 lg:gap-6">
            <div className="flex shrink-0 items-center gap-4">
              <Logo size="md" />
              <div className="hidden border-l border-zinc-200 pl-4 xl:block">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-800">Carros & motos</p>
                <a href="/localizacao" className="mt-1.5 flex items-center gap-1 text-xs text-zinc-500 transition hover:text-red-600"><MapPin size={12} />Paciência · RJ</a>
              </div>
            </div>

            <nav aria-label="Navegação principal" className="hidden items-center gap-1 rounded-full bg-zinc-100/80 p-1 lg:flex">
              <NavItem href="/">Início</NavItem>
              <NavItem href="/estoque">Estoque</NavItem>
              <NavItem href="/contato">Contato</NavItem>
              <NavItem href="/localizacao">Localização</NavItem>
            </nav>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Camera size={19} />
              </a>

              <WhatsAppModal>
                <Button className="gap-2 whitespace-nowrap !rounded-full !px-5 !text-sm">
                  <MessageCircle size={18} />
                  WhatsApp
                </Button>
              </WhatsAppModal>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 text-zinc-900 transition hover:bg-zinc-100 lg:hidden"
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
              Início
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
          <NavItem href="/localizacao" mobile>
            <span className="flex items-center gap-3"><MapPin size={19} />Localização</span>
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

          <WhatsAppModal>
            <Button className="w-full gap-2">
              <MessageCircle size={18} />
              WhatsApp
            </Button>
          </WhatsAppModal>
        </div>
      </Drawer>
    </>
  );
}
