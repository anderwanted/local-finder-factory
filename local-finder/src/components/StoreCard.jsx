// src/components/dashboard/StoreCard.jsx
import React from 'react';
import { Eye, EyeOff, Edit, Trash2, Star } from 'lucide-react';

export default function StoreCard({ local, theme, onToggleStatus, onEdit, onDelete }) {
  const isVisible = local.status === 'PUBLICAR_APP';

  return (
    <div style={{
      background: theme.card,
      borderRadius: '12px',
      border: `1px solid ${theme.border}`,
      padding: '16px',
      transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Info da Loja */}
        <div>
          <div style={{ 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}>
            {local.nome}
            {local.destaque && <Star size={14} fill="#f59e0b" color="#f59e0b" />}
          </div>
          
          <div style={{ 
            fontSize: '12px', 
            color: theme.textSec, 
            marginTop: '4px' 
          }}>
            {local.endereco || 'Sem endereço cadastrado'}
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', gap: '8px' }}>
          
          {/* Toggle Visibilidade */}
          <button
            onClick={() => onToggleStatus(local)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: isVisible ? '#f1f5f9' : '#fee2e2',
              color: isVisible ? theme.textSec : theme.danger
            }}
            title={isVisible ? 'Ocultar' : 'Publicar'}
          >
            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>

          {/* Editar */}
          <button
            onClick={() => onEdit(local)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: '#dbeafe',
              color: '#2563eb'
            }}
            title="Editar"
          >
            <Edit size={18} />
          </button>

          {/* Deletar */}
          <button
            onClick={() => onDelete(local.id)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: '#fef2f2',
              color: theme.danger
            }}
            title="Excluir"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
