
// src/components/dashboard/StoreCardEdit.jsx
import React, { useState } from 'react';
import { TAGS_OFICIAIS } from '../../utils/constants';

export default function StoreCardEdit({ local, theme, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: local.nome,
    destaque: local.destaque,
    tags: local.tags || []
  });

  const toggleTag = (tagId) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(t => t !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const handleSubmit = () => {
    onSave(local.id, formData);
  };

  return (
    <div style={{
      background: theme.card,
      borderRadius: '12px',
      border: `1px solid ${theme.border}`,
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Título */}
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
          Editando: {local.nome}
        </div>

        {/* Campo Nome */}
        <input
          value={formData.nome}
          onChange={e => setFormData({ ...formData, nome: e.target.value })}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: `1px solid ${theme.border}`,
            outline: 'none'
          }}
          placeholder="Nome do local"
        />

        {/* Seletor de Tags */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {TAGS_OFICIAIS.map(tag => (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: `1px solid ${theme.border}`,
                background: formData.tags.includes(tag.id) ? tag.color : 'white',
                color: formData.tags.includes(tag.id) ? 'white' : theme.textSec,
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '600'
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Botões de Ação */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '10px',
              background: theme.success,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Salvar
          </button>
          
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              background: '#f1f5f9',
              color: theme.text,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}