"use client";

import { DOCUMENTOS, JOGOS, NOTICIAS } from "@/lib/proto/data";
import { useSession } from "@/lib/proto/store";
import { Btn, Card, Chip, Icon, PageHeader, SectionTitle } from "@/components/app/ui";

export default function GremioPage() {
  const { persona } = useSession();
  return (
    <div>
      <PageHeader
        back="/app"
        title="Grêmio em Dia"
        subtitle="Calendário, notícias e documentos oficiais. Conteúdo público, visível para todos."
      />

      <SectionTitle>Próximas partidas</SectionTitle>
      <div className="flex flex-col gap-3">
        {JOGOS.map((j) => (
          <Card key={j.id}>
            <p className="text-sm font-semibold text-navy">{j.titulo}</p>
            <p className="mt-0.5 text-xs text-muted">{j.data}</p>
            {j.sede && persona.sede === "cotista" && (
              <div className="mt-3">
                <Btn variant="ghost" href={j.id === "j1" ? "/app/sede/reservar" : undefined} disabled={j.id !== "j1"}>
                  {j.id === "j1" ? "Reservar na Sede" : "Reservas abrem em breve"}
                </Btn>
              </div>
            )}
          </Card>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-muted">Partidas de exemplo. No app real vêm de uma fonte oficial de calendário.</p>

      <SectionTitle>Notícias</SectionTitle>
      <Card className="!p-0">
        <ul className="divide-y divide-navy/10">
          {NOTICIAS.map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-semibold text-navy">{n.titulo}</p>
                <p className="mt-0.5 text-xs text-muted">{n.fonte}</p>
              </div>
              <Icon name="chevron" className="h-5 w-5 shrink-0 text-gremio" />
            </li>
          ))}
        </ul>
      </Card>
      <p className="mt-2 text-[11px] leading-relaxed text-muted">
        Formato: título, fonte e link para o veículo original. Sem copiar o texto das matérias, respeitando licenças.
      </p>

      <SectionTitle>Documentos oficiais</SectionTitle>
      <Card className="!p-0">
        <ul className="divide-y divide-navy/10">
          {DOCUMENTOS.map((d) => (
            <li key={d} className="flex items-center justify-between gap-3 p-4 text-sm text-navy">
              {d}
              <Chip tone="muted">Link</Chip>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
