import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Downloads — Legado Tricolor",
  description: "Cadernos, relatórios e publicações do Legado Tricolor para download.",
};

const DOCUMENTS = [
  { title: "Manifesto do Legado Tricolor", description: "O texto fundador do Instituto.", status: "read", href: "/manifesto" },
  { title: "Cadernos Legado", description: "Publicações temáticas trimestrais sobre governança e gestão." },
  { title: "Relatório Anual do Grêmio", description: "Diagnóstico institucional produzido pelo Instituto." },
  { title: "Índice de Governança Gremista", description: "Indicador anual de práticas de governança do clube." },
  { title: "Estatuto do Instituto", description: "O documento que rege o Legado Tricolor." },
  { title: "Livro da Fundação", description: "A conversa entre os fundadores que deu origem ao Instituto." },
];

export default function DownloadsPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Transparência</Eyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
            Conteúdos para download
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            À medida que o Instituto produz seus primeiros materiais, eles são publicados
            aqui. Enquanto isso, veja o que já está disponível.
          </p>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DOCUMENTS.map((doc) => {
              const isReady = doc.status === "read";
              return (
                <div
                  key={doc.title}
                  className={`flex flex-col justify-between rounded-2xl border p-6 ${
                    isReady ? "border-gremio bg-white" : "border-navy/10 bg-white/60"
                  }`}
                >
                  <div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                        isReady ? "bg-gremio/10 text-gremio" : "bg-navy/5 text-muted"
                      }`}
                    >
                      {isReady ? "Disponível" : "Em breve"}
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold uppercase tracking-tight text-navy">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{doc.description}</p>
                  </div>
                  {isReady && doc.href && (
                    <Link
                      href={doc.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gremio hover:text-navy"
                    >
                      Ler agora →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
