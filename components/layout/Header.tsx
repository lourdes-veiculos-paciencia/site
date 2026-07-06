"use client";

import { useState } from "react";
import { Menu, Camera, MessageCircle } from "lucide-react";

import { CONFIG } from "@/lib/config";

import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";
import NavItem from "@/components/ui/NavItem";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">

        <Container>

          <div className="flex h-16 md:h-20 items-center justify-between">

            {/* Logo */}
            <Logo size="md" />

            {/* Desktop */}
            <nav className="hidden lg:flex items-center gap-8">

              <NavItem href="/">
                Início
              </NavItem>

              <NavItem href="/estoque">
                Estoque
              </NavItem>

              <NavItem href="/sobre">
                Sobre
              </NavItem>

              <NavItem href="/contato">
                Contato
              </NavItem>

            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-3">

              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-pink-500
                  text-pink-600
                  transition
                  hover:bg-pink-500
                  hover:text-white
                "
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

            {/* Mobile */}
            <button
              onClick={() => setMenuOpen(true)}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                transition
                hover:bg-gray-100
                lg:hidden
              "
            >
              <Menu size={24} />
            </button>

          </div>

        </Container>

      </header>

      {/* Drawer Mobile */}

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >

        <div className="mb-8">

          <Logo size="sm" />

        </div>

        <div className="space-y-2">

          <NavItem
            href="/"
            mobile
          >
            🏠 Início
          </NavItem>

          <NavItem
            href="/estoque"
            mobile
          >
            🚗 Estoque
          </NavItem>

          <NavItem
            href="/sobre"
            mobile
          >
            ℹ Sobre
          </NavItem>

          <NavItem
            href="/contato"
            mobile
          >
            📞 Contato
          </NavItem>

        </div>

        <div className="my-8 border-t" />

        <div className="space-y-3">

          <a
            href={CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-pink-500
              px-4
              py-3
              font-medium
              text-pink-600
              transition
              hover:bg-pink-50
            "
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