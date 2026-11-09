import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/app/AppShell";
import { asset } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Legado Tricolor — App",
  description: "Sede, Instituto e Movimento em um só acesso.",
  manifest: asset("/app.webmanifest"),
  icons: { apple: asset("/icons/apple-touch-icon.png") },
  appleWebApp: { capable: true, title: "Legado Tricolor", statusBarStyle: "default" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#00264d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
