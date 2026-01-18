// ======================================================
// 📄 Dashboard.jsx
// Painel Administrativo do Projeto
// ======================================================
//
// 🎯 PROPÓSITO
// - Centralizar o controle do projeto
// - Alternar entre:
//   • Configuração do App
//   • Gestão de Lojas (CRUD)
//
// 🧠 MODELO MENTAL
// - Dashboard é um ORQUESTRADOR
// - Ele NÃO:
//   ❌ busca dados direto
//   ❌ filtra manualmente
//   ❌ renderiza lógica complexa
//
// - Ele APENAS:
//   ✅ conecta hooks
//   ✅ distribui props
//   ✅ decide o modo visual
//
// 🔒 CONTRATO
// - Nenhuma query direta aqui
// - Nenhuma regra de negócio pesada
// - Hooks fazem o trabalho sujo
//

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useState } from 'react';

// Hooks
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardFilters } from './hooks/useDashboardFilters';

// Utils
import { getTheme } from './utils/constants';

// Componentes
import DashboardHeader from './components/dashboard/DashboardHeader';
import FilterBar from './components/dashboard/FilterBar';
import StoreCard from './components/dashboard/StoreCard';
import StoreCardEdit from './components/dashboard/StoreCardEdit';
import EmptyState from './components/dashboard/EmptyState';
import ProjectFiltersPanel from './components/dashboard/ProjectFiltersPanel';

// ======================================================
// 🔹 COMPONENTE: Dashboard
// ======================================================
//
// 🔑 PROPS
// - projeto → objeto completo do projeto (slug, cores, filtros, etc)
//
export default function Dashboard({ projeto }) {

  // ==============================
  // 🔹 ESTADOS DE CONTROLE
  // ==============================
  //
  // modoDashboard:
  // - 'config' → configurações do app
  // - 'lista'  → gerenciamento das lojas
  //
  const [modoDashboard, setModoDashboard] = useState('config');
  const [editingId, setEditingId] = useState(null);

  // Tema visual baseado no projeto
  const theme = getTheme(projeto);

  // ==============================
  // 🔹 HOOK: DADOS (CRUD)
  // ==============================
  const {
    locais,
    loading,
    error,
    toggleStatus,
    updateLocal,
    deleteLocal
  } = useDashboardData(projeto?.id);

  // ==============================
  // 🔹 HOOK: FILTROS + ORDENAÇÃO
  // ==============================
  const {
    filtroStatus,
    setFiltroStatus,
    filtroCategoria,
    setFiltroCategoria,
    locaisFiltrados
  } = useDashboardFilters(
    locais,
    projeto?.filtros_ativos || []
  );

  // ==============================
  // 🔹 HANDLERS (AÇÕES DO USUÁRIO)
  // ==============================
  const handleEdit = (local) => {
    setEditingId(local.id);
  };

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

  // ==============================
  // 🔹 FALLBACK DE SEGURANÇA
  // ==============================
  if (!projeto) {
    return (
      <div style={{ padding: 50, textAlign: 'center' }}>
        Carregando projeto...
      </div>
    );
  }

  // ==============================
  // 🔹 RENDERIZAÇÃO
  // ==============================
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

      {/* =====================================
          🔴 BLOCOS DE TESTE (DEBUG)
          (podem ser removidos depois)
      ====================================== */}
      <div style={{ background: 'purple', color: 'white', padding: '40px' }}>
        TESTE: DASHBOARD JSX
      </div>

      {/* =====================================
          🔹 HEADER DO DASHBOARD
      ====================================== */}
      <DashboardHeader projeto={projeto} theme={theme} />

      <div style={{ background: 'blue', color: 'white', padding: '20px' }}>
        TESTE: DASHBOARD ESTÁ RENDERIZANDO
      </div>

      {/* =====================================
          🔹 PAINEL GLOBAL DE FILTROS DO APP
          (sempre visível no topo)
      ====================================== */}
      <ProjectFiltersPanel
        projeto={projeto}
        theme={theme}
        onUpdate={() => {}}
      />

      {/* =====================================
          🔹 TOGGLE DE MODO
          (Configuração ↔ Lista)
      ====================================== */}
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

      {/* =====================================
          🔹 MODO: CONFIGURAÇÃO DO APP
      ====================================== */}
      {modoDashboard === 'config' && (
        <ProjectFiltersPanel
          projeto={projeto}
          theme={theme}
          onUpdate={(filtros) => {
            // atualização local do projeto
            projeto.filtros_ativos = filtros;
          }}
        />
      )}

      {/* =====================================
          🔹 MODO: LISTA DE LOJAS
      ====================================== */}
      {modoDashboard === 'lista' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          {/* BARRA DE FILTROS */}
          <FilterBar
            filtroStatus={filtroStatus}
            setFiltroStatus={setFiltroStatus}
            filtroCategoria={filtroCategoria}
            setFiltroCategoria={setFiltroCategoria}
            theme={theme}
          />

          {/* LISTAGEM */}
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
