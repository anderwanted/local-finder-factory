
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { FILTROS_APP, DEFAULT_FILTROS_APP } from '../../utils/constants';

export default function ProjectFiltersPanel({ projeto, theme, onUpdate }) {
  const [ativos, setAtivos] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setAtivos(
      projeto.filtros_ativos && projeto.filtros_ativos.length > 0
        ? projeto.filtros_ativos
        : DEFAULT_FILTROS_APP
    );
  }, [projeto]);

  const toggleFiltro = (id) => {
    setAtivos(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const salvar = async () => {
    setSaving(true);

    const { error } = await supabase
      .from('projetos')
      .update({ filtros_ativos: ativos })
      .eq('id', projeto.id);

    setSaving(false);

    if (error) {
      alert('Erro ao salvar filtros');
      return;
    }

    onUpdate?.(ativos);
  };

  const renderGroup = (group, title) => (
    <>
      <h4 style={{ margin: '15px 0 5px', fontSize: '14px' }}>{title}</h4>
      {FILTROS_APP.filter(f => f.group === group).map(filtro => (
        <label
          key={filtro.id}
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            padding: '8px 0',
            cursor: 'pointer'
          }}
        >
          <input
            type="checkbox"
            checked={ativos.includes(filtro.id)}
            onChange={() => toggleFiltro(filtro.id)}
          />
          <div>
            <div style={{ fontWeight: '600', fontSize: '13px' }}>
              {filtro.label}
            </div>
            <div style={{ fontSize: '12px', color: theme.textSec }}>
              {filtro.description}
            </div>
          </div>
        </label>
      ))}
    </>
  );

  return (
    <div
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}
    >
      <h3 style={{ marginTop: 0 }}>Filtros visíveis no App</h3>
      <p style={{ fontSize: '13px', color: theme.textSec }}>
        Ative apenas os filtros que fazem sentido para este nicho.
      </p>

      {renderGroup('filtro', 'Filtros')}
      {renderGroup('ordenacao', 'Ordenação')}

      <button
        onClick={salvar}
        disabled={saving}
        style={{
          marginTop: '15px',
          padding: '10px 16px',
          background: theme.primary,
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {saving ? 'Salvando…' : 'Salvar filtros'}
      </button>
    </div>
  );
}
