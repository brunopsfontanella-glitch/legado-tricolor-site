import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { LegacyTicks } from "@/components/LegacyMark";

export const metadata: Metadata = {
  title: "Financeiro Transparente — Legado Tricolor",
  description: "O compromisso do Legado Tricolor com a transparência financeira.",
};

const REPORT_CARDS = [
  { title: "Receitas", description: "Contribuições de sócios-fundadores e apoiadores do Instituto." },
  { title: "Despesas", description: "Custos de operação, produção de conhecimento e eventos." },
  { title: "Prestação de Contas Anual", description: "Publicada no quarto trimestre de cada ano, junto ao planejamento seguinte." },
];

export default function FinanceiroPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Transparência</Eyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
            Financeiro transparente
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Praticamos internamente a governança que defendemos para o Grêmio — e isso inclui
            prestar contas com clareza sobre como os recursos do Instituto são obtidos e
            usados.
          </p>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {REPORT_CARDS.map((card) => (
              <div key={card.title} className="rounded-2xl border border-navy/10 bg-white p-7">
                <span className="inline-block rounded-full bg-navy/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-muted">
                  Em breve
                </span>
                <h3 className="mt-4 font-display text-base font-bold uppercase tracking-tight text-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-7">
            <LegacyTicks className="mt-1 h-4 w-7 shrink-0" />
            <p className="text-sm leading-relaxed text-navy">
              O primeiro relatório financeiro será publicado ao final do primeiro exercício
              do Instituto, conforme o{" "}
              <Link href="/calendario" className="font-semibold text-gremio hover:text-navy">
                calendário estratégico
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
