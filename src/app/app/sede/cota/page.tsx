"use client";

import { RULES, brl } from "@/lib/proto/data";
import { useSession } from "@/lib/proto/store";
import { Btn, Card, Chip, PageHeader, SectionTitle, Unavailable } from "@/components/app/ui";

const RECIBOS = [
  { id: "r1", titulo: "Entrada inicial (aporte + 12 meses de manutenção)", valor: 21000, data: "Contrato assinado" },
  { id: "r2", titulo: "Churrasco · jogo anterior", valor: 135, data: "Pix" },
];

export default function CotaPage() {
  const { state, update, persona } = useSession();
  if (persona.sede !== "cotista") return <Unavailable />;

  const anuidadeKey = `anuidade:${persona.id}`;
  const transfKey = `transferencia:${persona.id}`;
  const mensalAnual = RULES.mensalidade * 12;

  return (
    <div>
      <PageHeader env="sede" back="/app/sede" title={`Cota nº ${String(persona.cota).padStart(2, "0")}`} subtitle={persona.nome} />

      <Card>
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">Situação</p>
          <Chip tone="ok">Em dia</Chip>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Primeiro ano com manutenção incluída na entrada. A partir do segundo ano: {brl(RULES.mensalidade)}/mês por Pix
          Automático ou cartão.
        </p>
      </Card>

      <SectionTitle>Antecipar o ano</SectionTitle>
      <Card>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted line-through">{brl(mensalAnual)} em 12 parcelas</p>
            <p className="font-mono text-2xl font-bold text-gremio">{brl(RULES.mensalidadeAnual)}</p>
          </div>
          <Chip tone="gremio">10% de desconto</Chip>
        </div>
        <div className="mt-3">
          {state.flags[anuidadeKey] ? (
            <Chip tone="ok">Anuidade antecipada (simulação)</Chip>
          ) : (
            <Btn variant="dark" onClick={() => update((s) => ({ flags: { ...s.flags, [anuidadeKey]: true } }))}>
              Pagar anuidade
            </Btn>
          )}
        </div>
      </Card>

      <SectionTitle>Recibos</SectionTitle>
      <Card className="!p-0">
        <ul className="divide-y divide-navy/10">
          {RECIBOS.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-semibold text-navy">{r.titulo}</p>
                <p className="text-xs text-muted">{r.data}</p>
              </div>
              <p className="font-mono text-sm font-bold text-navy">{brl(r.valor)}</p>
            </li>
          ))}
        </ul>
      </Card>

      <SectionTitle>Transferência de participação</SectionTitle>
      <Card>
        <p className="text-xs leading-relaxed text-muted">
          A saída abre uma janela de até seis meses para encontrar um interessado, interno ou indicado, sujeito às regras de
          admissão. Valores previstos para quem entra: {brl(20000)} ao cedente, {brl(5000)} à sociedade da Sede e {brl(1000)} de
          manutenção inicial, totalizando {brl(26000)}.
        </p>
        <p className="mt-2 text-[11px] text-amber-800">
          Regra ainda em validação contratual (inclusive a incidência da manutenção em transferências).
        </p>
        <div className="mt-3">
          {state.flags[transfKey] ? (
            <Chip tone="espera">Solicitação registrada · janela de 6 meses aberta</Chip>
          ) : (
            <Btn variant="ghost" onClick={() => update((s) => ({ flags: { ...s.flags, [transfKey]: true } }))}>
              Solicitar saída
            </Btn>
          )}
        </div>
      </Card>
    </div>
  );
}
