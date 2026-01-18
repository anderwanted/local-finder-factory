// ======================================================
// 📄 useDashboardFilters.jsx
// Hook de filtros + ordenação do Dashboard / App
// ======================================================

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import { useState, useMemo } from 'react';
import { FILTERS } from '../filters/filters.config';

// ======================================================
// 🔹 FUNÇÃO: aplicarOrdenacao
// ======================================================
//
// 🎯 INTENÇÃO
// Aplicar filtros de ORDENAÇÃO sobre uma lista de locais,
// respeitando a prioridade definida pelo projeto.
//
// 🧠 MODELO MENTAL
// - Ordena, nunca remove
// - Cada filtro soma um "score"
// - A ordem dos filtros define o peso
//
// 🔒 CONTRATO
// - Nunca quebra a listagem
// - Nunca lança erro para fora
// - Nunca muta o array original
//
// 🛡️ FALHA SEGURA
// - Se algo falhar → retorna lista original
//
function aplicarOrdenacao(locais, filtrosAtivos = []) {

  // Se não houver filtros ativos, retorna lista intacta
  if (!Array.isArray(filtrosAtivos) || filtrosAtivos.length === 0) {
    return locais;
  }

  // Criamos cópia para não mutar o array original
  const locaisOrdenados = [...locais];

  try {
    locaisOrdenados.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      filtrosAtivos.forEach((filtroId, index) => {
        const filtro = FILTERS[filtroId];

        // Ignora filtros inexistentes ou que não sejam de ordenação
        if (!filtro || filtro.comportamento !== 'ordenar') return;

        // Peso simples: filtros no início têm mais impacto
        const peso = filtrosAtivos.length - index;

        try {
          scoreA += (filtro.ordenar?.(a) || 0) * peso;
          scoreB += (filtro.ordenar?.(b) || 0) * peso;
        } catch {
          // Falha silenciosa por filtro individual
        }
      });

      return scoreB - scoreA;
    });
  } catch {
    // Falha total → não ordena
    return locais;
  }

  return locaisOrdenados;
}

// ======================================================
// 🔹 HOOK: useDashboardFilters
// ======================================================
//
// 🎯 INTENÇÃO GERAL
// Centralizar TODA a lógica de:
// - Filtros básicos de UI (status, categoria)
// - Ordenação baseada nos filtros ativos do projeto
//
// 🧠 MODELO MENTAL
// - Filtrar primeiro
// - Ordenar depois
// - Nunca quebrar listagem
//
// 🔒 CONTRATO
// - Não conhece Supabase
// - Não conhece Dashboard
// - Apenas recebe dados e retorna dados
//
export function useDashboardFilters(locais, filtrosAtivosProjeto = []) {

  // ==============================
  // 🔹 ESTADOS DE UI
  // ==============================
  //
  // filtroStatus    → publicado / oculto / todos
  // filtroCategoria → tag ativa (ou null)
  //
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  // ==============================
  // 🔹 PIPELINE DE FILTROS
  // ==============================
  //
  // Ordem intencional:
  // 1️⃣ Filtragem básica (restrição)
  // 2️⃣ Ordenação inteligente (ranking)
  //
  const locaisFiltrados = useMemo(() => {

    // ------------------------------
    // 1️⃣ FILTRAGEM BÁSICA (EXISTENTE)
    // ------------------------------
    //
    // 🎯 Intenção:
    // Restringir resultados com base em UI simples
    //
    const filtrados = locais.filter(local => {

      // Status: publicados
      if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') {
        return false;
      }

      // Status: ocultos
      if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') {
        return false;
      }

      // Categoria / Tag
      if (filtroCategoria && !local.tags?.includes(filtroCategoria)) {
        return false;
      }

      return true;
    });

    // ------------------------------
    // 2️⃣ ORDENAÇÃO POR PROJETO
    // ------------------------------
    //
    // 🎯 Intenção:
    // Reordenar resultados com base nos filtros
    // ativados no dashboard do projeto
    //
    const filtrosAtivosValidos = Array.isArray(filtrosAtivosProjeto)
      ? filtrosAtivosProjeto
      : [];

    return aplicarOrdenacao(filtrados, filtrosAtivosValidos);

  }, [
    locais,
    filtroStatus,
    filtroCategoria,
    filtrosAtivosProjeto
  ]);

  // ==============================
  // 🔹 API DO HOOK (RETORNO)
  // ==============================
  //
  // Tudo que a UI pode usar
  //
  return {
    filtroStatus,
    setFiltroStatus,
    filtroCategoria,
    setFiltroCategoria,
    locaisFiltrados
  };
}
