// src/components/pet/PetCardMapStyle.jsx
import React, { useState } from "react";
import {
  Star,
  MessageCircle,
  Scissors,
  Stethoscope,
  Car,
  ChevronDown,
  ChevronUp,
  MapPin,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export default function PetCardMapStyle({ local, onOpenChat }) {
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);
  const [expanded, setExpanded] = useState(false);
  const isVip = Boolean(local.destaque);
  


 const imagem =
  typeof local.image_url === 'string' && local.image_url.trim() !== ''
    ? local.image_url
    : 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80';


  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
      }}
    >
      {/* IMAGEM */}
      <div style={{ position: "relative" }}>
      <img
        src={imagem}
        alt={local.nome}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80';
        }}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'cover'
        }}
      />

{/* BADGE VIP — GOLD PREMIUM */}
{isVip && (
  <div
    style={{
      position: "absolute",
      top: 12,
      right: 12,
      padding: "6px 14px",
      borderRadius: "999px",
      fontSize: "11px",
      fontWeight: 800,
      letterSpacing: "0.4px",
      color: "#3b2f0b",
      background:
        "linear-gradient(135deg, #f6e27a 0%, #facc15 35%, #eab308 65%, #a16207 100%)",
      border: "1px solid rgba(255,255,255,0.6)",
      boxShadow:
        "0 0 0 1px rgba(250,204,21,0.35), 0 8px 22px rgba(250,204,21,0.45)",
      textShadow: "0 1px 0 rgba(255,255,255,0.6)",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      backdropFilter: "blur(4px)"
    }}
  >
    <Award size={14} />
    VIP
  </div>
)}




        {local.aberto_agora && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#22c55e",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "999px"
            }}
          >
            ABERTO AGORA
          </span>
        )}
      </div>

      {/* CONTEÚDO */}
      <div style={{ padding: "14px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>
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
              color: "#475569"
            }}
          >
            <Star size={14} fill="#facc15" color="#facc15" />
            <strong>{nota.toFixed(1)}</strong>
            <span>({avaliacoes} avaliações)</span>
          </div>
        )}

        {/* INFO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            marginTop: "10px",
            fontSize: "13px",
            color: "#475569"
          }}
        >
          {local.horario_fechamento && (
            <div>⏰ Até {local.horario_fechamento}</div>
          )}
          {local.tags?.includes("banho") && (
            <div style={{ display: "flex", gap: 6 }}>
              <Scissors size={14} /> Banho e Tosa
            </div>
          )}
          {local.tags?.includes("vet") && (
            <div style={{ display: "flex", gap: 6 }}>
              <Stethoscope size={14} /> Veterinário
            </div>
          )}
          {local.estacionamento && (
            <div style={{ display: "flex", gap: 6 }}>
              <Car size={14} /> Estacionamento
            </div>
          )}
        </div>

{/* =========================
    CARREGAR MAIS — MOTION REAL
========================= */}
<button
  type="button"
  onClick={() => setExpanded((v) => !v)}
  style={{
    marginTop: "12px",
    width: "100%",
    background: expanded ? "#f8fafc" : "transparent",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "10px",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    fontWeight: 600,
    color: "#334155"
  }}
>
  <div
  style={{
    marginTop: "8px",
    fontSize: "12px",
    color: "#64748b",
    textAlign: "center"
  }}
>
  Toque para ver endereço e mais informações
</div>
 {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
</button>

<AnimatePresence initial={false}>
  {expanded && (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginTop: "10px" }}
    >
      <div
        style={{
          padding: "12px",
          background: "#f8fafc",
          borderRadius: "12px",
          fontSize: "13px",
          color: "#475569",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          border: "1px solid #e2e8f0"
        }}
      >
        {/* Status */}
        {local.aberto_agora !== null && (
          <div>{local.aberto_agora ? "🟢 Aberto agora" : "🔴 Fechado"}</div>
        )}

        {/* Horário */}
        {local.horario_fechamento && (
          <div>⏰ Até {local.horario_fechamento}</div>
        )}

        {/* Endereço */}
        {local.endereco && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <MapPin size={16} style={{ marginTop: 2 }} />
            <span>{local.endereco}</span>
          </div>
        )}

        {/* Estacionamento */}
        {local.estacionamento && <div>🅿️ Estacionamento disponível</div>}

        {/* Tags */}
        {Array.isArray(local.tags) && local.tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
            {local.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
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
      </div>
    </motion.div>
  )}
</AnimatePresence>


        {/* CTA */}
        <button
          onClick={() => onOpenChat(local)}
          style={{
            marginTop: "14px",
            width: "100%",
            background: "#25D366",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          

          <MessageCircle size={18} /> Falar no WhatsApp
        </button>
      </div>
    </div>
  );
}
