"use client";

import { useState } from "react";
import { DEBATES } from "@/lib/proto/data";
import { useSession } from "@/lib/proto/store";
import { ConselheirosList } from "@/components/app/ConselheirosList";
import { ComissoesConselho, GovernancaMovimento } from "@/components/app/MovimentoPublico";
import { Btn, Card, Chip, PageHeader, SectionTitle } from "@/components/app/ui";

type Aba = "Conselheiros" | "Comissões do Conselho" | "Governança do Movimento" | "Debates";

function Tabs({ abas, aba, onChange }: { abas: Aba[]; aba: Aba; onChange: (a: Aba) => void }) {
  return (
    <div role="tablist" className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1">
      {abas.map((a) => (
        <button
          key={a}
          type="button"
          role="tab"
          aria-selected={aba === a}
          onClick={() => onChange(a)}
          className={`min-h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-xs font-semibold ${
            aba === a ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/15"
          }`}
        >
          {a}
        </button>
      ))}
    </div>
  );
}

export default function MovimentoPage() {
  const { state, update, persona } = useSession();
  const [aba, setAba] = useState<Aba>("Conselheiros");

  const membro = persona.movimento;
  const abas: Aba[] = membro
    ? ["Conselheiros", "Comissões do Conselho", "Governança do Movimento", "Debates"]
    : ["Conselheiros", "Comissões do Conselho", "Governança do Movimento"];
  const votoKey = `${persona.id}:mov1`;
  const voto = state.votos[votoKey];
  const admissaoKey = `admissao:${persona.id}`;

  return (
    <div>
      <PageHeader
        env="movimento"
        title="Movimento"
        subtitle={
          membro
            ? "Quem atua no Conselho Deliberativo e na governança do Movimento (público) e, só para membros, os debates e votações internas."
            : "Área pública: quem atua no Conselho Deliberativo e na governança do Movimento. Debates e votações são restritos a membros admitidos."
        }
      />

      <Tabs abas={abas} aba={aba} onChange={setAba} />

      {aba === "Conselheiros" && (
        <>
          <SectionTitle>Conselheiros eleitos</SectionTitle>
          <ConselheirosList membro={membro} />

          {!membro && (
            <>
              <SectionTitle>Quer participar do Movimento?</SectionTitle>
              <Card>
                <p className="text-xs leading-relaxed text-muted">
                  Somente membros admitidos participam das discussões e votações internas. Você pode enviar sugestões a qualquer
                  momento pelo Banco de Ideias, sem acessar os debates.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {state.flags[admissaoKey] ? (
                    <Chip tone="espera">Pedido de admissão enviado</Chip>
                  ) : (
                    <Btn variant="dark" onClick={() => update((s) => ({ flags: { ...s.flags, [admissaoKey]: true } }))}>
                      Solicitar admissão
                    </Btn>
                  )}
                  <Btn variant="ghost" href="/app/ideias">
                    Banco de Ideias
                  </Btn>
                </div>
              </Card>
            </>
          )}
        </>
      )}

      {aba === "Comissões do Conselho" && (
        <>
          <SectionTitle>Comissões do Conselho Deliberativo</SectionTitle>
          <ComissoesConselho membro={membro} />
        </>
      )}

      {aba === "Governança do Movimento" && (
        <>
          <SectionTitle>Governança do Movimento</SectionTitle>
          <GovernancaMovimento />
        </>
      )}

      {membro && aba === "Debates" && (
        <>
          <SectionTitle>Votação em andamento</SectionTitle>
          <Card>
            <p className="text-sm font-semibold text-navy">Aprovar a pauta do próximo Conselho Deliberativo</p>
            <p className="mt-1 text-xs text-muted">Votação de membros · encerra em 4 dias</p>
            <div className="mt-3">
              {voto ? (
                <Chip tone="ok">Voto registrado ({voto === "sim" ? "a favor" : "contra"})</Chip>
              ) : (
                <div className="flex gap-2">
                  <Btn onClick={() => update((s) => ({ votos: { ...s.votos, [votoKey]: "sim" } }))}>A favor</Btn>
                  <Btn variant="ghost" onClick={() => update((s) => ({ votos: { ...s.votos, [votoKey]: "nao" } }))}>
                    Contra
                  </Btn>
                </div>
              )}
            </div>
          </Card>

          <SectionTitle>Debates</SectionTitle>
          <div className="flex flex-col gap-3">
            {DEBATES.map((d) => (
              <Card key={d.id}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-navy">{d.titulo}</p>
                  <Chip tone={d.status === "Aberto" ? "ok" : "muted"}>{d.status}</Chip>
                </div>
                <p className="mt-1 text-xs text-muted">{d.participantes} participantes</p>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-muted">
            A participação no Movimento é dado pessoal sensível (LGPD). No app real, a lista geral de membros fica isolada das
            demais entidades: nem a administração do Instituto ou da Sede consegue ver quem participa.
          </p>
        </>
      )}
    </div>
  );
}
