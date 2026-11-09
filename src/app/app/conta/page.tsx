"use client";

import { useState } from "react";
import { INSTITUTO_LABEL, SEDE_LABEL, type Dados } from "@/lib/proto/data";
import { resetProto, update, useSession } from "@/lib/proto/store";
import { CadastroForm } from "@/components/app/CadastroForm";
import { Btn, Card, Chip, EnvTag, PageHeader, SectionTitle, Toggle } from "@/components/app/ui";

export default function ContaPage() {
  const { state, persona } = useSession();
  const [editando, setEditando] = useState(false);

  function salvar(dados: Dados) {
    update((s) => ({ perfis: { ...s.perfis, [persona.id]: dados } }));
    setEditando(false);
  }
  const plano = state.plano[persona.id] ?? persona.instituto;
  const flag = (k: string, padrao = false) => state.flags[`${persona.id}:${k}`] ?? padrao;
  const set = (k: string, v: boolean) => update((s) => ({ flags: { ...s.flags, [`${persona.id}:${k}`]: v } }));

  return (
    <div>
      <PageHeader title="Minha conta" subtitle={`${persona.nome} · ${persona.email}`} />

      <SectionTitle>Meus dados</SectionTitle>
      <Card>
        {editando ? (
          <CadastroForm inicial={persona} rotulo="Salvar dados" onSubmit={salvar} onCancel={() => setEditando(false)} />
        ) : (
          <>
            <dl className="flex flex-col gap-3 text-sm">
              {[
                ["Nome", persona.nome],
                ["Telefone", persona.telefone],
                ["E-mail", persona.email],
                ["Sócio do Grêmio", persona.socio ? "Sim" : "Não"],
                ["Reside em", `${persona.cidade}/${persona.uf}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <Btn variant="ghost" onClick={() => setEditando(true)}>
                Editar dados
              </Btn>
            </div>
          </>
        )}
      </Card>

      <SectionTitle>Seus vínculos</SectionTitle>
      <Card>
        <ul className="flex flex-col gap-3">
          {persona.sede && (
            <li className="flex items-center justify-between">
              <EnvTag env="sede" />
              <span className="text-sm text-navy">
                {SEDE_LABEL[persona.sede]}
                {persona.cota ? ` · cota ${String(persona.cota).padStart(2, "0")}` : ""}
              </span>
            </li>
          )}
          <li className="flex items-center justify-between">
            <EnvTag env="instituto" />
            <span className="text-sm text-navy">{INSTITUTO_LABEL[plano]}</span>
          </li>
          {persona.movimento && (
            <li className="flex items-center justify-between">
              <EnvTag env="movimento" />
              <span className="text-sm text-navy">Membro</span>
            </li>
          )}
        </ul>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Uma conta pessoal pode reunir vários papéis sem expor dados entre as entidades.
        </p>
      </Card>

      <SectionTitle>Notificações e privacidade</SectionTitle>
      <Card className="divide-y divide-navy/10 !py-1">
        <Toggle
          checked={flag("push", true)}
          onChange={(v) => set("push", v)}
          label="Avisos de jogo e prazos"
          description="Lembretes de confirmação, votações abertas e cobranças."
        />
        <Toggle
          checked={flag("email")}
          onChange={(v) => set("email", v)}
          label="Novidades do Instituto por e-mail"
          description="Eventos, palestras e conteúdos."
        />
        {persona.movimento && (
          <Toggle
            checked={flag("consentimento", true)}
            onChange={(v) => set("consentimento", v)}
            label="Consentimento: participação no Movimento"
            description="Dado pessoal sensível. Fica separado dos demais cadastros e pode ser retirado a qualquer momento."
          />
        )}
      </Card>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chip tone="muted">Exportar meus dados</Chip>
        <Chip tone="muted">Excluir minha conta</Chip>
      </div>

      <SectionTitle>Demonstração</SectionTitle>
      <Card>
        <p className="text-xs leading-relaxed text-muted">
          Troque de perfil para ver como cada vínculo enxerga o app. As reservas, votos e sugestões ficam guardados neste
          aparelho.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Btn variant="dark" onClick={() => update(() => ({ personaId: null }))}>
            Trocar de perfil
          </Btn>
          <Btn variant="ghost" onClick={resetProto}>
            Zerar dados
          </Btn>
        </div>
      </Card>
    </div>
  );
}
