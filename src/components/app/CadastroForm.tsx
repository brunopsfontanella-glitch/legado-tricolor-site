"use client";

import { useRef, useState } from "react";
import { UFS, formatTelefone, validarCadastro, type ErrosCadastro, type FormCadastro } from "@/lib/cadastro";
import type { Dados } from "@/lib/proto/data";
import { Btn } from "./ui";

type Props = {
  inicial?: Dados;
  rotulo: string;
  /** Pede o aceite da política de privacidade (usado ao criar o cadastro). */
  comConsentimento?: boolean;
  onSubmit: (dados: Dados) => void;
  onCancel?: () => void;
};

const campo =
  "mt-1 min-h-11 w-full rounded-xl border bg-white px-3 text-sm font-normal outline-none focus:border-gremio aria-[invalid=true]:border-red-500";

function Erro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs font-semibold text-red-700">
      {texto}
    </p>
  );
}

export function CadastroForm({ inicial, rotulo, comConsentimento, onSubmit, onCancel }: Props) {
  const [f, setF] = useState<FormCadastro>({
    nome: inicial?.nome ?? "",
    telefone: inicial?.telefone ?? "",
    email: inicial?.email ?? "",
    socio: inicial ? inicial.socio : null,
    cidade: inicial?.cidade ?? "",
    uf: inicial?.uf ?? "",
    consentimento: false,
  });
  const [erros, setErros] = useState<ErrosCadastro>({});
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof FormCadastro>(k: K, v: FormCadastro[K]) => {
    setF((atual) => ({ ...atual, [k]: v }));
    if (erros[k as keyof ErrosCadastro]) setErros((e) => ({ ...e, [k]: undefined }));
  };

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const novos = validarCadastro(f, !!comConsentimento);
    setErros(novos);
    if (Object.keys(novos).length > 0) {
      // Leva o foco ao primeiro campo com problema, depois que o aria-invalid for aplicado.
      setTimeout(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    onSubmit({
      nome: f.nome.trim(),
      telefone: f.telefone,
      email: f.email.trim(),
      socio: f.socio === true,
      cidade: f.cidade.trim(),
      uf: f.uf,
    });
  }

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className="flex flex-col gap-4">
      <label className="block text-xs font-semibold text-navy">
        Nome completo
        <input
          value={f.nome}
          onChange={(e) => set("nome", e.target.value)}
          autoComplete="name"
          aria-invalid={!!erros.nome}
          aria-describedby={erros.nome ? "erro-nome" : undefined}
          className={`${campo} border-navy/15`}
        />
        <Erro id="erro-nome" texto={erros.nome} />
      </label>

      <label className="block text-xs font-semibold text-navy">
        Telefone (com DDD)
        <input
          value={f.telefone}
          onChange={(e) => set("telefone", formatTelefone(e.target.value))}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(51) 99999-9999"
          aria-invalid={!!erros.telefone}
          aria-describedby={erros.telefone ? "erro-telefone" : undefined}
          className={`${campo} border-navy/15`}
        />
        <Erro id="erro-telefone" texto={erros.telefone} />
      </label>

      <label className="block text-xs font-semibold text-navy">
        E-mail
        <input
          value={f.email}
          onChange={(e) => set("email", e.target.value)}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="voce@email.com"
          aria-invalid={!!erros.email}
          aria-describedby={erros.email ? "erro-email" : undefined}
          className={`${campo} border-navy/15`}
        />
        <Erro id="erro-email" texto={erros.email} />
      </label>

      <fieldset>
        <legend className="text-xs font-semibold text-navy">Você é sócio do Grêmio?</legend>
        <div className="mt-1 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Você é sócio do Grêmio?">
          {([true, false] as const).map((v) => (
            <button
              key={String(v)}
              type="button"
              role="radio"
              aria-checked={f.socio === v}
              onClick={() => set("socio", v)}
              className={`min-h-11 rounded-xl border px-3 text-sm font-semibold ${
                f.socio === v ? "border-gremio bg-gremio/10 text-gremio" : "border-navy/15 text-navy"
              }`}
            >
              {v ? "Sim, sou sócio" : "Não sou sócio"}
            </button>
          ))}
        </div>
        <Erro id="erro-socio" texto={erros.socio} />
      </fieldset>

      <div>
        <p className="text-xs font-semibold text-navy">Onde você mora</p>
        <div className="mt-1 grid grid-cols-[1fr_5.5rem] gap-2">
          <label className="block text-xs font-semibold text-navy">
            <span className="sr-only">Cidade</span>
            <input
              value={f.cidade}
              onChange={(e) => set("cidade", e.target.value)}
              autoComplete="address-level2"
              placeholder="Cidade"
              aria-invalid={!!erros.cidade}
              aria-describedby={erros.cidade ? "erro-cidade" : undefined}
              className={`${campo} !mt-0 border-navy/15`}
            />
          </label>
          <label className="block text-xs font-semibold text-navy">
            <span className="sr-only">Estado</span>
            <select
              value={f.uf}
              onChange={(e) => set("uf", e.target.value)}
              autoComplete="address-level1"
              aria-invalid={!!erros.uf}
              aria-describedby={erros.uf ? "erro-uf" : undefined}
              className={`${campo} !mt-0 border-navy/15`}
            >
              <option value="">UF</option>
              {UFS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>
        </div>
        <Erro id="erro-cidade" texto={erros.cidade} />
        <Erro id="erro-uf" texto={erros.uf} />
        <p className="mt-1 text-[11px] text-muted">Só cidade e estado. Não pedimos endereço completo.</p>
      </div>

      {comConsentimento && (
        <div>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-navy">
            <input
              type="checkbox"
              checked={!!f.consentimento}
              onChange={(e) => set("consentimento", e.target.checked)}
              aria-invalid={!!erros.consentimento}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[#005daa]"
            />
            <span>
              Li e aceito a Política de Privacidade e autorizo o Legado Tricolor a usar estes dados para entrar em contato
              comigo. <span className="text-muted">(Texto final a definir com o encarregado de dados.)</span>
            </span>
          </label>
          <Erro id="erro-consentimento" texto={erros.consentimento} />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Btn type="submit">{rotulo}</Btn>
        {onCancel && (
          <Btn variant="ghost" onClick={onCancel}>
            Cancelar
          </Btn>
        )}
      </div>
    </form>
  );
}
