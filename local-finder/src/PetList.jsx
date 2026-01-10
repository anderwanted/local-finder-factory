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
  
  // Estado do Filtro
  const [filtroAtivo, setFiltroAtivo] = useState(null);

  // --- TEMA DINÂMICO & GRADIENTES ---
  const corBase = projeto?.cor_primaria || '#2563eb';
  const tema = {
    '--cor-primaria': corBase,
    '--cor-destaque': projeto?.cor_destaque || '#f59e0b',
    '--bg-app': '#f8fafc',
    '--shadow-card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    '--shadow-btn': '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
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
      const { data, error } = await supabase
        .from('locais')
        .select('*')
        .eq('status', 'PUBLICAR_APP')
        .eq('projeto_id', projeto.id)
        .order('destaque', { ascending: false }) 
        .order('created_at', { ascending: false });

      if (!error) {
        setLocais(data || []);
        setLocaisFiltrados(data || []);
      }
      setLoading(false);
    }
    if (projeto?.id) buscarLocais();
  }, [projeto]);

  useEffect(() => {
    if (!filtroAtivo) setLocaisFiltrados(locais);
    else {
      setLocaisFiltrados(locais.filter(local => local.tags && local.tags.includes(filtroAtivo)));
    }
  }, [filtroAtivo, locais]);

  return (
    <div style={{ ...tema, background: 'var(--bg-app)', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* --- HEADER FIXO COM GRADIENTE --- */}
      <div style={{ 
        position: 'sticky', top: 0, zIndex: 50, 
        background: `linear-gradient(180deg, white 85%, rgba(255,255,255,0) 100%)`,
        paddingBottom: '10px'
      }}>
        
        {/* Topo Hero */}
        <header style={{ padding: '20px 20px 10px 20px', textAlign: 'left' }}>
          <h1 style={{ fontSize: '1.6rem', color: '#0f172a', margin: '0', fontWeight: '800', letterSpacing: '-0.5px' }}>
            {projeto.titulo_pagina || 'Pet Finder'}
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>
            Encontre o melhor para seu amigo.
          </p>
        </header>

        {/* Barra de Categorias Horizontal (Scroll Hide) */}
        <div style={{ 
          display: 'flex', gap: '12px', overflowX: 'auto', padding: '10px 20px',
          scrollbarWidth: 'none', msOverflowStyle: 'none' 
        }}>
          {/* Botão Reset (Aparece se filtrado) */}
          {filtroAtivo && (
            <button onClick={() => setFiltroAtivo(null)} style={{
              flexShrink: 0, padding: '0 12px', height: '45px', borderRadius: '12px',
              border: '1px solid #e2e8f0', background: 'white', color: '#64748b',
              display: 'flex', alignItems: 'center', cursor: 'pointer'
            }}>
              <X size={18} />
            </button>
          )}

          {categorias.map((cat) => {
            const isAtivo = filtroAtivo === cat.id;
            return (
              <button key={cat.id} onClick={() => setFiltroAtivo(isAtivo ? null : cat.id)} style={{
                flexShrink: 0, padding: '0 16px', height: '45px', borderRadius: '12px',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                background: isAtivo ? 'var(--cor-primaria)' : 'white',
                color: isAtivo ? 'white' : '#475569',
                boxShadow: isAtivo ? 'var(--shadow-btn)' : '0 1px 2px rgba(0,0,0,0.05)',
                fontWeight: '600', fontSize: '14px', transition: 'all 0.2s ease'
              }}>
                {cat.icon}
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* --- LISTA DE CONTEÚDO --- */}
      <div style={{ padding: '10px 20px 40px 20px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {loading && <p style={{textAlign:'center', color:'#94a3b8', marginTop:'20px'}}>Buscando locais...</p>}
        
        {!loading && locaisFiltrados.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px 20px', color: '#94a3b8'}}>
            <Store size={48} style={{opacity: 0.2, marginBottom: '15px'}} />
            <p style={{fontSize: '15px'}}>Nenhum local encontrado nesta categoria.</p>
          </div>
        )}

        {locaisFiltrados.map((local) => {
          const isVip = local.destaque; 
          return (
            <div key={local.id} style={{
              background: 'white', borderRadius: '20px', overflow: 'hidden',
              boxShadow: isVip ? '0 10px 25px -5px rgba(0,0,0,0.1), 0 0 0 2px var(--cor-destaque)' : 'var(--shadow-card)',
              position: 'relative', transition: 'transform 0.2s'
            }}>
              
              {/* Selo VIP */}
              {isVip && (
                <div style={{
                  background: 'var(--cor-destaque)', color: '#fff', fontSize: '10px', fontWeight: 'bold',
                  padding: '4px 10px', position: 'absolute', top: 0, right: 0,
                  borderBottomLeftRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 10
                }}>
                  <Award size={12} /> RECOMENDADO
                </div>
              )}

              <div style={{ padding: '20px' }}>
                <div style={{marginBottom: '12px'}}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#1e293b', fontWeight: '700', paddingRight: '20px' }}>
                    {local.nome}
                  </h3>
                  
                  {/* Nota e Avaliações */}
                  {local.nota > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <span style={{fontWeight: '700', color: '#1e293b'}}>{local.nota}</span>
                      <span style={{color: '#94a3b8'}}>({local.avaliacoes} avaliações)</span>
                    </div>
                  ) : (
                    <span style={{fontSize: '12px', color: '#94a3b8'}}>Novo no app</span>
                  )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#64748b', fontSize: '13px', marginBottom: '16px', lineHeight: '1.4' }}>
                  <MapPin size={16} style={{flexShrink: 0, marginTop: '2px'}} />
                  <span>{local.endereco || "Endereço não informado"}</span>
                </div>

                {/* Tags Pílula */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: isVip ? '16px' : '0' }}>
                  {local.tags && local.tags.map(tag => (
                    <span key={tag} style={{
                      background: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '600',
                      padding: '4px 10px', borderRadius: '100px', textTransform: 'capitalize'
                    }}>
                      {tag.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                {/* Embed Instagram (Só VIP) */}
                {isVip && local.instagram_url && (
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #f1f5f9', marginTop: '15px' }}>
                     <div style={{ display: 'flex', justifyContent: 'center', background: '#fafafa' }}>
                       <InstagramEmbed url={local.instagram_url} width="100%" />
                     </div>
                  </div>
                )}
              </div>

              {/* Botão de Ação Full Width no Footer do Card */}
              <button 
                onClick={() => setSelectedLocal(local)}
                style={{
                  width: '100%', padding: '16px', border: 'none', cursor: 'pointer',
                  background: isVip ? 'var(--cor-destaque)' : '#f1f5f9',
                  color: isVip ? 'white' : 'var(--cor-primaria)',
                  fontSize: '15px', fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'background 0.2s'
                }}
              >
                <MessageCircle size={20} />
                {isVip ? 'Falar com Especialista' : 'Solicitar Atendimento'}
              </button>
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