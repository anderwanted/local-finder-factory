import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Star, ExternalLink, 
  Layout, Palette, Store, Sun, Moon, CheckSquare, Square, X,
  Scissors, Stethoscope, ShoppingBag, Home 
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  // 1. ESTADOS OCULTOS
  const [activeTab, setActiveTab] = useState('lojas'); 
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filtroStatus, setFiltroStatus] = useState('todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [filtroVip, setFiltroVip] = useState(false);

  // 2. CONFIGURAÇÕES
  const [configForm, setConfigForm] = useState({
    nome: projeto?.nome || '',
    titulo_pagina: projeto?.titulo_pagina || '',
    cor_primaria: projeto?.cor_primaria || '#2563eb',
    cor_destaque: projeto?.cor_destaque || '#f59e0b',
    slug: projeto?.slug || '',
    logo_url: projeto?.logo_url || '',
    tema_base: projeto?.tema_base || 'light'
  });

  useEffect(() => {
    if (projeto?.id) {
      setConfigForm(prev => ({ ...prev, ...projeto }));
      buscarDados();
    }
  }, [projeto]);

  const isDark = configForm.tema_base === 'dark';

  const theme = {
    bg: isDark ? '#0f172a' : '#f8fafc',
    card: isDark ? '#1e293b' : '#ffffff',
    text: isDark ? '#f8fafc' : '#1e293b',
    textSec: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#334155' : '#e2e8f0'
  };

  const TAGS_MAP = [
    { id: 'banho', label: 'Banho', color: '#3b82f6', icon: <Scissors size={16}/> },
    { id: 'vet',   label: 'Vet',   color: '#10b981', icon: <Stethoscope size={16}/> },
    { id: 'loja',  label: 'Loja',  color: '#f59e0b', icon: <ShoppingBag size={16}/> },
    { id: 'hotel', label: 'Hotel', color: '#8b5cf6', icon: <Home size={16}/> }
  ];

  // 3. FUNÇÕES
  async function buscarDados() {
    if (!projeto?.id) return;
    setLoading(true);
    const { data } = await supabase.from('locais').select('*').eq('projeto_id', projeto.id).order('created_at', { ascending: false });
    setLocais(data || []);
    setLoading(false);
  }

  async function salvarConfigs() {
    const { error } = await supabase.from('projetos').update({
      nome: configForm.nome,
      titulo_pagina: configForm.titulo_pagina,
      cor_primaria: configForm.cor_primaria,
      cor_destaque: configForm.cor_destaque,
      logo_url: configForm.logo_url,
      tema_base: configForm.tema_base
    }).eq('id', projeto.id);
    if (!error) { alert("Salvo!"); window.location.reload(); }
  }

  async function mudarStatus(local) {
    const novo = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    await supabase.from('locais').update({ status: novo }).eq('id', local.id);
    buscarDados();
  }

  async function deletar(id) {
    if(!confirm("Excluir?")) return;
    await supabase.from('locais').delete().eq('id', id);
    buscarDados();
  }

  const toggleTag = (id) => {
    const t = editForm.tags || [];
    setEditForm({...editForm, tags: t.includes(id) ? t.filter(x => x !== id) : [...t, id]});
  };

  // 4. RENDER
  if (!projeto) return <div style={{padding: 40}}>Iniciando...</div>;

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', color: theme.text, padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER INTEGRADO */}
      <header style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '20px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', background: configForm.cor_primaria, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Store size={20} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.2rem' }}>{configForm.nome}</h1>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '8px 15px', background: 'transparent', border: `1px solid ${theme.border}`, color: theme.textSec, borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ver App
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* NAV DIRETA (SEM COMPONENTES EXTRAS) */}
        <nav style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveTab('lojas')} style={{ padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', background: activeTab === 'lojas' ? theme.border : 'transparent', color: theme.text, fontWeight: activeTab === 'lojas' ? 'bold' : 'normal' }}>
            Lojas
          </button>
          <button onClick={() => setActiveTab('config')} style={{ padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', background: activeTab === 'config' ? theme.border : 'transparent', color: theme.text, fontWeight: activeTab === 'config' ? 'bold' : 'normal' }}>
            Aparência
          </button>
        </nav>

        <main style={{ flex: 1 }}>
          {activeTab === 'lojas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* FILTROS SIMPLES */}
              <div style={{ background: theme.card, padding: '15px', borderRadius: '12px', border: `1px solid ${theme.border}`, display: 'flex', gap: '10px' }}>
                <button onClick={() => setFiltroStatus('todos')} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: filtroStatus === 'todos' ? configForm.cor_primaria : theme.bg, color: filtroStatus === 'todos' ? 'white' : theme.textSec }}>TODOS</button>
                <button onClick={() => setFiltroVip(!filtroVip)} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: filtroVip ? '#f59e0b' : theme.bg, color: filtroVip ? 'white' : theme.textSec }}>VIP</button>
              </div>

              {/* LISTA DE CARDS */}
              {loading ? <p>Carregando...</p> : locais.filter(l => {
                if(filtroStatus === 'publicados' && l.status !== 'PUBLICAR_APP') return false;
                if(filtroVip && !l.destaque) return false;
                return true;
              }).map(local => (
                <div key={local.id} style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {editingId === local.id ? (
                    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                      <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: `1px solid ${theme.border}` }} />
                      <button onClick={async () => {
                        await supabase.from('locais').update({ nome: editForm.nome }).eq('id', local.id);
                        setEditingId(null);
                        buscarDados();
                      }} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px' }}>OK</button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h4 style={{ margin: 0 }}>{local.nome} {local.destaque && '⭐'}</h4>
                        <span style={{ fontSize: '11px', color: theme.textSec }}>{local.endereco}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => mudarStatus(local)} style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: local.status === 'PUBLICAR_APP' ? theme.bg : '#fee2e2' }}>
                          {local.status === 'PUBLICAR_APP' ? <Eye size={18}/> : <EyeOff size={18}/>}
                        </button>
                        <button onClick={() => { setEditingId(local.id); setEditForm(local); }} style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: '#dbeafe', color: '#2563eb' }}>
                          <Edit size={18}/>
                        </button>
                        <button onClick={() => deletar(local.id)} style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: '#fef2f2', color: '#ef4444' }}>
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'config' && (
            <div style={{ background: theme.card, padding: '30px', borderRadius: '12px', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3>Aparência do App</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setConfigForm({...configForm, tema_base: 'light'})} style={{ flex: 1, padding: '15px', borderRadius: '8px', border: configForm.tema_base === 'light' ? `2px solid ${configForm.cor_primaria}` : '1px solid gray', background: 'white', color: 'black', cursor: 'pointer' }}>☀️ Light</button>
                <button onClick={() => setConfigForm({...configForm, tema_base: 'dark'})} style={{ flex: 1, padding: '15px', borderRadius: '8px', border: configForm.tema_base === 'dark' ? `2px solid ${configForm.cor_primaria}` : '1px solid gray', background: 'black', color: 'white', cursor: 'pointer' }}>🌙 Dark</button>
              </div>
              <button onClick={salvarConfigs} style={{ padding: '15px', background: theme.text, color: theme.bg, border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Salvar Tudo
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}