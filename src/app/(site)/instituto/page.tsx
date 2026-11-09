import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { LegacyTicks } from "@/components/LegacyMark";
import { Button } from "@/components/Button";
import { PRINCIPLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "O Instituto — Legado Tricolor",
  description: "Quem somos, missão, visão e princípios do Legado Tricolor.",
};

const SYMBOL_MEANING = [
  { title: "Três linhas", description: "Que representam gerações." },
  { title: "Ascensão", description: "Crescimento e evolução." },
  { title: "A letra L", description: "De Legado, nossa essência." },
];

export default function InstitutoPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>O Instituto</Eyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
            Quem somos
          </h1>
        </div>
      </section>

      <section id="quem-somos" className="scroll-mt-24 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-navy">
              O Grêmio não começou conosco. E não terminará conosco. Há mais de um século,
              milhares de gremistas dedicam seu tempo, seu trabalho e sua paixão para
              construir uma das maiores instituições do futebol brasileiro.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              Cada geração recebeu um Grêmio construído por quem veio antes. E cada geração
              tem a responsabilidade de entregar um Grêmio ainda mais forte para quem virá
              depois. É exatamente por isso que nasceu o Legado Tricolor: uma instituição que
              pensa o Grêmio como centenário, capaz de crescer independentemente das gestões
              e de unir tradição, inovação e responsabilidade.
            </p>
            <p className="mt-8 border-l-2 border-sky pl-5 font-display text-lg font-semibold uppercase leading-snug tracking-tight text-navy">
              Tradição que nos orgulha.<br />Gestão que nos fortalece.<br />Futuro que construímos juntos.
            </p>
          </div>

          <div className="rounded-2xl border border-navy/10 bg-mist p-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              O significado do símbolo
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {SYMBOL_MEANING.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <LegacyTicks className="mt-1 h-4 w-7 shrink-0" />
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-navy/10 pt-6 text-center">
              {["Pessoas", "Governança", "Legado"].map((word) => (
                <span key={word} className="font-mono text-xs font-semibold uppercase tracking-wide text-gremio">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="missao-visao" className="scroll-mt-24 bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Para onde isso vai</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
            Missão e visão
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-navy p-8 text-white">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky">Missão</h3>
              <p className="mt-4 text-lg leading-relaxed">
                Produzir conhecimento, formar lideranças e transformar esse conhecimento em
                mudanças institucionais permanentes para o Grêmio.
              </p>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-white p-8">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">Visão</h3>
              <p className="mt-4 text-lg leading-relaxed text-navy">
                Contribuir para que o Grêmio se torne referência nacional em governança,
                gestão e competitividade dentro e fora de campo, preservando sua identidade e
                fortalecendo a instituição para as próximas gerações.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="principios" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Como vamos nos guiar</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
            Princípios organizacionais
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <div key={principle} className="flex items-start gap-4 rounded-xl border border-navy/10 p-5">
                <LegacyTicks className="mt-1 h-4 w-7 shrink-0" />
                <p className="text-navy">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
              Quer ler o texto completo?
            </h2>
            <p className="mt-2 text-sky/90">O Manifesto do Legado Tricolor, na íntegra.</p>
          </div>
          <Button href="/manifesto" variant="primary">Ler o Manifesto</Button>
        </div>
      </section>
    </div>
  );
}
