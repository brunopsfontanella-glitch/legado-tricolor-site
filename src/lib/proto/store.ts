"use client";

import { useSyncExternalStore } from "react";
import {
  NOVO_BASE,
  PERSONAS,
  RULES,
  SEED,
  type Dados,
  type Despesa,
  type Ideia,
  type InstitutoRole,
  type Persona,
  type Reserva,
} from "./data";

// Estado do protótipo guardado no próprio aparelho (localStorage).
// No produto real, isto vira banco de dados com permissões por entidade.
export type ProtoState = {
  personaId: string | null;
  /** Dados do cadastro: criados no app ("novo") ou editados pelo próprio usuário. */
  perfis: Record<string, Dados>;
  reservas: Record<string, Reserva>;
  prazoEncerrado: boolean;
  votos: Record<string, "sim" | "nao">;
  despesasNovas: Despesa[];
  plano: Record<string, InstitutoRole>;
  ideias: Ideia[];
  flags: Record<string, boolean>;
};

const KEY = "legado-proto-v1";

const DEFAULT_STATE: ProtoState = {
  personaId: null,
  perfis: {},
  reservas: {},
  prazoEncerrado: false,
  votos: {},
  despesasNovas: [],
  plano: {},
  ideias: [],
  flags: {},
};

let state: ProtoState = DEFAULT_STATE;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    // armazenamento indisponível: segue com o estado padrão
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return DEFAULT_STATE;
}

export function update(fn: (s: ProtoState) => Partial<ProtoState>) {
  load();
  state = { ...state, ...fn(state) };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignora falha ao gravar
  }
  listeners.forEach((l) => l());
}

export function resetProto() {
  update(() => ({ ...DEFAULT_STATE }));
}

export function useProto() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { state: s, update };
}

/** Falso no servidor e na hidratação; verdadeiro depois, quando o estado do aparelho já pode ser lido. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Pessoa logada: perfil de demonstração ou cadastro novo, com os dados que ela mesma informou. */
export function resolvePersona(s: ProtoState): Persona | null {
  if (!s.personaId) return null;
  const base = s.personaId === NOVO_BASE.id ? NOVO_BASE : PERSONAS.find((p) => p.id === s.personaId);
  if (!base) return null;
  return { ...base, ...s.perfis[s.personaId] };
}

export function useSession() {
  const { state: s } = useProto();
  const persona = resolvePersona(s) as Persona;
  return { state: s, update, persona };
}

// ---- Cálculos derivados ----

export function todasReservas(s: ProtoState, exceto?: string) {
  return Object.entries(s.reservas)
    .filter(([id]) => id !== exceto)
    .map(([, r]) => r);
}

/** Pessoas confirmadas para o jogo, sem contar a reserva de `exceto`. */
export function ocupacao(s: ProtoState, exceto?: string) {
  const outras = todasReservas(s, exceto).reduce((sum, r) => sum + r.pessoas.length, 0);
  return SEED.cotistas + SEED.convidados + outras;
}

export function resumoChurrasco(s: ProtoState) {
  const base = { sede: SEED.sede, propria: SEED.propria, nao: SEED.nao, pagos: SEED.pagos };
  for (const r of todasReservas(s)) {
    for (const p of r.pessoas) base[p.churrasco] += 1;
    if (r.pago) base.pagos += r.pessoas.filter((p) => p.churrasco === "sede").length;
  }
  return base;
}

export function totalCapacidadeLivre(s: ProtoState) {
  return Math.max(0, RULES.lotacao - ocupacao(s));
}

export function statusDespesa(d: Despesa, total = RULES.cotistasTotal) {
  if (d.fluxo === "admin") return { label: "Registrada pelo administrador", tom: "ok" as const };
  if (d.fluxo === "representante") return { label: "Aguardando o representante legal", tom: "espera" as const };
  if (d.nao > 0) return { label: "Rejeitada", tom: "erro" as const };
  if (d.sim >= total) return { label: "Aprovada por unanimidade", tom: "ok" as const };
  return { label: `Em votação · ${d.sim}/${total}`, tom: "espera" as const };
}
