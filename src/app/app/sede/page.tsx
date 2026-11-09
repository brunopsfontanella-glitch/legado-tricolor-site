"use client";

import Link from "next/link";
import { DESPESAS_SEED, JOGO, PERSONAS, RULES } from "@/lib/proto/data";
import { ocupacao, useSession } from "@/lib/proto/store";
import { Btn, Card, Chip, Icon, LinkBtn, PageHeader, ProgressBar, SectionTitle, Unavailable } from "@/components/app/ui";

const digitos = (tel: string) => tel.replace(/\D/g, "");
// Administrador operacional atual da Sede (no app real, vem do cadastro de funções).
const admin = PERSONAS.find((p) => p.sede === "admin");

function MenuLink({ href, title, hint, badge }: { href: string; title: string; hint: string; badge?: string }) {
  return (
    <Link href={href} className="flex items-center justify-between gap-3 rounded-2xl border border-navy/10 bg-white p-4 active:bg-mist">
      <div>
        <p className="text-sm font-semibold text-navy">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{hint}</p>
      </div>
      <div className="flex items-center gap-2">
        {badge && <Chip tone="espera">{badge}</Chip>}
        <Icon name="chevron" className="h-5 w-5 text-gremio" />
      </div>
    </Link>
  );
}

export default function SedePage() {
  const { state, persona } = useSession();
  if (!persona.sede) return <Unavailable />;

  const reserva = state.reservas[persona.id];
  const ocup = ocupacao(state);
  const aVotar = [...DESPESAS_SEED, ...state.despesasNovas].filter(
    (d) => d.fluxo === "unanimidade" && d.sim < RULES.cotistasTotal && !state.votos[`${persona.id}:${d.id}`],
  ).length;

  return (
    <div>
      <PageHeader env="sede" title="Sede" subtitle="Jogos, convidados, cota e decisões dos cotistas." />

      <Card>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gremio">Próximo jogo</p>
        <p className="mt-1 font-display text-lg font-bold text-navy">{JOGO.titulo}</p>
        <p className="text-sm text-muted">
          {JOGO.data} · {JOGO.hora} · {JOGO.local}
        </p>
        <div className="mt-4">
          <div className="mb-1.5 flex items-baseline justify-between text-xs">
            <span className="font-semibold text-navy">Lugares reservados</span>
            <span className="text-muted">
              {ocup} de {RULES.lotacao}
            </span>
          </div>
          <ProgressBar value={ocup} max={RULES.lotacao} label="Ocupação da Sede" />
          <p className="mt-2 text-[11px] leading-relaxed text-muted">
            Lotação de exemplo. No app real ela vem do projeto de prevenção contra incêndio e funciona como trava rígida.
          </p>
        </div>
        {persona.sede === "cotista" && (
          <div className="mt-4 flex items-center justify-between gap-3">
            {reserva ? <Chip tone="ok">Presença confirmada · {reserva.pessoas.length} pessoa(s)</Chip> : <Chip tone="espera">Sem confirmação</Chip>}
            <Btn href="/app/sede/reservar" variant={reserva ? "ghost" : "primary"}>
              {reserva ? "Ver reserva" : "Reservar"}
            </Btn>
          </div>
        )}
      </Card>

      {admin && (
        <>
          <SectionTitle>Administrador da Sede</SectionTitle>
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-base font-bold text-navy">{admin.nome}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  Abre e fecha a Sede, organiza jogos, reservas, limpeza, churrasco e despesas.
                </p>
              </div>
              {persona.sede === "admin" && <Chip tone="gremio">Você</Chip>}
            </div>
            <dl className="mt-3 flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Telefone</dt>
                <dd className="font-semibold text-navy">{admin.telefone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">E-mail</dt>
                <dd className="font-semibold text-navy">{admin.email}</dd>
              </div>
            </dl>
            {persona.sede === "cotista" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <LinkBtn href={`tel:+55${digitos(admin.telefone)}`}>Ligar</LinkBtn>
                <LinkBtn href={`https://wa.me/55${digitos(admin.telefone)}`} variant="primary" newTab>
                  WhatsApp
                </LinkBtn>
                <LinkBtn href={`mailto:${admin.email}`}>E-mail</LinkBtn>
              </div>
            )}
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              Indicado pelo idealizador no primeiro ano; depois, escolhido pelos cotistas em votação.
            </p>
          </Card>
        </>
      )}

      <SectionTitle>Menu da Sede</SectionTitle>
      <div className="flex flex-col gap-3">
        {persona.sede === "admin" && (
          <MenuLink href="/app/sede/admin" title="Painel do administrador" hint="Jogo do dia, churrasco e despesas" />
        )}
        {persona.sede === "cotista" && (
          <MenuLink href="/app/sede/cota" title="Minha cota" hint="Mensalidade, recibos e transferência" />
        )}
        <MenuLink
          href="/app/sede/votacoes"
          title="Despesas e votações"
          hint="Quem aprova o quê, com registro auditável"
          badge={persona.sede === "cotista" && aVotar > 0 ? `${aVotar} para votar` : undefined}
        />
      </div>
    </div>
  );
}
