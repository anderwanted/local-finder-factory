// src/Dashboard.jsx (VERSÃO REFATORADA FINAL)
import React, { useState } from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardFilters } from './hooks/useDashboardFilters';
import { getTheme } from './utils/constants';
import DashboardHeader from './components/dashboard/DashboardHeader';
import FilterBar from './components/dashboard/FilterBar';
import StoreCard from './components/dashboard/StoreCard';
import StoreCardEdit from './components/dashboard/StoreCardEdit';
import EmptyState from './components/dashboard/EmptyState';

export default function Dashboard({ projeto }) {
  const [editingId, setEditingId] = useState(null);
  const theme = getTheme(projeto);

  // Hook de dados (API)
  const { 
    locais, 
    loading, 
    error,
    toggleStatus, 
    updateLocal, 
    deleteLocal 
  } = useDashboardData(projeto?.id);

  // Hook de filtros (UI)
  const {
    filtroStatus,
    setFiltroStatus,
    filtroCategoria,
    setFiltroCategoria,
    locaisFiltrados
  } = useDashboardFilters(locais);

  // Handlers
  const handleEdit = (local) => {
    setEditingId(local.id);
  };

  const handleSave = async (id, updates) => {
    try {
      await updateLocal(id, updates);
      setEditingId(null);
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta loja?")) return;
    
    try {
      await deleteLocal(id);
    } catch (err) {
      alert('Erro ao excluir: ' + err.message);
    }
  };

  const handleToggleStatus = async (local) => {
    try {
      await toggleStatus(local);
    } catch (err) {
      alert('Erro ao alterar status: ' + err.message);
    }
  };

  // Loading inicial
  if (!projeto) {
    return (
      <div style={{ 
        padding: 50, 
        textAlign: 'center',
        fontFamily: 'sans-serif' 
      }}>
        Carregando projeto...
      </div>
    );
  }

  return (
    <div style={{
      background: theme.bg,
      minHeight: '100vh',
      color: theme.text,
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      
      {/* HEADER */}
      <DashboardHeader projeto={projeto} theme={theme} />

      {/* CONTENT AREA */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* FILTROS */}
        <FilterBar
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          theme={theme}
        />

        {/* LISTA DE LOJAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Loading State */}
          {loading && (
            <p style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: theme.textSec 
            }}>
              Carregando dados...
            </p>
          )}

          {/* Error State */}
          {error && (
            <div style={{
              padding: '20px',
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              color: '#991b1b',
              textAlign: 'center'
            }}>
              Erro ao carregar dados: {error}
            </div>
          )}

          {/* Empty State - Sem dados no projeto */}
          {!loading && !error && locais.length === 0 && (
            <EmptyState type="no-data" theme={theme} />
          )}

          {/* Empty State - Filtros sem resultado */}
          {!loading && !error && locais.length > 0 && locaisFiltrados.length === 0 && (
            <EmptyState type="filter" theme={theme} />
          )}

          {/* Lista de Lojas */}
          {!loading && !error && locaisFiltrados.map(local => (
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
          ))}
        </div>
      </div>
    </div>
  );
}