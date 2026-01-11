// src/hooks/useDashboardFilters.jsx
import { useState, useMemo } from 'react';

export function useDashboardFilters(locais) {
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  const locaisFiltrados = useMemo(() => {
    return locais.filter(local => {
      if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') {
        return false;
      }
      if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') {
        return false;
      }

      if (filtroCategoria && !local.tags?.includes(filtroCategoria)) {
        return false;
      }

      return true;
    });
  }, [locais, filtroStatus, filtroCategoria]);

  return {
    filtroStatus,
    setFiltroStatus,
    filtroCategoria,
    setFiltroCategoria,
    locaisFiltrados
  };
}