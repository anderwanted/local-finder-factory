
// src/components/dashboard/DashboardHeader.jsx
import React from 'react';
import { Store, ExternalLink } from 'lucide-react';

export default function DashboardHeader({ projeto, theme }) {
  return (
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
  );
}