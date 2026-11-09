"use client";

import { COMISSOES_CONSELHO, COMISSOES_MOVIMENTO, DIRETORIA_MOVIMENTO, GESTAO_MOVIMENTO, type Conselheiro } from "@/lib/proto/data";
import { Card, Chip } from "./ui";

function Pessoa({ c, membro }: { c: Conselheiro; membro: boolean }) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-sm text-navy">{c.nome}</span>
      <span className="flex shrink-0 items-center gap-1.5">
        {membro && c.movimento && <Chip tone="navy">Do Movimento</Chip>}
        <span className="rounded-full bg-navy/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-navy">
          {c.inicio}/{c.fim}
        </span>
      </span>
    </li>
  );
}

/** Quem atua em cada comissão do Conselho Deliberativo do Grêmio. Informação pública. */
export function ComissoesConselho({ membro }: { membro: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      {COMISSOES_CONSELHO.map((com) => (
        <Card key={com.nome}>
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">{com.nome}</p>
            <Chip tone="muted">{(com.presidente ? 1 : 0) + com.membros.length} integrantes</Chip>
          </div>
          <ul className="mt-2 divide-y divide-navy/10">
            {com.presidente && (
              <li className="py-2.5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gremio">Presidente</p>
                <ul>
                  <Pessoa c={com.presidente} membro={membro} />
                </ul>
              </li>
            )}
            {com.membros.length > 0 && (
              <li className="py-2.5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Membros</p>
                <ul className="divide-y divide-navy/10">
                  {com.membros.map((m) => (
                    <Pessoa key={m.id} c={m} membro={membro} />
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </Card>
      ))}
      <p className="text-[11px] leading-relaxed text-muted">
        Composição de exemplo, derivada dos cargos de cada conselheiro. No app real vem de fonte oficial do clube, com data de
        atualização.
      </p>
    </div>
  );
}

/** Quem atua na governança do Movimento: diretoria e comissões. */
export function GovernancaMovimento() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">Diretoria</p>
        <Chip tone="gremio">Gestão {GESTAO_MOVIMENTO}</Chip>
      </div>
      <Card className="mt-3 !p-0">
        <ul className="divide-y divide-navy/10">
          {DIRETORIA_MOVIMENTO.map((d) => (
            <li key={d.cargo} className="flex items-center justify-between gap-3 p-4">
              <span className="text-sm font-semibold text-navy">{d.nome}</span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gremio">{d.cargo}</span>
            </li>
          ))}
        </ul>
      </Card>

      <p className="mb-3 mt-6 font-display text-sm font-bold uppercase tracking-tight text-navy">Comissões do Movimento</p>
      <div className="flex flex-col gap-3">
        {COMISSOES_MOVIMENTO.map((c) => (
          <Card key={c.id}>
            <p className="text-sm font-semibold text-navy">{c.nome}</p>
            <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gremio">Coordenação</p>
            <p className="text-sm text-navy">{c.coordenacao}</p>
            <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Membros</p>
            <p className="text-sm text-navy">{c.membros.join(", ")}</p>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-muted">
        Nomes de exemplo. Quem ocupa cargo na governança do Movimento passa a ter o vínculo divulgado, por isso cada nome só é
        publicado com consentimento. Instituto e Movimento podem ter as mesmas lideranças no início, mas mantêm contas,
        cadastros e decisões separados.
      </p>
    </div>
  );
}
