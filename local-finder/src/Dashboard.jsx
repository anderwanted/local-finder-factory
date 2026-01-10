import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Filter, Star, ExternalLink, 
  Settings, Layout, Palette, Store, Sun, Moon, CheckSquare, Square
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  // --- NAVEGAÇÃO ENTRE ABAS ---
  const [activeTab, setActiveTab] = useState('lojas'); // 'lojas' ou 'config'
  
  // --- DADOS ---
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE EDIÇÃO E FILTRO (GESTÃO) ---
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  const [filtroStatus, setFiltroStatus] = useState('todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [filtroVip, setFiltroVip] = useState(false);

  // --- ESTADOS DO BRAND STUDIO (CONFIG) ---
  const [configForm, setConfigForm] = useState({
    nome: projeto?.nome || '',
    titulo_pagina: projeto?.titulo_pagina || '',
    cor_primaria: projeto?.cor_primaria || '#2563eb',
    cor_destaque: projeto?.cor_destaque || '#f59e0b',
    slug: projeto?.slug || '',
    logo_url: projeto?.logo_url || '',
    estilo_borda: projeto?.estilo_borda || 'redondo',
    tema_base: projeto?.tema_base || 'light'
  });

  // TAGS FIXAS PARA CHECKBOX
  const TAGS_OFICIAIS = [
    { id: 'banho', label: 'Banho', color: '#3b82f6' },
    { id: 'vet',   label: 'Vet',   color: '#10b981' },
    { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
    { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
  ];

  useEffect(() => {
    if (projeto?.id) fetchLocais();
  }, [projeto]);

  async function fetchLocais() {
    setLoading(true);
    const { data, error } = await supabase
      .from('locais')
      .select('*')
      .eq('projeto_id', projeto.id)
      .order('created_at', { ascending: false });
    
    if (error) console.error("Erro ao buscar:", error);
    else setLocais(data || []);
    
    setLoading(false);
  }

  // --- SALVAR CONFIGURAÇÕES ---
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

    if (error) alert('Erro ao salvar config!');
    else {
      alert('Configurações salvas! Recarregando...');
      window.location.reload();
    }
  }

  // --- AÇÕES DE LOJA (CRUD) ---
  async function toggleStatus(local) {
    const novoStatus = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    const { error } = await supabase.from('locais').update({ status: novoStatus }).eq('id', local.id);
    if (!error) {
      // Atualiza localmente para ser rápido
      setLocais(locais.map(l => l.id === local.id ? { ...l, status: novoStatus } : l));
    }
  }

  async function handleUpdateLocal() {
    const { error } = await supabase.from('locais').update({
        nome: editForm.nome,
        nota: editForm.nota,
        avaliacoes: editForm.avaliacoes,
        instagram_url: editForm.instagram_url,
        destaque: editForm.destaque,
        tags: editForm.tags 
      }).eq('id', editingId);

    if (error) alert('Erro ao atualizar!');
    else {
      setEditingId(null);
      fetchLocais();
    }
  }

  async function handleDelete(id) {
    if(!window.confirm("Tem certeza absoluta?")) return;
    const { error } = await supabase.from('locais').delete().eq('id', id);
    if (!error) fetchLocais();
  }

  const toggleTagForm = (tagId) => {
    const tagsAtuais = editForm.tags || [];
    if (tagsAtuais.includes(tagId)) setEditForm({ ...editForm, tags: tagsAtuais.filter(t => t !== tagId) });
    else setEditForm({ ...editForm, tags: [...tagsAtuais, tagId] });
  };

  const iniciarEdicao = (local) => {
    setEditingId(local.id);
    setEditForm({ ...local, tags: local.tags || [] }); 
  };

  // --- FILTROS ---
  const locaisFiltrados = locais.filter(local => {
    if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') return false;
    if (filtroVip && !local.destaque) return false;
    if (filtroCategoria && !local.tags?.includes(filtroCategoria)) return false;
    return true;
  });

  // Variaveis visuais
  const isDark = configForm.tema_base === 'dark';
  const radiusPreview = configForm.estilo_borda === 'quadrado' ? '0px' : (configForm.estilo_borda === 'pilula' ? '20px' : '8px');

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <div style={{ width:'40px', height:'40px', borderRadius:'8px', background: projeto.cor_primaria, display:'flex', alignItems:'center', justifyContent:'center', color:'white', overflow:'hidden' }}>
             {projeto.logo_url ? <img src={projeto.logo_url} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <Store size={20} />}
           </div>
           <h1 style={{ margin: 0, fontSize: '1.2rem' }}>Painel: {projeto.nome}</h1>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '8px 16px', cursor: 'pointer', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', fontWeight:'bold', color: '#64748b', display:'flex', alignItems:'center', gap:'8px' }}>
           <ExternalLink size={16} /> Ver App
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', alignItems: 'flex-start' }}>
        
        {/* MENU LATERAL */}
        <aside style={{ width: '220px', background: 'white', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <button onClick={() => setActiveTab('lojas')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: activeTab === 'lojas' ? '#f1f5f9' : 'transparent', border: 'none', borderRadius: '8px', color: activeTab ? '#0f172a' : '#64748b', fontWeight: activeTab==='lojas'?'bold':'normal', cursor: 'pointer', textAlign: 'left' }}>
            <Layout size={18} /> Gestão de Lojas
          </button>
          <button onClick={() => setActiveTab('config')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: activeTab === 'config' ? '#f1f5f9' : 'transparent', border: 'none', borderRadius: '8px', color: activeTab ? '#0f172a' : '#64748b', fontWeight: activeTab==='config'?'bold':'normal', cursor: 'pointer', textAlign: 'left' }}>
            <Palette size={18} /> Aparência (App)
          </button>
        </aside>

        <main style={{ flex: 1 }}>
          
          {/* ================= ABA: LOJAS (CRUD) ================= */}
          {activeTab === 'lojas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Filtros */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems:'center' }}>
                <div style={{ background: 'white', padding: '4px', borderRadius: '8px', display: 'flex', gap: '4px', border:'1px solid #e2e8f0' }}>
                  <button onClick={() => setFiltroStatus('todos')} style={{ padding:'6px 12px', background: filtroStatus === 'todos' ? '#e2e8f0' : 'transparent', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'bold', fontSize:'13px' }}>Todos</button>
                  <button onClick={() => setFiltroStatus('publicados')} style={{ padding:'6px 12px', background: filtroStatus === 'publicados' ? '#dcfce7' : 'transparent', color: filtroStatus === 'publicados' ? '#166534' : 'inherit', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'bold', fontSize:'13px' }}>No Ar</button>
                  <button onClick={() => setFiltroStatus('ocultos')} style={{ padding:'6px 12px', background: filtroStatus === 'ocultos' ? '#fee2e2' : 'transparent', color: filtroStatus === 'ocultos' ? '#991b1b' : 'inherit', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'bold', fontSize:'13px' }}>Ocultos</button>
                </div>
                
                <button onClick={() => setFiltroVip(!filtroVip)} style={{ padding: '8px 16px', borderRadius: '8px', border: filtroVip ? '2px solid #f59e0b' : '1px solid #e2e8f0', background: filtroVip ? '#fffbeb' : 'white', color: filtroVip ? '#b45309' : '#64748b', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} fill={filtroVip ? "currentColor" : "none"} /> VIPs
                </button>
              </div>

              {/* LISTA */}
              {loading ? <p>Carregando...</p> : locaisFiltrados.map(local => {
                 const isVisible = local.status === 'PUBLICAR_APP';
                 const isEditing = editingId === local.id;

                 return (
                    <div key={local.id} style={{ 
                      padding: '20px', background: 'white', borderRadius: '10px', 
                      borderLeft: isEditing ? `4px solid ${projeto.cor_primaria}` : (local.destaque ? '4px solid #f59e0b' : '1px solid #e2e8f0'),
                      opacity: (isVisible || isEditing) ? 1 : 0.6,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '10px'
                    }}>
                      
                      {isEditing ? (
                         // --- MODO EDIÇÃO ---
                         <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} style={{ flex:1, padding:'10px', border:'1px solid #ccc', borderRadius:'6px', fontWeight:'bold' }} />
                              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fffbeb', padding: '10px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #fcd34d' }}>
                                <input type="checkbox" checked={editForm.destaque} onChange={e => setEditForm({...editForm, destaque: e.target.checked})} />
                                <span style={{fontWeight:'bold', color: '#b45309', fontSize: '12px'}}>VIP</span>
                              </label>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '10px' }}>
                              <input type="number" step="0.1" value={editForm.nota} onChange={e => setEditForm({...editForm, nota: e.target.value})} placeholder="Nota" style={{padding:'8px', border:'1px solid #ccc', borderRadius:'6px'}} />
                              <input type="number" value={editForm.avaliacoes} onChange={e => setEditForm({...editForm, avaliacoes: e.target.value})} placeholder="Avaliações" style={{padding:'8px', border:'1px solid #ccc', borderRadius:'6px'}} />
                              <input type="text" value={editForm.instagram_url} onChange={e => setEditForm({...editForm, instagram_url: e.target.value})} placeholder="Instagram URL" style={{padding:'8px', border:'1px solid #ccc', borderRadius:'6px'}} />
                            </div>

                            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {TAGS_OFICIAIS.map(tag => (
                                <div key={tag.id} onClick={() => toggleTagForm(tag.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 10px', borderRadius: '15px', background: editForm.tags?.includes(tag.id) ? tag.color : 'white', color: editForm.tags?.includes(tag.id) ? 'white' : '#64748b', fontSize: '12px', fontWeight: 'bold', border: editForm.tags?.includes(tag.id) ? 'none' : '1px solid #cbd5e1' }}>
                                  {editForm.tags?.includes(tag.id) ? <CheckSquare size={14} /> : <Square size={14} />} {tag.label}
                                </div>
                              ))}
                            </div>

                            <div style={{display:'flex', gap:'10px'}}>
                              <button onClick={handleUpdateLocal} style={{flex:1, padding:'10px', background:'#22c55e', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}}><Save size={16}/> Salvar</button>
                              <button onClick={()=>setEditingId(null)} style={{padding:'10px 20px', background:'#ef4444', color:'white', border:'none', borderRadius:'6px', cursor:'pointer'}}>Cancelar</button>
                            </div>
                         </div>
                      ) : (
                         // --- MODO VISUALIZAÇÃO (BOTÕES AQUI) ---
                         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div>
                               <h3 style={{margin:'0 0 5px 0', color:'#1e293b', display:'flex', alignItems:'center', gap:'8px'}}>
                                 {local.nome}
                                 {local.destaque && <span style={{fontSize:'10px', background:'#fcd34d', padding:'2px 5px', borderRadius:'4px', color:'#78350f'}}>VIP</span>}
                                 {!isVisible && <span style={{fontSize:'10px', background:'#e2e8f0', padding:'2px 5px', borderRadius:'4px', color:'#64748b', fontWeight:'bold'}}>OCULTO</span>}
                               </h3>
                               <div style={{fontSize:'12px', color:'#64748b', marginBottom:'8px'}}>📍 {local.endereco}</div>
                               <div style={{ display: 'flex', gap: '5px' }}>
                                 {local.tags && local.tags.map(t => (
                                   <span key={t} style={{ fontSize: '10px', background: TAGS_OFICIAIS.find(to => to.id === t)?.color || '#cbd5e1', padding: '2px 8px', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>
                                     {TAGS_OFICIAIS.find(to => to.id === t)?.label || t}
                                   </span>
                                 ))}
                               </div>
                            </div>
                            
                            {/* --- BOTÕES DE AÇÃO (VOLTARAM!) --- */}
                            <div style={{display:'flex', gap:'8px'}}>
                               <button 
                                 onClick={()=>toggleStatus(local)} 
                                 title={isVisible ? "Ocultar" : "Publicar"}
                                 style={{ width:'36px', height:'36px', borderRadius:'8px', border:'1px solid #e2e8f0', background: isVisible ? 'transparent' : '#fee2e2', color: isVisible ? '#64748b' : '#991b1b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                               >
                                 {isVisible ? <Eye size={18}/> : <EyeOff size={18}/>}
                               </button>

                               <button 
                                 onClick={()=>iniciarEdicao(local)} 
                                 title="Editar"
                                 style={{ width:'36px', height:'36px', borderRadius:'8px', border:`1px solid ${projeto.cor_primaria}40`, background:`${projeto.cor_primaria}10`, color: projeto.cor_primaria, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                               >
                                 <Edit size={18}/>
                               </button>

                               <button 
                                 onClick={()=>handleDelete(local.id)} 
                                 title="Excluir"
                                 style={{ width:'36px', height:'36px', borderRadius:'8px', border:'1px solid #fca5a5', background:'#fef2f2', color:'#ef4444', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                               >
                                 <Trash2 size={18}/>
                               </button>
                            </div>
                         </div>
                      )}
                    </div>
                 )
              })}
            </div>
          )}

          {/* ================= ABA: CONFIG (BRAND STUDIO) ================= */}
          {activeTab === 'config' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0, color: '#1e293b' }}>
                <Palette size={24} color={projeto.cor_primaria} /> Brand Studio
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Nome Interno</label>
                    <input className="input-field" value={configForm.nome} onChange={e => setConfigForm({...configForm, nome: e.target.value})} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Título do App</label>
                    <input className="input-field" value={configForm.titulo_pagina} onChange={e => setConfigForm({...configForm, titulo_pagina: e.target.value})} />
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{flex:1}}>
                       <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Cor Primária</label>
                       <input type="color" value={configForm.cor_primaria} onChange={e => setConfigForm({...configForm, cor_primaria: e.target.value})} style={{width:'100%', height:'40px', cursor:'pointer', marginTop:'5px'}} />
                    </div>
                    <div style={{flex:1}}>
                       <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Cor Destaque</label>
                       <input type="color" value={configForm.cor_destaque} onChange={e => setConfigForm({...configForm, cor_destaque: e.target.value})} style={{width:'100%', height:'40px', cursor:'pointer', marginTop:'5px'}} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Logo URL</label>
                    <input className="input-field" placeholder="https://..." value={configForm.logo_url} onChange={e => setConfigForm({...configForm, logo_url: e.target.value})} />
                  </div>

                  <div style={{ display: 'flex', gap:'10px' }}>
                     <button onClick={() => setConfigForm({...configForm, tema_base: 'light'})} style={{flex:1, padding:'10px', border: configForm.tema_base==='light'?'2px solid blue':'1px solid #ccc', borderRadius:'8px', background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}}>
                        <Sun size={16}/> Claro
                     </button>
                     <button onClick={() => setConfigForm({...configForm, tema_base: 'dark'})} style={{flex:1, padding:'10px', border: configForm.tema_base==='dark'?'2px solid blue':'1px solid #ccc', borderRadius:'8px', background:'#1e293b', color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}}>
                        <Moon size={16}/> Escuro
                     </button>
                  </div>

                  <button onClick={handleSaveConfig} style={{ marginTop: '10px', padding: '15px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Save size={20} /> Salvar Tudo
                  </button>
                </div>

                {/* Preview Simples */}
                <div style={{ background: isDark ? '#0f172a' : '#f1f5f9', padding: '20px', borderRadius: '12px', border:'1px solid #e2e8f0' }}>
                  <h4 style={{marginTop:0, color: isDark ? 'white' : 'black'}}>Preview</h4>
                  <div style={{ background: isDark ? '#1e293b' : 'white', padding: '20px', borderRadius: '12px', boxShadow:'0 4px 6px rgba(0,0,0,0.1)' }}>
                     <button style={{ width:'100%', padding:'12px', background: configForm.cor_primaria, color:'white', border:'none', borderRadius: radiusPreview, fontWeight:'bold' }}>Botão Principal</button>
                     <div style={{marginTop:'10px', fontSize:'12px', color: isDark ? '#94a3b8' : '#64748b'}}>Texto secundário de exemplo...</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      <style>{`.input-field { width: 100%; padding: 10px; border: 1px solid #cbd5e1; borderRadius: 8px; fontSize: 14px; }`}</style>
    </div>
  );
}