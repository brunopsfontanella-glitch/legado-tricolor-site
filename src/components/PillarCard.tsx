export function PillarCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-navy/10 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5">
      <span className="font-mono text-xs font-semibold text-gremio">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-navy">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
