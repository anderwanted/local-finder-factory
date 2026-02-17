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
  Info,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./pet-card.css";

export default function PetCardMapStyle({ local, onOpenChat, isNovo = false, isFavorito = false, onToggleFavorito }) {
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);
  const [expanded, setExpanded] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const isVip = Boolean(local.destaque);

  const imagem =
    typeof local.image_url === "string" && local.image_url.trim() !== ""
      ? local.image_url
      : "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";

  const handleOpenMaps = () => {
    if (local.google_maps_url) {
      window.open(local.google_maps_url, '_blank');
    } else if (local.endereco) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.endereco)}`, '_blank');
    }
  };

  // Animação do coração ao favoritar
  const handleFavorito = () => {
    if (!isFavorito) {
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 600);
    }
    onToggleFavorito?.(local.id);
  };

  return (
    <div className={`pet-card-horizontal ${isVip ? 'is-vip' : ''}`}>

      {/* LAYOUT HORIZONTAL */}
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
          {local.aberto_agora && (
            <span className="status-dot-on-photo"></span>
          )}
        </div>

        {/* CONTEÚDO DIREITA */}
        <div className="pet-card-info-right">

          {/* HEADER: Nome + Badges + ❤️ */}
          <div className="pet-header-row">
            <h3 className="pet-title-horizontal">{local.nome}</h3>

            <div className="card-actions">
              {isVip && (
                <span className="badge-vip-inline">
                  <Sparkles size={10} />
                  VIP
                </span>
              )}
              {isNovo && !isVip && (
                <span className="badge-novo-inline">✨ NOVO</span>
              )}

              {/* ❤️ BOTÃO FAVORITO */}
              <button
                className={`btn-favorito ${isFavorito ? 'ativo' : ''}`}
                onClick={handleFavorito}
                aria-label={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart
                  size={18}
                  fill={isFavorito ? '#EF4444' : 'none'}
                  color={isFavorito ? '#EF4444' : '#9CA3AF'}
                />
                {/* Burst de partículas ao favoritar */}
                {heartBurst && (
                  <span className="heart-burst">
                    {['❤️','💕','✨'].map((e, i) => (
                      <span key={i} className={`burst-particle p${i}`}>{e}</span>
                    ))}
                  </span>
                )}
              </button>
            </div>
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
              <span className="status-inline">🟢 Aberto</span>
            )}
          </div>

          {/* DISTÂNCIA */}
          {local.distancia && (
            <div className="distance-inline">
              <MapPin size={12} />
              <span>{local.distancia} km</span>
            </div>
          )}

          {/* TAGS */}
          {Array.isArray(local.tags) && local.tags.length > 0 && (
            <div className="tags-inline">
              {local.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag === 'banho' && '✂️ '}
                  {tag === 'vet' && '🏥 '}
                  {tag === 'loja' && '🛒 '}
                  {tag === 'hotel' && '🏨 '}
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* BOTÃO EXPANDIR */}
          <button
            type="button"
            onClick={() => setExpanded(v => !v)}
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
            {/* ENDEREÇO */}
            {local.endereco && (
              <div className="info-section">
                <div className="info-header">
                  <MapPin size={14} />
                  <span>Endereço</span>
                </div>
                <p className="info-text">{local.endereco}</p>
                <button onClick={handleOpenMaps} className="btn-map-link">
                  <ExternalLink size={12} />
                  Ver no Google Maps
                </button>
              </div>
            )}

            {/* GRID DE INFORMAÇÕES */}
            <div className="info-grid-3col">
              {local.horario_fechamento && (
                <div className="info-box">
                  <Clock size={14} />
                  <span className="info-label">Horário</span>
                  <span className="info-value">Até {local.horario_fechamento}</span>
                </div>
              )}
              {local.estacionamento !== undefined && (
                <div className="info-box">
                  <Car size={14} />
                  <span className="info-label">Estacion.</span>
                  <span className="info-value">{local.estacionamento ? '✓ Sim' : '✗ Não'}</span>
                </div>
              )}
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
                      {!['banho','vet','loja','hotel'].includes(tag) && tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA WHATSAPP */}
      <button className="btn-whatsapp-full" onClick={() => onOpenChat(local)}>
        <MessageCircle size={16} />
        <span>Falar no WhatsApp</span>
      </button>
    </div>
  );
}
