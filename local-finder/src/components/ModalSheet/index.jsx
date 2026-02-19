// src/components/ModalSheet/index.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  MapPin,
  Clock,
  Car,
  Award,
  MessageCircle,
  ExternalLink,
  Info,
  Heart
} from 'lucide-react';
import './modal-sheet.css';

export function ModalSheet({ local, isOpen, onClose, isFavorito, onToggleFavorito }) {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const nota = Number(local?.nota || 0);
  const avaliacoes = Number(local?.avaliacoes || 0);

  const imagem =
    typeof local?.image_url === 'string' && local.image_url.trim() !== ''
      ? local.image_url
      : 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80';

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC para fechar
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Handlers de drag (swipe down)
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientY - startY;
    if (diff > 0) setCurrentY(diff);
  };

  const handleTouchEnd = () => {
    if (currentY > 100) {
      onClose();
    }
    setCurrentY(0);
    setIsDragging(false);
  };

  const handleOpenMaps = () => {
    if (local.google_maps_url) {
      window.open(local.google_maps_url, '_blank');
    } else if (local.endereco) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.endereco)}`, '_blank');
    }
  };

  if (!local) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SHEET */}
          <motion.div
            className="modal-sheet"
            initial={{ y: '100%' }}
            animate={{ y: isDragging ? currentY : 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* HANDLE BAR */}
            <div className="sheet-handle-area">
              <div className="sheet-handle" />
            </div>

            {/* HEADER COM FOTO */}
            <div className="sheet-header">
              <button className="sheet-close-btn" onClick={onClose}>
                <X size={24} />
              </button>

              <button 
                className={`sheet-favorite-btn ${isFavorito ? 'active' : ''}`}
                onClick={() => onToggleFavorito?.(local.id)}
              >
                <Heart size={24} fill={isFavorito ? '#EF4444' : 'none'} />
              </button>

              <div className="sheet-photo-container">
                <img
                  src={imagem}
                  alt={local.nome}
                  className="sheet-photo"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {local.aberto_agora && (
                  <span className="sheet-status-badge">
                    <span className="status-dot-pulse"></span>
                    ABERTO
                  </span>
                )}
              </div>

              <h2 className="sheet-title">{local.nome}</h2>

              <div className="sheet-meta">
                {nota > 0 && (
                  <div className="sheet-rating">
                    <Star size={16} fill="#FBBF24" color="#FBBF24" />
                    <strong>{nota.toFixed(1)}</strong>
                    <span>({avaliacoes})</span>
                  </div>
                )}
                {local.distancia && (
                  <div className="sheet-distance">
                    <MapPin size={14} />
                    <span>{local.distancia} km de você</span>
                  </div>
                )}
              </div>
            </div>

            {/* CONTENT */}
            <div className="sheet-content">
              
              {/* ENDEREÇO */}
              {local.endereco && (
                <div className="sheet-section">
                  <div className="section-header">
                    <MapPin size={18} />
                    <h3>Endereço</h3>
                  </div>
                  <p className="section-text">{local.endereco}</p>
                  <button onClick={handleOpenMaps} className="btn-maps">
                    <ExternalLink size={16} />
                    Abrir no Google Maps
                  </button>
                </div>
              )}

              {/* GRID DE INFORMAÇÕES */}
              <div className="sheet-info-grid">
                {local.horario_fechamento && (
                  <div className="info-card">
                    <Clock size={20} />
                    <span className="info-label">Horário</span>
                    <span className="info-value">Até {local.horario_fechamento}</span>
                  </div>
                )}

                {local.estacionamento !== undefined && (
                  <div className="info-card">
                    <Car size={20} />
                    <span className="info-label">Estacionamento</span>
                    <span className="info-value">{local.estacionamento ? '✓ Disponível' : '✗ Não disponível'}</span>
                  </div>
                )}

                {nota > 0 && (
                  <div className="info-card">
                    <Star size={20} fill="#FBBF24" color="#FBBF24" />
                    <span className="info-label">Avaliação</span>
                    <span className="info-value">{nota.toFixed(1)} estrelas</span>
                  </div>
                )}
              </div>

              {/* SERVIÇOS */}
              {Array.isArray(local.tags) && local.tags.length > 0 && (
                <div className="sheet-section">
                  <div className="section-header">
                    <Award size={18} />
                    <h3>Serviços oferecidos</h3>
                  </div>
                  <div className="services-grid">
                    {local.tags.map((tag) => (
                      <span key={tag} className="service-badge">
                        {tag === 'banho' && '✂️ Banho e Tosa'}
                        {tag === 'vet' && '🏥 Veterinário'}
                        {tag === 'loja' && '🛒 Pet Shop'}
                        {tag === 'hotel' && '🏨 Hotel Pet'}
                        {!['banho', 'vet', 'loja', 'hotel'].includes(tag) && tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SOBRE */}
              {local.descricao && (
                <div className="sheet-section">
                  <div className="section-header">
                    <Info size={18} />
                    <h3>Sobre</h3>
                  </div>
                  <p className="section-text">{local.descricao}</p>
                </div>
              )}
            </div>

            {/* FOOTER COM CTA */}
            <div className="sheet-footer">
              <button className="btn-whatsapp-sheet" onClick={() => {
                // Implementar abertura do WhatsApp
                console.log('Abrir WhatsApp');
              }}>
                <MessageCircle size={20} />
                <span>Falar no WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
