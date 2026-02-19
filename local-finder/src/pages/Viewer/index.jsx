// src/pages/Viewer/index.jsx - ATUALIZADO COM NAVBAR
import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import ChatModal from '../../components/ChatModal';
import PetCardMapStyle from '../../components/CardItem';
import { SearchBar } from '../../components/SearchBar';
import './Viewer.css';
import './favoritos.css';

// Hero Grid
import { HeroGridCategories } from './HeroGridCategories';
import './hero-grid.css';

// Hook de favoritos
import { useFavoritos } from '../../hooks/useFavoritos';

// Ícones
import { X, Star, TrendingUp, ChevronUp, Heart } from 'lucide-react';

// Helpers
const isNovo = (createdAt) => {
  if (!createdAt) return false;
  const diff = (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24);
  return diff <= 7;
};

const normalizar = (texto) =>
  texto?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') || '';

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

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function PetList({ projeto, activeTab }) {
  const [locais, setLocais] = useState([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [ordenacao, setOrdenacao] = useState('melhor_nota');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const [toast, setToast] = useState(null);

  const { isFavorito, toggleFavorito, total: totalFavoritos } = useFavoritos();

  // ✨ Sincroniza com activeTab da navbar
  const mostrarSoFavoritos = activeTab === 'favoritos';

  const handleToggleFavorito = (id, nome) => {
    const jaEra = isFavorito(id);
    toggleFavorito(id);
    setToast({ tipo: jaEra ? 'remove' : 'add', nome });
    setTimeout(() => setToast(null), 2600);
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      let resultado = [...locais];

      if (filtroCategoria) {
        resultado = resultado.filter(
          l => Array.isArray(l.tags) && l.tags.includes(filtroCategoria)
        );
      }

      if (termoBusca.trim()) {
        const termo = normalizar(termoBusca);
        resultado = resultado.filter(l =>
          normalizar(l.nome).includes(termo) ||
          normalizar(l.endereco).includes(termo) ||
          (Array.isArray(l.tags) && l.tags.some(t => normalizar(t).includes(termo)))
        );
      }

      if (mostrarSoFavoritos) {
        resultado = resultado.filter(l => isFavorito(l.id));
      }

      if (ordenacao === 'melhor_nota') resultado.sort((a, b) => Number(b.nota || 0) - Number(a.nota || 0));
      if (ordenacao === 'mais_avaliados') resultado.sort((a, b) => Number(b.avaliacoes || 0) - Number(a.avaliacoes || 0));
      if (ordenacao === 'destaques') resultado.sort((a, b) => Number(b.destaque) - Number(a.destaque));

      setLocaisFiltrados(resultado);
      setLimit(6);
      setIsTransitioning(false);
    }, termoBusca ? 200 : 300);

    return () => clearTimeout(timeout);
  }, [locais, filtroCategoria, ordenacao, mostrarSoFavoritos, termoBusca]);

  const handleCategoriaChange = (categoria) => {
    setTermoBusca('');
    if (categoria === 'todos') {
      setFiltroCategoria(null);
    } else if (categoria === 'vip') {
      setOrdenacao('destaques');
      setFiltroCategoria(null);
    } else {
      setFiltroCategoria(categoria);
    }
  };

  const temFiltroAtivo = filtroCategoria || termoBusca;

  const limparTudo = () => {
    setFiltroCategoria(null);
    setTermoBusca('');
    setOrdenacao('melhor_nota');
  };

  return (
    <div className="app-shell" style={{ paddingBottom: '80px' }}>

      {/* HERO GRID */}
      <HeroGridCategories
        onFilterChange={handleCategoriaChange}
        currentFilter={filtroCategoria || (ordenacao === 'destaques' ? 'vip' : 'todos')}
      />

      {/* SEARCH BAR */}
      <SearchBar
        value={termoBusca}
        onChange={setTermoBusca}
        total={termoBusca ? locaisFiltrados.length : undefined}
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

        {temFiltroAtivo && (
          <button onClick={limparTudo} className="filter-btn clear-btn">
            <X size={14} />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* CONTADOR */}
      {!loading && locaisFiltrados.length > 0 && (
        <div className="results-counter">
          <span className="results-text">
            {mostrarSoFavoritos && '❤️ '}
            {termoBusca && `🔍 "${termoBusca}" — `}
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

      {/* CARDS */}
      {!loading && (
        <AnimatePresence mode="wait">
          <motion.div
            className={`petlist-container ${isTransitioning ? 'transitioning' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {locaisFiltrados.slice(0, limit).map((local, index) => (
              <motion.div
                key={local.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
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

            {locaisFiltrados.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="empty-state"
              >
                <div className="empty-icon">
                  {mostrarSoFavoritos ? '💔' : termoBusca ? '🔍' : '🐾'}
                </div>
                <h3>
                  {mostrarSoFavoritos
                    ? 'Nenhum favorito ainda'
                    : termoBusca
                      ? `Nada encontrado para "${termoBusca}"`
                      : 'Nenhum resultado'}
                </h3>
                <p>
                  {mostrarSoFavoritos
                    ? 'Toque no ❤️ nos cards para salvar!'
                    : termoBusca
                      ? 'Tente outro nome ou verifique a ortografia'
                      : 'Tente ajustar os filtros'}
                </p>
                <button onClick={limparTudo} className="empty-btn">
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
            style={{ bottom: '90px' }} /* Ajustado pra não ficar atrás da navbar */
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <div className={`toast-favorito ${toast.tipo}`}>
            {toast.tipo === 'add'
              ? `❤️ ${toast.nome} adicionado!`
              : `🗑️ ${toast.nome} removido`}
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
