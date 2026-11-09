"use client";

import { useState } from "react";
import { UFS, formatTelefone } from "@/lib/cadastro";

const PROFILES = ["Torcedor ou apoiador", "Empresário ou executivo", "Conselheiro ou ex-dirigente", "Pesquisador ou especialista", "Outro"];

const input =
  "rounded-lg border border-navy/15 px-4 py-2.5 text-sm font-normal text-navy outline-none focus:border-gremio";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [telefone, setTelefone] = useState("");

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gremio/30 bg-gremio/5 p-8 text-center">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-navy">
          Mensagem recebida
        </h3>
        <p className="mt-2 text-muted">
          Obrigado pelo interesse no Legado Tricolor. Nossa equipe vai entrar em contato em
          breve.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
        Nome completo
        <input required name="name" type="text" autoComplete="name" className={input} placeholder="Seu nome completo" />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
          Telefone (com DDD)
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            minLength={14}
            title="Informe o telefone com DDD"
            value={telefone}
            onChange={(e) => setTelefone(formatTelefone(e.target.value))}
            className={input}
            placeholder="(51) 99999-9999"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
          E-mail
          <input required name="email" type="email" autoComplete="email" className={input} placeholder="voce@email.com" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
          Você é sócio do Grêmio?
          <select required name="socio" defaultValue="" className={input}>
            <option value="" disabled>Selecione</option>
            <option value="sim">Sim, sou sócio</option>
            <option value="nao">Não sou sócio</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
          Perfil
          <select name="profile" defaultValue="" className={input}>
            <option value="" disabled>Selecione uma opção</option>
            {PROFILES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p className="text-sm font-semibold text-navy">Onde você mora</p>
        <div className="mt-2 grid grid-cols-[1fr_6rem] gap-3">
          <input required name="city" type="text" autoComplete="address-level2" aria-label="Cidade" className={input} placeholder="Cidade" />
          <select required name="uf" defaultValue="" autoComplete="address-level1" aria-label="Estado" className={input}>
            <option value="" disabled>UF</option>
            {UFS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <p className="mt-1.5 text-xs text-muted">Apenas cidade e estado, sem endereço completo.</p>
      </div>

      <label className="flex flex-col gap-2 text-sm font-semibold text-navy">
        Mensagem (opcional)
        <textarea
          name="message"
          rows={4}
          className={`resize-none ${input}`}
          placeholder="Conte um pouco sobre como você gostaria de contribuir com o Legado Tricolor."
        />
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-gremio px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-navy"
      >
        Enviar
      </button>
    </form>
  );
}
