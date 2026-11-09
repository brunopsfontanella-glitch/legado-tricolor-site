import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { LegacySymbol } from "@/components/LegacySymbol";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Faça Parte — Legado Tricolor",
  description: "Faça parte do Legado Tricolor: contribua com o futuro do Grêmio.",
};

export default function ContatoPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <LegacySymbol className="h-14 w-auto" />
          <Eyebrow>O convite</Eyebrow>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-navy sm:text-4xl">
            Vamos construir isso juntos?
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            O Legado Tricolor nasce para conectar empresários, executivos, profissionais,
            conselheiros, pesquisadores, jovens lideranças e gremistas que compartilham um
            mesmo compromisso: um Grêmio preparado para vencer continuamente por meio de uma
            governança moderna, transparente e responsável.
          </p>
          <p className="mt-5 font-display text-lg font-semibold uppercase tracking-tight text-navy">
            Deixar ao Grêmio uma instituição mais forte do que aquela que recebemos.
          </p>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-mist p-8 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
