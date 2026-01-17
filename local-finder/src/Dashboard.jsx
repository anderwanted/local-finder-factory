// src/Dashboard.jsx
import React, { useState } from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardFilters } from './hooks/useDashboardFilters';
import { getTheme } from './utils/constants';
import DashboardHeader from './components/dashboard/DashboardHeader';
import FilterBar from './components/dashboard/FilterBar';
import StoreCard from './components/dashboard/StoreCard';
import StoreCardEdit from './components/dashboard/StoreCardEdit';
import EmptyState from './components/dashboard/EmptyState';
import ProjectFiltersPanel from './components/dashboard/ProjectFiltersPanel';

export default function Dashboard({ projeto }) {
  const [modoDashboard, setModoDashboard] = useState('config'); // 'config' | 'lista'
  const [editingId, setEditingId] = useState(null);
  const theme = getTheme(projeto);

  // Hook de dados
  const {
    locais,
    loading,
    error,
    toggleStatus,
    updateLocal,
    deleteLocal
  } = useDashboardData(projeto?.id);

  // Hook de filtros
  const {
    filtroStatus,
    setFiltroStatus,
    filtroCategoria,
    setFiltroCategoria,
    locaisFiltrados
  } = useDashboardFilters(locais);

  // Handlers
  const handleEdit = (local) => setEditingId(local.id);

  const handleSave = async (id, updates) => {
    await updateLocal(id, updates);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta loja?')) return;
    await deleteLocal(id);
  };

  const handleToggleStatus = async (local) => {
    await toggleStatus(local);
  };

  if (!projeto) {
    return (
      <div style={{ padding: 50, textAlign: 'center' }}>
        Carregando projeto...
      </div>
    );
  }

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: '100vh',
        color: theme.text,
        padding: '20px',
        fontFamily: 'sans-serif'
      }}
    >
      {/* HEADER */}
      <DashboardHeader projeto={projeto} theme={theme} />

      {/* TOGGLE */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 20px 20px' }}>
        <button
          onClick={() => setModoDashboard('config')}
          style={{
            padding: '10px 16px',
            borderRadius: 'var(--radius-btn)',
            border: '1px solid var(--border-color)',
            background:
              modoDashboard === 'config'
                ? 'var(--cor-primaria)'
                : 'var(--bg-card)',
            color:
              modoDashboard === 'config'
                ? '#fff'
                : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          ⚙️ Configurar App
        </button>

        <button
          onClick={() => setModoDashboard('lista')}
          style={{
            padding: '10px 16px',
            borderRadius: 'var(--radius-btn)',
            border: '1px solid var(--border-color)',
            background:
              modoDashboard === 'lista'
                ? 'var(--cor-primaria)'
                : 'var(--bg-card)',
            color:
              modoDashboard === 'lista'
                ? '#fff'
                : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          🏪 Ver Pet Shops
        </button>
      </div>

      {/* MODO CONFIG */}
      {modoDashboard === 'config' && (
        <ProjectFiltersPanel
          projeto={projeto}
          theme={theme}
          onUpdate={(filtros) => {
            projeto.filtros_ativos = filtros;
          }}
        />
      )}

      {/* MODO LISTA */}
      {modoDashboard === 'lista' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <FilterBar
            filtroStatus={filtroStatus}
            setFiltroStatus={setFiltroStatus}
            filtroCategoria={filtroCategoria}
            setFiltroCategoria={setFiltroCategoria}
            theme={theme}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {loading && (
              <p style={{ textAlign: 'center', padding: '40px' }}>
                Carregando dados...
              </p>
            )}

            {error && (
              <div style={{ padding: '20px', color: 'red' }}>
                Erro ao carregar dados: {error}
              </div>
            )}

            {!loading && !error && locais.length === 0 && (
              <EmptyState type="no-data" theme={theme} />
            )}

            {!loading &&
              !error &&
              locais.length > 0 &&
              locaisFiltrados.length === 0 && (
                <EmptyState type="filter" theme={theme} />
              )}

            {!loading &&
              !error &&
              locaisFiltrados.map((local) =>
                editingId === local.id ? (
                  <StoreCardEdit
                    key={local.id}
                    local={local}
                    theme={theme}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <StoreCard
                    key={local.id}
                    local={local}
                    theme={theme}
                    onToggleStatus={handleToggleStatus}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
}
