import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Filter, Star, ExternalLink, 
  Settings, Layout, Palette, Store, Sun, Moon, CheckSquare, Square, X,
  Scissors, Stethoscope, ShoppingBag, Home 
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  // --- ESTADOS GERAIS ---
  const [activeTab, setActiveTab] = useState('lojas'); 
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE EDIÇÃO ---
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // --- FILTROS ---
  const [filtroStatus, setFiltroStatus] = useState('todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [filtroVip, setFiltroVip] = useState(false);

  // --- CONFIGURAÇÃO (BRAND STUDIO) ---
  // Inicializa direto das props para garantir que carregue o que está no banco
const temaInicial =
  localStorage.getItem('tema_base') ||
  projeto?.tema_base ||
  'light';

  const [configForm, setConfigForm] = useState({
    nome: projeto?.nome || '',
    titulo_pagina: projeto?.titulo_pagina || '',
    cor_primaria: projeto?.cor_primaria || '#2563eb',
    cor_destaque: projeto?.cor_destaque || '#f59e0b',
    slug: projeto?.slug || '',
    logo_url: projeto?.logo_url || '',
    estilo_borda: projeto?.estilo_borda || 'redondo',
    tema_base: temaInicial // Aqui define se começa Dark ou Light
  });

  // --- SISTEMA DE TEMAS (DARK/LIGHT) ---
  const isDark = configForm.tema_base === 'dark';

  useEffect(() => {
  localStorage.setItem('tema_base', configForm.tema_base);
}, [configForm.tema_base]);
  
  // Paleta de cores dinâmica para o Painel
  const theme = {
    bg: isDark ? '#0f172a' : '#f8fafc',       // Fundo da página
    card: isDark ? '#1e293b' : '#ffffff',     // Fundo dos cards
    text: isDark ? '#f8fafc' : '#1e293b',     // Texto principal
    textSec: isDark ? '#94a3b8' : '#64748b',  // Texto secundário
    border: isDark ? '#334155' : '#e2e8f0',   // Bordas
    hover: isDark ? '#334155' : '#f1f5f9',    // Hover dos botões
    input: isDark ? '#020617' : '#ffffff'     // Fundo de inputs
  };

  const TAGS_OFICIAIS = [
    { id: 'banho', label: 'Banho', color: '#3b82f6' },
    { id: 'vet',   label: 'Vet',   color: '#10b981' },
    { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
    { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
  ];

  // --- ÍCONES NÍTIDOS E EXPRESSIVOS ---
  const getIconeCategoria = (id) => {
    // strokeWidth: 2.5 deixa o ícone "Bold" (mais visível)
    const props = { size: 18, strokeWidth: 2.5 }; 

    switch(id) {
      case 'banho': return <Scissors {...props} />;
      case 'vet':   return <Stethoscope {...props} />;
      // Loja e Hotel ficam bons com um leve preenchimento (fill)
      case 'loja':  return <ShoppingBag {...props} fill="currentColor" fillOpacity={0.2} />; 
      case 'hotel': return <Home {...props} fill="currentColor" fillOpacity={0.2} />;
      default:      return <Store {...props} />;
    }
  };

  useEffect(() => {
    if (projeto?.id) fetchLocais();
  }, [projeto]);

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
        estilo_borda: configForm.estilo_borda,
        tema_base: configForm.tema_base
      }).eq('id', projeto.id);

    if (error) alert('Erro ao salvar!');
    else {
      // Pequeno hack para forçar atualização visual imediata sem reload total
      alert('Configurações salvas!');
      window.location.reload(); 
    }
  }

  // --- CRUD OPERATIONS ---
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
    if(!window.confirm("Apagar permanentemente?")) return;
    const { error } = await supabase.from('locais').delete().eq('id', id);
    if (!error) fetchLocais();
  }

  const toggleTagForm = (tagId) => {
    const tagsAtuais = editForm.tags || [];
    if (tagsAtuais.includes(tagId)) setEditForm({ ...editForm, tags: tagsAtuais.filter(t => t !== tagId) });
    else setEditForm({ ...editForm, tags: [...tagsAtuais, tagId] });
  };

  const iniciarEdicao = (local) => { setEditingId(local.id); setEditForm({ ...local, tags: local.tags || [] }); };

  const locaisFiltrados = locais.filter(local => {
    if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') return false;
    if (filtroVip && !local.destaque) return false;
    if (filtroCategoria && !local.tags?.includes(filtroCategoria)) return false;
    return true;
  });

  // Styles reutilizáveis com tema aplicado
  const containerStyle = { padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', background: theme.bg, minHeight: '100vh', color: theme.text, transition: 'background 0.3s, color 0.3s' };
  const cardStyle = { background: theme.card, borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: `1px solid ${theme.border}` };
  const inputStyle = { width: '100%', padding: '12px', border: `1px solid ${theme.border}`, borderRadius: '8px', fontSize: '14px', background: theme.input, color: theme.text, outline: 'none' };
  const labelStyle = { fontSize: '13px', fontWeight: 'bold', color: theme.textSec, marginBottom: '5px', display: 'block' };

  return (
    <div style={containerStyle}>
      
      {/* HEADER */}
      <header style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding:'20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <div style={{ width:'48px', height:'48px', borderRadius:'10px', background: configForm.cor_primaria, display:'flex', alignItems:'center', justifyContent:'center', color:'white', overflow:'hidden', boxShadow: `0 0 20px ${configForm.cor_primaria}60` }}>
             {projeto.logo_url ? <img src={projeto.logo_url} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <Store size={24} />}
           </div>
           <div>
             <h1 style={{ margin: 0, fontSize: '1.4rem', color: theme.text }}>{projeto.nome}</h1>
             <p style={{ margin: 0, fontSize: '0.9rem', color: theme.textSec }}>Painel Admin v4.0</p>
           </div>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '10px 20px', cursor: 'pointer', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '8px', fontWeight:'bold', color: theme.textSec, display:'flex', alignItems:'center', gap:'8px' }}>
           <ExternalLink size={16} /> Ver App
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', alignItems: 'flex-start' }}>
        
        {/* SIDEBAR */}
        <aside style={{ ...cardStyle, width: '250px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MenuButton active={activeTab === 'lojas'} onClick={() => setActiveTab('lojas')} theme={theme} icon={<Layout size={18} />}>Gestão de Lojas</MenuButton>
          <MenuButton active={activeTab === 'config'} onClick={() => setActiveTab('config')} theme={theme} icon={<Palette size={18} />}>Aparência (App)</MenuButton>
        </aside>

        <main style={{ flex: 1 }}>
          
          {/* ================= ABA: LOJAS ================= */}
          {activeTab === 'lojas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* FILTROS */}
              <div style={{ ...cardStyle, padding: '15px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Status Toggle */}
                <div style={{ display: 'flex', gap: '5px', background: theme.bg, padding: '4px', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
                  {['todos', 'publicados', 'ocultos'].map(status => (
                    <button key={status} onClick={() => setFiltroStatus(status)} style={{ 
                      padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', 
                      background: filtroStatus===status ? theme.card : 'transparent', 
                      color: filtroStatus===status ? theme.text : theme.textSec, 
                      fontWeight: 'bold', fontSize:'13px', textTransform: 'capitalize',
                      boxShadow: filtroStatus===status ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                    }}>
                      {status}
                    </button>
                  ))}
                </div>

                {/* VIP Toggle */}
                <button onClick={() => setFiltroVip(!filtroVip)} style={{ padding: '8px 14px', borderRadius: '8px', border: filtroVip ? '2px solid #f59e0b' : `1px solid ${theme.border}`, background: filtroVip ? '#fffbeb' : theme.card, color: filtroVip ? '#b45309' : theme.textSec, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} fill={filtroVip ? "currentColor" : "none"} /> VIPs
                </button>

                <div style={{width: '1px', height: '20px', background: theme.border}}></div>

                {/* Categorias */}
                <div style={{ display: 'flex', gap: '8px', flexWrap:'wrap' }}>
                  {TAGS_OFICIAIS.map(tag => {
                     const isSelected = filtroCategoria === tag.id;
                     return (
                       <button key={tag.id} onClick={() => setFiltroCategoria(isSelected ? null : tag.id)}
                         style={{ 
                           padding: '8px 14px', borderRadius: '20px', border: isSelected ? 'none' : `1px solid ${theme.border}`, cursor: 'pointer', 
                           background: isSelected ? tag.color : theme.card, 
                           color: isSelected ? 'white' : theme.textSec,
                           display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '13px',
                           boxShadow: isSelected ? `0 4px 10px ${tag.color}60` : 'none', transition: 'all 0.2s'
                         }}>
                         {getIconeCategoria(tag.id)} {tag.label}
                       </button>
                     )
                   })}
                </div>
              </div>

              {/* LISTA DE CARDS */}
              {loading ? <p>Carregando...</p> : locaisFiltrados.map(local => {
                 const isVisible = local.status === 'PUBLICAR_APP';
                 const isEditing = editingId === local.id;

                 return (
                    <div key={local.id} style={{ 
                      ...cardStyle, padding: '20px', 
                      borderLeft: isEditing ? `5px solid ${configForm.cor_primaria}` : (local.destaque ? '5px solid #f59e0b' : `1px solid ${theme.border}`),
                      opacity: (isVisible || isEditing) ? 1 : 0.6,
                    }}>
                      {isEditing ? (
                         /* EDIT FORM */
                         <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} style={{ ...inputStyle, fontWeight:'bold', flex:1 }} />
                              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fffbeb', padding: '0 15px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #fcd34d' }}>
                                <input type="checkbox" checked={editForm.destaque} onChange={e => setEditForm({...editForm, destaque: e.target.checked})} />
                                <span style={{fontWeight:'bold', color: '#b45309', fontSize: '12px'}}>VIP</span>
                              </label>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '10px' }}>
                              <input type="number" step="0.1" value={editForm.nota} onChange={e => setEditForm({...editForm, nota: e.target.value})} placeholder="Nota" style={inputStyle} />
                              <input type="number" value={editForm.avaliacoes} onChange={e => setEditForm({...editForm, avaliacoes: e.target.value})} placeholder="Avaliações" style={inputStyle} />
                              <input type="text" value={editForm.instagram_url} onChange={e => setEditForm({...editForm, instagram_url: e.target.value})} placeholder="Instagram URL" style={inputStyle} />
                            </div>
                            <div style={{ background: theme.bg, padding: '15px', borderRadius: '8px', border: `1px solid ${theme.border}`, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {TAGS_OFICIAIS.map(tag => {
                                const active = editForm.tags?.includes(tag.id);
                                return (
                                <div key={tag.id} onClick={() => toggleTagForm(tag.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', background: active ? tag.color : theme.card, color: active ? 'white' : theme.textSec, fontSize: '12px', fontWeight: 'bold', border: active ? 'none' : `1px solid ${theme.border}` }}>
                                  {active ? <CheckSquare size={16} /> : <Square size={16} />} {tag.label}
                                </div>
                              )})}
                            </div>
                            <div style={{display:'flex', gap:'10px'}}>
                              <button onClick={handleUpdateLocal} style={{ flex:1, padding:'12px', background:'#22c55e', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}><Save size={18}/> Salvar</button>
                              <button onClick={()=>setEditingId(null)} style={{ padding:'12px 20px', background:'#ef4444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}><X size={18}/> Cancelar</button>
                            </div>
                         </div>
                      ) : (
                         /* VIEW CARD */
                         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div>
                               <h3 style={{margin:'0 0 5px 0', color: theme.text, display:'flex', alignItems:'center', gap:'8px'}}>
                                 {local.nome}
                                 {local.destaque && <Star size={16} fill="#f59e0b" color="#f59e0b" />}
                                 {!isVisible && <span style={{fontSize:'10px', background: theme.bg, padding:'2px 6px', borderRadius:'4px', color: theme.textSec, fontWeight:'bold', border: `1px solid ${theme.border}`}}>OCULTO</span>}
                               </h3>
                               <div style={{fontSize:'12px', color: theme.textSec, marginBottom:'8px'}}>📍 {local.endereco || 'Sem endereço'}</div>
                               <div style={{ display: 'flex', gap: '6px' }}>
                                 {local.tags && local.tags.map(t => (
                                   <span key={t} style={{ fontSize: '10px', background: TAGS_OFICIAIS.find(to => to.id === t)?.color || theme.border, padding: '4px 8px', borderRadius: '6px', color: 'white', fontWeight: 'bold', display:'flex', alignItems:'center', gap:'4px' }}>
                                     {getIconeCategoria(t)} {TAGS_OFICIAIS.find(to => to.id === t)?.label || t}
                                   </span>
                                 ))}
                               </div>
                            </div>
                            <div style={{display:'flex', gap:'10px'}}>
                               <ActionButton onClick={()=>toggleStatus(local)} theme={theme} active={isVisible} colorActive="#64748b" colorInactive="#ef4444" bgInactive="#fee2e2" label={isVisible?"Ocultar":"Publicar"}>
                                 {isVisible ? <Eye size={20}/> : <EyeOff size={20}/>}
                               </ActionButton>
                               <ActionButton onClick={()=>iniciarEdicao(local)} theme={theme} active={true} colorActive={configForm.cor_primaria} bgActive={`${configForm.cor_primaria}15`} label="Editar">
                                 <Edit size={20}/>
                               </ActionButton>
                               <ActionButton onClick={()=>handleDelete(local.id)} theme={theme} active={true} colorActive="#ef4444" bgActive="#fee2e2" label="Excluir">
                                 <Trash2 size={20}/>
                               </ActionButton>
                               return (
                        <button
                          onClick={onClick}
                          title={label}
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '10px',
                            border: border,
                            background: bg,
                            color: color,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {children}
                        </button>
                      );
                            </div>
                         </div>
                      )}
                    </div>
                 )
              })}
            </div>
          )}

          {/* ================= ABA: CONFIG ================= */}
          {activeTab === 'config' && (
            <div style={{ ...cardStyle, padding: '30px' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0, color: theme.text }}>
                <Palette size={24} color={configForm.cor_primaria} /> Brand Studio
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <FormGroup label="Nome Interno" theme={theme}><input style={inputStyle} value={configForm.nome} onChange={e => setConfigForm({...configForm, nome: e.target.value})} /></FormGroup>
                  <FormGroup label="Título do App" theme={theme}><input style={inputStyle} value={configForm.titulo_pagina} onChange={e => setConfigForm({...configForm, titulo_pagina: e.target.value})} /></FormGroup>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{flex:1}}><FormGroup label="Cor Primária" theme={theme}><input type="color" value={configForm.cor_primaria} onChange={e => setConfigForm({...configForm, cor_primaria: e.target.value})} style={{width:'100%', height:'50px', cursor:'pointer', border:'none', background:'none'}} /></FormGroup></div>
                    <div style={{flex:1}}><FormGroup label="Cor Destaque" theme={theme}><input type="color" value={configForm.cor_destaque} onChange={e => setConfigForm({...configForm, cor_destaque: e.target.value})} style={{width:'100%', height:'50px', cursor:'pointer', border:'none', background:'none'}} /></FormGroup></div>
                  </div>
                  <FormGroup label="Logo URL" theme={theme}><input style={inputStyle} placeholder="https://..." value={configForm.logo_url} onChange={e => setConfigForm({...configForm, logo_url: e.target.value})} /></FormGroup>
                  <FormGroup label="Tema Base" theme={theme}>
                    <div style={{ display: 'flex', gap:'10px' }}>
                       <button onClick={() => setConfigForm({...configForm, tema_base: 'light'})} style={{flex:1, padding:'15px', border: configForm.tema_base==='light'?'2px solid #2563eb':`1px solid ${theme.border}`, borderRadius:'8px', background: '#f8fafc', color:'#1e293b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', fontWeight:'bold'}}>
                          <Sun size={20}/> Light
                       </button>
                       <button onClick={() => setConfigForm({...configForm, tema_base: 'dark'})} style={{flex:1, padding:'15px', border: configForm.tema_base==='dark'?'2px solid #2563eb':`1px solid ${theme.border}`, borderRadius:'8px', background:'#0f172a', color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', fontWeight:'bold'}}>
                          <Moon size={20}/> Dark
                       </button>
                    </div>
                  </FormGroup>
                  <button onClick={handleSaveConfig} style={{ marginTop: '10px', padding: '15px', background: theme.text, color: theme.bg, border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Save size={20} /> Salvar Tudo
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// --- COMPONENTES AUXILIARES PARA LIMPEZA ---
function MenuButton({ active, onClick, theme, icon, children }) {
  return <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: active ? theme.hover : 'transparent', border: 'none', borderRadius: '8px', color: active ? theme.text : theme.textSec, fontWeight: active ? 'bold' : 'normal', cursor: 'pointer', textAlign: 'left', width: '100%' }}>{icon} {children}</button>
}
function ActionButton({ onClick, theme, active, colorActive, bgActive, colorInactive, bgInactive, label, children }) {
  const bg = active ? (bgActive || 'transparent') : (bgInactive || 'transparent');
  const color = active ? (colorActive || theme.textSec) : (colorInactive || theme.textSec);
  const border = active ? (bgActive ? 'none' : `1px solid ${theme.border}`) : 'none';
  return <button onClick={onClick} title={label} style={{ width:'40px', height:'40px', borderRadius:'8px', border: border, background: bg, color: color, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{children}</button>
}
function FormGroup({ label, theme, children }) {
  return <div style={{display:'flex', flexDirection:'column', gap:'8px'}}><label style={{fontSize:'13px', fontWeight:'bold', color: theme.textSec}}>{label}</label>{children}</div>
}