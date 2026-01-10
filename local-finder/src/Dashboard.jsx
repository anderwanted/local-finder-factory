import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Star, ExternalLink, 
  Layout, Palette, Store, Sun, Moon, CheckSquare, Square, X,
  Scissors, Stethoscope, ShoppingBag, Home 
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('lojas'); 
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
    estilo_borda: 'redondo',
    tema_base: 'light'
  });

  useEffect(() => {
    if (projeto && projeto.id) {
      setConfigForm({
        nome: projeto.nome || '',
        titulo_pagina: projeto.titulo_pagina || '',
        cor_primaria: projeto.cor_primaria || '#2563eb',
        cor_destaque: projeto.cor_destaque || '#f59e0b',
        slug: projeto.slug || '',
        logo_url: projeto.logo_url || '',
        estilo_borda: projeto.estilo_borda || 'redondo',
        tema_base: projeto.tema_base || 'light'
      });
      fetchLocais();
    }
  }, [projeto]);

  const isDark = configForm.tema_base === 'dark';

  const theme = {
    bg: isDark ? '#0f172a' : '#f8fafc',
    card: isDark ? '#1e293b' : '#ffffff',
    text: isDark ? '#f8fafc' : '#1e293b',
    textSec: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#334155' : '#e2e8f0',
    input: isDark ? '#020617' : '#ffffff',
    hover: isDark ? '#334155' : '#f1f5f9'
  };

  const TAGS_OFICIAIS = [
    { id: 'banho', label: 'Banho', color: '#3b82f6' },
    { id: 'vet',   label: 'Vet',   color: '#10b981' },
    { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
    { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
  ];

  const getIconeCategoria = (id, isSelected = false) => {
    const cor = isSelected ? 'white' : (TAGS_OFICIAIS.find(t => t.id === id)?.color || '#64748b');
    const props = { size: 18, strokeWidth: 2.5, color: cor };
    switch(id) {
      case 'banho': return <Scissors {...props} />;
      case 'vet':   return <Stethoscope {...props} />;
      case 'loja':  return <ShoppingBag {...props} />;
      case 'hotel': return <Home {...props} />;
      default:      return <Store {...props} />;
    }
  };

  async function fetchLocais() {
    setLoading(true);
    const { data } = await supabase.from('locais').select('*').eq('projeto_id', projeto.id).order('created_at', { ascending: false });
    setLocais(data || []);
    setLoading(false);
  }

  async function handleSaveConfig() {
    const { error } = await supabase.from('projetos').update({
        nome: configForm.nome,
        titulo_pagina: configForm.titulo_pagina,
        cor_primaria: configForm.cor_primaria,
        cor_destaque: configForm.cor_destaque,
        logo_url: configForm.logo_url,
        tema_base: configForm.tema_base
      }).eq('id', projeto.id);

    if (error) alert('Erro ao salvar!');
    else { alert('Salvo com sucesso!'); window.location.reload(); }
  }

  async function toggleStatus(local) {
    const novoStatus = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    const { error } = await supabase.from('locais').update({ status: novoStatus }).eq('id', local.id);
    if (!error) setLocais(locais.map(l => l.id === local.id ? { ...l, status: novoStatus } : l));
  }

  async function handleUpdateLocal() {
    const { error } = await supabase.from('locais').update({
        nome: editForm.nome, nota: editForm.nota, avaliacoes: editForm.avaliacoes, instagram_url: editForm.instagram_url, destaque: editForm.destaque, tags: editForm.tags 
      }).eq('id', editingId);
    if (!error) { setEditingId(null); fetchLocais(); }
  }

  async function handleDelete(id) {
    if(!window.confirm("Excluir?")) return;
    const { error } = await supabase.from('locais').delete().eq('id', id);
    if (!error) fetchLocais();
  }

  const locaisFiltrados = locais.filter(local => {
    if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') return false;
    if (filtroVip && !local.destaque) return false;
    if (filtroCategoria && !local.tags?.includes(filtroCategoria)) return false;
    return true;
  });

  if (!projeto) return <div style={{padding: 50, color: '#666'}}>Carregando Dashboard...</div>;

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', color: theme.text, padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '20px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '48px', height: '48px', background: configForm.cor_primaria, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            {configForm.logo_url ? <img src={configForm.logo_url} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <Store size={24} />}
          </div>
          <h1 style={{ margin: 0, fontSize: '1.4rem' }}>{configForm.nome}</h1>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.textSec, padding: '10px', borderRadius: '8px', cursor: 'pointer', display:'flex', gap:'5px', fontWeight:'bold' }}>
          <ExternalLink size={18} /> Ver App
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* SIDEBAR */}
        <aside style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => setActiveTab('lojas')} style={{ padding: '12px', border: 'none', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', display: 'flex', gap: '10px', background: activeTab === 'lojas' ? theme.hover : 'transparent', color: activeTab === 'lojas' ? theme.text : theme.textSec, fontWeight: activeTab === 'lojas' ? 'bold' : 'normal' }}>
            <Layout size={18} /> Gestão de Lojas
          </button>
          <button onClick={() => setActiveTab('config')} style={{ padding: '12px', border: 'none', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', display: 'flex', gap: '10px', background: activeTab === 'config' ? theme.hover : 'transparent', color: activeTab === 'config' ? theme.text : theme.textSec, fontWeight: activeTab === 'config' ? 'bold' : 'normal' }}>
            <Palette size={18} /> Brand Studio
          </button>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1 }}>
          {activeTab === 'lojas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '15px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', background: theme.bg, padding: '4px', borderRadius: '8px' }}>
                  {['todos', 'publicados', 'ocultos'].map(s => (
                    <button key={s} onClick={() => setFiltroStatus(s)} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: filtroStatus === s ? theme.card : 'transparent', color: theme.text, fontWeight: 'bold', fontSize: '12px' }}>{s.toUpperCase()}</button>
                  ))}
                </div>
                {TAGS_OFICIAIS.map(tag => (
                  <button key={tag.id} onClick={() => setFiltroCategoria(filtroCategoria === tag.id ? null : tag.id)} style={{ padding: '8px 12px', borderRadius: '20px', border: `1px solid ${theme.border}`, background: filtroCategoria === tag.id ? tag.color : theme.card, color: filtroCategoria === tag.id ? 'white' : theme.textSec, cursor: 'pointer', display: 'flex', gap: '6px', fontWeight: 'bold', fontSize: '12px' }}>
                    {getIconeCategoria(tag.id, filtroCategoria === tag.id)} {tag.label}
                  </button>
                ))}
              </div>

              {loading ? <p>Carregando...</p> : locaisFiltrados.map(local => {
                const isVisible = local.status === 'PUBLICAR_APP';
                const isEditing = editingId === local.id;
                return (
                  <div key={local.id} style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '20px', borderLeft: isEditing ? `5px solid ${configForm.cor_primaria}` : (local.destaque ? '5px solid #f59e0b' : `1px solid ${theme.border}`) }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} style={{ width: '100%', padding: '12px', border: `1px solid ${theme.border}`, borderRadius: '8px', background: theme.input, color: theme.text }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={handleUpdateLocal} style={{ flex: 1, padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Salvar</button>
                          <button onClick={() => setEditingId(null)} style={{ padding: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>X</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ margin: '0 0 5px 0' }}>{local.nome} {local.destaque && <Star size={16} fill="#f59e0b" color="#f59e0b" />}</h3>
                          <div style={{ fontSize: '12px', color: theme.textSec }}>📍 {local.endereco}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => toggleStatus(local)} style={{ width: '42px', height: '42px', borderRadius: '10px', border: 'none', background: isVisible ? (isDark ? '#334155' : '#e2e8f0') : '#fee2e2', color: isVisible ? (isDark ? '#f8fafc' : '#1e293b') : '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isVisible ? <Eye size={22} strokeWidth={2.5} /> : <EyeOff size={22} strokeWidth={2.5} />}
                          </button>
                          <button onClick={() => { setEditingId(local.id); setEditForm(local); }} style={{ width: '42px', height: '42px', borderRadius: '10px', border: 'none', background: isDark ? '#1e3a8a' : '#dbeafe', color: isDark ? '#60a5fa' : '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Edit size={22} strokeWidth={2.5} />
                          </button>
                          <button onClick={() => handleDelete(local.id)} style={{ width: '42px', height: '42px', borderRadius: '10px', border: 'none', background: '#fef2f2', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <div style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2>Aparência do App</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setConfigForm({...configForm, tema_base: 'light'})} style={{ flex: 1, padding: '15px', borderRadius: '8px', border: configForm.tema_base === 'light' ? '2px solid blue' : '1px solid gray', background: '#fff', color: '#000', cursor: 'pointer' }}>☀️ Light</button>
                <button onClick={() => setConfigForm({...configForm, tema_base: 'dark'})} style={{ flex: 1, padding: '15px', borderRadius: '8px', border: configForm.tema_base === 'dark' ? '2px solid blue' : '1px solid gray', background: '#000', color: '#fff', cursor: 'pointer' }}>🌙 Dark</button>
              </div>
              <button onClick={handleSaveConfig} style={{ padding: '15px', background: theme.text, color: theme.bg, border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Salvar Configurações</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}