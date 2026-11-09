"use client";

import { useSyncExternalStore } from "react";
import { Card } from "./ui";

function detect() {
  if (typeof window === "undefined") return "nenhum";
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (standalone) return "instalado";
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return "ios";
  if (/Android/.test(navigator.userAgent)) return "android";
  return "nenhum";
}

export function InstallBanner() {
  const modo = useSyncExternalStore(
    () => () => {},
    detect,
    () => "nenhum",
  );

  if (modo === "instalado" || modo === "nenhum") return null;

  return (
    <Card className="mb-5 border-gremio/30 bg-gremio/5">
      <p className="font-display text-sm font-bold uppercase tracking-tight text-navy">Instale na tela inicial</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        {modo === "ios"
          ? "No Safari, toque em Compartilhar e depois em “Adicionar à Tela de Início”. As notificações só funcionam com o app instalado."
          : "No Chrome, abra o menu ⋮ e escolha “Instalar app” ou “Adicionar à tela inicial”."}
      </p>
    </Card>
  );
}
