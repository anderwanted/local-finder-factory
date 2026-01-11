// src/utils/constants.js

export const TAGS_OFICIAIS = [
  { id: 'banho', label: 'Banho', color: '#3b82f6' },
  { id: 'vet',   label: 'Vet',   color: '#10b981' },
  { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
  { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
];

export const STATUS_FILTROS = ['todos', 'publicados', 'ocultos'];

export const STATUS_TYPES = {
  PUBLICADO: 'PUBLICAR_APP',
  RASCUNHO: 'RASCUNHO'
};

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