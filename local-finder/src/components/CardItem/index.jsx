// src/components/CardItem/index.jsx - VERSÃO COM MODAL
import React from "react";
import {
  Star,
  MapPin,
  Sparkles,
  Heart
} from "lucide-react";
import "./pet-card.css";

export default function PetCardMapStyle({ 
  local, 
  onClick, 
  isNovo = false, 
  isFavorito = false, 
  onToggleFavorito 
}) {
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);
  const isVip = Boolean(local.destaque);

  const imagem =
    typeof local.image_url === "string" && local.image_url.trim() !== ""
      ? local.image_url
      : "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";

  // Handler do favorito (previne propagação pro card)
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorito?.(local.id);
  };

  return (
    <div
      className={`pet-card-clickable ${isVip ? 'is-vip' : ''}`}
      onClick={onClick}
    >
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

      {/* CONTEÚDO */}
      <div className="pet-card-info-right">
        
        {/* HEADER */}
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

            {/* BOTÃO FAVORITO */}
            <button
              className={`btn-favorito ${isFavorito ? 'ativo' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart
                size={18}
                fill={isFavorito ? '#EF4444' : 'none'}
                color={isFavorito ? '#EF4444' : '#9CA3AF'}
              />
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

        {/* HINT: Toque para ver detalhes */}
        <div className="card-hint">
          Toque para ver detalhes
        </div>
      </div>
    </div>
  );
}
