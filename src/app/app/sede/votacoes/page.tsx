"use client";

import { DESPESAS_SEED, FLUXO_LABEL, RULES, brl, type Despesa } from "@/lib/proto/data";
import { statusDespesa, useSession } from "@/lib/proto/store";
import { Btn, Card, Chip, PageHeader, ProgressBar, Unavailable } from "@/components/app/ui";

function DespesaCard({ d }: { d: Despesa }) {
  const { state, update, persona } = useSession();
  const votoKey = `${persona.id}:${d.id}`;
  const meuVoto = state.votos[votoKey];
  const registrados = Object.entries(state.votos).filter(([k]) => k.endsWith(`:${d.id}`));
  const sim = d.sim + registrados.filter(([, v]) => v === "sim").length;
  const nao = d.nao + registrados.filter(([, v]) => v === "nao").length;
  const efetiva = { ...d, sim, nao };
  const status = statusDespesa(efetiva);
  const aberta = d.fluxo === "unanimidade" && nao === 0 && sim < RULES.cotistasTotal && d.prazo !== "encerrada";

  function votar(v: "sim" | "nao") {
    update((s) => ({ votos: { ...s.votos, [votoKey]: v } }));
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-navy">{d.titulo}</p>
        <p className="font-mono text-sm font-bold text-gremio">{brl(d.valor)}</p>
      </div>
      <p className="mt-1 text-xs text-muted">{FLUXO_LABEL[d.fluxo]}</p>
      <div className="mt-2">
        <Chip tone={status.tom}>{status.label}</Chip>
      </div>

      {d.fluxo === "unanimidade" && (
        <div className="mt-3">
          <ProgressBar value={sim} max={RULES.cotistasTotal} label="Votos favoráveis" />
          <p className="mt-1.5 text-[11px] text-muted">
            {sim} de {RULES.cotistasTotal} favoráveis · {nao} contra · prazo: {d.prazo}. Ausência de voto impede a aprovação.
          </p>
        </div>
      )}

      {aberta && persona.sede === "cotista" && (
        <div className="mt-3">
          {meuVoto ? (
            <p className="text-xs font-semibold text-emerald-800">
              Seu voto ({meuVoto === "sim" ? "a favor" : "contra"}) foi registrado com data e hora.{" "}
              <button type="button" className="underline" onClick={() => update((s) => {
                const votos = { ...s.votos };
                delete votos[votoKey];
                return { votos };
              })}>
                Desfazer (demo)
              </button>
            </p>
          ) : (
            <div className="flex gap-2">
              <Btn onClick={() => votar("sim")}>A favor</Btn>
              <Btn variant="ghost" onClick={() => votar("nao")}>Contra</Btn>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default function VotacoesPage() {
  const { state, persona } = useSession();
  if (!persona.sede) return <Unavailable />;

  const todas = [...state.despesasNovas, ...DESPESAS_SEED];

  return (
    <div>
      <PageHeader
        env="sede"
        back="/app/sede"
        title="Despesas e votações"
        subtitle="Até R$ 500 o administrador executa; até R$ 2.000 o representante legal aprova; acima disso todos os cotistas votam."
      />
      <div className="flex flex-col gap-3">
        {todas.map((d) => (
          <DespesaCard key={d.id} d={d} />
        ))}
      </div>
      <p className="mt-5 text-[11px] leading-relaxed text-muted">
        Limites e quórum são parâmetros. O documento prevê unanimidade acima de R$ 2.000; com 20 a 25 cotistas, uma ausência
        trava a decisão. Vale discutir quórum qualificado com prazo e exceção para reparos urgentes de segurança.
      </p>
    </div>
  );
}
