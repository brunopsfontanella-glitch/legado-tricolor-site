"use client";

import Link from "next/link";
import { INSTITUTO_LABEL, JOGO, RULES, type Persona } from "@/lib/proto/data";
import { ocupacao, useSession } from "@/lib/proto/store";
import { InstallBanner } from "@/components/app/InstallBanner";
import { Btn, Card, Chip, EnvTag, Icon, SectionTitle, type Env } from "@/components/app/ui";

function EnvCard({ env, href, title, children }: { env: Env; href: string; title: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block rounded-2xl border border-navy/10 bg-white p-4 transition-colors active:bg-mist">
      <div className="flex items-center justify-between">
        <EnvTag env={env} />
        <Icon name="chevron" className="h-5 w-5 text-gremio" />
      </div>
      <p className="mt-3 font-display text-base font-bold uppercase tracking-tight text-navy">{title}</p>
      <div className="mt-1 text-sm leading-relaxed text-muted">{children}</div>
    </Link>
  );
}

function SedeSummary({ persona }: { persona: Persona }) {
  const { state } = useSession();
  const reserva = state.reservas[persona.id];
  if (persona.sede === "admin") return <>Painel do jogo, despesas e reservas do dia.</>;
  return reserva ? (
    <>Presença confirmada para {JOGO.data.toLowerCase()} com {reserva.pessoas.length - 1} convidado(s).</>
  ) : (
    <>Você ainda não confirmou presença no próximo jogo.</>
  );
}

export default function AppHome() {
  const { state, persona } = useSession();
  const reserva = state.reservas[persona.id];
  const plano = state.plano[persona.id] ?? persona.instituto;
  const primeiroNome = persona.nome.split(" ")[0];

  return (
    <div>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gremio">Bem-vindo</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-navy">Olá, {primeiroNome}</h1>

      <div className="mt-4">
        <InstallBanner />
      </div>

      {persona.sede === "cotista" && !reserva && (
        <Card className="border-gremio/30 bg-gremio/5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gremio">Próximo jogo</p>
          <p className="mt-1 font-display text-lg font-bold text-navy">{JOGO.titulo}</p>
          <p className="text-sm text-muted">
            {JOGO.data} · {JOGO.hora} · {JOGO.local}
          </p>
          <p className="mt-2 text-xs text-muted">
            {ocupacao(state)} de {RULES.lotacao} lugares já reservados.
          </p>
          <div className="mt-3">
            <Btn href="/app/sede/reservar" full>
              Confirmar presença
            </Btn>
          </div>
        </Card>
      )}

      <SectionTitle>Seus ambientes</SectionTitle>
      <div className="flex flex-col gap-3">
        {persona.sede && (
          <EnvCard env="sede" href="/app/sede" title={persona.sede === "admin" ? "Painel da Sede" : "Jogos, convidados e cota"}>
            <SedeSummary persona={persona} />
          </EnvCard>
        )}
        <EnvCard env="instituto" href="/app/instituto" title="Apoio, eventos e conteúdos">
          {INSTITUTO_LABEL[plano]}. Eventos, conteúdos e apoio.
        </EnvCard>
        {persona.movimento && (
          <EnvCard env="movimento" href="/app/movimento" title="Debates e votações">
            2 debates abertos e 1 votação em andamento.
          </EnvCard>
        )}
      </div>

      <SectionTitle>Para todos</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        <Link href="/app/instituto/manifesto" className="col-span-2 rounded-2xl bg-navy p-4 text-white active:bg-navy-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-sky">Leitura aberta</p>
              <p className="mt-1 font-display text-base font-bold uppercase tracking-tight">Manifesto do Instituto</p>
              <p className="mt-1 text-xs text-white/75">O Grêmio não começou conosco. E não terminará conosco.</p>
            </div>
            <Icon name="chevron" className="h-5 w-5 shrink-0 text-sky" />
          </div>
        </Link>
        <Link href="/app/gremio" className="rounded-2xl border border-navy/10 bg-white p-4 active:bg-mist">
          <Icon name="news" className="h-6 w-6 text-gremio" />
          <p className="mt-2 font-display text-sm font-bold uppercase tracking-tight text-navy">Grêmio em Dia</p>
          <p className="mt-1 text-xs text-muted">Jogos, notícias e documentos oficiais.</p>
        </Link>
        <Link href="/app/ideias" className="rounded-2xl border border-navy/10 bg-white p-4 active:bg-mist">
          <Icon name="bulb" className="h-6 w-6 text-gremio" />
          <p className="mt-2 font-display text-sm font-bold uppercase tracking-tight text-navy">Banco de Ideias</p>
          <p className="mt-1 text-xs text-muted">Envie sugestões e acompanhe o andamento.</p>
        </Link>
        <Link href="/app/movimento" className="col-span-2 rounded-2xl border border-navy/10 bg-white p-4 active:bg-mist">
          <div className="flex items-center justify-between">
            <div>
              <Icon name="movimento" className="h-6 w-6 text-gremio" />
              <p className="mt-2 font-display text-sm font-bold uppercase tracking-tight text-navy">Conselheiros eleitos</p>
              <p className="mt-1 text-xs text-muted">Quem são, mandato e cargos em comissão.</p>
            </div>
            <Icon name="chevron" className="h-5 w-5 text-gremio" />
          </div>
        </Link>
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        <Chip tone="muted">Dados fictícios</Chip>
      </p>
    </div>
  );
}
