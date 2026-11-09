import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { CALENDAR } from "@/lib/content";

export const metadata: Metadata = {
  title: "Calendário Anual — Legado Tricolor",
  description: "O calendário estratégico do Legado Tricolor, trimestre a trimestre.",
};

export default function CalendarioPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Como isso acontece ano a ano</Eyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
            Calendário estratégico
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Um ciclo anual recorrente, com entregas fixas em cada trimestre — para que o
            Instituto produza resultado de forma previsível, não apenas em anos de eleição.
          </p>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="relative flex flex-col gap-10 pl-10 sm:pl-14">
            <div className="absolute bottom-4 left-[13px] top-4 w-px bg-gradient-to-b from-navy via-gremio to-sky sm:left-[19px]" aria-hidden="true" />
            {CALENDAR.map((q) => (
              <div key={q.quarter} className="relative">
                <div className="absolute -left-10 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-navy font-mono text-[11px] font-bold text-white sm:-left-14 sm:h-10 sm:w-10 sm:text-xs">
                  {q.quarter}
                </div>
                <div className="rounded-2xl border border-navy/10 bg-white p-7">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gremio">
                    {q.period}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {q.items.map((item) => (
                      <li key={item} className="flex gap-3 text-navy">
                        <span className="text-muted">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
