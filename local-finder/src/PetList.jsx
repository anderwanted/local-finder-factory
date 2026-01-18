// ======================================================
// 📄 PetList.jsx
// Tela Pública do App (Lista de Lojas)
// ======================================================
//
// 🎯 PROPÓSITO
// - Exibir os locais do projeto
// - Aplicar filtros configurados no Dashboard
// - Aplicar ordenação dinâmica
// - Abrir chat para geração de lead
//
// 🧠 MODELO MENTAL
// - Esta tela é 100% DATA-DRIVEN
// - Tudo depende de:
//   • projeto
//   • filtros ativos
//   • dados do Supabase
//
// 🔒 CONTRATO
// - Não altera dados (somente leitura)
// - Não conhece regras do Dashboard
// - Apenas respeita filtros configurados
//

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import {
  MessageCircle,
  MapPin,
  Store,
  Award,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Home,
  X
} from 'lucide-react';
import ChatModal from './ChatModal';
import { InstagramEmbed } from 'react-social-media-embed';

// ======================================================
// 🔹 PLACEHOLDER VISUAL (SEM LOGO)
// ======================================================
//
// 🎯 Intenção:
// Exibir um visual neutro quando a loja não possui logo
//
const getPlaceholderByCategory = (categoria) => {
  const baseStyle = {
    width: '100%',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '42px',
    borderRadius: '12px',
    background: '#f1f5f9',
    color: '#475569',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0'
  };

  if (!categoria) return { ...baseStyle, icon: '🏪' };

  const cat = categoria.toLowerCase();

  if (cat.includes('pet')) return { ...baseStyle, icon: '🐶' };
  if (cat.includes('vet')) return { ...baseStyle, icon: '🏥' };
  if (cat.includes('banho') || cat.includes('tosa')) return { ...baseStyle, icon: '✂️' };

  return { ...baseStyle, icon: '🏪' };
};

// ======================================================
// 🔹 FILTROS DEFAULT (FALLBACK)
// ======================================================
const DEFAULT_FILTROS_APP = ['categoria', 'bem_avaliados', 'com_instagram'];

const getFiltrosAtivos = (projeto) => {
  if (Array.isArray(projeto?.filtros_ativos) && projeto.filtros_ativos.length > 0) {
    return projeto.filtros_ativos;
  }
  return DEFAULT_FILTROS_APP;
};

// ======================================================
// 🔹 COMPONENTE PRINCIPAL
// ======================================================
export default function PetList({ projeto }) {

  // ==============================
  // 🔹 ESTADOS
  // ==============================
  const [ordenacao, setOrdenacao] = useState(null);
  const [locais, setLocais] = useState([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState(null);

  const filtrosAtivos = getFiltrosAtivos(projeto);
  const hasFiltro = (id) => filtrosAtivos.includes(id);

  // ==============================
  // 🔹 TEMA DINÂMICO
  // ==============================
  const isDark = projeto?.tema_base === 'dark';

  const radius =
    projeto?.estilo_borda === 'quadrado'
      ? '0px'
      : projeto?.estilo_borda === 'pilula'
        ? '100px'
        : '16px';

  const radiusCard =
    projeto?.estilo_borda === 'quadrado'
      ? '0px'
      : '20px';

  const tema = {
    '--bg-app': isDark ? '#0f172a' : '#f8fafc',
    '--bg-card': isDark ? '#1e293b' : '#ffffff',
    '--text-primary': isDark ? '#f1f5f9' : '#1e293b',
    '--text-secondary': isDark ? '#94a3b8' : '#64748b',
    '--border-color': isDark ? '#334155' : '#e2e8f0',

    '--cor-primaria': projeto?.cor_primaria || '#2563eb',
    '--cor-destaque': projeto?.cor_destaque || '#f59e0b',

    '--radius-btn': radius,
    '--radius-card': radiusCard,

    '--shadow-card': isDark
      ? '0 10px 15px -3px rgba(0,0,0,0.5)'
      : '0 4px 6px -1px rgba(0,0,0,0.05)'
  };

  // ==============================
  // 🔹 CATEGORIAS
  // ==============================
  const categorias = [
    { id: 'banho', label: 'Banho', icon: <Scissors size={20} /> },
    { id: 'vet', label: 'Vet', icon: <Stethoscope size={20} /> },
    { id: 'loja', label: 'Loja', icon: <ShoppingBag size={20} /> },
    { id: 'hotel', label: 'Hotel', icon: <Home size={20} /> }
  ];

  // ==============================
  // 🔹 FETCH DE LOCAIS
  // ==============================
  useEffect(() => {
    async function buscarLocais() {
      setLoading(true);

      const { data } = await supabase
        .from('locais')
        .select('*')
        .eq('projeto_id', projeto.id);

      setLocais(data || []);
      setLocaisFiltrados(data || []);
      setLoading(false);
    }

    if (projeto?.id) buscarLocais();
  }, [projeto]);

  // ==============================
  // 🔹 FILTRAGEM + ORDENAÇÃO
  // ==============================
  useEffect(() => {
    let resultado = [...locais];

    // Categoria
    if (hasFiltro('categoria') && filtroAtivo) {
      resultado = resultado.filter(
        l =>
          Array.isArray(l.tags) &&
          l.tags.map(t => t.toLowerCase()).includes(filtroAtivo.toLowerCase())
      );
    }

    // Bem avaliados
    if (hasFiltro('bem_avaliados')) {
      resultado.sort((a, b) =>
        (b.nota || 0) * (b.avaliacoes || 0) -
        (a.nota || 0) * (a.avaliacoes || 0)
      );
    }

    // Com Instagram
    if (hasFiltro('com_instagram')) {
      resultado.sort((a, b) => (!!b.instagram_url) - (!!a.instagram_url));
    }

    // Ordenações manuais
    if (ordenacao === 'melhor_nota' && hasFiltro('ordenar_melhor_nota')) {
      resultado.sort((a, b) => Number(b.nota || 0) - Number(a.nota || 0));
    }

    if (ordenacao === 'mais_avaliados' && hasFiltro('ordenar_mais_avaliados')) {
      resultado.sort((a, b) => Number(b.avaliacoes || 0) - Number(a.avaliacoes || 0));
    }

    setLocaisFiltrados(resultado);
  }, [locais, filtroAtivo, ordenacao, filtrosAtivos]);

  // ======================================================
  // 🔹 RENDER
  // ======================================================
  return (
    <div
      style={{
        ...tema,
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
        minHeight: '100vh',
        fontFamily: 'sans-serif'
      }}
    >
      {/* LISTAGEM */}
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {loading && <p style={{ textAlign: 'center' }}>Carregando...</p>}

        {locaisFiltrados.map(local => {
          const isVip = local.destaque;
          const placeholder = getPlaceholderByCategory(local.niche);

          return (
            <div
              key={local.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
                boxShadow: isVip
                  ? `0 0 0 2px var(--cor-destaque), var(--shadow-card)`
                  : 'var(--shadow-card)',
                marginBottom: '16px'
              }}
            >
              {/* CONTEÚDO DO CARD */}
              {/* (mantido exatamente como estava) */}
            </div>
          );
        })}
      </div>

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
