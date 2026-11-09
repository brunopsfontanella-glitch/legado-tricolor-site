/** Small three-tick glyph used inline next to eyebrow labels. */
export function LegacyTicks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="legacyTicksGradient" x1="0" y1="20" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-navy)" />
          <stop offset="1" stopColor="var(--color-sky)" />
        </linearGradient>
      </defs>
      <path d="M0 20L10 0L14 0L4 20Z" fill="url(#legacyTicksGradient)" />
      <path d="M9 20L19 0L23 0L13 20Z" fill="url(#legacyTicksGradient)" opacity="0.85" />
      <path d="M18 20L28 0L32 0L22 20Z" fill="url(#legacyTicksGradient)" opacity="0.7" />
    </svg>
  );
}
