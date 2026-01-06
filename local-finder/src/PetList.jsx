import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; 
import { MessageCircle, MapPin, Store, Star, Award } from 'lucide-react';
import ChatModal from './ChatModal';
import { InstagramEmbed } from 'react-social-media-embed';

// Recebemos o 'projeto' vindo do App.jsx
export default function PetList({ projeto }) {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);

  // --- TEMA DINÂMICO (Vem do Banco) ---
  const tema = {
    '--cor-primaria': projeto.cor_primaria || '#2563eb', 
    '--cor-destaque': projeto.cor_destaque || '#f59e0b',
    '--bg-app': '#f8fafc'
  };

  useEffect(() => {
    async function buscarLocais() {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('locais')
        .select('*')
        .eq('status', 'PUBLICAR_APP')
        .eq('projeto_id', projeto.id) // 🔒 O CADEADO: Só traz dados deste projeto
        .order('destaque', { ascending: false }) 
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erro ao buscar:", error); 
        setLocais([]); 
      } else {
        setLocais(data || []);
      }
      setLoading(false);
    }
    
    // Se o projeto mudar, busca de novo
    if (projeto?.id) buscarLocais();
  }, [projeto]);

  return (
    <div style={{ 
      ...tema, 
      background: 'var(--bg-app)', 
      minHeight: '100vh',
      padding: '20px', 
      fontFamily: 'sans-serif' 
    }}>
      
      <header style={{ marginBottom: '30px', textAlign: 'center', maxWidth: '600px', margin: '0 auto 30px' }}>
        {/* Título vem do Banco agora */}
        <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#1e293b' }}>
          {projeto.titulo_pagina || projeto.nome}
        </h1>
        <p style={{ color: '#64748b' }}>Encontre os melhores serviços locais.</p>
      </header>

      {loading && <p style={{textAlign: 'center', color: '#666'}}>Carregando...</p>}
      
      {!loading && locais.length === 0 && (
        <div style={{textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '10px', maxWidth: '600px', margin: '0 auto'}}>
          <Store size={40} color="#ccc" />
          <p>Nenhum local cadastrado neste nicho ainda.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {locais.map((local) => {
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

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '15px' }}>
                {local.tags && local.tags.slice(0, 4).map(tag => (
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

      {/* Passamos o 'projeto' para o Modal também, pois ele precisa salvar o Lead com o ID certo */}
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