// src/Dashboard.jsx (REFATORADO)
import React, { useState } from 'react';
import { Store, ExternalLink, Search } from 'lucide-react';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardFilters } from './hooks/useDashboardFilters';
import { getTheme, TAGS_OFICIAIS, STATUS_FILTROS } from './utils/constants';
import StoreCard from './components/dashboard/StoreCard';
import StoreCardEdit from './components/dashboard/StoreCardEdit';

export default function Dashboard({ projeto }) {
  const [editingId, setEditingId] = useState(null);
  const theme = getTheme(projeto);

  // Hook de dados (API)
  const { 
    locais, 
    loading, 
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
    await updateLocal(id, updates);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta loja?")) return;
    await deleteLocal(id);
  };

  if (!projeto) {
    return (
      <div style={{ padding: 50, textAlign: 'center' }}>
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
      <header style={{
        background: theme.card,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: theme.primary,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Store size={22} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
            {projeto.nome}
          </h1>
        </div>

        <button
          onClick={() => window.location.href = `/${projeto.slug}`}
          style={{
            padding: '8px 16px',
            background: 'white',
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}
        >
          <ExternalLink size={16} /> Ver App
        </button>
      </header>

      {/* CONTENT AREA */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* FILTROS */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          
          {/* Filtro de Status */}
          <div style={{
            display: 'flex',
            background: '#e2e8f0',
            padding: '4px',
            borderRadius: '8px'
          }}>
            {STATUS_FILTROS.map(status => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: filtroStatus === status ? 'white' : 'transparent',
                  color: theme.text,
                  fontWeight: 'bold',
                  fontSize: '11px',
                  boxShadow: filtroStatus === status ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {status.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Filtro de Categorias */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {TAGS_OFICIAIS.map(tag => (
              <button
                key={tag.id}
                onClick={() => setFiltroCategoria(
                  filtroCategoria === tag.id ? null : tag.id
                )}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: `1px solid ${filtroCategoria === tag.id ? tag.color : theme.border}`,
                  background: filtroCategoria === tag.id ? tag.color : 'white',
                  color: filtroCategoria === tag.id ? 'white' : theme.textSec,
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* LISTA DE LOJAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px', color: theme.textSec }}>
              Carregando dados...
            </p>
          ) : locaisFiltrados.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: theme.textSec
            }}>
              <Search size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p>Nenhuma loja encontrada com esses filtros.</p>
            </div>
          ) : (
            locaisFiltrados.map(local => (
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
                  onToggleStatus={toggleStatus}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )
            ))
          )}
        </div>
      </div>
    </div>
  );
}