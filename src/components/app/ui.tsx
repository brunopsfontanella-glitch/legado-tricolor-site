"use client";

import Link from "next/link";

export type Env = "sede" | "instituto" | "movimento";

const ENV_STYLE: Record<Env, string> = {
  sede: "bg-navy text-white",
  instituto: "bg-gremio text-white",
  movimento: "bg-ink text-white",
};
const ENV_NAME: Record<Env, string> = { sede: "Sede", instituto: "Instituto", movimento: "Movimento" };

export function EnvTag({ env }: { env: Env }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${ENV_STYLE[env]}`}>
      {ENV_NAME[env]}
    </span>
  );
}

type Tone = "navy" | "gremio" | "muted" | "ok" | "espera" | "erro";
const TONE: Record<Tone, string> = {
  navy: "bg-navy/10 text-navy",
  gremio: "bg-gremio/10 text-gremio",
  muted: "bg-navy/5 text-muted",
  ok: "bg-emerald-100 text-emerald-800",
  espera: "bg-amber-100 text-amber-800",
  erro: "bg-red-100 text-red-800",
};

export function Chip({ tone = "navy", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${TONE[tone]}`}>{children}</span>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-navy/10 bg-white p-4 ${className}`}>{children}</div>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-7 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{children}</h2>
  );
}

type BtnProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "dark";
  disabled?: boolean;
  full?: boolean;
  type?: "button" | "submit";
};

function btnClass(variant: "primary" | "ghost" | "dark", full?: boolean, disabled?: boolean) {
  const styles = {
    primary: "bg-gremio text-white active:bg-navy",
    dark: "bg-navy text-white active:bg-navy-soft",
    ghost: "border border-navy/20 bg-white text-navy active:bg-mist",
  }[variant];
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors ${styles} ${
    full ? "w-full" : ""
  } ${disabled ? "pointer-events-none opacity-40" : ""}`;
}

/** Link para fora do app (telefone, WhatsApp, e-mail), com o mesmo visual dos botões. */
export function LinkBtn({
  href,
  children,
  variant = "ghost",
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      className={btnClass(variant)}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Btn({ children, href, onClick, variant = "primary", disabled, full, type = "button" }: BtnProps) {
  const cls = btnClass(variant, full, disabled);
  if (href && !disabled) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function PageHeader({
  title,
  subtitle,
  env,
  back,
}: {
  title: string;
  subtitle?: string;
  env?: Env;
  back?: string;
}) {
  return (
    <div className="mb-5">
      {back && (
        <Link href={back} className="mb-3 inline-flex min-h-8 items-center gap-1 text-sm font-semibold text-gremio">
          <Icon name="back" className="h-4 w-4" /> Voltar
        </Link>
      )}
      {env && (
        <div>
          <EnvTag env={env} />
        </div>
      )}
      <h1 className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-navy">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}

export function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const cheio = value >= max;
  return (
    <div>
      <div className="h-2.5 overflow-hidden rounded-full bg-navy/10" role="progressbar" aria-valuenow={value} aria-valuemax={max} aria-label={label}>
        <div className={`h-full rounded-full ${cheio ? "bg-red-500" : "bg-gremio"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold text-navy">{label}</p>
        {description && <p className="mt-0.5 text-xs leading-relaxed text-muted">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? "bg-gremio" : "bg-navy/20"}`}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${checked ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}

export function Unavailable() {
  return (
    <Card className="mt-6 text-center">
      <p className="font-display text-base font-bold uppercase tracking-tight text-navy">Conteúdo indisponível</p>
      <p className="mt-2 text-sm text-muted">Esta área não está liberada para o seu perfil.</p>
      <div className="mt-4">
        <Btn href="/app" variant="ghost">Voltar ao início</Btn>
      </div>
    </Card>
  );
}

export function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "sede":
      return (
        <svg {...common}>
          <path d="M4 21V8l8-5 8 5v13" />
          <path d="M9 21v-6h6v6" />
          <path d="M3 21h18" />
        </svg>
      );
    case "instituto":
      return (
        <svg {...common}>
          <path d="M4 5h7a3 3 0 013 3v12a2 2 0 00-2-2H4z" />
          <path d="M20 5h-7a3 3 0 00-3 3" />
          <path d="M20 5v13h-6" />
        </svg>
      );
    case "movimento":
      return (
        <svg {...common}>
          <path d="M4 5h16v10H9l-5 4z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "conta":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      );
    case "back":
      return (
        <svg {...common}>
          <path d="M15 5l-7 7 7 7" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common}>
          <path d="M9 5l7 7-7 7" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" />
        </svg>
      );
    case "news":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );
    default:
      return null;
  }
}
