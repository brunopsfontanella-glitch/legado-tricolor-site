import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { LegacyTicks } from "@/components/LegacyMark";
import { LegacySymbol } from "@/components/LegacySymbol";
import { PillarCard } from "@/components/PillarCard";
import { PILLARS, CALENDAR } from "@/lib/content";

const NAV_CARDS = [
  { title: "O Instituto", description: "Quem somos, missão, visão e princípios.", href: "/instituto" },
  { title: "Manifesto", description: "O texto completo que nos fundamenta.", href: "/manifesto" },
  { title: "Governança", description: "Como o Instituto se organiza internamente.", href: "/governanca" },
  { title: "Calendário Anual", description: "O que entregamos, trimestre a trimestre.", href: "/calendario" },
  { title: "Financeiro", description: "Transparência sobre receitas e despesas.", href: "/financeiro" },
  { title: "Downloads", description: "Cadernos, relatórios e publicações.", href: "/downloads" },
  { title: "Hub Legado Tricolor", description: "O espaço físico do Instituto.", href: "/hub" },
  { title: "Faça Parte", description: "Contribua com o futuro do Grêmio.", href: "/contato" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-navy/10 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="rise-in">
            <Eyebrow>Instituto Grêmio do Futuro</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Governança para um Grêmio competitivo por décadas.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              O Grêmio não começou conosco e não terminará conosco. Cada geração recebe um
              clube construído por quem veio antes — e tem a responsabilidade de entregar um
              Grêmio ainda mais forte para quem virá depois.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/manifesto" variant="primary">Ler o Manifesto</Button>
              <Button href="/contato" variant="ghost">Faça Parte</Button>
            </div>
          </div>
          <div className="rise-in flex justify-center lg:justify-end" style={{ animationDelay: "120ms" }}>
            <LegacySymbol className="h-64 w-auto sm:h-80" />
          </div>
        </div>
      </section>

      {/* Identity */}
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>Identidade</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
            O que é — e o que não é — o Legado Tricolor
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-navy/10 bg-white p-8">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Não somos
              </h3>
              <ul className="mt-5 flex flex-col gap-3 text-navy">
                {["Um grupo criado para uma eleição", "Um grupo para defender nomes", "Um grupo para disputar espaço político"].map(
                  (item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed">
                      <span className="text-muted">—</span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-navy p-8 text-white">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky">
                Somos
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "Uma instituição que pensa o Grêmio como centenário",
                  "Capaz de crescer independente das gestões",
                  "Capaz de unir tradição, inovação e responsabilidade",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <LegacyTicks className="mt-0.5 h-3 w-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="/instituto"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gremio hover:text-navy"
          >
            Conheça o Instituto em detalhe →
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Onde vamos atuar</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
                Cinco pilares permanentes
              </h2>
            </div>
            <Link href="/pilares" className="text-sm font-semibold text-gremio hover:text-navy">
              Ver todos os pilares →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.title} index={i + 1} title={pillar.title} description={pillar.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Calendar teaser */}
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>Como isso acontece ano a ano</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
            Calendário estratégico
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CALENDAR.map((q) => (
              <div key={q.quarter} className="rounded-2xl border border-navy/10 bg-white p-6">
                <span className="font-mono text-2xl font-bold text-gremio">{q.quarter}</span>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">{q.period}</p>
                <p className="mt-4 text-sm leading-relaxed text-navy">{q.items[0]}</p>
              </div>
            ))}
          </div>
          <Link
            href="/calendario"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gremio hover:text-navy"
          >
            Ver calendário completo →
          </Link>
        </div>
      </section>

      {/* Explore everything */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>Explore o site</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
            Todos os espaços do Instituto
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NAV_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col gap-2 rounded-2xl border border-navy/10 p-6 transition-colors hover:border-gremio hover:bg-mist"
              >
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-navy group-hover:text-gremio">
                  {card.title}
                </h3>
                <p className="text-sm text-muted">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <LegacySymbol className="mx-auto h-16 w-auto" />
          <p className="mt-8 font-display text-xl font-semibold leading-relaxed text-white sm:text-2xl">
            Porque o Grêmio é maior do que qualquer gestão. Porque nenhuma pessoa é maior do
            que a instituição. Porque todo legado começa com a coragem de pensar além do
            próprio tempo.
          </p>
          <p className="mt-6 text-sky/90">Vamos construir isso juntos?</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contato" variant="primary">Faça Parte</Button>
            <Button href="/manifesto" variant="ghost" className="!border-white/30 !text-white hover:!border-sky hover:!text-sky">
              Ler o Manifesto
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
