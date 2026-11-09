import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { PillarCard } from "@/components/PillarCard";
import { PILLARS, PRODUCTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pilares — Legado Tricolor",
  description: "Os cinco pilares permanentes de atuação do Legado Tricolor e seus produtos.",
};

export default function PilaresPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Onde vamos atuar</Eyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
            Cinco pilares permanentes
          </h1>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.title} index={i + 1} title={pillar.title} description={pillar.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>O que sai do papel</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
            Produtos permanentes do Instituto
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <div key={product.title} className="rounded-2xl border border-navy/10 p-6">
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-navy">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
