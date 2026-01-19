// ======================================================
// 📄 PetList.jsx
// Página pública do App (Lista de estabelecimentos)
// ======================================================
//
// 🎯 PAPEL DESTA TELA
// - É a PRINCIPAL tela do usuário final
// - Funciona como um "marketplace local"
// - Cada CARD é uma mini landing page
// - Conversão principal: WhatsApp
//
// 🧠 MODELO MENTAL
// - Recebe o projeto já resolvido pelo Router
// - Busca os locais do projeto
// - Aplica filtros ATIVOS do projeto
// - Renderiza cards + CTA
//
// 🔒 CONTRATO
// - Nunca quebrar render
// - Falhas silenciosas
// - Sempre mostrar algo (ou Empty State)
// - Mobile-first
//

import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// Ícones
import {
  MessageCircle,
  MapPin,
  Store,
  Award
} from 'lucide-react';

// Modal de conversa (lead → WhatsApp)
import ChatModal from './ChatModal';

// Embed Instagram (VIP)
import { InstagramEmbed } from 'react-social-media-embed';

// ======================================================
// 🔹 PLACEHOLDER VISUAL (quando não existe logo)
// ======================================================
//
// 🎯 Intenção:
// - Evitar cards “quebrados”
// - Garantir identidade visual mínima
// - Comunicar categoria de forma simbólica
//
function getPlaceholderByCategory(tags = []) {
  const base = {
    width: '100%',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '42px',
    background: '#f1f5f9'
  };

  if (!Array.isArray(tags)) return { ...base, icon: '🏪' };
  if (tags.includes('vet')) return { ...base, icon: '🏥' };
  if (tags.includes('banho')) return { ...base, icon: '✂️' };
  if (tags.includes('hotel')) return { ...base, icon: '🏠' };

  return { ...base, icon: '🏪' };
}

// ======================================================
// 🔹 COMPONENTE PRINCIPAL
// ======================================================
export default function PetList({ projeto }) {

  // ==============================
  // 🔹 ESTADOS PRINCIPAIS
  // ==============================
  //
  // locais        → dados crus do banco
  // loading       → loading global
  // selectedLocal → abre modal de conversa
  //
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);

  // ==============================
  // 🔹 FETCH DE DADOS
  // ==============================
  //
  // 🎯 Intenção:
  // Buscar todos os locais publicados do projeto
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

      if (error) {
        console.error('Erro ao buscar locais:', error);
        setLocais([]);
      } else {
        setLocais(data || []);
      }

      setLoading(false);
    }

    fetchLocais();
  }, [projeto]);

  // ==============================
  // 🔹 THEME (CSS VARIABLES)
  // ==============================
  //
  // 🎯 Intenção:
  // Permitir personalização por projeto
  //
  const isDark = projeto?.tema_base === 'dark';

  const themeVars = {
    '--bg-app': isDark ? '#0f172a' : '#f8fafc',
    '--bg-card': isDark ? '#1e293b' : '#ffffff',
    '--text-primary': isDark ? '#f1f5f9' : '#1e293b',
    '--text-secondary': isDark ? '#94a3b8' : '#64748b',
    '--border-color': isDark ? '#334155' : '#e2e8f0',
    '--cor-primaria': projeto?.cor_primaria || '#2563eb',
    '--cor-destaque': projeto?.cor_destaque || '#f59e0b',
    '--shadow-card': isDark
      ? '0 10px 15px rgba(0,0,0,0.4)'
      : '0 4px 6px rgba(0,0,0,0.08)'
  };

  // ==============================
  // 🔹 RENDER
  // ==============================
  return (
    <div
      style={{
        ...themeVars,
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif'
      }}
    >

      {/* ==========================
          🔹 HEADER
      ========================== */}
      <header style={{ padding: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>
          {projeto?.titulo_pagina || projeto?.nome}
        </h1>
        <p style={{ marginTop: 6, color: 'var(--text-secondary)' }}>
          Encontre o melhor serviço perto de você
        </p>
      </header>

      {/* ==========================
          🔹 LISTA DE CARDS
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

        {/* 🔄 Loading */}
        {loading && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Carregando locais…
          </p>
        )}

        {/* 🚫 Empty */}
        {!loading && locais.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Nenhum local disponível no momento.
          </p>
        )}

        {/* ======================
            🔹 CARDS
        ====================== */}
        {locais.map(local => {
          const isVip = local.destaque === true;
          const placeholder = getPlaceholderByCategory(local.tags);

          return (
            <div
              key={local.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isVip
                  ? `0 0 0 2px var(--cor-destaque), var(--shadow-card)`
                  : 'var(--shadow-card)',
                position: 'relative'
              }}
            >

              {/* 🏆 SELO VIP */}
              {isVip && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'var(--cor-destaque)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    zIndex: 2
                  }}
                >
                  <Award size={12} /> VIP
                </div>
              )}

              {/* 🖼️ LOGO OU PLACEHOLDER */}
              {local.logo_url ? (
                <img
                  src={local.logo_url}
                  alt={local.nome}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'contain',
                    background: '#f8fafc'
                  }}
                />
              ) : (
                <div style={placeholder}>
                  {placeholder.icon}
                </div>
              )}

              {/* 📄 CONTEÚDO */}
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                  {local.nome}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    marginTop: 6,
                    color: 'var(--text-secondary)',
                    fontSize: '13px'
                  }}
                >
                  <MapPin size={14} />
                  {local.endereco || 'Endereço não informado'}
                </div>

                {/* 🏷️ TAGS */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                  {Array.isArray(local.tags) &&
                    local.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '11px',
                          padding: '4px 10px',
                          background: '#f1f5f9',
                          borderRadius: '12px',
                          color: '#475569',
                          fontWeight: 600
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                {/* 📸 Instagram (VIP) */}
                {isVip && local.instagram_url && (
                  <div style={{ marginTop: 12 }}>
                    <InstagramEmbed url={local.instagram_url} width="100%" />
                  </div>
                )}
              </div>

              {/* 💬 CTA */}
              <button
                onClick={() => setSelectedLocal(local)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#25D366',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={20} />
                Falar com a loja
              </button>
            </div>
          );
        })}
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
