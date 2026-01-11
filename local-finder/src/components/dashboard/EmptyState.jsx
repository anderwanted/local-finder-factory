
// src/components/dashboard/EmptyState.jsx
import React from 'react';
import { Search, Store } from 'lucide-react';

export default function EmptyState({ type = 'filter', theme }) {
  if (type === 'filter') {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: theme.textSec
      }}>
        <Search size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
        <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
          Nenhuma loja encontrada
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.7 }}>
          Tente ajustar os filtros acima
        </p>
      </div>
    );
  }

  if (type === 'no-data') {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        color: theme.textSec
      }}>
        <Store size={56} style={{ opacity: 0.2, marginBottom: '20px' }} />
        <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
          Nenhuma loja cadastrada ainda
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.7 }}>
          Use o Admin Generator para começar
        </p>
      </div>
    );
  }

  return null;
}