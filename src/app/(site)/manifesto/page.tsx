import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { LegacySymbol } from "@/components/LegacySymbol";
import { Button } from "@/components/Button";
import { MANIFESTO_PARAGRAPHS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Manifesto — Legado Tricolor",
  description: "O Manifesto completo do Legado Tricolor, Instituto Grêmio do Futuro.",
};

// Paragraphs rendered as pull quotes stand out from the surrounding body copy.
const PULL_QUOTE_INDICES = new Set([3, 8, 14]);

export default function ManifestoPage() {
  return (
    <div>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <LegacySymbol className="mx-auto h-14 w-auto" />
          <Eyebrow tone="sky">
            <span className="text-sky">Manifesto do Legado Tricolor</span>
          </Eyebrow>
          <h1 className="mt-6 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">
            O Grêmio não começou conosco.
            <br />E não terminará conosco.
          </h1>
        </div>
      </section>

      <section className="bg-white">
        <article className="mx-auto max-w-2xl px-6 py-20">
          {MANIFESTO_PARAGRAPHS.map((paragraph, i) =>
            PULL_QUOTE_INDICES.has(i) ? (
              <p
                key={i}
                className="my-10 border-l-2 border-gremio pl-6 font-display text-xl font-semibold leading-snug tracking-tight text-navy"
              >
                {paragraph}
              </p>
            ) : (
              <p key={i} className="mb-6 text-lg leading-relaxed text-navy/90">
                {paragraph}
              </p>
            ),
          )}

          <div className="mt-16 border-t border-navy/10 pt-10 text-center">
            <p className="font-display text-lg font-bold uppercase tracking-tight text-navy">
              Legado Tricolor
            </p>
            <p className="mt-1 text-sm text-muted">Instituto Grêmio do Futuro</p>
            <p className="mt-4 text-gremio">Governança para um Grêmio competitivo por décadas.</p>
          </div>
        </article>
      </section>

      <section className="bg-mist">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-navy">
              Compartilha desse compromisso?
            </h2>
            <p className="mt-2 text-muted">Conheça como fazer parte do Legado Tricolor.</p>
          </div>
          <Button href="/contato" variant="primary">Faça Parte</Button>
        </div>
      </section>
    </div>
  );
}
