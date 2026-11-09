import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { LegacyTicks } from "@/components/LegacyMark";
import { asset } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Hub Legado Tricolor",
  description: "O espaço físico do Instituto: sede e espaço de convivência do Legado Tricolor.",
};

const SUMMARY = [
  "Espaço de convivência com bar, churrasqueira, área gourmet, sala de TV e espaço para podcast.",
  "Banheiro social no térreo.",
  "Ambiente integrado, moderno e acolhedor.",
  "Fachada moderna com identidade da torcida.",
  "Projeto pensado para receber amigos, eventos, gravações e transmissões.",
];

const ROOMS = [
  "Entrada",
  "Espaço Podcast / Gravações",
  "Sala / TV — 7,75 m²",
  "Bar",
  "Adega / Cervejeira",
  "Lavabo",
  "Área Gourmet",
  "Churrasqueira",
];

const VALUES = ["Legado", "Ética", "Transparência", "União", "Excelência", "Inovação", "Paixão pelo Grêmio"];

export default function HubPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>Instituto Grêmio do Futuro</Eyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
            Hub Legado Tricolor
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            A sede física do Instituto: um espaço de convivência para estudos, reuniões,
            benchmarking, produção de conhecimento e formação de lideranças.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-sm">
            <Image
              src={asset("/images/hub-futura-sede.png")}
              alt="Renders do projeto da futura sede do Hub Legado Tricolor: fachada, sala de convivência, espaço de podcast e vista 3D do térreo"
              width={1535}
              height={1024}
              className="w-full h-auto"
              sizes="(min-width: 1152px) 1152px, 100vw"
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Renders do projeto — a sede ainda está em fase de planejamento.
          </p>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Resumo do projeto
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {SUMMARY.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <LegacyTicks className="mt-1 h-4 w-7 shrink-0" />
                  <span className="text-navy">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-navy/10 bg-white p-6">
                <p className="font-mono text-2xl font-bold text-gremio">80 m²</p>
                <p className="mt-1 text-sm text-muted">Área do térreo</p>
              </div>
              <div className="rounded-2xl border border-navy/10 bg-white p-6">
                <p className="font-mono text-2xl font-bold text-gremio">80 m²</p>
                <p className="mt-1 text-sm text-muted">Área total construída</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-navy/10 bg-white p-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Planta baixa — térreo
            </h2>
            <div className="relative mt-6 flex flex-col gap-3 pl-6">
              <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-sky via-gremio to-navy" aria-hidden="true" />
              {ROOMS.map((room) => (
                <div key={room} className="relative flex items-center gap-3 rounded-lg bg-mist px-4 py-2.5">
                  <span className="absolute -left-6 h-2 w-2 rounded-full bg-navy" aria-hidden="true" />
                  <span className="text-sm text-navy">{room}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky">Propósito</h2>
              <p className="mt-3 text-lg leading-relaxed">Conectar, inspirar e transformar o Grêmio.</p>
            </div>
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky">Missão</h2>
              <p className="mt-3 leading-relaxed text-white/85">
                Produzir conhecimento, formar lideranças e promover a transformação
                institucional do Grêmio.
              </p>
            </div>
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky">Visão</h2>
              <p className="mt-3 leading-relaxed text-white/85">
                Ser referência em governança esportiva e contribuir para um Grêmio cada vez
                mais forte, competitivo e transparente.
              </p>
            </div>
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sky">Valores</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {VALUES.map((v) => (
                  <span key={v} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/85">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
