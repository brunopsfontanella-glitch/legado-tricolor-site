/** Prefixo do site quando publicado em subpasta (ex.: /legado-tricolor-site). Vazio localmente. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Endereço de um arquivo da pasta public, já com o prefixo (o next/image não o aplica sozinho). */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
