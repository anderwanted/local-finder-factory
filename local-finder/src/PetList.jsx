import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; 
import { MessageCircle, MapPin, Store, Star, Award, Scissors, Stethoscope, ShoppingBag, Home, X } from 'lucide-react';
import ChatModal from './ChatModal';
import { InstagramEmbed } from 'react-social-media-embed';

export default function PetList({ projeto }) {
  const [locais, setLocais] = useState([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState(null);

  // --- LÓGICA DE TEMAS E DARK MODE ---
  const isDark = projeto?.tema_base === 'dark';
  const radius = projeto?.estilo_borda === 'quadrado' ? '0px' : (projeto?.estilo_borda === 'pilula' ? '100px' : '16px'); // Borda dos botões
  const radiusCard = projeto?.estilo_borda === 'quadrado' ? '0px' : '20px'; // Cards sempre um pouco arredondados ou quadrados

  const tema = {
    // Cores Dinâmicas
    '--bg-app': isDark ? '#0f172a' : '#f8fafc',         // Fundo Principal (Dark: Slate 900)
    '--bg-card': isDark ? '#1e293b' : '#ffffff',        // Fundo Card (Dark: Slate 800)
    '--text-primary': isDark ? '#f1f5f9' : '#1e293b',   // Texto Principal
    '--text-secondary': isDark ? '#94a3b8' : '#64748b', // Texto Secundário
    '--border-color': isDark ? '#334155' : '#e2e8f0',   // Bordas
    
    // Cores da Marca
    '--cor-primaria': projeto?.cor_primaria || '#2563eb', 
    '--cor-destaque': projeto?.cor_destaque || '#f59e0b',
    
    // Formas
    '--radius-btn': radius,
    '--radius-card': radiusCard,
    
    // Sombras
    '--shadow-card': isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  };

  const categorias = [
    { id: 'banho', label: 'Banho', icon: <Scissors size={20} /> },
    { id: 'vet',   label: 'Vet',   icon: <Stethoscope size={20} /> },
    { id: 'loja',  label: 'Loja',  icon: <ShoppingBag size={20} /> },
    { id: 'hotel', label: 'Hotel', icon: <Home size={20} /> },
  ];

  useEffect(() => {
    async function buscarLocais() {
      setLoading(true);
      const { data } = await supabase.from('locais').select('*').eq('status', 'PUBLICAR_APP').eq('projeto_id', projeto.id).order('destaque', { ascending: false });
      setLocais(data || []);
      setLocaisFiltrados(data || []);
      setLoading(false);
    }
    if (projeto?.id) buscarLocais();
  }, [projeto]);

  useEffect(() => {
    if (!filtroAtivo) setLocaisFiltrados(locais);
    else setLocaisFiltrados(locais.filter(local => local.tags && local.tags.includes(filtroAtivo)));
  }, [filtroAtivo, locais]);

  return (
    <div style={{ ...tema, background: 'var(--bg-app)', color: 'var(--text-primary)', minHeight: '100vh', fontFamily: 'sans-serif', transition: 'background 0.3s' }}>
      
      {/* HEADER STICKY */}
      <div style={{ 
        position: 'sticky', top: 0, zIndex: 50, 
        background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255,255,255,0.95)', // Blur effect fake
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '10px'
      }}>
        
        <header style={{ padding: '20px 20px 10px 20px', textAlign: 'left' }}>
          {projeto.logo_url ? (
             <img src={projeto.logo_url} alt={projeto.nome} style={{height: '40px', objectFit:'contain', display:'block'}} />
          ) : (
             <h1 style={{ fontSize: '1.6rem', margin: '0', fontWeight: '800' }}>{projeto.titulo_pagina || 'App Local'}</h1>
          )}
          {!projeto.logo_url && <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '4px 0 0 0' }}>Encontre o melhor serviço.</p>}
        </header>

        {/* Barra Categorias */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '10px 20px', scrollbarWidth: 'none' }}>
          {filtroAtivo && (
            <button onClick={() => setFiltroAtivo(null)} style={{ flexShrink: 0, padding: '0 12px', height: '45px', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          )}
          {categorias.map((cat) => {
            const isAtivo = filtroAtivo === cat.id;
            return (
              <button key={cat.id} onClick={() => setFiltroAtivo(isAtivo ? null : cat.id)} style={{
                flexShrink: 0, padding: '0 16px', height: '45px', borderRadius: 'var(--radius-btn)',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                background: isAtivo ? 'var(--cor-primaria)' : 'var(--bg-card)',
                color: isAtivo ? '#fff' : 'var(--text-secondary)',
                fontWeight: '600', fontSize: '14px',
                border: isAtivo ? 'none' : '1px solid var(--border-color)'
              }}>
                {cat.icon} {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* LISTA */}
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {loading && <p style={{textAlign:'center', color:'var(--text-secondary)'}}>Carregando...</p>}

        {locaisFiltrados.map((local) => {
          const isVip = local.destaque; 
          return (
            <div key={local.id} style={{
              background: 'var(--bg-card)', borderRadius: 'var(--radius-card)', overflow: 'hidden',
              boxShadow: isVip ? `0 0 0 2px var(--cor-destaque), var(--shadow-card)` : 'var(--shadow-card)',
              position: 'relative'
            }}>
              
              {isVip && (
                <div style={{ background: 'var(--cor-destaque)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', position: 'absolute', top: 0, right: 0, borderBottomLeftRadius: '12px', zIndex: 10 }}>
                  <Award size={12} style={{verticalAlign:'middle'}} /> VIP
                </div>
              )}

              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: '700', paddingRight: '20px' }}>{local.nome}</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                  <MapPin size={16} style={{flexShrink: 0, marginTop: '2px'}} />
                  <span>{local.endereco || "Endereço não informado"}</span>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {local.tags && local.tags.map(tag => (
                    <span key={tag} style={{ background: isDark ? '#334155' : '#f1f5f9', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: 'var(--radius-btn)' }}>
                      {tag.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                {isVip && local.instagram_url && (
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginTop: '15px' }}>
                     <InstagramEmbed url={local.instagram_url} width="100%" />
                  </div>
                )}
              </div>

              <button onClick={() => setSelectedLocal(local)} style={{
                  width: '100%', padding: '16px', border: 'none', cursor: 'pointer',
                  background: isVip ? 'var(--cor-destaque)' : (isDark ? '#334155' : '#f1f5f9'),
                  color: isVip ? '#fff' : 'var(--cor-primaria)',
                  fontSize: '15px', fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}>
                <MessageCircle size={20} /> Solicitar
              </button>
            </div>
          );
        })}
      </div>

      {selectedLocal && <ChatModal local={selectedLocal} projeto={projeto} onClose={() => setSelectedLocal(null)} />}
    </div>
  );
}