import { LegacyTicks } from "./LegacyMark";

export function Eyebrow({
  children,
  tone = "navy",
}: {
  children: React.ReactNode;
  tone?: "navy" | "sky";
}) {
  return (
    <div
      className={`flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === "sky" ? "text-sky" : "text-gremio"
      }`}
    >
      <LegacyTicks className="h-3 w-5" />
      {children}
    </div>
  );
}
