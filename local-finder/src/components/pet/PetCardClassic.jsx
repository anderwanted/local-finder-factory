// ======================================================
// 🐾 PetCardClassic.jsx
// Card principal do PetList (versão Classic)
// ======================================================
//
// RESPONSABILIDADE
// - Renderizar TODAS as informações visuais do Pet Shop
// - Garantir imagem SEMPRE
// - Controlar expansão (sanfona)
// - NÃO acessar Supabase diretamente
//
// CONTRATO COM SUPABASE
// - Campo de imagem: image_url
// ======================================================

import React, { useState } from "react";
import {
  MapPin,
  MessageCircle,
  Star,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function PetCardClassic({ local, onOpenChat }) {
  const [expanded, setExpanded] = useState(false);

  // =========================
  // DADOS NORMALIZADOS
  // =========================
  const isVip = Boolean(local.destaque);
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);

  // =========================
  // 🖼️ IMAGEM FINAL (CONTRATO)
  // =========================
  const imagemFinal =
    typeof local.image_url === "string" && local.image_url.trim() !== ""
      ? local.image_url
      : "https://images.unsplash.com/photo-abc123?auto=format&fit=crop&w=800&q=80";

  // =========================
  // PLACEHOLDER (se imagem quebrar)
  // =========================
  const getPlaceholderIcon = () => {
    const niche = (local.niche || "").toLowerCase();
    if (niche.includes("vet")) return "🏥";
    if (niche.includes("banho") || niche.includes("tosa")) return "✂️";
    if (niche.includes("hotel")) return "🏨";
    return "🐶";
  };

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        position: "relative"
      }}
    >
      {/* =========================
          SELO VIP
      ========================== */}
      {isVip && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "var(--cor-destaque)",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "700",
            padding: "4px 10px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            zIndex: 2
          }}
        >
          <Award size={12} /> VIP
        </div>
      )}

      {/* =========================
          IMAGEM
      ========================== */}
<img
  src={imagemFinal}
  alt={local.nome}
  loading="lazy"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";
  }}
  style={{
    width: "100%",
    height: "160px",
    objectFit: "cover",
    display: "block"
  }}
/>

      {/* =========================
          CONTEÚDO
      ========================== */}
      <div style={{ padding: "16px" }}>
        {/* NOME */}
        <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700 }}>
          {local.nome}
        </h3>

        {/* NOTA */}
        {nota > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "4px",
              fontSize: "13px",
              color: "var(--text-secondary)"
            }}
          >
            <Star size={14} color="#facc15" fill="#facc15" />
            <strong>{nota.toFixed(1)}</strong>
            <span>({avaliacoes} avaliações)</span>
          </div>
        )}

        {/* ENDEREÇO */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginTop: "8px",
            fontSize: "13px",
            color: "var(--text-secondary)"
          }}
        >
          <MapPin size={14} />
          <span>{local.endereco || "Endereço não informado"}</span>
        </div>

        {/* TAGS */}
        {Array.isArray(local.tags) && local.tags.length > 0 && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
            {local.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#f1f5f9",
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontWeight: 600
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* =========================
            TOGGLE EXTRA
        ========================== */}
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            marginTop: "12px",
            width: "100%",
            background: "transparent",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            padding: "8px",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            gap: "6px"
          }}
        >
          Conteúdo extra {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>

        {/* =========================
            SANFONA
        ========================== */}
        <div
          style={{
            maxHeight: expanded ? "300px" : "0",
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition: "all 0.35s ease",
            marginTop: expanded ? "10px" : "0"
          }}
        >
          <div
            style={{
              padding: "12px",
              background: "#f8fafc",
              borderRadius: "10px",
              fontSize: "13px",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }}
          >
            {local.aberto_agora !== null && (
              <div>{local.aberto_agora ? "🟢 Aberto agora" : "🔴 Fechado"}</div>
            )}
            {local.horario_fechamento && (
              <div>⏰ Até {local.horario_fechamento}</div>
            )}
            {local.estacionamento && <div>🅿️ Estacionamento disponível</div>}
          </div>
        </div>
      </div>

      {/* =========================
          CTA
      ========================== */}
      <button
        onClick={() => onOpenChat?.(local)}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          background: "#25D366",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          gap: "8px"
        }}
      >
        <MessageCircle size={20} /> Falar com a loja
      </button>
    </div>
  );
}
