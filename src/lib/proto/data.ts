// Dados fictícios e regras do protótipo do app Legado Tricolor.
// Os parâmetros vêm do documento "Escopo Funcional" (28/10/2026); os marcados
// como "exemplo" ainda dependem de validação jurídica ou operacional.

export type SedeRole = "cotista" | "admin";
export type InstitutoRole = "simpatizante" | "livre" | "apoio25" | "master";
export type Churrasco = "sede" | "propria" | "nao";

/** Dados do cadastro: nome, telefone, e-mail, se é sócio do Grêmio e onde reside (cidade e UF). */
export type Dados = {
  nome: string;
  telefone: string;
  email: string;
  socio: boolean;
  cidade: string;
  uf: string;
};

export type Persona = Dados & {
  id: string;
  sede?: SedeRole;
  cota?: number;
  instituto: InstitutoRole;
  movimento: boolean;
  resumo: string;
};

/** Base de quem cria cadastro no app: entra como simpatizante, sem vínculos. */
export const NOVO_BASE: Persona = {
  id: "novo",
  nome: "",
  telefone: "",
  email: "",
  socio: false,
  cidade: "",
  uf: "",
  instituto: "simpatizante",
  movimento: false,
  resumo: "Cadastro criado neste aparelho.",
};

export const PERSONAS: Persona[] = [
  {
    id: "carlos",
    nome: "Carlos Menezes",
    email: "carlos@exemplo.com",
    telefone: "(51) 90000-0001",
    socio: true,
    cidade: "Porto Alegre",
    uf: "RS",
    sede: "cotista",
    cota: 7,
    instituto: "master",
    movimento: false,
    resumo: "Cotista da Sede e apoiador Master do Instituto.",
  },
  {
    id: "roberto",
    nome: "Roberto Lima",
    email: "roberto@exemplo.com",
    telefone: "(51) 90000-0002",
    socio: true,
    cidade: "Canoas",
    uf: "RS",
    sede: "cotista",
    cota: 12,
    instituto: "apoio25",
    movimento: true,
    resumo: "Participa das três frentes: Sede, Instituto e Movimento.",
  },
  {
    id: "marina",
    nome: "Marina Teixeira",
    email: "marina@exemplo.com",
    telefone: "(54) 90000-0003",
    socio: false,
    cidade: "Gramado",
    uf: "RS",
    instituto: "simpatizante",
    movimento: false,
    resumo: "Simpatizante com cadastro gratuito.",
  },
  {
    id: "paulo",
    nome: "Paulo Andrade",
    email: "paulo@exemplo.com",
    telefone: "(51) 90000-0004",
    socio: true,
    cidade: "Porto Alegre",
    uf: "RS",
    sede: "admin",
    instituto: "simpatizante",
    movimento: false,
    resumo: "Administrador operacional da Sede (sem cota).",
  },
];

export const INSTITUTO_LABEL: Record<InstitutoRole, string> = {
  simpatizante: "Simpatizante",
  livre: "Apoio livre",
  apoio25: "Apoio R$ 25/mês",
  master: "Apoio Master R$ 100/mês",
};

export const SEDE_LABEL: Record<SedeRole, string> = {
  cotista: "Cotista",
  admin: "Administrador operacional",
};

// ---- Regras da Sede (parâmetros editáveis no produto real) ----
export const RULES = {
  lotacao: 60, // exemplo: deve vir do projeto de prevenção contra incêndio
  convidadosPorCota: 6,
  cotistasTotal: 20,
  precoChurrasco: 45,
  mensalidade: 80,
  mensalidadeAnual: 864,
  limiteAdmin: 500,
  limiteRepresentante: 2000,
  prazoHoras: 12,
  kgPorPessoa: 0.4, // exemplo
};

// Pessoas já confirmadas por outros cotistas (para o painel parecer vivo).
export const SEED = { cotistas: 11, convidados: 34, sede: 36, propria: 5, nao: 4, pagos: 22 };

export const JOGO = {
  id: "j1",
  titulo: "Grêmio × Time Exemplo",
  data: "Sáb, 14 nov",
  hora: "18h30",
  local: "Arena",
  competicao: "Campeonato (exemplo)",
};

export type Pessoa = { nome: string; churrasco: Churrasco };
export type Reserva = { pessoas: Pessoa[]; pagamento: "pix" | "dia"; pago: boolean };

// ---- Despesas e votações da Sede ----
export type Fluxo = "admin" | "representante" | "unanimidade";
export type Despesa = {
  id: string;
  titulo: string;
  valor: number;
  fluxo: Fluxo;
  sim: number;
  nao: number;
  prazo: string;
};

export function fluxoDe(valor: number): Fluxo {
  if (valor <= RULES.limiteAdmin) return "admin";
  if (valor <= RULES.limiteRepresentante) return "representante";
  return "unanimidade";
}

export const FLUXO_LABEL: Record<Fluxo, string> = {
  admin: "Administrador executa e registra",
  representante: "Aprovação prévia do representante legal",
  unanimidade: "Votação com unanimidade dos cotistas",
};

export const DESPESAS_SEED: Despesa[] = [
  { id: "d1", titulo: "Reparo do portão de entrada", valor: 380, fluxo: "admin", sim: 0, nao: 0, prazo: "—" },
  { id: "d2", titulo: "Compra de 24 cadeiras", valor: 1350, fluxo: "representante", sim: 0, nao: 0, prazo: "—" },
  { id: "d3", titulo: "Troca do ar-condicionado da sala de TV", valor: 3200, fluxo: "unanimidade", sim: 14, nao: 0, prazo: "3 dias" },
  { id: "d4", titulo: "Seguro anual do imóvel", valor: 2450, fluxo: "unanimidade", sim: 20, nao: 0, prazo: "encerrada" },
];

// ---- Instituto ----
export const PLANOS = [
  { id: "livre" as const, nome: "Apoio livre", preco: "Valor livre", nota: "Contribuição mínima a definir" },
  { id: "apoio25" as const, nome: "Apoio", preco: "R$ 25/mês", nota: "Benefícios a detalhar" },
  { id: "master" as const, nome: "Master", preco: "R$ 100/mês", nota: "Benefícios a detalhar" },
];

export const EVENTOS = [
  { id: "e1", titulo: "Palestra: SAF e governança no futebol", quando: "Qui, 12 nov · 19h30", onde: "Online" },
  { id: "e2", titulo: "Roda de conversa: gestão esportiva", quando: "Sáb, 5 dez · 10h", onde: "Hub Legado Tricolor" },
];

export const CONTEUDOS = [
  { id: "c1", tema: "SAF", titulo: "Conteúdo de exemplo sobre SAF", tipo: "Artigo" },
  { id: "c2", tema: "Gestão esportiva", titulo: "Conteúdo de exemplo sobre gestão esportiva", tipo: "Vídeo" },
  { id: "c3", tema: "História do clube", titulo: "Conteúdo de exemplo sobre a história do Grêmio", tipo: "Artigo" },
];

// ---- Banco de Ideias Tricolores ----
export const IDEIA_ETAPAS = ["Recebida", "Triagem", "Discussão", "Votação", "Encaminhada"] as const;
export type Ideia = { id: string; titulo: string; texto: string; etapa: number; autor: string };

export const IDEIAS_SEED: Ideia[] = [
  { id: "i1", titulo: "Relatório de transparência trimestral", texto: "Publicar um resumo trimestral das decisões do Conselho.", etapa: 3, autor: "Membro" },
  { id: "i2", titulo: "Canal de perguntas ao Conselho", texto: "Abrir um canal para dúvidas de sócios sobre pautas.", etapa: 2, autor: "Simpatizante" },
  { id: "i3", titulo: "Guia de boas práticas de governança", texto: "Material introdutório sobre governança para novos sócios.", etapa: 4, autor: "Membro" },
];

// ---- Movimento ----
export const DEBATES = [
  { id: "m1", titulo: "Pauta do próximo Conselho Deliberativo", status: "Aberto", participantes: 18 },
  { id: "m2", titulo: "Proposta de revisão do regimento interno", status: "Aberto", participantes: 11 },
  { id: "m3", titulo: "Critérios para admissão de novos membros", status: "Encerrado", participantes: 24 },
];

// ---- Conselheiros eleitos (parte pública do Movimento) ----
// Nomes fictícios. No produto real a lista vem de fonte oficial do clube, com data de atualização.
export type Funcao = "Presidente" | "Membro";
export type Cargo = { comissao: string; funcao: Funcao };

export type Conselheiro = {
  id: string;
  nome: string;
  inicio: number;
  fim: number;
  /** Cargos em comissões do Conselho Deliberativo. A lista de cada comissão é derivada daqui. */
  cargos: Cargo[];
  /** Vínculo com o Movimento: só aparece para membros e só com consentimento. */
  movimento: boolean;
};

export const CONSELHEIROS: Conselheiro[] = [
  { id: "k01", nome: "Conselheiro Exemplo 01", inicio: 2022, fim: 2026, cargos: [{ comissao: "Comissão Consular", funcao: "Presidente" }], movimento: true },
  { id: "k02", nome: "Conselheiro Exemplo 02", inicio: 2022, fim: 2026, cargos: [{ comissao: "Comissão Disciplinar", funcao: "Membro" }], movimento: true },
  {
    id: "k03",
    nome: "Conselheiro Exemplo 03",
    inicio: 2022,
    fim: 2026,
    cargos: [
      { comissao: "Comissão de Estatuto", funcao: "Presidente" },
      { comissao: "Comissão Consular", funcao: "Membro" },
    ],
    movimento: false,
  },
  { id: "k04", nome: "Conselheiro Exemplo 04", inicio: 2022, fim: 2026, cargos: [{ comissao: "Comissão Consular", funcao: "Membro" }], movimento: false },
  { id: "k05", nome: "Conselheiro Exemplo 05", inicio: 2024, fim: 2028, cargos: [{ comissao: "Comissão Disciplinar", funcao: "Presidente" }], movimento: true },
  { id: "k06", nome: "Conselheiro Exemplo 06", inicio: 2024, fim: 2028, cargos: [{ comissao: "Comissão de Estatuto", funcao: "Membro" }], movimento: false },
  { id: "k07", nome: "Conselheiro Exemplo 07", inicio: 2024, fim: 2028, cargos: [{ comissao: "Comissão de Estatuto", funcao: "Membro" }], movimento: true },
  { id: "k08", nome: "Conselheiro Exemplo 08", inicio: 2022, fim: 2026, cargos: [], movimento: false },
];

export type ComissaoConselho = { nome: string; presidente?: Conselheiro; membros: Conselheiro[] };

/** Comissões do Conselho Deliberativo, montadas a partir dos cargos de cada conselheiro. */
export const COMISSOES_CONSELHO: ComissaoConselho[] = [...new Set(CONSELHEIROS.flatMap((c) => c.cargos.map((x) => x.comissao)))]
  .sort((a, b) => a.localeCompare(b, "pt-BR"))
  .map((nome) => {
    const integrantes = CONSELHEIROS.filter((c) => c.cargos.some((x) => x.comissao === nome));
    return {
      nome,
      presidente: integrantes.find((c) => c.cargos.some((x) => x.comissao === nome && x.funcao === "Presidente")),
      membros: integrantes.filter((c) => c.cargos.some((x) => x.comissao === nome && x.funcao === "Membro")),
    };
  });

// ---- Governança do Movimento (nomes fictícios) ----
export const GESTAO_MOVIMENTO = "2026/2028";

export const DIRETORIA_MOVIMENTO = [
  { cargo: "Presidente", nome: "Diretor Exemplo 01" },
  { cargo: "Vice-presidente", nome: "Diretor Exemplo 02" },
  { cargo: "Secretário", nome: "Diretor Exemplo 03" },
];

export const COMISSOES_MOVIMENTO = [
  { id: "k1", nome: "Comissão de Estatuto", coordenacao: "Membro Exemplo 01", membros: ["Membro Exemplo 02", "Membro Exemplo 03"] },
  { id: "k2", nome: "Comissão de Comunicação", coordenacao: "Membro Exemplo 04", membros: ["Membro Exemplo 05"] },
  { id: "k3", nome: "Comissão de Acompanhamento do Conselho", coordenacao: "Membro Exemplo 06", membros: ["Membro Exemplo 07", "Membro Exemplo 08"] },
];

// ---- Grêmio em Dia (conteúdo de exemplo; sem dados reais do clube) ----
export const JOGOS = [
  { id: "j1", titulo: "Grêmio × Time Exemplo A", data: "Sáb, 14 nov · 18h30", sede: true },
  { id: "j2", titulo: "Time Exemplo B × Grêmio", data: "Dom, 22 nov · 16h", sede: false },
  { id: "j3", titulo: "Grêmio × Time Exemplo C", data: "Qua, 2 dez · 21h30", sede: true },
];

export const NOTICIAS = [
  { id: "n1", titulo: "Notícia de exemplo 1: título conforme o veículo original", fonte: "Veículo (exemplo)" },
  { id: "n2", titulo: "Notícia de exemplo 2: título conforme o veículo original", fonte: "Veículo (exemplo)" },
  { id: "n3", titulo: "Notícia de exemplo 3: título conforme o veículo original", fonte: "Veículo (exemplo)" },
];

export const DOCUMENTOS = [
  "Balanço do exercício (link para o documento oficial)",
  "Ata do Conselho Deliberativo (link para o documento oficial)",
  "Demonstrativos financeiros (link para o documento oficial)",
];

export function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
