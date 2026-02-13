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
import "../../styles/pet-card.css";

export default function PetCardMapStyle({ local, onOpenChat }) {
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);
  const [expanded, setExpanded] = useState(false);
  const isVip = Boolean(local.destaque);

  const imagem =
    typeof local.image_url === "string" && local.image_url.trim() !== ""
      ? local.image_url
      : "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";

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
      <div className="relative w-full">

        <img
          src={imagem}
          alt={local.nome}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full"
          style={{ height: "160px", objectFit: "cover" }}
        />

        {/* BADGE VIP */}
        {isVip && (
          <div className="badge-vip">
            <Award size={14} />
            <span>VIP</span>
          </div>
        )}

        {/* STATUS */}
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
      <div className="pet-card p-md">
        <h3 className="pet-title">{local.nome}</h3>

        {/* NOTA */}
        {nota > 0 && (
          <div className="flex items-center gap-sm mt-xs text-sm">
            <Star size={14} fill="#facc15" color="#facc15" />
            <strong>{nota.toFixed(1)}</strong>
            <span>({avaliacoes} avaliações)</span>
          </div>
        )}

        {/* INFO */}
        <div className="pet-info-grid">
          {local.horario_fechamento && (
            <div className="pet-info-item">
              <span className="pet-info-icon">⏰</span>
              <span>Até {local.horario_fechamento}</span>
            </div>
          )}

          {local.tags?.includes("banho") && (
            <div className="pet-info-item">
              <Scissors size={14} />
              <span>Banho e Tosa</span>
            </div>
          )}

          {local.tags?.includes("vet") && (
            <div className="pet-info-item">
              <Stethoscope size={14} />
              <span>Veterinário</span>
            </div>
          )}

          {local.estacionamento && (
            <div className="pet-info-item">
              <Car size={14} />
              <span>Estacionamento</span>
            </div>
          )}
        </div>

        {/* EXPANDIR */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full mt-md flex justify-center items-center gap-sm cursor-pointer"
          style={{
            background: expanded ? "#f8fafc" : "transparent",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "10px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#334155"
          }}
        >
          <span className="text-center text-sm">
            Toque para ver endereço e mais informações
          </span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-sm"
            >
              <div
                className="flex flex-col gap-sm p-md"
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#475569",
                  border: "1px solid #e2e8f0"
                }}
              >
                {local.aberto_agora !== null && (
                  <div>{local.aberto_agora ? "🟢 Aberto agora" : "🔴 Fechado"}</div>
                )}

                {local.horario_fechamento && (
                  <div>⏰ Até {local.horario_fechamento}</div>
                )}

                {local.endereco && (
                  <div className="flex gap-sm items-start">
                    <MapPin size={16} className="mt-xs" />
                    <span>{local.endereco}</span>
                  </div>
                )}

                {local.estacionamento && <div>🅿️ Estacionamento disponível</div>}

                {Array.isArray(local.tags) && local.tags.length > 0 && (
                  <div className="flex gap-sm mt-xs">
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
          className="btn-whatsapp mt-md w-full flex justify-center gap-sm"
          onClick={() => onOpenChat(local)}
        >
          <MessageCircle size={18} /> Falar no WhatsApp
        </button>
      </div>
    </div>
  );
}
