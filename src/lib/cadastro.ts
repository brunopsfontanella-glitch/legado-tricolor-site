// Regras do cadastro compartilhadas pelo app e pelo formulário do site.
// Campos exigidos: nome, telefone, e-mail, se é sócio do Grêmio e onde reside (cidade e UF).

export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

/** Formata dígitos como telefone brasileiro: (51) 99999-9999 ou (51) 9999-9999. */
export function formatTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export type CampoCadastro = "nome" | "telefone" | "email" | "socio" | "cidade" | "uf" | "consentimento";
export type ErrosCadastro = Partial<Record<CampoCadastro, string>>;

export type FormCadastro = {
  nome: string;
  telefone: string;
  email: string;
  socio: boolean | null;
  cidade: string;
  uf: string;
  consentimento?: boolean;
};

export function validarCadastro(f: FormCadastro, exigeConsentimento: boolean): ErrosCadastro {
  const erros: ErrosCadastro = {};
  if (f.nome.trim().split(/\s+/).filter(Boolean).length < 2) erros.nome = "Informe nome e sobrenome.";
  const digitos = f.telefone.replace(/\D/g, "");
  if (digitos.length < 10) erros.telefone = "Informe o telefone com DDD.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) erros.email = "Informe um e-mail válido.";
  if (f.socio === null) erros.socio = "Informe se você é sócio do Grêmio.";
  if (f.cidade.trim().length < 2) erros.cidade = "Informe a cidade onde você mora.";
  if (!UFS.includes(f.uf)) erros.uf = "Escolha o estado.";
  if (exigeConsentimento && !f.consentimento) erros.consentimento = "É preciso aceitar para criar o cadastro.";
  return erros;
}
