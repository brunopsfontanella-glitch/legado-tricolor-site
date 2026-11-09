"use client";

import { BASE_PATH } from "@/lib/base-path";
import { MANIFESTO_PARAGRAPHS } from "@/lib/content";
import { useProto } from "@/lib/proto/store";
import { Btn, Card, PageHeader } from "@/components/app/ui";

// Parágrafos exibidos como destaque, iguais aos da página do site.
const DESTAQUES = new Set([3, 8, 14]);

export default function ManifestoAppPage() {
  const { state } = useProto();
  const logado = !!state.personaId;

  function compartilhar() {
    const texto = `Manifesto do Legado Tricolor — Instituto Grêmio do Futuro: ${window.location.origin}${BASE_PATH}/manifesto/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <PageHeader
        env="instituto"
        back={logado ? "/app/instituto" : "/app"}
        title="Manifesto do Legado Tricolor"
        subtitle="Instituto Grêmio do Futuro · leitura aberta a todos"
      />

      <Card className="!p-5">
        <article>
          {MANIFESTO_PARAGRAPHS.map((p, i) =>
            DESTAQUES.has(i) ? (
              <p key={i} className="my-5 border-l-2 border-gremio pl-4 font-display text-base font-semibold leading-snug text-navy">
                {p}
              </p>
            ) : (
              <p key={i} className="mb-4 text-[15px] leading-relaxed text-navy/90">
                {p}
              </p>
            ),
          )}
          <div className="mt-6 border-t border-navy/10 pt-5 text-center">
            <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">Legado Tricolor</p>
            <p className="mt-0.5 text-xs text-muted">Instituto Grêmio do Futuro</p>
            <p className="mt-3 text-sm text-gremio">Governança para um Grêmio competitivo por décadas.</p>
          </div>
        </article>
      </Card>

      <div className="mt-5 flex flex-col gap-3">
        <Btn variant="ghost" onClick={compartilhar} full>
          Compartilhar por WhatsApp
        </Btn>
        {!logado && (
          <Btn href="/app" full>
            Criar cadastro
          </Btn>
        )}
      </div>
    </div>
  );
}
