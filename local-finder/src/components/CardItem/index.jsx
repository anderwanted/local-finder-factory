// src/components/CardItem/index.jsx
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
  Award,
  Sparkles,
  Clock,
  ExternalLink,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "./pet-card.css";

export default function PetCardMapStyle({ local, onOpenChat, isNovo = false }) {
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);
  const [expanded, setExpanded] = useState(false);
  const isVip = Boolean(local.destaque);

  const imagem =
    typeof local.image_url === "string" && local.image_url.trim() !== ""
      ? local.image_url
      : "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";

  // Função para abrir Google Maps
  const handleOpenMaps = () => {
    if (local.google_maps_url) {
      window.open(local.google_maps_url, '_blank');
    } else if (local.endereco) {
      const encodedAddress = encodeURIComponent(local.endereco);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  return (
    <div
      className={`pet-card-horizontal ${isVip ? 'is-vip' : ''}`}
    >
      {/* LAYOUT HORIZONTAL: FOTO CIRCULAR À ESQUERDA + CONTEÚDO DIREITA */}
      <div className="pet-card-main-row">
        
        {/* FOTO CIRCULAR */}
        <div className="pet-photo-circular">
          <img
            src={imagem}
            alt={local.nome}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";
            }}
          />
          
          {/* STATUS DOT NO CANTO DA FOTO */}
          {local.aberto_agora && (
            <span className="status-dot-on-photo"></span>
          )}
        </div>

        {/* CONTEÚDO À DIREITA */}
        <div className="pet-card-info-right">
          
          {/* HEADER: Nome + VIP Badge */}
          <div className="pet-header-row">
            <h3 className="pet-title-horizontal">{local.nome}</h3>
            
            {/* VIP Badge inline */}
            {isVip && (
              <span className="badge-vip-inline">
                <Sparkles size={10} />
                VIP
              </span>
            )}

            {/* NOVO Badge inline */}
            {isNovo && !isVip && (
              <span className="badge-novo-inline">
                ✨ NOVO
              </span>
            )}
          </div>

          {/* RATING + STATUS */}
          <div className="pet-meta-row">
            {nota > 0 && (
              <div className="rating-inline">
                <Star size={12} fill="#FBBF24" color="#FBBF24" />
                <strong>{nota.toFixed(1)}</strong>
                <span>({avaliacoes})</span>
              </div>
            )}

            {local.aberto_agora && (
              <span className="status-inline">
                🟢 Aberto agora
              </span>
            )}
          </div>

          {/* DISTÂNCIA */}
          {local.distancia && (
            <div className="distance-inline">
              <MapPin size={12} />
              <span>{local.distancia} km de você</span>
            </div>
          )}

          {/* TAGS INLINE */}
          {Array.isArray(local.tags) && local.tags.length > 0 && (
            <div className="tags-inline">
              {local.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag === 'banho' && '✂️'}
                  {tag === 'vet' && '🏥'}
                  {tag === 'loja' && '🛒'}
                  {tag === 'hotel' && '🏨'}
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* BOTÃO EXPANDIR COMPACTO */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="expand-btn-compact"
          >
            <span>{expanded ? 'Menos info' : 'Ver detalhes'}</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* ÁREA EXPANDIDA */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pet-expanded-area"
          >
            {/* ENDEREÇO + MAPA */}
            {local.endereco && (
              <div className="info-section">
                <div className="info-header">
                  <MapPin size={14} />
                  <span>Endereço</span>
                </div>
                <p className="info-text">{local.endereco}</p>
                {(local.google_maps_url || local.endereco) && (
                  <button 
                    onClick={handleOpenMaps}
                    className="btn-map-link"
                  >
                    <ExternalLink size={12} />
                    Ver no Google Maps
                  </button>
                )}
              </div>
            )}

            {/* GRID DE INFORMAÇÕES */}
            <div className="info-grid-3col">
              {/* HORÁRIO */}
              {local.horario_fechamento && (
                <div className="info-box">
                  <Clock size={14} />
                  <span className="info-label">Horário</span>
                  <span className="info-value">Até {local.horario_fechamento}</span>
                </div>
              )}

              {/* ESTACIONAMENTO */}
              {local.estacionamento !== undefined && (
                <div className="info-box">
                  <Car size={14} />
                  <span className="info-label">Estacionamento</span>
                  <span className="info-value">
                    {local.estacionamento ? '✓ Sim' : '✗ Não'}
                  </span>
                </div>
              )}

              {/* RATING */}
              {nota > 0 && (
                <div className="info-box">
                  <Star size={14} fill="#FBBF24" color="#FBBF24" />
                  <span className="info-label">Avaliação</span>
                  <span className="info-value">{nota.toFixed(1)} ★</span>
                </div>
              )}
            </div>

            {/* SOBRE */}
            {local.descricao && (
              <div className="info-section">
                <div className="info-header">
                  <Info size={14} />
                  <span>Sobre</span>
                </div>
                <p className="info-text">{local.descricao}</p>
              </div>
            )}

            {/* SERVIÇOS */}
            {Array.isArray(local.tags) && local.tags.length > 0 && (
              <div className="info-section">
                <div className="info-header">
                  <Award size={14} />
                  <span>Serviços</span>
                </div>
                <div className="services-pills">
                  {local.tags.map((tag) => (
                    <span key={tag} className="service-pill">
                      {tag === 'banho' && '✂️ Banho e Tosa'}
                      {tag === 'vet' && '🏥 Veterinário'}
                      {tag === 'loja' && '🛒 Pet Shop'}
                      {tag === 'hotel' && '🏨 Hotel'}
                      {!['banho', 'vet', 'loja', 'hotel'].includes(tag) && tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA WHATSAPP */}
      <button
        className="btn-whatsapp-full"
        onClick={() => onOpenChat(local)}
      >
        <MessageCircle size={16} /> 
        <span>Falar no WhatsApp</span>
      </button>
    </div>
  );
}
