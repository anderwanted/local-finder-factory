import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Star, ExternalLink, 
  Layout, Palette, Store, Sun, Moon, CheckSquare, Square, X,
  Scissors, Stethoscope, ShoppingBag, Home 
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  // --- ESTADOS ---
  const [activeTab, setActiveTab] = useState('lojas'); 
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filtroStatus, setFiltroStatus] = useState('todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [filtroVip, setFiltroVip] = useState(false);

  const [configForm, setConfigForm] = useState({
    nome: '',
    titulo_pagina: '',
    cor_primaria: '#2563eb',
    cor_destaque: '#f59e0b',
    slug: '',
    logo_url: '',
    tema_base: 'light'
  });

  // --- SINCRONIZAÇÃO COM O BANCO ---
  useEffect(() => {
    if (projeto && projeto.id) {
      setConfigForm({
        nome: projeto.nome || '',
        titulo_pagina: projeto.titulo_pagina || '',
        cor_primaria: projeto.cor_primaria || '#2563eb',
        cor_destaque: projeto.cor_destaque || '#f59e0b',
        slug: projeto.slug || '',
        logo_url: projeto.logo_url || '',
        tema_base: projeto.tema_base || 'light'
      });
      buscarDados();
    }
  }, [projeto]);

  const isDark = configForm.tema_base === 'dark';

  const cores = {
    fundo: isDark ? '#0f172a' : '#f8fafc',
    card: isDark ? '#1e293b' : '#ffffff',
    texto: isDark ? '#f8fafc' : '#1e293b',
    textoSec: isDark ? '#94a3b8' : '#64748b',
    borda: isDark ? '#334155' : '#e2e8f0',
    input: isDark ? '#020617' : '#ffffff'
  };

  const TAGS = [
    { id: 'banho', label: 'Banho', color: '#3b82f6', icon: <Scissors size={16} strokeWidth={2.5}/> },
    { id: 'vet',   label: 'Vet',   color: '#10b981', icon: <Stethoscope size={16} strokeWidth={2.5}/> },
    { id: 'loja',  label: 'Loja',  color: '#f59e0b', icon: <ShoppingBag size={16} strokeWidth={2.5}/> },
    { id: 'hotel', label: 'Hotel', color: '#8b5cf6', icon: <Home size={16} strokeWidth={2.5}/> }
  ];

  async function buscarDados() {
    setLoading(true);
    const { data } = await supabase.from('locais').select('*').eq('projeto_id', projeto.id).order('created_at', { ascending: false });
    setLocais(data || []);
    setLoading(false);
  }

  async function salvarConfiguracoes() {
    const { error } = await supabase.from('projetos').update({
      nome: configForm.nome,
      titulo_pagina: configForm.titulo_pagina,
      cor_primaria: configForm.cor_primaria,
      cor_destaque: configForm.cor_destaque,
      logo_url: configForm.logo_url,
      tema_base: configForm.tema_base
    }).eq('id', projeto.id);

    if (error) alert('Erro ao salvar');
    else { alert('Sucesso!'); window.location.reload(); }
  }

  async function mudarStatus(local) {
    const novoStatus = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    await supabase.from('locais').update({ status: novoStatus }).eq('id', local.id);
    buscarDados();
  }

  async function deletarLocal(id) {
    if(!confirm("Deseja excluir?")) return;
    await supabase.from('locais').delete().eq('id', id);
    buscarDados();
  }

  async function salvarEdicaoLocal() {
    await supabase.from('locais').update({
      nome: editForm.nome,
      nota: editForm.nota,
      avaliacoes: editForm.avaliacoes,
      instagram_url: editForm.instagram_url,
      destaque: editForm.destaque,
      tags: editForm.tags 
    }).eq('id', editingId);
    setEditingId(null);
    buscarDados();
  }

  const toggleTag = (tagId) => {
    const atuais = editForm.tags || [];
    setEditForm({ ...editForm, tags: atuais.includes(tagId) ? atuais.filter(t => t !== tagId) : [...atuais, tagId] });
  };

  const filtrados = locais.filter(l => {
    if (filtroStatus === 'publicados' && l.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && l.status === 'PUBLICAR_APP') return false;
    if (filtroVip && !l.destaque) return false;
    if (filtroCategoria && !l.tags?.includes(filtroCategoria)) return false;
    return true;
  });

  if (!projeto) return <div style={{padding: 50}}>Carregando...</div>;

  return (
    <div style={{ background: cores.fundo, minHeight: '100vh', color: cores.texto, padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ background: cores.card, borderRadius: '12px', border: `1px solid ${cores.borda}`, padding: '20px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '45px', height: '45px', background: configForm.cor_primaria, borderRadius: '10px', display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}>
            <Store size={24} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.2rem' }}>{configForm.nome}</h1>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '10px', background: 'transparent', border: `1px solid ${cores.borda}`, color: cores.textoSec, borderRadius: '8px', cursor: 'pointer', fontWeight:'bold' }}>
          Ver App
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* NAVEGAÇÃO LATERAL */}
        <nav style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveTab('lojas')} style={{ padding: '12px', border: 'none', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', background: activeTab === 'lojas' ? cores.borda : 'transparent', color: cores.texto, fontWeight: activeTab === 'lojas' ? 'bold' : 'normal' }}>
             Gestão de Lojas
          </button>
          <button onClick={() => setActiveTab('config')} style={{ padding: '12px', border: 'none', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', background: activeTab === 'config' ? cores.borda : 'transparent', color: cores.texto, fontWeight: activeTab === 'config' ? 'bold' : 'normal' }}>
             Brand Studio
          </button>
        </nav>

        {/* CONTEÚDO PRINCIPAL */}
        <main style={{ flex: 1 }}>
          
          {activeTab === 'lojas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* FILTROS */}
              <div style={{ background: cores.card, borderRadius: '12px', border: `1px solid ${cores.borda}`, padding: '15px', display:'flex', gap:'10px', flexWrap:'wrap' }}>
                 {['todos', 'publicados', 'ocultos'].map(s => (
                   <button key={s} onClick={() => setFiltroStatus(s)} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: filtroStatus === s ? configForm.cor_primaria : cores.fundo, color: filtroStatus === s ? 'white' : cores.textoSec, fontWeight: 'bold' }}>{s.toUpperCase()}</button>
                 ))}
                 <button onClick={() => setFiltroVip(!filtroVip)} style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: filtroVip ? '#f59e0b' : cores.fundo, color: filtroVip ? 'white' : cores.textoSec, fontWeight: 'bold' }}>VIPs</button>
              </div>

              {/* LISTA */}
              {loading ? <p>Carregando...</p> : filtrados.map(local => {
                const isVisible = local.status === 'PUBLICAR_APP';
                const isEditing = editingId === local.id;
                return (
                  <div key={local.id} style={{ background: cores.card, borderRadius: '12px', border: `1px solid ${cores.borda}`, padding: '20px', borderLeft: isEditing ? `5px solid ${configForm.cor_primaria}` : (local.destaque ? '5px solid #f59e0b' : `1px solid ${cores.borda}`) }}>
                    {isEditing ? (
                      <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
                        <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} style={{ width:'100%', padding:'10px', borderRadius:'8px', border:`1px solid ${cores.borda}`, background: cores.input, color: cores.texto }} />
                        <div style={{ display:'flex', gap:'10px' }}>
                           <button onClick={salvarEdicaoLocal} style={{ flex:1, padding:'12px', background:'#22c55e', color:'white', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer' }}>Salvar</button>
                           <button onClick={() => setEditingId(null)} style={{ padding:'12px', background:'#ef4444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' }}>X</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ margin: 0 }}>{local.nome} {local.destaque && <Star size={16} fill="#f59e0b" color="#f59e0b" />}</h3>
                          <p style={{ margin: '5px 0', fontSize: '12px', color: cores.textoSec }}>{local.endereco}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => mudarStatus(local)} style={{ width:'42px', height:'42px', borderRadius:'10px', border:'none', cursor:'pointer', background: isVisible ? cores.fundo : '#fee2e2', color: isVisible ? cores.textoSec : '#ef4444' }}>
                            {isVisible ? <Eye size={22} strokeWidth={2.5} /> : <EyeOff size={22} strokeWidth={2.5} />}
                          </button>
                          <button onClick={() => { setEditingId(local.id); setEditForm(local); }} style={{ width:'42px', height:'42px', borderRadius:'10px', border:'none', cursor:'pointer', background: '#dbeafe', color: '#2563eb' }}>
                            <Edit size={22} strokeWidth={2.5} />
                          </button>
                          <button onClick={() => deletarLocal(local.id)} style={{ width:'42px', height:'42px', borderRadius:'10px', border:'none', cursor:'pointer', background: '#fef2f2', color: '#ef4444' }}>
                            <Trash2 size={22} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'config' && (
            <div style={{ background: cores.card, borderRadius: '12px', border: `1px solid ${cores.borda}`, padding: '30px', display:'flex', flexDirection:'column', gap:'20px' }}>
               <h2>Brand Studio</h2>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                 <label style={{ fontSize: '12px', fontWeight: 'bold', color: cores.textoSec }}>Cor Primária</label>
                 <input type="color" value={configForm.cor_primaria} onChange={e => setConfigForm({...configForm, cor_primaria: e.target.value})} style={{ width: '100%', height: '45px', border:'none', background:'none', cursor:'pointer' }} />
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                 <label style={{ fontSize: '12px', fontWeight: 'bold', color: cores.textoSec }}>Tema do App</label>
                 <div style={{ display: 'flex', gap: '10px' }}>
                   <button onClick={() => setConfigForm({...configForm, tema_base: 'light'})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: configForm.tema_base === 'light' ? '2px solid blue' : '1px solid gray', background: 'white', color: 'black', cursor: 'pointer' }}>☀️ Light</button>
                   <button onClick={() => setConfigForm({...configForm, tema_base: 'dark'})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: configForm.tema_base === 'dark' ? '2px solid blue' : '1px solid gray', background: 'black', color: 'white', cursor: 'pointer' }}>🌙 Dark</button>
                 </div>
               </div>
               <button onClick={salvarConfiguracoes} style={{ padding: '15px', background: cores.texto, color: cores.fundo, border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>Salvar Configurações</button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}