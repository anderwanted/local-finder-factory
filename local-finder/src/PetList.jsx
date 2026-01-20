// ======================================================
// 📄 PetList.jsx
// Página pública do App (usuário final)
// ======================================================
//
// 🎯 RESPONSABILIDADE
// - Buscar locais publicados
// - Exibir filtros fixos no topo (categorias + ordenação)
// - Renderizar cards com imagem
// - Abrir ChatModal
// ======================================================

import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import {
  MessageCircle,
  Award,
  Store,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Home
} from 'lucide-react';

import ChatModal from './ChatModal';

// ======================================================
// 🔹 CONFIGURAÇÕES FIXAS
// ======================================================

// Categorias (scroll horizontal, fixo no topo)
const CATEGORIAS = [
  { id: 'banho', label: 'Banho', icon: <Scissors size={18} /> },
  { id: 'vet', label: 'Vet', icon: <Stethoscope size={18} /> },
  { id: 'loja', label: 'Loja', icon: <ShoppingBag size={18} /> },
  { id: 'hotel', label: 'Hotel', icon: <Home size={18} /> }
];

// Ordenações disponíveis
const ORDENACOES = [
  { id: 'melhor_nota', label: '⭐ Melhor nota' },
  { id: 'mais_avaliados', label: '📈 Mais avaliações' },
  { id: 'destaque', label: '🏆 Destaques' }
];

// ======================================================
// 🔹 COMPONENTE PRINCIPAL
// ======================================================
export default function PetList({ projeto }) {
  // ==============================
  // 🔹 ESTADOS
  // ==============================
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [ordenacaoAtiva, setOrdenacaoAtiva] = useState('melhor_nota'); // padrão
  const [selectedLocal, setSelectedLocal] = useState(null);

  // ==============================
  // 🔹 BUSCA DE DADOS
  // ==============================
  useEffect(() => {
    async function fetchLocais() {
      setLoading(true);

      const { data, error } = await supabase
        .from('locais')
        .select('*')
        .eq('projeto_id', projeto.id)
        .eq('status', 'PUBLICAR_APP');

      if (error) {
        console.error('Erro ao buscar locais:', error);
        setLocais([]);
      } else {
        setLocais(data || []);
      }

      setLoading(false);
    }

    if (projeto?.id) fetchLocais();
  }, [projeto]);

  // ==============================
  // 🔹 FILTRAGEM + ORDENAÇÃO
  // ==============================
  const locaisProcessados = useMemo(() => {
    let resultado = [...locais];

    // 🏷 Categoria
    if (categoriaAtiva) {
      resultado = resultado.filter(
        l =>
          Array.isArray(l.tags) &&
          l.tags.includes(categoriaAtiva)
      );
    }

    // 🔃 Ordenação
    if (ordenacaoAtiva === 'melhor_nota') {
      resultado.sort((a, b) => (b.nota || 0) - (a.nota || 0));
    }

    if (ordenacaoAtiva === 'mais_avaliados') {
      resultado.sort((a, b) => (b.avaliacoes || 0) - (a.avaliacoes || 0));
    }

    if (ordenacaoAtiva === 'destaque') {
      resultado.sort((a, b) => {
        if (b.destaque === a.destaque) return 0;
        return b.destaque ? 1 : -1;
      });
    }

    return resultado;
  }, [locais, categoriaAtiva, ordenacaoAtiva]);

  // ==============================
  // 🔹 TEMA
  // ==============================
  const isDark = projeto?.tema_base === 'dark';

  const tema = {
    '--bg-app': isDark ? '#0f172a' : '#f8fafc',
    '--bg-card': isDark ? '#1e293b' : '#ffffff',
    '--text-primary': isDark ? '#f1f5f9' : '#1e293b',
    '--text-secondary': isDark ? '#94a3b8' : '#64748b',
    '--border-color': isDark ? '#334155' : '#e2e8f0',
    '--cor-primaria': projeto?.cor_primaria || '#2563eb',
    '--cor-destaque': projeto?.cor_destaque || '#f59e0b'
  };

  // ======================================================
  // 🔹 RENDER
  // ======================================================
  return (
    <div
      style={{
        ...tema,
        background: 'var(--bg-app)',
        minHeight: '100vh',
        color: 'var(--text-primary)',
        fontFamily: 'sans-serif'
      }}
    >
      {/* ============================================= */}
      {/* 🔝 FILTROS FIXOS */}
      {/* ============================================= */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--bg-app)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        {/* CATEGORIAS */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '12px' }}>
          <button
            onClick={() => setCategoriaAtiva(null)}
            style={{
              padding: '10px 14px',
              borderRadius: '999px',
              border: '1px solid var(--border-color)',
              background: categoriaAtiva === null ? 'var(--cor-primaria)' : 'var(--bg-card)',
              color: categoriaAtiva === null ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600
            }}
          >
            <Store size={16} /> Todos
          </button>

          {CATEGORIAS.map(cat => {
            const ativo = categoriaAtiva === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoriaAtiva(ativo ? null : cat.id)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-color)',
                  background: ativo ? 'var(--cor-primaria)' : 'var(--bg-card)',
                  color: ativo ? '#fff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600
                }}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>

        {/* ORDENAÇÃO */}
        <div style={{ display: 'flex', gap: '10px', padding: '10px 12px' }}>
          {ORDENACOES.map(o => (
            <button
              key={o.id}
              onClick={() => setOrdenacaoAtiva(o.id)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: ordenacaoAtiva === o.id ? 'var(--cor-destaque)' : 'var(--bg-card)',
                color: ordenacaoAtiva === o.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '13px'
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================= */}
      {/* 📋 CARDS */}
      {/* ============================================= */}
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {loading && <p style={{ textAlign: 'center' }}>Carregando…</p>}

        {!loading &&
          locaisProcessados.map(local => {
            const isVip = local.destaque || local.nota >= 4.5;

            return (
              <div
                key={local.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: isVip
                    ? `0 0 0 2px var(--cor-destaque)`
                    : '0 4px 8px rgba(0,0,0,0.05)'
                }}
              >
                {/* IMAGEM */}
                {local.image_url ? (
                  <img
                    src={local.image_url}
                    alt={local.nome}
                    style={{
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: '160px',
                      background: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '42px'
                    }}
                  >
                    🐶
                  </div>
                )}

                {/* CONTEÚDO */}
                <div style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 700, display: 'flex', gap: '6px' }}>
                    {local.nome}
                    {isVip && <Award size={14} color="var(--cor-destaque)" />}
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    ⭐ {local.nota || '-'} · {local.avaliacoes || 0} avaliações
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setSelectedLocal(local)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: 'none',
                    background: '#25D366',
                    color: '#fff',
                    fontWeight: 700,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <MessageCircle size={18} /> Falar com a loja
                </button>
              </div>
            );
          })}
      </div>

      {/* CHAT */}
      {selectedLocal && (
        <ChatModal
          local={selectedLocal}
          projeto={projeto}
          onClose={() => setSelectedLocal(null)}
        />
      )}
    </div>
  );
}
