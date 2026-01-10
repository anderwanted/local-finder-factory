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
  
  // Estado do Filtro (Começa vazio = mostra tudo)
  const [filtroAtivo, setFiltroAtivo] = useState(null);

  // --- TEMA DINÂMICO ---
  const tema = {
    '--cor-primaria': projeto?.cor_primaria || '#2563eb', 
    '--cor-destaque': projeto?.cor_destaque || '#f59e0b',
    '--bg-app': '#f8fafc'
  };

  // --- CONFIGURAÇÃO DOS BOTÕES (CATEGORIAS) ---
  const categorias = [
    { id: 'banho', label: 'Banho & Tosa', icon: <Scissors size={24} /> },
    { id: 'vet',   label: 'Veterinário',  icon: <Stethoscope size={24} /> },
    { id: 'loja',  label: 'Pet Shop',     icon: <ShoppingBag size={24} /> },
    { id: 'hotel', label: 'Hotel/Creche', icon: <Home size={24} /> },
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

      if (error) {
        console.error("Erro ao buscar:", error); 
        setLocais([]); 
      } else {
        setLocais(data || []);
        setLocaisFiltrados(data || []); // Inicialmente mostra tudo
      }
      setLoading(false);
    }
    
    if (projeto?.id) buscarLocais();
  }, [projeto]);

  // --- A MÁGICA DO FILTRO ---
  useEffect(() => {
    if (!filtroAtivo) {
      setLocaisFiltrados(locais); // Se não tem filtro, mostra tudo
    } else {
      // Filtra apenas se a tag do local incluir a categoria clicada
      const filtrados = locais.filter(local => 
        local.tags && local.tags.includes(filtroAtivo)
      );
      setLocaisFiltrados(filtrados);
    }
  }, [filtroAtivo, locais]);

  return (
    <div style={{ 
      ...tema, 
      background: 'var(--bg-app)', 
      minHeight: '100vh',
      padding: '20px', 
      fontFamily: 'sans-serif' 
    }}>
      
      {/* --- CABEÇALHO HERO --- */}
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '5px' }}>
          {projeto.titulo_pagina || 'Pet Finder'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Os melhores cuidados para seu amigo.
        </p>
      </header>

      {/* --- BARRA DE NAVEGAÇÃO VISUAL (BOTÕES) --- */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        overflowX: 'auto', 
        paddingBottom: '10px', 
        marginBottom: '20px',
        justifyContent: 'center', // Centraliza no Desktop
        flexWrap: 'wrap'          // Quebra linha se tela for pequena
      }}>
        
        {/* Botão de Limpar Filtro (Só aparece se tiver filtro ativo) */}
        {filtroAtivo && (
          <button 
            onClick={() => setFiltroAtivo(null)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
              border: 'none', background: 'transparent', cursor: 'pointer', minWidth: '60px'
            }}
          >
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%', 
              background: '#e2e8f0', color: '#64748b',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <X size={20} />
            </div>
            <span style={{fontSize: '12px', fontWeight: 'bold', color: '#64748b'}}>Todos</span>
          </button>
        )}

        {/* Botões das Categorias */}
        {categorias.map((cat) => {
          const isAtivo = filtroAtivo === cat.id;
          return (
            <button 
              key={cat.id}
              onClick={() => setFiltroAtivo(isAtivo ? null : cat.id)} // Clica de novo pra desmarcar
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                border: 'none', background: 'transparent', cursor: 'pointer', minWidth: '70px'
              }}
            >
              <div style={{
                width: '55px', height: '55px', borderRadius: '20px', // Formato "App"
                background: isAtivo ? 'var(--cor-primaria)' : 'white',
                color: isAtivo ? 'white' : '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isAtivo ? '0 4px 10px rgba(37, 99, 235, 0.3)' : '0 2px 5px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                {cat.icon}
              </div>
              <span style={{
                fontSize: '12px', fontWeight: 'bold', 
                color: isAtivo ? 'var(--cor-primaria)' : '#64748b'
              }}>
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>

      {loading && <p style={{textAlign: 'center', color: '#666'}}>Carregando...</p>}
      
      {!loading && locaisFiltrados.length === 0 && (
        <div style={{textAlign: 'center', padding: '40px', color: '#94a3b8'}}>
          <Store size={40} style={{marginBottom: '10px', opacity: 0.5}} />
          <p>Nenhum local encontrado nesta categoria.</p>
          {filtroAtivo && <button onClick={() => setFiltroAtivo(null)} style={{color: 'var(--cor-primaria)', background:'none', border:'none', textDecoration:'underline', cursor:'pointer'}}>Ver todos</button>}
        </div>
      )}

      {/* LISTA DE CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {locaisFiltrados.map((local) => {
          const isVip = local.destaque; 
          return (
            <div key={local.id} style={{
              border: isVip ? '2px solid var(--cor-destaque)' : '1px solid #e2e8f0',
              borderRadius: '16px', padding: '20px', background: 'white',
              boxShadow: isVip ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
              position: 'relative', overflow: 'hidden'
            }}>
              
              {isVip && (
                <div style={{
                  position: 'absolute', top: 0, right: 0, 
                  background: 'var(--cor-destaque)', color: 'white',
                  padding: '4px 12px', borderBottomLeftRadius: '10px',
                  fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Award size={12} /> RECOMENDADO
                </div>
              )}

              <div style={{marginBottom: '10px'}}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1e293b', paddingRight: '90px' }}>{local.nome}</h3>
                {(local.nota > 0) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--cor-destaque)', fontWeight: 'bold' }}>
                    <span style={{background: '#fffbeb', padding: '2px 6px', borderRadius: '4px', display:'flex', alignItems:'center', gap:'4px'}}>
                      {local.nota} <Star size={14} fill="currentColor" />
                    </span>
                    <span style={{color: '#94a3b8', fontWeight: 'normal', fontSize: '12px'}}>({local.avaliacoes} avaliações)</span>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', color: '#64748b', fontSize: '13px', marginBottom: '15px' }}>
                <MapPin size={16} style={{flexShrink: 0}} />
                <span>{local.endereco || "Endereço não informado"}</span>
              </div>

              {/* Tags visuais */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '15px' }}>
                {local.tags && local.tags.map(tag => (
                  <span key={tag} style={{
                    background: '#f1f5f9', color: '#475569', fontSize: '11px', padding: '4px 8px', borderRadius: '6px', textTransform: 'capitalize'
                  }}>
                    {tag.replace('_', ' ')}
                  </span>
                ))}
              </div>

              {isVip && local.instagram_url && (
                <div style={{ marginBottom: '15px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
                  <div style={{display: 'flex', justifyContent: 'center', background: '#fafafa'}}>
                    <InstagramEmbed url={local.instagram_url} width="100%" style={{maxWidth: '100%'}} captioned={false} />
                  </div>
                </div>
              )}

              <button 
                onClick={() => setSelectedLocal(local)}
                style={{
                  width: '100%', padding: '14px',
                  background: isVip ? 'var(--cor-destaque)' : 'var(--cor-primaria)',
                  color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  fontSize: '15px', boxShadow: isVip ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <MessageCircle size={20} />
                {isVip ? 'Falar com Especialista' : 'Falar com Atendente'}
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