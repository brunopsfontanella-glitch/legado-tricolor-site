"use client";

import { useState } from "react";
import { FLUXO_LABEL, JOGO, RULES, SEED, brl, fluxoDe } from "@/lib/proto/data";
import { ocupacao, resumoChurrasco, todasReservas, useSession } from "@/lib/proto/store";
import { Btn, Card, Chip, PageHeader, ProgressBar, SectionTitle, Toggle, Unavailable } from "@/components/app/ui";

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl bg-mist p-3">
      <p className="font-mono text-xl font-bold text-gremio">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-navy">{label}</p>
      {hint && <p className="text-[11px] text-muted">{hint}</p>}
    </div>
  );
}

const PARAMETROS = [
  ["Lotação autorizada", `${RULES.lotacao} pessoas (exemplo)`],
  ["Convidados por cota", `${RULES.convidadosPorCota}`],
  ["Prazo de prioridade", `${RULES.prazoHoras}h antes do jogo`],
  ["Churrasco por pessoa", brl(RULES.precoChurrasco)],
  ["Despesa até", `${brl(RULES.limiteAdmin)} · administrador`],
  ["Despesa até", `${brl(RULES.limiteRepresentante)} · representante legal`],
  ["Despesa acima", "unanimidade dos cotistas"],
];

function AdminPanel() {
  const { state, update } = useSession();
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [kg, setKg] = useState(String(RULES.kgPorPessoa));

  const reservas = todasReservas(state);
  const cotistas = SEED.cotistas + reservas.length;
  const convidados = SEED.convidados + reservas.reduce((s, r) => s + r.pessoas.length - 1, 0);
  const ocup = ocupacao(state);
  const ch = resumoChurrasco(state);
  const esperado = ch.sede * RULES.precoChurrasco;
  const recebido = ch.pagos * RULES.precoChurrasco;
  const kgNum = Number(kg.replace(",", ".")) || 0;

  const valorNum = Number(valor.replace(/\./g, "").replace(",", ".")) || 0;
  const fluxo = valorNum > 0 ? fluxoDe(valorNum) : null;

  function registrar() {
    if (!descricao.trim() || valorNum <= 0) return;
    const f = fluxoDe(valorNum);
    update((s) => ({
      despesasNovas: [
        { id: `n${s.despesasNovas.length + 1}`, titulo: descricao.trim(), valor: valorNum, fluxo: f, sim: 0, nao: 0, prazo: "5 dias" },
        ...s.despesasNovas,
      ],
    }));
    setValor("");
    setDescricao("");
  }

  return (
    <div>
      <PageHeader env="sede" back="/app/sede" title="Painel do administrador" subtitle={`${JOGO.titulo} · ${JOGO.data}`} />

      <Card>
        <div className="mb-1.5 flex items-baseline justify-between text-xs">
          <span className="font-semibold text-navy">Ocupação</span>
          <span className="text-muted">
            {ocup} de {RULES.lotacao}
          </span>
        </div>
        <ProgressBar value={ocup} max={RULES.lotacao} label="Ocupação" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Stat label="Cotistas" value={String(cotistas)} hint={`de ${RULES.cotistasTotal}`} />
          <Stat label="Convidados" value={String(convidados)} />
        </div>
      </Card>

      <SectionTitle>Churrasco</SectionTitle>
      <Card>
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Da Sede" value={String(ch.sede)} />
          <Stat label="Levam carne" value={String(ch.propria)} />
          <Stat label="Não vão" value={String(ch.nao)} />
        </div>
        <dl className="mt-4 flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Valor esperado</dt>
            <dd className="font-mono font-bold text-navy">{brl(esperado)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Recebido</dt>
            <dd className="font-mono font-bold text-emerald-800">{brl(recebido)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Pendente</dt>
            <dd className="font-mono font-bold text-amber-800">{brl(esperado - recebido)}</dd>
          </div>
        </dl>
        <label className="mt-4 block text-xs font-semibold text-navy">
          Carne por pessoa (kg, parâmetro de exemplo)
          <input
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            inputMode="decimal"
            className="mt-1 min-h-11 w-full rounded-xl border border-navy/15 px-3 text-sm font-normal outline-none focus:border-gremio"
          />
        </label>
        <p className="mt-3 text-sm text-navy">
          Previsão de compra: <strong className="font-mono">{(ch.sede * kgNum).toFixed(1).replace(".", ",")} kg</strong>
        </p>
      </Card>

      <SectionTitle>Registrar despesa</SectionTitle>
      <Card>
        <label className="block text-xs font-semibold text-navy">
          Descrição
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex.: Reposição de gás"
            className="mt-1 min-h-11 w-full rounded-xl border border-navy/15 px-3 text-sm font-normal outline-none focus:border-gremio"
          />
        </label>
        <label className="mt-3 block text-xs font-semibold text-navy">
          Valor (R$)
          <input
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            inputMode="decimal"
            placeholder="0,00"
            className="mt-1 min-h-11 w-full rounded-xl border border-navy/15 px-3 text-sm font-normal outline-none focus:border-gremio"
          />
        </label>
        {fluxo && (
          <p className="mt-3 text-xs leading-relaxed text-navy">
            <Chip tone={fluxo === "admin" ? "ok" : "espera"}>{FLUXO_LABEL[fluxo]}</Chip>
          </p>
        )}
        <div className="mt-3">
          <Btn onClick={registrar} disabled={!descricao.trim() || valorNum <= 0}>
            Registrar
          </Btn>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Falta definir a regra contra fracionamento de despesas (somar compras do mesmo fornecedor no mês) e a exceção para
          reparos urgentes de segurança.
        </p>
      </Card>

      <SectionTitle>Simulação</SectionTitle>
      <Card className="!py-1">
        <Toggle
          checked={state.prazoEncerrado}
          onChange={(v) => update(() => ({ prazoEncerrado: v }))}
          label={`Prazo de ${RULES.prazoHoras}h encerrado`}
          description="Liga o modo pós-prazo: cotistas deixam de editar a reserva e passam a disputar vagas extras em rodízio."
        />
      </Card>

      <SectionTitle>Regras configuráveis</SectionTitle>
      <Card className="!p-0">
        <ul className="divide-y divide-navy/10">
          {PARAMETROS.map(([k, v], i) => (
            <li key={`${k}-${i}`} className="flex justify-between gap-3 p-3 text-xs">
              <span className="text-muted">{k}</span>
              <span className="text-right font-semibold text-navy">{v}</span>
            </li>
          ))}
        </ul>
      </Card>
      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        No produto real, estes valores ficam em uma tela de parâmetros, com registro de quem alterou e quando.
      </p>
    </div>
  );
}

export default function AdminPage() {
  const { persona } = useSession();
  if (persona.sede !== "admin") return <Unavailable />;
  return <AdminPanel />;
}
