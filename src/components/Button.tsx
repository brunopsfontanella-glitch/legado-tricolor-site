import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors";
  const styles = {
    primary: "bg-gremio text-white hover:bg-navy",
    secondary: "bg-navy text-white hover:bg-navy-soft",
    ghost: "border border-navy/20 text-navy hover:border-gremio hover:text-gremio",
  };
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
