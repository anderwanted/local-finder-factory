// ======================================================
// 📄 constants.js
// Constantes globais do App / Dashboard
// ======================================================
//
// 🎯 PROPÓSITO DESTE ARQUIVO
// Centralizar TODAS as constantes de domínio:
// - Tags oficiais
// - Status
// - Tema
// - Definição de filtros do app
//
// 🧠 MODELO MENTAL
// - Nada aqui contém lógica
// - Nada aqui acessa banco
// - Tudo aqui é reutilizável entre projetos
//
// 🔒 CONTRATO
// - Arquivo seguro para edição por humanos
// - Mudanças aqui não quebram a aplicação
// - Pode ser lido como documentação viva
//

// ======================================================
// 🔹 TAGS OFICIAIS (CATEGORIAS)
// ======================================================
//
// 🎯 INTENÇÃO
// Definir as categorias possíveis de um local
//
// 🧠 USO
// - Dashboard (edição do local)
// - Filtros do app
// - Cards visuais
//
// 🔒 CONTRATO
// - id   → usado em código / banco
// - label → exibido ao usuário
// - color → identidade visual da tag
//
export const TAGS_OFICIAIS = [
  { id: 'banho', label: 'Banho', color: '#3b82f6' },
  { id: 'vet',   label: 'Vet',   color: '#10b981' },
  { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
  { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
];

// ======================================================
// 🔹 STATUS DE FILTRO (UI)
// ======================================================
//
// 🎯 INTENÇÃO
// Controlar visualização no Dashboard
//
// 🧠 USO
// - Filtro rápido: todos / publicados / ocultos
//
export const STATUS_FILTROS = ['todos', 'publicados', 'ocultos'];

// ======================================================
// 🔹 STATUS DE DADOS (BANCO)
// ======================================================
//
// 🎯 INTENÇÃO
// Padronizar valores usados no banco
//
// 🧠 USO
// - Comparações
// - Toggle de visibilidade
//
export const STATUS_TYPES = {
  PUBLICADO: 'PUBLICAR_APP',
  RASCUNHO: 'RASCUNHO'
};

// ======================================================
// 🔹 TEMA PADRÃO DO SISTEMA
// ======================================================
//
// 🎯 INTENÇÃO
// Definir cores base do app
//
// 🧠 MODELO
// - Pode ser sobrescrito por projeto
// - Nunca depende de CSS externo
//
export const THEME_COLORS = {
  primary: '#2563eb',
  bg: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',
  textSec: '#64748b',
  border: '#e2e8f0',
  danger: '#ef4444',
  success: '#22c55e'
};

// ======================================================
// 🔹 FUNÇÃO: getTheme
// ======================================================
//
// 🎯 INTENÇÃO
// Gerar tema final baseado no projeto
//
// 🧠 REGRA
// - Projeto pode sobrescrever apenas cor primária
// - Todo o resto permanece consistente
//
export const getTheme = (projeto) => ({
  primary: projeto?.cor_primaria || THEME_COLORS.primary,
  bg: THEME_COLORS.bg,
  card: THEME_COLORS.card,
  text: THEME_COLORS.text,
  textSec: THEME_COLORS.textSec,
  border: THEME_COLORS.border,
  danger: THEME_COLORS.danger,
  success: THEME_COLORS.success
});

// ======================================================
// 🔹 FILTROS DISPONÍVEIS NO APP
// ======================================================
//
// 🎯 INTENÇÃO
// Definir QUAIS filtros existem no sistema
//
// 🧠 MODELO MENTAL
// - Código define o que é possível
// - Dashboard decide o que está ativo
//
// 🔒 CONTRATO
// - id           → chave técnica
// - label        → nome exibido
// - description  → explicação humana
// - group        → filtro ou ordenação
//
export const FILTROS_APP = [
  {
    id: 'categoria',
    label: 'Categoria',
    description: 'Banho, Vet, Loja, Hotel',
    group: 'filtro'
  },
  {
    id: 'bem_avaliados',
    label: 'Bem avaliados ⭐',
    description: 'Nota ≥ 4.5 e pelo menos 40 avaliações',
    group: 'filtro'
  },
  {
    id: 'com_instagram',
    label: 'Com Instagram 📸',
    description: 'Exibe apenas lojas com Instagram',
    group: 'filtro'
  },
  {
    id: 'ordenar_melhor_nota',
    label: 'Ordenar por melhor nota',
    description: 'Usuário pode priorizar qualidade',
    group: 'ordenacao'
  },
  {
    id: 'ordenar_mais_avaliados',
    label: 'Ordenar por mais avaliados',
    description: 'Usuário pode priorizar popularidade',
    group: 'ordenacao'
  }
];

// ======================================================
// 🔹 FILTROS PADRÃO ATIVOS (MVP)
// ======================================================
//
// 🎯 INTENÇÃO
// Garantir experiência mínima sem configuração
//
// 🧠 REGRA
// - Aplicado quando projeto ainda não definiu filtros
// - Pode ser alterado no dashboard
//
export const DEFAULT_FILTROS_APP = [
  'categoria',
  'bem_avaliados',
  'com_instagram'
];
