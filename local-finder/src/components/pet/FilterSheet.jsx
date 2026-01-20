// ======================================================
// 📄 FilterSheet.jsx
// Painel de Filtros & Ordenação (Mobile-first)
// ======================================================

import React from 'react';
import {
  X,
  Star,
  TrendingUp,
  Award,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Home
} from 'lucide-react';

// Categorias oficiais
const CATEGORIAS = [
  { id: 'banho', label: 'Banho', icon: <Scissors size={18} /> },
  { id: 'vet', label: 'Vet', icon: <Stethoscope size={18} /> },
  { id: 'loja', label: 'Loja', icon: <ShoppingBag size={18} /> },
  { id: 'hotel', label: 'Hotel', icon: <Home size={18} /> }
];

// Ordenações possíveis
const ORDENACOES = [
  { id: 'melhor_nota', label: 'Melhor nota', icon: <Star size={18} /> },
  { id: 'mais_avaliados', label: 'Mais avaliados', icon: <TrendingUp size={18} /> },
  { id: 'destaques', label: 'Destaques (VIP)', icon: <Award size={18} /> }
];

export default function FilterSheet({
  onClose,
  categoriaAtiva,
  setCategoriaAtiva,
  ordenacaoAtiva,
  setOrdenacaoAtiva
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
    >
      <div
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: '500px',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '20px',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}
      >

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Filtros & Ordenação</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none' }}>
            <X size={24} />
          </button>
        </div>

        {/* ==============================
            🔹 ORDENAÇÃO
        ============================== */}
        <div style={{ marginTop: '25px' }}>
          <h4>Ordenar por</h4>

          {ORDENACOES.map(opt => (
            <label
              key={opt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '10px',
                cursor: 'pointer',
                background:
                  ordenacaoAtiva === opt.id ? '#2563eb' : '#fff',
                color:
                  ordenacaoAtiva === opt.id ? '#fff' : '#1e293b',
                fontWeight: 600
              }}
            >
              <input
                type="radio"
                name="ordenacao"
                checked={ordenacaoAtiva === opt.id}
                onChange={() => setOrdenacaoAtiva(opt.id)}
              />
              {opt.icon} {opt.label}
            </label>
          ))}
        </div>

        {/* ==============================
            🔹 CATEGORIAS
        ============================== */}
        <div style={{ marginTop: '25px' }}>
          <h4>Categoria</h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {CATEGORIAS.map(cat => {
              const ativo = categoriaAtiva === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaAtiva(ativo ? null : cat.id)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    background: ativo ? '#2563eb' : '#fff',
                    color: ativo ? '#fff' : '#64748b',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {cat.icon} {cat.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
