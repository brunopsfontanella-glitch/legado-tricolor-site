"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./Button";
import { asset } from "@/lib/base-path";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  { label: "Início", href: "/" },
  {
    label: "O Instituto",
    children: [
      { label: "Quem Somos", href: "/instituto#quem-somos" },
      { label: "Missão e Visão", href: "/instituto#missao-visao" },
      { label: "Princípios", href: "/instituto#principios" },
      { label: "Manifesto Completo", href: "/manifesto" },
    ],
  },
  {
    label: "Governança",
    children: [
      { label: "Organograma", href: "/governanca" },
      { label: "Pilares", href: "/pilares" },
      { label: "Calendário Anual", href: "/calendario" },
    ],
  },
  {
    label: "Transparência",
    children: [
      { label: "Financeiro", href: "/financeiro" },
      { label: "Conteúdos para Download", href: "/downloads" },
    ],
  },
  { label: "Hub Legado Tricolor", href: "/hub" },
];

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src={asset("/images/logo-legado-tricolor.png")}
            alt="Legado Tricolor — Instituto Grêmio do Futuro"
            width={1731}
            height={909}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => item.children && setOpenMenu(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold text-navy transition-colors hover:text-gremio"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:text-gremio"
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  aria-expanded={openMenu === item.label}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-xs">▾</span>
                </button>
              )}

              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full w-64 rounded-xl border border-navy/10 bg-white p-2 shadow-lg shadow-navy/10">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-4 py-2.5 text-sm text-navy transition-colors hover:bg-mist hover:text-gremio"
                      onClick={() => setOpenMenu(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contato" variant="primary" className="!py-2.5">
            Faça Parte
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy/15 text-navy lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Abrir menu"
        >
          <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-navy/10 bg-white px-6 py-4 lg:hidden">
          {NAV.map((item) => (
            <div key={item.label} className="border-b border-navy/5 py-2 last:border-none">
              {item.href ? (
                <Link
                  href={item.href}
                  className="block py-1.5 text-sm font-semibold text-navy"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <span className="block py-1.5 text-sm font-semibold text-muted">{item.label}</span>
                  <div className="ml-3 flex flex-col gap-1">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-1.5 text-sm text-navy"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
          <Button href="/contato" variant="primary" className="mt-4 w-full">
            Faça Parte
          </Button>
        </nav>
      )}
    </header>
  );
}
