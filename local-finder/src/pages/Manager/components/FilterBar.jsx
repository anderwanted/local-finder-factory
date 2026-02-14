// ======================================================
// 📄 FilterBar.jsx
// Função: Barra de filtros do Dashboard (Admin)
// ======================================================

// 🔹 DEPENDÊNCIAS
// Constantes globais de filtros e categorias
import React from 'react';
import { TAGS_OFICIAIS, STATUS_FILTROS } from '../../utils/constants';

// ======================================================
// 🔹 FILTER BAR — CONTROLE DE VISUALIZAÇÃO
// ======================================================
//
// 🎯 INTENÇÃO
// Permitir que o administrador:
// - Filtre lojas por status (publicado / oculto / todos)
// - Filtre lojas por categoria (tags)
//
// 🔒 CONTRATO
// - Não busca dados
// - Não ordena ranking
// - Apenas altera estado local
//
// 🧠 PRINCÍPIO
// Filtros aqui são *ferramentas de leitura*, não regras de negócio.
//
// 🚫 NÃO FAZER AQUI
// - Não alterar filtros ativos do projeto
// - Não salvar nada no banco
// - Não aplicar ordenação
//
// 🚧 FUTURO
// - Pode ser reutilizado na PetList (modo leitura)
// - Pode virar scroll horizontal no mobile
//
export default function FilterBar({ 
  filtroStatus, 
  setFiltroStatus, 
  filtroCategoria, 
  setFiltroCategoria,
  theme 
}) {
  return (
    // ==============================
    // 🔹 CONTAINER GERAL
    // ==============================
    <div
      style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      
      {/* ==============================
          🔹 FILTRO DE STATUS (SEGMENTADO)
          ============================== */}
      {/* Controle rápido para visibilidade no dashboard */}
      <div
        style={{
          display: 'flex',
          background: '#e2e8f0',
          padding: '4px',
          borderRadius: '8px'
        }}
      >
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
              boxShadow:
                filtroStatus === status
                  ? '0 1px 2px rgba(0,0,0,0.1)'
                  : 'none',
              transition: 'all 0.2s'
            }}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ==============================
          🔹 FILTRO POR CATEGORIA (TAGS)
          ============================== */}
      {/* Chips de categoria para leitura rápida */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {TAGS_OFICIAIS.map(tag => {
          const isActive = filtroCategoria === tag.id;
          
          return (
            <button
              key={tag.id}
              onClick={() => setFiltroCategoria(isActive ? null : tag.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                border: `1px solid ${isActive ? tag.color : theme.border}`,
                background: isActive ? tag.color : 'white',
                color: isActive ? 'white' : theme.textSec,
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
