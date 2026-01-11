
// src/components/dashboard/FilterBar.jsx
import React from 'react';
import { TAGS_OFICIAIS, STATUS_FILTROS } from '../../utils/constants';

export default function FilterBar({ 
  filtroStatus, 
  setFiltroStatus, 
  filtroCategoria, 
  setFiltroCategoria,
  theme 
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '15px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
      
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
              boxShadow: filtroStatus === status ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

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