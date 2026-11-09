"use client";

import Link from "next/link";
import { CONTEUDOS, EVENTOS, INSTITUTO_LABEL, PLANOS, type InstitutoRole } from "@/lib/proto/data";
import { useSession } from "@/lib/proto/store";
import { Btn, Card, Chip, Icon, PageHeader, SectionTitle } from "@/components/app/ui";

export default function InstitutoPage() {
  const { state, update, persona } = useSession();
  const atual: InstitutoRole = state.plano[persona.id] ?? persona.instituto;
  const conviteKey = `convite:${persona.id}`;
  const apoiador = atual !== "simpatizante";

  return (
    <div>
      <PageHeader
        env="instituto"
        title="Instituto"
        subtitle="Palestras, conteúdos e projetos sobre governança, gestão esportiva e a história do clube."
      />

      <Link href="/app/instituto/manifesto" className="mb-4 block rounded-2xl bg-navy p-4 text-white active:bg-navy-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-sky">Leitura aberta a todos</p>
            <p className="mt-1 font-display text-base font-bold uppercase tracking-tight">Manifesto do Instituto</p>
          </div>
          <Icon name="chevron" className="h-5 w-5 shrink-0 text-sky" />
        </div>
      </Link>

      <Card>
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">Seu vínculo</p>
          <Chip tone={apoiador ? "ok" : "muted"}>{INSTITUTO_LABEL[atual]}</Chip>
        </div>
        {!apoiador && (
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Você tem acesso gratuito a parte dos conteúdos. Apoie o Instituto para liberar os benefícios dos planos.
          </p>
        )}
      </Card>

      <SectionTitle>Planos de apoio</SectionTitle>
      <div className="flex flex-col gap-3">
        {PLANOS.map((p) => {
          const ativo = atual === p.id;
          return (
            <Card key={p.id} className={ativo ? "border-gremio bg-gremio/5" : ""}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">{p.nome}</p>
                  <p className="mt-0.5 text-xs text-muted">{p.nota}</p>
                </div>
                <p className="font-mono text-sm font-bold text-gremio">{p.preco}</p>
              </div>
              <div className="mt-3">
                {ativo ? (
                  <Chip tone="ok">Plano atual</Chip>
                ) : (
                  <Btn variant="ghost" onClick={() => update((s) => ({ plano: { ...s.plano, [persona.id]: p.id } }))}>
                    Escolher
                  </Btn>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted">
        Simulação: no app real a cobrança recorrente é feita por Pix Automático ou cartão, na conta do Instituto, e o apoio
        não dá direito de voto no Movimento nem acesso automático à Sede.
      </p>

      <SectionTitle>Próximos eventos</SectionTitle>
      <div className="flex flex-col gap-3">
        {EVENTOS.map((e) => {
          const key = `evento:${persona.id}:${e.id}`;
          const inscrito = state.flags[key];
          return (
            <Card key={e.id}>
              <p className="text-sm font-semibold text-navy">{e.titulo}</p>
              <p className="mt-0.5 text-xs text-muted">
                {e.quando} · {e.onde}
              </p>
              <div className="mt-3">
                {inscrito ? (
                  <Chip tone="ok">Inscrição confirmada</Chip>
                ) : (
                  <Btn variant="ghost" onClick={() => update((s) => ({ flags: { ...s.flags, [key]: true } }))}>
                    Inscrever-se
                  </Btn>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <SectionTitle>Conteúdos</SectionTitle>
      <Card className="!p-0">
        <ul className="divide-y divide-navy/10">
          {CONTEUDOS.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-semibold text-navy">{c.titulo}</p>
                <p className="text-xs text-muted">{c.tema}</p>
              </div>
              <Chip tone="muted">{c.tipo}</Chip>
            </li>
          ))}
        </ul>
      </Card>

      {!persona.sede && (
        <>
          <SectionTitle>Sede em dia de jogo</SectionTitle>
          <Card>
            <p className="text-xs leading-relaxed text-muted">
              Apoiar o Instituto não dá direito de frequentar a Sede. O acesso em dia de jogo é só por convite de um cotista,
              que aprova a solicitação pelo app.
            </p>
            <div className="mt-3">
              {state.flags[conviteKey] ? (
                <Chip tone="espera">Pedido enviado aos cotistas</Chip>
              ) : (
                <Btn variant="ghost" onClick={() => update((s) => ({ flags: { ...s.flags, [conviteKey]: true } }))}>
                  Pedir convite a um cotista
                </Btn>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
