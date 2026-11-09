"use client";

import { useState } from "react";
import { IDEIAS_SEED, IDEIA_ETAPAS, type Ideia } from "@/lib/proto/data";
import { useSession } from "@/lib/proto/store";
import { Btn, Card, Chip, PageHeader, SectionTitle } from "@/components/app/ui";

function Etapas({ etapa }: { etapa: number }) {
  return (
    <ol className="mt-3 flex gap-1" aria-label="Andamento da sugestão">
      {IDEIA_ETAPAS.map((nome, i) => (
        <li key={nome} className="flex-1">
          <div className={`h-1.5 rounded-full ${i <= etapa ? "bg-gremio" : "bg-navy/10"}`} />
          <p className={`mt-1 text-[9px] leading-tight ${i === etapa ? "font-bold text-navy" : "text-muted"}`}>{nome}</p>
        </li>
      ))}
    </ol>
  );
}

function IdeiaCard({ ideia }: { ideia: Ideia }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-navy">{ideia.titulo}</p>
        <Chip tone="muted">{ideia.autor}</Chip>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted">{ideia.texto}</p>
      <Etapas etapa={ideia.etapa} />
    </Card>
  );
}

export default function IdeiasPage() {
  const { state, update, persona } = useSession();
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  function enviar() {
    if (!titulo.trim() || !texto.trim()) return;
    update((s) => ({
      ideias: [
        { id: `u${s.ideias.length + 1}`, titulo: titulo.trim(), texto: texto.trim(), etapa: 0, autor: persona.nome.split(" ")[0] },
        ...s.ideias,
      ],
    }));
    setTitulo("");
    setTexto("");
  }

  return (
    <div>
      <PageHeader
        back="/app"
        title="Banco de Ideias Tricolores"
        subtitle="Qualquer pessoa cadastrada pode sugerir. O debate interno é restrito a membros do Movimento."
      />

      <Card>
        <label className="block text-xs font-semibold text-navy">
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-xl border border-navy/15 px-3 text-sm font-normal outline-none focus:border-gremio"
          />
        </label>
        <label className="mt-3 block text-xs font-semibold text-navy">
          Sua sugestão
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={4}
            className="mt-1 w-full resize-none rounded-xl border border-navy/15 px-3 py-2.5 text-sm font-normal outline-none focus:border-gremio"
          />
        </label>
        <div className="mt-3">
          <Btn onClick={enviar} disabled={!titulo.trim() || !texto.trim()}>
            Enviar sugestão
          </Btn>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Fluxo: recebida, triagem, discussão, votação e encaminhamento pelos conselheiros, com acompanhamento do resultado.
        </p>
      </Card>

      {state.ideias.length > 0 && (
        <>
          <SectionTitle>Suas sugestões</SectionTitle>
          <div className="flex flex-col gap-3">
            {state.ideias.map((i) => (
              <IdeiaCard key={i.id} ideia={i} />
            ))}
          </div>
        </>
      )}

      <SectionTitle>Em andamento</SectionTitle>
      <div className="flex flex-col gap-3">
        {IDEIAS_SEED.map((i) => (
          <IdeiaCard key={i.id} ideia={i} />
        ))}
      </div>
    </div>
  );
}
