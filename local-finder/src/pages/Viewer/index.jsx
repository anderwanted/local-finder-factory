// ======================================================
// 📄 PetList.jsx - COM SISTEMA DE FAVORITOS
// ======================================================

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import ChatModal from '../../components/ChatModal';
import PetCardMapStyle from '../../components/CardItem';
import './Viewer.css';
import './favoritos.css';

// Hero Grid
import { HeroGridCategories } from './HeroGridCategories';
import './hero-grid.css';

// Hook de favoritos
import { useFavoritos } from '../../hooks/useFavoritos';

// Ícones
import { 
  Store, X, Star, TrendingUp, Award,
  Scissors, Stethoscope, ShoppingBag,
  Home, ChevronUp, Heart
} from 'lucide-react';

// ======================================================
// HELPERS
// ======================================================
const isNovo = (createdAt) => {
  if (!createdAt) return false;
  const diff = (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24);
  return diff <= 7;
};

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image" />
    <div className="skeleton-content">
      <div className="skeleton-title" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  </div>
);

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================
export default function PetList({ projeto }) {
  const [locais, setLocais] = useState([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [ordenacao, setOrdenacao] = useState('melhor_nota');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ✨ FAVORITOS
  const { isFavorito, toggleFavorito, total: totalFavoritos } = useFavoritos();
  const [toast, setToast] = useState(null);
  const [mostrarSoFavoritos, setMostrarSoFavoritos] = useState(false);

  // Handler de favorito com toast
  const handleToggleFavorito = (id, nome) => {
    const jaEra = isFavorito(id);
    toggleFavorito(id);
    setToast({ tipo: jaEra ? 'remove' : 'add', nome });
    setTimeout(() => setToast(null), 2600);
  };

  // ======================================================
  // SCROLL TO TOP
  // ======================================================
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ======================================================
  // BUSCA DE LOCAIS
  // ======================================================
  useEffect(() => {
    async function buscarLocais() {
      setLoading(true);
      const { data, error } = await supabase
        .from("locais")
        .select("*")
        .eq("status", "PUBLICAR_APP")
        .order("created_at", { ascending: false });

      setLocais(error ? [] : (data || []));
      setLoading(false);
    }
    buscarLocais();
  }, []);

  // ======================================================
  // FILTROS + ORDENAÇÃO
  // ======================================================
  const getFiltrosAtivos = (projeto) => {
    if (Array.isArray(projeto?.filtros_ativos) && projeto.filtros_ativos.length > 0)
      return projeto.filtros_ativos;
    return ['categoria', 'bem_avaliados'];
  };

  const filtrosAtivos = getFiltrosAtivos(projeto);
  const hasFiltro = (id) => filtrosAtivos.includes(id);

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      let resultado = [...locais];

      if (filtroCategoria) {
        resultado = resultado.filter(
          l => Array.isArray(l.tags) && l.tags.includes(filtroCategoria)
        );
      }

      // Filtrar só favoritos
      if (mostrarSoFavoritos) {
        resultado = resultado.filter(l => isFavorito(l.id));
      }

      if (ordenacao === 'melhor_nota') resultado.sort((a, b) => Number(b.nota || 0) - Number(a.nota || 0));
      if (ordenacao === 'mais_avaliados') resultado.sort((a, b) => Number(b.avaliacoes || 0) - Number(a.avaliacoes || 0));
      if (ordenacao === 'destaques') resultado.sort((a, b) => Number(b.destaque) - Number(a.destaque));

      setLocaisFiltrados(resultado);
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [locais, filtroCategoria, ordenacao, mostrarSoFavoritos]);

  // Handler do Hero Grid
  const handleCategoriaChange = (categoria) => {
    if (categoria === 'todos') {
      setFiltroCategoria(null);
      setMostrarSoFavoritos(false);
    } else if (categoria === 'vip') {
      setOrdenacao('destaques');
      setFiltroCategoria(null);
    } else {
      setFiltroCategoria(categoria);
    }
  };

  const stats = {
    total: locais.length,
    vips: locais.filter(l => l.destaque).length,
    abertos: locais.filter(l => l.aberto_agora).length
  };

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <div className="app-shell">

      {/* HERO GRID */}
      <HeroGridCategories 
        onFilterChange={handleCategoriaChange}
        currentFilter={filtroCategoria || (ordenacao === 'destaques' ? 'vip' : 'todos')}
      />

      {/* TOOLBAR */}
      <div className="petlist-toolbar sticky-toolbar">
        <button 
          onClick={() => setOrdenacao('melhor_nota')}
          className={`filter-btn ${ordenacao === 'melhor_nota' && !mostrarSoFavoritos ? 'active' : ''}`}
        >
          <Star size={14} />
          <span>Melhor Avaliados</span>
        </button>

        <button 
          onClick={() => setOrdenacao('mais_avaliados')}
          className={`filter-btn ${ordenacao === 'mais_avaliados' && !mostrarSoFavoritos ? 'active' : ''}`}
        >
          <TrendingUp size={14} />
          <span>Mais Populares</span>
        </button>

        {/* ✨ BOTÃO FAVORITOS NA TOOLBAR */}
        {totalFavoritos > 0 && (
          <button
            onClick={() => setMostrarSoFavoritos(v => !v)}
            className={`favoritos-badge ${mostrarSoFavoritos ? 'ativo' : ''}`}
            style={mostrarSoFavoritos ? {
              background: '#EF4444',
              borderColor: '#EF4444',
              color: 'white'
            } : {}}
          >
            <Heart size={14} fill={mostrarSoFavoritos ? 'white' : '#EF4444'} />
            <span>Favoritos</span>
            <span className="favoritos-count">{totalFavoritos}</span>
          </button>
        )}

        {filtroCategoria && (
          <button onClick={() => setFiltroCategoria(null)} className="filter-btn clear-btn">
            <X size={14} />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* CONTADOR */}
      {!loading && locaisFiltrados.length > 0 && (
        <div className="results-counter">
          <span className="results-text">
            {mostrarSoFavoritos ? '❤️ ' : ''}
            Mostrando <strong>{Math.min(limit, locaisFiltrados.length)}</strong> de{' '}
            <strong>{locaisFiltrados.length}</strong> resultados
          </span>
        </div>
      )}

      {/* SKELETON */}
      {loading && (
        <div className="petlist-container">
          {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* LISTA DE CARDS */}
      {!loading && (
        <AnimatePresence mode="wait">
          <motion.div
            className={`petlist-container ${isTransitioning ? 'transitioning' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {locaisFiltrados.slice(0, limit).map((local, index) => (
              <motion.div
                key={local.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <PetCardMapStyle
                  local={local}
                  onOpenChat={(local) => setSelectedLocal(local)}
                  isNovo={isNovo(local.created_at)}
                  isFavorito={isFavorito(local.id)}
                  onToggleFavorito={(id) => handleToggleFavorito(id, local.nome)}
                />
              </motion.div>
            ))}

            {/* CARREGAR MAIS */}
            {limit < locaisFiltrados.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setLimit(prev => prev + 6)}
                className="load-more-btn"
              >
                <span>Carregar mais</span>
                <span className="load-more-count">({locaisFiltrados.length - limit} restantes)</span>
              </motion.button>
            )}

            {/* EMPTY STATE */}
            {locaisFiltrados.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="empty-state"
              >
                <div className="empty-icon">
                  {mostrarSoFavoritos ? '💔' : '🔍'}
                </div>
                <h3>
                  {mostrarSoFavoritos 
                    ? 'Nenhum favorito ainda' 
                    : 'Nenhum resultado encontrado'}
                </h3>
                <p>
                  {mostrarSoFavoritos 
                    ? 'Toque no ❤️ nos cards para salvar seus favoritos!'
                    : 'Tente ajustar os filtros ou buscar por outra categoria'}
                </p>
                <button
                  onClick={() => {
                    setFiltroCategoria(null);
                    setOrdenacao('melhor_nota');
                    setMostrarSoFavoritos(false);
                  }}
                  className="empty-btn"
                >
                  Ver todos
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="scroll-to-top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ✨ TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <div className={`toast-favorito ${toast.tipo}`}>
            {toast.tipo === 'add' 
              ? `❤️ ${toast.nome} adicionado aos favoritos!`
              : `🗑️ ${toast.nome} removido dos favoritos`
            }
          </div>
        )}
      </AnimatePresence>

      {/* CHAT MODAL */}
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
