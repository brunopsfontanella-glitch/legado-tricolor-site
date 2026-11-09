"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { JOGO, RULES, brl, type Churrasco, type Pessoa } from "@/lib/proto/data";
import { ocupacao, totalCapacidadeLivre, useSession } from "@/lib/proto/store";
import { Btn, Card, Chip, PageHeader, ProgressBar, SectionTitle, Unavailable } from "@/components/app/ui";

const CHURRASCO_LABEL: Record<Churrasco, string> = {
  sede: `Churrasco da Sede · ${brl(RULES.precoChurrasco)}`,
  propria: "Levo minha carne",
  nao: "Não participo do churrasco",
};

// Usos na temporada (fictício): o rodízio dá prioridade a quem usou menos.
const USO_TEMPORADA: Record<string, number> = { carlos: 3, roberto: 5 };

function PixBox({ valor }: { valor: number }) {
  return (
    <div className="mt-3 rounded-xl border border-navy/10 bg-mist p-3 text-center">
      <div className="mx-auto w-fit rounded-lg bg-white p-2">
        <QRCodeSVG value={`PIX-EXEMPLO|LEGADO-TRICOLOR|${valor.toFixed(2)}`} size={132} />
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted">
        Código de exemplo, não é um Pix real. No app real o valor é cobrado pelo gateway da Sede e a baixa é automática.
      </p>
    </div>
  );
}

function ReservaForm() {
  const { state, update, persona } = useSession();
  const saved = state.reservas[persona.id];
  const [editando, setEditando] = useState(!saved);
  const [pessoas, setPessoas] = useState<Pessoa[]>(saved?.pessoas ?? [{ nome: persona.nome, churrasco: "sede" }]);
  const [pagamento, setPagamento] = useState<"pix" | "dia">(saved?.pagamento ?? "pix");
  const [novo, setNovo] = useState("");

  const outros = ocupacao(state, persona.id);
  const livres = RULES.lotacao - outros - pessoas.length;
  const convidados = pessoas.length - 1;
  const total = pessoas.filter((p) => p.churrasco === "sede").length * RULES.precoChurrasco;
  const filaKey = `fila:${persona.id}`;
  const naFila = state.flags[filaKey];
  const uso = USO_TEMPORADA[persona.id] ?? 0;

  function addConvidado() {
    const nome = novo.trim();
    if (!nome || convidados >= RULES.convidadosPorCota || livres <= 0) return;
    setPessoas([...pessoas, { nome, churrasco: "sede" }]);
    setNovo("");
  }

  function confirmar() {
    update((s) => ({
      reservas: { ...s.reservas, [persona.id]: { pessoas, pagamento, pago: saved?.pago ?? false } },
    }));
    setEditando(false);
  }

  function cancelar() {
    update((s) => {
      const reservas = { ...s.reservas };
      delete reservas[persona.id];
      return { reservas };
    });
    setPessoas([{ nome: persona.nome, churrasco: "sede" }]);
    setEditando(true);
  }

  function pagarPix() {
    if (!saved) return;
    update((s) => ({ reservas: { ...s.reservas, [persona.id]: { ...saved, pago: true } } }));
  }

  const vagasExtras = (
    <Card className="mt-4">
      <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">Vagas extras</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        O prazo de prioridade ({RULES.prazoHoras}h antes do jogo) terminou. {totalCapacidadeLivre(state)} lugar(es) livre(s) são
        distribuídos em rodízio: quem usou menos a Sede na temporada passa na frente. É mais fácil de auditar do que um sorteio.
      </p>
      {naFila ? (
        <p className="mt-3 text-sm font-semibold text-emerald-800">
          Você está na fila · posição {uso + 1}º ({uso} uso(s) na temporada)
        </p>
      ) : (
        <div className="mt-3">
          <Btn variant="ghost" onClick={() => update((s) => ({ flags: { ...s.flags, [filaKey]: true } }))}>
            Entrar na fila de vagas extras
          </Btn>
        </div>
      )}
    </Card>
  );

  // Prazo encerrado sem reserva: só a fila de vagas extras.
  if (state.prazoEncerrado && !saved) {
    return (
      <div>
        <PageHeader env="sede" back="/app/sede" title="Reservar jogo" subtitle={`${JOGO.titulo} · ${JOGO.data}`} />
        <Card>
          <Chip tone="erro">Prazo encerrado</Chip>
          <p className="mt-3 text-sm leading-relaxed text-navy">
            As reservas prioritárias fecharam {RULES.prazoHoras} horas antes da partida.
          </p>
        </Card>
        {vagasExtras}
      </div>
    );
  }

  // Reserva já feita: resumo e convites.
  if (saved && !editando) {
    const totalSalvo = saved.pessoas.filter((p) => p.churrasco === "sede").length * RULES.precoChurrasco;
    const cota = persona.cota ?? 0;
    const texto = `Convite para a Sede do Legado Tricolor — ${JOGO.titulo}, ${JOGO.data} às ${JOGO.hora}. Apresente o QR Code do seu convite na entrada.`;
    return (
      <div>
        <PageHeader env="sede" back="/app/sede" title="Reserva confirmada" subtitle={`${JOGO.titulo} · ${JOGO.data} · ${JOGO.hora}`} />

        <Card>
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">Quem vai</p>
            <Chip tone="ok">{saved.pessoas.length} pessoa(s)</Chip>
          </div>
          <ul className="mt-3 divide-y divide-navy/10">
            {saved.pessoas.map((p, i) => (
              <li key={`${p.nome}-${i}`} className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm font-semibold text-navy">
                  {p.nome} {i === 0 && <span className="font-normal text-muted">(você)</span>}
                </span>
                <span className="text-right text-xs text-muted">{CHURRASCO_LABEL[p.churrasco]}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="mt-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">Churrasco</p>
            <p className="font-mono text-lg font-bold text-gremio">{brl(totalSalvo)}</p>
          </div>
          {totalSalvo === 0 ? (
            <p className="mt-2 text-xs text-muted">Nenhum valor a pagar.</p>
          ) : saved.pagamento === "dia" ? (
            <p className="mt-2 text-xs text-muted">Pagamento no dia do jogo, direto com o administrador.</p>
          ) : saved.pago ? (
            <div className="mt-2">
              <Chip tone="ok">Pago via Pix</Chip>
            </div>
          ) : (
            <>
              <PixBox valor={totalSalvo} />
              <div className="mt-3">
                <Btn onClick={pagarPix} full>
                  Simular pagamento do Pix
                </Btn>
              </div>
            </>
          )}
        </Card>

        <SectionTitle>Convites digitais</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {saved.pessoas.map((p, i) => (
            <Card key={`${p.nome}-qr-${i}`} className="text-center">
              <div className="mx-auto w-fit rounded-lg bg-white p-1">
                <QRCodeSVG value={`LT|${JOGO.id}|C${cota}|P${i}|${p.nome}`} size={104} />
              </div>
              <p className="mt-2 truncate text-xs font-semibold text-navy">{p.nome}</p>
              <p className="text-[10px] text-muted">{i === 0 ? "Cotista" : "Convidado"}</p>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(texto)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-navy/20 bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-navy active:bg-mist"
          >
            Compartilhar por WhatsApp
          </a>
        </div>

        {state.prazoEncerrado ? (
          <>
            <Card className="mt-4">
              <Chip tone="erro">Prazo encerrado</Chip>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Alterações no churrasco e nos convidados agora só pelo administrador.
              </p>
            </Card>
            {vagasExtras}
          </>
        ) : (
          <div className="mt-5 flex gap-3">
            <Btn variant="ghost" onClick={() => setEditando(true)}>
              Editar reserva
            </Btn>
            <Btn variant="ghost" onClick={cancelar}>
              Cancelar
            </Btn>
          </div>
        )}
      </div>
    );
  }

  // Formulário.
  return (
    <div>
      <PageHeader env="sede" back="/app/sede" title="Reservar jogo" subtitle={`${JOGO.titulo} · ${JOGO.data} · ${JOGO.hora}`} />

      <Card>
        <div className="mb-1.5 flex items-baseline justify-between text-xs">
          <span className="font-semibold text-navy">Lugares</span>
          <span className="text-muted">
            {outros + pessoas.length} de {RULES.lotacao}
          </span>
        </div>
        <ProgressBar value={outros + pessoas.length} max={RULES.lotacao} label="Ocupação com a sua reserva" />
        <p className="mt-2 text-xs text-muted">
          Prioridade até {RULES.prazoHoras}h antes do jogo. Depois, as vagas não usadas viram vagas extras em rodízio.
        </p>
      </Card>

      <SectionTitle>Convidados ({convidados} de {RULES.convidadosPorCota})</SectionTitle>
      <Card>
        <ul className="divide-y divide-navy/10">
          {pessoas.map((p, i) => (
            <li key={`${p.nome}-${i}`} className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-sm font-semibold text-navy">
                {p.nome} {i === 0 && <span className="font-normal text-muted">(você)</span>}
              </span>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => setPessoas(pessoas.filter((_, idx) => idx !== i))}
                  className="min-h-9 px-2 text-xs font-semibold text-red-700"
                >
                  Remover
                </button>
              )}
            </li>
          ))}
        </ul>
        {convidados < RULES.convidadosPorCota && livres > 0 ? (
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addConvidado();
            }}
          >
            <input
              value={novo}
              onChange={(e) => setNovo(e.target.value)}
              placeholder="Nome do convidado"
              aria-label="Nome do convidado"
              className="min-h-11 min-w-0 flex-1 rounded-xl border border-navy/15 px-3 text-sm outline-none focus:border-gremio"
            />
            <Btn type="submit" variant="dark" disabled={!novo.trim()}>
              Adicionar
            </Btn>
          </form>
        ) : (
          <p className="mt-3 text-xs font-semibold text-amber-800">
            {livres <= 0
              ? "Lotação atingida: não é possível adicionar mais pessoas. Depois do prazo você poderá pedir vaga extra."
              : "Limite de convidados da cota atingido."}
          </p>
        )}
      </Card>

      <SectionTitle>Churrasco por pessoa</SectionTitle>
      <Card>
        <ul className="flex flex-col gap-3">
          {pessoas.map((p, i) => (
            <li key={`${p.nome}-ch-${i}`}>
              <label className="block text-xs font-semibold text-navy">
                {p.nome}
                <select
                  value={p.churrasco}
                  onChange={(e) =>
                    setPessoas(pessoas.map((x, idx) => (idx === i ? { ...x, churrasco: e.target.value as Churrasco } : x)))
                  }
                  className="mt-1 min-h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm font-normal outline-none focus:border-gremio"
                >
                  {(Object.keys(CHURRASCO_LABEL) as Churrasco[]).map((k) => (
                    <option key={k} value={k}>
                      {CHURRASCO_LABEL[k]}
                    </option>
                  ))}
                </select>
              </label>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-muted">Bebidas não estão incluídas: cada pessoa leva as suas.</p>
      </Card>

      <SectionTitle>Pagamento</SectionTitle>
      <Card>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Total do churrasco</span>
          <span className="font-mono text-xl font-bold text-gremio">{brl(total)}</span>
        </div>
        {total > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(["pix", "dia"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setPagamento(k)}
                aria-pressed={pagamento === k}
                className={`min-h-11 rounded-xl border px-3 text-sm font-semibold ${
                  pagamento === k ? "border-gremio bg-gremio/10 text-gremio" : "border-navy/15 text-navy"
                }`}
              >
                {k === "pix" ? "Pix pelo app" : "No dia do jogo"}
              </button>
            ))}
          </div>
        )}
      </Card>

      <div className="mt-5">
        <Btn onClick={confirmar} full>
          {saved ? "Salvar alterações" : "Confirmar reserva"}
        </Btn>
      </div>
    </div>
  );
}

export default function ReservarPage() {
  const { persona } = useSession();
  if (persona.sede !== "cotista") return <Unavailable />;
  return <ReservaForm key={persona.id} />;
}
