import React from 'react';
import {
  MapPin,
  MessageCircle,
  Star,
  Award
} from 'lucide-react';

import { InstagramEmbed } from 'react-social-media-embed';

/**
 * ======================================================
 * 🐾 PetCardClassic
 * ======================================================
 *
 * 🎯 INTENÇÃO
 * Card visual padrão do feed de Pet Shops.
 *
 * 🔒 CONTRATO
 * - NÃO filtra
 * - NÃO ordena
 * - NÃO abre modal
 * - NÃO acessa Supabase
 *
 * Recebe tudo via props.
 *
 * 🧠 MODELO MENTAL
 * "Me diga O QUE mostrar, eu só desenho."
 *
 * ======================================================
 */

export default function PetCardClassic({
  local,
  theme,
  onContact
}) {
  if (!local) return null;

  // ==============================
  // 🔹 FLAGS DERIVADAS (VISUAIS)
  // ==============================
  const isVip = !!local.destaque;
  const hasInstagram = !!local.instagram_url;
  const notaAlta = Number(local.nota || 0) >= 4.5;

  // ==============================
  // 🔹 PLACEHOLDER VISUAL
  // ==============================
  const placeholderIcon = () => {
    if (local.tags?.includes('vet')) return '🏥';
    if (local.tags?.includes('banho')) return '✂️';
    if (local.tags?.includes('hotel')) return '🏨';
    if (local.tags?.includes('loja')) return '🛍️';
    return '🐾';
  };

  return (
    <div
      style={{
        background: theme.card,
        borderRadius: theme.radiusCard || '20px',
        overflow: 'hidden',
        boxShadow: isVip
          ? `0 0 0 2px ${theme.primary}, ${theme.shadow}`
          : theme.shadow,
        border: `1px solid ${theme.border}`,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
      }}
    >
      {/* ==============================
          🔹 SELO VIP
      ============================== */}
      {isVip && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: theme.primary,
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 2
          }}
        >
          <Award size={12} /> VIP
        </div>
      )}

      {/* ==============================
          🔹 IMAGEM / IDENTIDADE
      ============================== */}
      {local.logo_url ? (
        <img
          src={local.logo_url}
          alt={local.nome}
          loading="lazy"
          style={{
            width: '100%',
            height: '130px',
            objectFit: 'contain',
            background: '#f8fafc'
          }}
        />
      ) : (
        <div
          style={{
            height: '130px',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}
        >
          {placeholderIcon()}
        </div>
      )}

      {/* ==============================
          🔹 CONTEÚDO
      ============================== */}
      <div style={{ padding: '18px' }}>
        <h3
          style={{
            margin: 0,
            fontSize: '1.15rem',
            fontWeight: '800',
            color: theme.text
          }}
        >
          {local.nome}
        </h3>

        {/* NOTA */}
        {(local.nota || local.avaliacoes) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '6px',
              fontSize: '13px',
              color: notaAlta ? theme.primary : theme.textSec,
              fontWeight: '600'
            }}
          >
            <Star size={14} />
            {local.nota || '—'}
            {local.avaliacoes
              ? ` (${local.avaliacoes})`
              : ''}
          </div>
        )}

        {/* ENDEREÇO */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            marginTop: '10px',
            fontSize: '13px',
            color: theme.textSec
          }}
        >
          <MapPin size={14} />
          <span>{local.endereco || 'Endereço não informado'}</span>
        </div>

        {/* TAGS */}
        {Array.isArray(local.tags) && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '12px'
            }}
          >
            {local.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: '#f1f5f9',
                  color: theme.textSec
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* INSTAGRAM (somente VIP) */}
        {isVip && hasInstagram && (
          <div
            style={{
              marginTop: '16px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: `1px solid ${theme.border}`
            }}
          >
            <InstagramEmbed
              url={local.instagram_url}
              width="100%"
            />
          </div>
        )}
      </div>

      {/* ==============================
          🔹 CTA
      ============================== */}
      <button
        onClick={() => onContact?.(local)}
        style={{
          width: '100%',
          border: 'none',
          padding: '16px',
          background: '#25D366',
          color: '#fff',
          fontSize: '15px',
          fontWeight: '700',
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
  );
}
