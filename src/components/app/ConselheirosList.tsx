"use client";

import { useState } from "react";
import { CONSELHEIROS } from "@/lib/proto/data";
import { Card, Chip } from "./ui";

const mandatos = [...new Set(CONSELHEIROS.map((c) => `${c.inicio}/${c.fim}`))].sort();
const cargos = [...new Set(CONSELHEIROS.flatMap((c) => c.cargos.map((x) => x.comissao)))].sort();

function FilterChip({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`min-h-9 rounded-full border px-3 text-xs font-semibold ${
        ativo ? "border-gremio bg-gremio/10 text-gremio" : "border-navy/15 bg-white text-navy"
      }`}
    >
      {children}
    </button>
  );
}

/** Lista pública de conselheiros eleitos. `membro` libera o vínculo com o Movimento (só para membros). */
export function ConselheirosList({ membro }: { membro: boolean }) {
  const [busca, setBusca] = useState("");
  const [mandato, setMandato] = useState("todos");
  const [cargo, setCargo] = useState("todos");

  const termo = busca.trim().toLowerCase();
  const lista = CONSELHEIROS.filter(
    (c) =>
      (!termo || c.nome.toLowerCase().includes(termo)) &&
      (mandato === "todos" || `${c.inicio}/${c.fim}` === mandato) &&
      (cargo === "todos" || c.cargos.some((x) => x.comissao === cargo)),
  ).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  return (
    <div>
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar conselheiro"
        aria-label="Buscar conselheiro"
        className="min-h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm outline-none focus:border-gremio"
      />

      <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Mandato</p>
      <div className="flex flex-wrap gap-2">
        <FilterChip ativo={mandato === "todos"} onClick={() => setMandato("todos")}>
          Todos
        </FilterChip>
        {mandatos.map((m) => (
          <FilterChip key={m} ativo={mandato === m} onClick={() => setMandato(m)}>
            {m}
          </FilterChip>
        ))}
      </div>

      <p className="mb-2 mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Cargo em comissão</p>
      <div className="flex flex-wrap gap-2">
        <FilterChip ativo={cargo === "todos"} onClick={() => setCargo("todos")}>
          Todos
        </FilterChip>
        {cargos.map((c) => (
          <FilterChip key={c} ativo={cargo === c} onClick={() => setCargo(c)}>
            {c}
          </FilterChip>
        ))}
      </div>

      <p className="mb-3 mt-5 text-xs text-muted" aria-live="polite">
        {lista.length} {lista.length === 1 ? "conselheiro" : "conselheiros"}
      </p>

      <div className="flex flex-col gap-3">
        {lista.map((c) => (
          <Card key={c.id}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-navy">{c.nome}</p>
              <span className="shrink-0 rounded-full bg-navy/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-navy">
                {c.inicio}/{c.fim}
              </span>
            </div>
            {(c.cargos.length > 0 || (membro && c.movimento)) && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.cargos.map((x) => (
                  <Chip key={x.comissao} tone="gremio">
                    {x.comissao}
                    {x.funcao === "Presidente" ? " · Presidente" : ""}
                  </Chip>
                ))}
                {membro && c.movimento && <Chip tone="navy">Do Movimento</Chip>}
              </div>
            )}
          </Card>
        ))}
        {lista.length === 0 && (
          <Card>
            <p className="text-sm text-muted">Nenhum conselheiro encontrado com esses filtros.</p>
          </Card>
        )}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted">
        Nomes de exemplo. No app real a lista vem de fonte oficial do clube, com link e data da última atualização.
        {membro && " O vínculo com o Movimento só aparece para membros e apenas para quem consentiu com a divulgação."}
      </p>
    </div>
  );
}
