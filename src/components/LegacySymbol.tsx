import Image from "next/image";
import { asset } from "@/lib/base-path";

export function LegacySymbol({ className }: { className?: string }) {
  return (
    <Image
      src={asset("/images/simbolo-legado-tricolor.png")}
      alt="Símbolo Legado Tricolor"
      width={473}
      height={767}
      className={className}
    />
  );
}
