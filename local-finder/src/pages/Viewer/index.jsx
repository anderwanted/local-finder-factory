// ======================================================
// 📄 PetList.jsx - VERSÃO FINAL COMPLETA COM HERO GRID
// Tela principal do App (usuário final)
// ======================================================

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import ChatModal from '../../components/ChatModal';
import PetCardMapStyle from '../../components/CardItem';
import './Viewer.css';

// ✨ NOVO: Hero Grid
import { HeroGridCategories } from './HeroGridCategories';
import './hero-grid.css';

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

  // ✨ HANDLER PARA MUDAR FILTRO DO HERO GRID
  const handleCategoriaChange = (categoria) => {
    // 'todos' = limpar filtro
    // outros valores = setar categoria
    if (categoria === 'todos') {
      setFiltroCategoria(null);
    } else if (categoria === 'vip') {
      setOrdenacao('destaques');
      setFiltroCategoria(null);
    } else {
      setFiltroCategoria(categoria);
    }
  };

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
      {/* ✨ HERO GRID DE CATEGORIAS - NOVO! */}
      <HeroGridCategories 
        onFilterChange={handleCategoriaChange}
        currentFilter={filtroCategoria || (ordenacao === 'destaques' ? 'vip' : 'todos')}
      />

      {/* FILTROS DE ORDENAÇÃO - SIMPLIFICADO (removido categorias duplicadas) */}
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

        {filtroCategoria && (
          <button 
            onClick={() => setFiltroCategoria(null)}
            className="filter-btn clear-btn"
          >
            <X size={14} />
            <span>Limpar Filtro</span>
          </button>
        )}
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
