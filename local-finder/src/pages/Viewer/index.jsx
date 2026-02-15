// ======================================================
// 📄 PetList.jsx - VERSÃO FINAL COMPLETA
// Tela principal do App (usuário final)
// ======================================================

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import ChatModal from '../../components/ChatModal';
import PetCardMapStyle from '../../components/CardItem';
import './Viewer.css';

// Ícones
import { 
  Store, 
  X, 
  Star, 
  TrendingUp, 
  Award,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Home,
  ChevronUp,
  Sparkles
} from 'lucide-react';

// ======================================================
// 🔹 HELPERS
// ======================================================
const DEFAULT_FILTROS_APP = ['categoria', 'bem_avaliados', 'com_instagram'];

const getFiltrosAtivos = (projeto) => {
  if (Array.isArray(projeto?.filtros_ativos) && projeto.filtros_ativos.length > 0) {
    return projeto.filtros_ativos;
  }
  return DEFAULT_FILTROS_APP;
};

// Verificar se é novo (cadastrado nos últimos 7 dias)
const isNovo = (createdAt) => {
  if (!createdAt) return false;
  const dataAtual = new Date();
  const dataCriacao = new Date(createdAt);
  const diffDias = (dataAtual - dataCriacao) / (1000 * 60 * 60 * 24);
  return diffDias <= 7;
};

// ======================================================
// 🔹 SKELETON LOADING
// ======================================================
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
// 🔹 COMPONENTE PRINCIPAL
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
  
  const toolbarRef = useRef(null);
  const filtrosAtivos = getFiltrosAtivos(projeto);
  const hasFiltro = (id) => filtrosAtivos.includes(id);

  // ======================================================
  // 🔹 SCROLL TO TOP BUTTON
  // ======================================================
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ======================================================
  // 🔹 BUSCA DE LOCAIS
  // ======================================================
  useEffect(() => {
    async function buscarLocais() {
      setLoading(true);

      const { data, error } = await supabase
        .from("locais")
        .select("*")
        .eq("status", "PUBLICAR_APP")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar locais:", error);
        setLocais([]);
      } else {
        setLocais(data || []);
      }

      setLoading(false);
    }

    buscarLocais();
  }, []);

  // ======================================================
  // 🔹 FILTROS + ORDENAÇÃO COM TRANSIÇÃO
  // ======================================================
  useEffect(() => {
    setIsTransitioning(true);
    
    const timeout = setTimeout(() => {
      let resultado = [...locais];

      if (hasFiltro('categoria') && filtroCategoria) {
        resultado = resultado.filter(
          l => Array.isArray(l.tags) && l.tags.includes(filtroCategoria)
        );
      }

      if (ordenacao === 'melhor_nota') {
        resultado.sort((a, b) => Number(b.nota || 0) - Number(a.nota || 0));
      }

      if (ordenacao === 'mais_avaliados') {
        resultado.sort((a, b) => Number(b.avaliacoes || 0) - Number(a.avaliacoes || 0));
      }

      if (ordenacao === 'destaques') {
        resultado.sort((a, b) => Number(b.destaque) - Number(a.destaque));
      }

      setLocaisFiltrados(resultado);
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [locais, filtroCategoria, ordenacao, filtrosAtivos]);

  // Estatísticas para o header
  const stats = {
    total: locais.length,
    vips: locais.filter(l => l.destaque).length,
    abertos: locais.filter(l => l.aberto_agora).length
  };

  // ======================================================
  // 🔹 RENDER
  // ======================================================
  return (
    <div className="app-shell">
      {/* HEADER HERO */}
      <header className="app-header-modern">
        <div className="hero-pattern"></div>
        <div className="app-header-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Serviços verificados</span>
          </div>
          
          <h1 className="hero-title">🐾 Pet Finder</h1>
          <p className="hero-subtitle">Os melhores serviços para o seu melhor amigo</p>
          
          {/* Estatísticas */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.total}+</span>
              <span className="stat-label">Parceiros</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{stats.vips}</span>
              <span className="stat-label">VIP</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{stats.abertos}</span>
              <span className="stat-label">Abertos</span>
            </div>
          </div>
        </div>
      </header>

      {/* FILTROS DE CATEGORIA - STICKY */}
      {hasFiltro('categoria') && (
        <div className="petlist-toolbar sticky-toolbar" ref={toolbarRef}>
          <button 
            onClick={() => setFiltroCategoria(null)}
            className={`filter-btn ${!filtroCategoria ? 'active' : ''}`}
          >
            <Store size={14} />
            <span>Todos</span>
          </button>

          <button 
            onClick={() => setFiltroCategoria('banho')}
            className={`filter-btn ${filtroCategoria === 'banho' ? 'active' : ''}`}
          >
            <Scissors size={14} />
            <span>Banho & Tosa</span>
          </button>

          <button 
            onClick={() => setFiltroCategoria('vet')}
            className={`filter-btn ${filtroCategoria === 'vet' ? 'active' : ''}`}
          >
            <Stethoscope size={14} />
            <span>Veterinário</span>
          </button>

          <button 
            onClick={() => setFiltroCategoria('loja')}
            className={`filter-btn ${filtroCategoria === 'loja' ? 'active' : ''}`}
          >
            <ShoppingBag size={14} />
            <span>Pet Shop</span>
          </button>

          <button 
            onClick={() => setFiltroCategoria('hotel')}
            className={`filter-btn ${filtroCategoria === 'hotel' ? 'active' : ''}`}
          >
            <Home size={14} />
            <span>Hotel</span>
          </button>

          {filtroCategoria && (
            <button 
              onClick={() => setFiltroCategoria(null)}
              className="filter-btn clear-btn"
            >
              <X size={14} />
              <span>Limpar</span>
            </button>
          )}
        </div>
      )}

      {/* ORDENAÇÃO - STICKY */}
      <div className="petlist-toolbar sticky-toolbar">
        <button 
          onClick={() => setOrdenacao('melhor_nota')}
          className={`filter-btn ${ordenacao === 'melhor_nota' ? 'active' : ''}`}
        >
          <Star size={14} />
          <span>Melhor Avaliados</span>
        </button>

        <button 
          onClick={() => setOrdenacao('mais_avaliados')}
          className={`filter-btn ${ordenacao === 'mais_avaliados' ? 'active' : ''}`}
        >
          <TrendingUp size={14} />
          <span>Mais Populares</span>
        </button>

        <button 
          onClick={() => setOrdenacao('destaques')}
          className={`filter-btn ${ordenacao === 'destaques' ? 'active' : ''}`}
        >
          <Award size={14} />
          <span>Parceiros VIP</span>
        </button>
      </div>

      {/* CONTADOR DE RESULTADOS */}
      {!loading && locaisFiltrados.length > 0 && (
        <div className="results-counter">
          <span className="results-text">
            Mostrando <strong>{Math.min(limit, locaisFiltrados.length)}</strong> de{' '}
            <strong>{locaisFiltrados.length}</strong> {locaisFiltrados.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>
      )}

      {/* SKELETON LOADING */}
      {loading && (
        <div className="petlist-container">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* LISTA DE CARDS COM ANIMAÇÃO */}
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
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="card-wrapper-animated"
              >
                <PetCardMapStyle
                  local={local}
                  onOpenChat={(local) => setSelectedLocal(local)}
                  isNovo={isNovo(local.created_at)}
                />
              </motion.div>
            ))}

            {/* CARREGAR MAIS */}
            {limit < locaisFiltrados.length && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setLimit((prev) => prev + 6)}
                className="load-more-btn"
              >
                <span>Carregar mais serviços</span>
                <span className="load-more-count">
                  ({locaisFiltrados.length - limit} restantes)
                </span>
              </motion.button>
            )}

            {/* EMPTY STATE MELHORADO */}
            {locaisFiltrados.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="empty-state"
              >
                <div className="empty-icon">🔍</div>
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente ajustar os filtros ou buscar por outra categoria</p>
                
                {/* Sugestões */}
                <div className="empty-suggestions">
                  <p className="suggestions-title">Sugestões:</p>
                  <div className="suggestions-chips">
                    <button onClick={() => setFiltroCategoria(null)} className="suggestion-chip">
                      Ver todos
                    </button>
                    <button onClick={() => setOrdenacao('destaques')} className="suggestion-chip">
                      Ver VIPs
                    </button>
                    <button onClick={() => setOrdenacao('melhor_nota')} className="suggestion-chip">
                      Melhor avaliados
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFiltroCategoria(null);
                    setOrdenacao('melhor_nota');
                  }}
                  className="empty-btn"
                >
                  Limpar todos os filtros
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* BOTÃO SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="scroll-to-top"
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={24} />
          </motion.button>
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