import Link from "next/link";
import { LegacySymbol } from "./LegacySymbol";

const COLUMNS = [
  {
    title: "O Instituto",
    links: [
      { label: "Quem Somos", href: "/instituto#quem-somos" },
      { label: "Missão e Visão", href: "/instituto#missao-visao" },
      { label: "Princípios", href: "/instituto#principios" },
      { label: "Manifesto Completo", href: "/manifesto" },
    ],
  },
  {
    title: "Governança",
    links: [
      { label: "Organograma", href: "/governanca" },
      { label: "Pilares", href: "/pilares" },
      { label: "Calendário Anual", href: "/calendario" },
    ],
  },
  {
    title: "Transparência",
    links: [
      { label: "Financeiro", href: "/financeiro" },
      { label: "Downloads", href: "/downloads" },
    ],
  },
  {
    title: "Instituto",
    links: [
      { label: "Hub Legado Tricolor", href: "/hub" },
      { label: "Faça Parte", href: "/contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <LegacySymbol className="h-9 w-auto" />
              <span className="font-display text-lg font-extrabold tracking-tight">LEGADO TRICOLOR</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-sky/90">
              Governança para um Grêmio competitivo por décadas.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/50">
              Instituto Grêmio do Futuro
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Legado Tricolor — Instituto Grêmio do Futuro.</p>
          <p>Tradição que nos orgulha. Gestão que nos fortalece. Futuro que construímos juntos.</p>
        </div>
      </div>
    </footer>
  );
}
