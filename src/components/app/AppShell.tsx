"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LegacySymbol } from "@/components/LegacySymbol";
import { BASE_PATH } from "@/lib/base-path";
import { PERSONAS, INSTITUTO_LABEL, SEDE_LABEL, type Dados, type Persona } from "@/lib/proto/data";
import { resolvePersona, update, useHydrated, useProto } from "@/lib/proto/store";
import { CadastroForm } from "./CadastroForm";
import { Btn, Chip, Icon } from "./ui";

// Telas abertas a qualquer pessoa, mesmo sem cadastro.
const ROTAS_PUBLICAS = ["/app/instituto/manifesto"];

function ServiceWorkerRegistration() {
  useEffect(() => {
    // Em desenvolvimento o cache atrapalha as alterações; só registra na versão publicada.
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${BASE_PATH}/sw.js`, { scope: `${BASE_PATH}/app` }).catch(() => {});
  }, []);
  return null;
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-navy/10">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-mist shadow-2xl shadow-navy/20">
        {children}
      </div>
    </div>
  );
}

function vinculos(p: Persona) {
  const list: string[] = [];
  if (p.sede) list.push(`Sede · ${SEDE_LABEL[p.sede]}`);
  list.push(`Instituto · ${INSTITUTO_LABEL[p.instituto]}`);
  if (p.movimento) list.push("Movimento · Membro");
  return list;
}

function PersonaButton({ id, titulo, resumo, chips }: { id: string; titulo: string; resumo: string; chips: string[] }) {
  return (
    <button
      type="button"
      onClick={() => update(() => ({ personaId: id }))}
      className="rounded-2xl border border-navy/15 bg-white p-4 text-left transition-colors active:bg-mist"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-base font-bold text-navy">{titulo}</p>
        <Icon name="chevron" className="h-5 w-5 text-gremio" />
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted">{resumo}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {chips.map((v) => (
          <Chip key={v} tone="muted">
            {v}
          </Chip>
        ))}
      </div>
    </button>
  );
}

function Login() {
  const { state } = useProto();
  const [cadastrando, setCadastrando] = useState(false);
  const novo = state.perfis.novo;

  function criarCadastro(dados: Dados) {
    update((s) => ({ perfis: { ...s.perfis, novo: dados }, personaId: "novo" }));
  }

  return (
    <Frame>
      <div className="flex flex-1 flex-col bg-white px-6 pb-10 pt-[max(2.5rem,env(safe-area-inset-top))]">
        <LegacySymbol className="h-16 w-auto self-start" />
        <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gremio">
          Instituto Grêmio do Futuro
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-navy">
          Legado Tricolor
        </h1>

        {cadastrando ? (
          <>
            <h2 className="mt-6 font-display text-lg font-bold uppercase tracking-tight text-navy">Criar cadastro</h2>
            <p className="mb-5 mt-1 text-sm leading-relaxed text-muted">
              Todo cadastro começa como simpatizante, gratuito. Vínculos com a Sede ou o Movimento dependem de admissão.
            </p>
            <CadastroForm rotulo="Criar cadastro" comConsentimento onSubmit={criarCadastro} onCancel={() => setCadastrando(false)} />
          </>
        ) : (
          <>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Um único acesso para Sede, Instituto e Movimento. Cada pessoa vê somente os ambientes que o seu vínculo
              permite.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Btn onClick={() => setCadastrando(true)} full>
                Criar cadastro
              </Btn>
              <Btn variant="ghost" href="/app/instituto/manifesto" full>
                Ler o manifesto
              </Btn>
            </div>

            <h2 className="mb-3 mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Entrar como (demonstração)
            </h2>
            <div className="flex flex-col gap-3">
              {novo && (
                <PersonaButton
                  id="novo"
                  titulo={novo.nome}
                  resumo="O cadastro que você criou neste aparelho."
                  chips={["Instituto · Simpatizante"]}
                />
              )}
              {PERSONAS.map((p) => (
                <PersonaButton key={p.id} id={p.id} titulo={p.nome} resumo={p.resumo} chips={vinculos(p)} />
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Protótipo com dados fictícios, guardados apenas neste aparelho. No aplicativo real o acesso será por e-mail e
              código de confirmação.
            </p>
          </>
        )}
      </div>
    </Frame>
  );
}

function PublicFrame({ children }: { children: React.ReactNode }) {
  return (
    <Frame>
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-white pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-5 py-2.5">
          <Link href="/app" className="flex items-center gap-2.5">
            <LegacySymbol className="h-8 w-auto" />
            <span className="font-display text-sm font-extrabold uppercase tracking-tight text-navy">Legado Tricolor</span>
          </Link>
          <Btn href="/app" variant="dark">
            Entrar
          </Btn>
        </div>
      </header>
      <main className="flex-1 px-5 pb-12 pt-5">{children}</main>
    </Frame>
  );
}

function TopBar({ persona }: { persona: Persona }) {
  const palavras = persona.nome.split(/\s+/).filter(Boolean);
  const iniciais = (palavras.length > 1 ? palavras[0][0] + palavras[palavras.length - 1][0] : (palavras[0]?.[0] ?? "")).toUpperCase();
  return (
    <header className="sticky top-0 z-30 border-b border-navy/10 bg-white pt-[env(safe-area-inset-top)]">
      <div className="flex items-center justify-between px-5 py-2.5">
        <Link href="/app" className="flex items-center gap-2.5">
          <LegacySymbol className="h-8 w-auto" />
          <span className="font-display text-sm font-extrabold uppercase tracking-tight text-navy">Legado Tricolor</span>
        </Link>
        <div className="flex items-center gap-2">
          <Chip tone="espera">Protótipo</Chip>
          <Link
            href="/app/conta"
            aria-label="Minha conta"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-white"
          >
            {iniciais}
          </Link>
        </div>
      </div>
    </header>
  );
}

function BottomNav({ persona }: { persona: Persona }) {
  const pathname = usePathname();
  const tabs = [
    { href: "/app", label: "Início", icon: "home", exact: true },
    ...(persona.sede ? [{ href: "/app/sede", label: "Sede", icon: "sede", exact: false }] : []),
    { href: "/app/instituto", label: "Instituto", icon: "instituto", exact: false },
    { href: "/app/movimento", label: "Movimento", icon: "movimento", exact: false },
    { href: "/app/conta", label: "Conta", icon: "conta", exact: false },
  ];
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] border-t border-navy/10 bg-white pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="flex">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.href : pathname.startsWith(t.href);
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold ${
                  active ? "text-gremio" : "text-muted"
                }`}
              >
                <Icon name={t.icon} className="h-6 w-6" />
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const { state } = useProto();
  const pathname = usePathname();
  const persona = resolvePersona(state);
  const publica = ROTAS_PUBLICAS.some((r) => pathname.startsWith(r));

  let content: React.ReactNode;
  if (!hydrated) {
    content = (
      <Frame>
        <div className="flex flex-1 items-center justify-center bg-white">
          <LegacySymbol className="h-16 w-auto opacity-60" />
        </div>
      </Frame>
    );
  } else if (!persona) {
    content = publica ? <PublicFrame>{children}</PublicFrame> : <Login />;
  } else {
    content = (
      <Frame>
        <TopBar persona={persona} />
        <main className="flex-1 px-5 pb-28 pt-5">{children}</main>
        <BottomNav persona={persona} />
      </Frame>
    );
  }

  return (
    <>
      <ServiceWorkerRegistration />
      {content}
    </>
  );
}
