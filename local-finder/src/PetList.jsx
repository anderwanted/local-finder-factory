// ======================================================
// 📄 PetList.jsx
// Tela pública do App (leitura)
// ======================================================

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import {
  MessageCircle,
  MapPin,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Home,
  X
} from 'lucide-react';
import ChatModal from './ChatModal';

// ======================================================
// 🔹 CONFIGURAÇÕES FIXAS
// ======================================================

// Categorias permitidas (contrato visual + dados)
const CATEGORIAS = [
  { id: 'banho', label: 'Banho', icon: <Scissors size={18} /> },
  { id: 'vet', label: 'Vet', icon: <Stethoscope size={18} /> },
  { id: 'loja', label: 'Loja', icon: <ShoppingBag size={18} /> },
  { id: 'hotel', label: 'Hotel', icon: <Home size={18} /> }
];

// ======================================================
// 🔹 COMPONENTE
// ======================================================
export default function PetList({ projeto }) {

  // ==============================
  // 🔹 ESTADOS
  // ==============================
  //
  // locais           → dados crus do banco
  // filtroCategoria  → categoria selecionada
  // loading          → carregamento
  // selectedLocal    → modal de chat
  //
  const [locais, setLocais] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);

  // ==============================
  // 🔹 FETCH DE DADOS
  // ==============================
  //
  // 🎯 Intenção:
  // Buscar apenas locais PUBLICADOS para o app
  //
  useEffect(() => {
    async function fetchLocais() {
      if (!projeto?.id) return;

      setLoading(true);

      const { data, error } = await supabase
        .from('locais')
        .select('*')
        .eq('projeto_id', projeto.id)
        .eq('status', 'PUBLICAR_APP');

      if (!error) {
        setLocais(data || []);
      }

      setLoading(false);
    }

    fetchLocais();
  }, [projeto]);

  // ==============================
  // 🔹 FILTRAGEM (MEMOIZADA)
  // ==============================
  //
  // 🧠 Modelo mental:
  // - Nunca mutar "locais"
  // - Sempre derivar a lista
  //
  const locaisFiltrados = useMemo(() => {
    if (!filtroCategoria) return locais;

    return locais.filter(local =>
      Array.isArray(local.tags) &&
      local.tags.includes(filtroCategoria)
    );
  }, [locais, filtroCategoria]);

  // ==============================
  // 🔹 TEMA DO PROJETO
  // ==============================
  const corPrimaria = projeto?.cor_primaria || '#2563eb';

  // ==============================
  // 🔹 RENDER
  // ==============================
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: 'system-ui'
      }}
    >

      {/* ==========================
          🔹 HEADER FIXO + FILTROS
         ========================== */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0'
        }}
      >

        {/* TÍTULO */}
        <div style={{ padding: '16px 20px' }}>
          <h1 style={{ margin: 0, fontSize: '1.4rem' }}>
            {projeto?.titulo_pagina || projeto?.nome || 'Locais'}
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
            Encontre os melhores serviços
          </p>
        </div>

        {/* FILTRO DE CATEGORIA (SCROLL HORIZONTAL) */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            padding: '10px 20px',
            overflowX: 'auto'
          }}
        >

          {/* LIMPAR FILTRO */}
          {filtroCategoria && (
            <button
              onClick={() => setFiltroCategoria(null)}
              style={{
                flexShrink: 0,
                height: '40px',
                padding: '0 12px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: '#f1f5f9',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          )}

          {/* TODAS */}
          <button
            onClick={() => setFiltroCategoria(null)}
            style={{
              flexShrink: 0,
              height: '40px',
              padding: '0 16px',
              borderRadius: '20px',
              border: 'none',
              background: filtroCategoria === null ? corPrimaria : '#f1f5f9',
              color: filtroCategoria === null ? '#fff' : '#475569',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Todos
          </button>

          {/* CATEGORIAS */}
          {CATEGORIAS.map(cat => {
            const ativo = filtroCategoria === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setFiltroCategoria(cat.id)}
                style={{
                  flexShrink: 0,
                  height: '40px',
                  padding: '0 16px',
                  borderRadius: '20px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: ativo ? corPrimaria : '#f1f5f9',
                  color: ativo ? '#fff' : '#475569',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ==========================
          🔹 LISTA DE LOCAIS
         ========================== */}
      <div
        style={{
          padding: '20px',
          maxWidth: '640px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {loading && (
          <p style={{ textAlign: 'center', color: '#64748b' }}>
            Carregando...
          </p>
        )}

        {!loading && locaisFiltrados.length === 0 && (
          <p style={{ textAlign: 'center', color: '#64748b' }}>
            Nenhum local encontrado.
          </p>
        )}

        {locaisFiltrados.map(local => (
          <div
            key={local.id}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '16px'
            }}
          >
            <h3 style={{ margin: '0 0 6px 0' }}>{local.nome}</h3>

            <div
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'flex-start',
                fontSize: '13px',
                color: '#64748b'
              }}
            >
              <MapPin size={16} />
              <span>{local.endereco || 'Endereço não informado'}</span>
            </div>

            {/* TAGS */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
              {local.tags?.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    background: '#f1f5f9',
                    borderRadius: '20px',
                    fontWeight: 600
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => setSelectedLocal(local)}
              style={{
                marginTop: '14px',
                width: '100%',
                height: '44px',
                border: 'none',
                borderRadius: '12px',
                background: '#25D366',
                color: '#fff',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <MessageCircle size={18} />
              Falar com a loja
            </button>
          </div>
        ))}
      </div>

      {/* ==========================
          🔹 MODAL DE CHAT
         ========================== */}
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
