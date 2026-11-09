import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Governança — Legado Tricolor",
  description: "Como o Instituto se organiza: Conselho de Legado, Diretoria Executiva, Comitês e Hub.",
};

const DIRECTORSHIPS = ["Governança", "Desenvolvimento", "Relações Institucionais", "Comunicação", "Formação de Lideranças"];

const Connector = () => <div className="mx-auto h-8 w-px bg-navy/20" aria-hidden="true" />;

export default function GovernancaPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Como vamos nos organizar</Eyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
            Organograma
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Estrutura pensada para durar além de qualquer gestão: princípios guardados por um
            conselho, estratégia executada por uma diretoria, e conhecimento produzido pelos
            comitês e pelo Hub.
          </p>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md rounded-2xl bg-navy px-8 py-6 text-center text-white shadow-lg shadow-navy/20">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">Conselho de Legado</h2>
              <p className="mt-1 text-sm text-sky/90">Guardião dos princípios</p>
            </div>

            <Connector />

            <div className="w-full max-w-md rounded-2xl border-2 border-gremio bg-white px-8 py-6 text-center shadow-sm">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-navy">Diretor Executivo</h2>
              <p className="mt-1 text-sm text-muted">Execução da estratégia</p>
            </div>

            <Connector />

            <div className="w-full border-t border-navy/15 pt-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {DIRECTORSHIPS.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-navy/10 bg-white px-4 py-5 text-center"
                  >
                    <p className="font-mono text-xs font-semibold uppercase tracking-wide text-gremio">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Connector />

            <div className="grid w-full gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-navy/10 bg-white p-7">
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-navy">
                  Comitês Permanentes
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Produção técnica e propostas.
                </p>
              </div>
              <div className="rounded-2xl border border-navy/10 bg-white p-7">
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-navy">
                  Hub Legado Tricolor
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Estudos, reuniões, benchmarking, produção de conhecimento e formação de
                  lideranças.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
