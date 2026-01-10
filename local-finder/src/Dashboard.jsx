import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Filter, Star, ExternalLink, 
  Settings, Layout, Palette, Store, Sun, Moon, CheckSquare, Square, X,
  Scissors, Stethoscope, ShoppingBag, Home // Ícones de Categoria
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  // --- NAVEGAÇÃO ---
  const [activeTab, setActiveTab] = useState('lojas'); // 'lojas' | 'config'
  
  // --- DADOS ---
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE EDIÇÃO (GESTÃO) ---
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // --- FILTROS ---
  const [filtroStatus, setFiltroStatus] = useState('todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [filtroVip, setFiltroVip] = useState(false);

  // --- CONFIGURAÇÕES (BRAND STUDIO) ---
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

  // --- DEFINIÇÃO DAS TAGS ---
  const TAGS_OFICIAIS = [
    { id: 'banho', label: 'Banho', color: '#3b82f6' },
    { id: 'vet',   label: 'Vet',   color: '#10b981' },
    { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
    { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
  ];

  // --- FUNÇÃO PARA ÍCONES SÓLIDOS E EXPRESSIVOS ---
  const getIconeCategoria = (id, isSelected = false) => {
    // Se selecionado (no filtro), fica Branco. Se não, usa a cor da tag.
    const cor = isSelected ? 'white' : TAGS_OFICIAIS.find(t => t.id === id)?.color || '#64748b';
    
    // Configuração para ícone "cheio"
    const props = { 
      size: 18, 
      color: cor,           // Cor da borda
      fill: cor,            // Cor do miolo
      fillOpacity: isSelected ? 1 : 0.2, // Se selecionado, totalmente sólido. Se não, levemente transparente.
      strokeWidth: 2.5      // Traço grosso
    };

    switch(id) {
      case 'banho': return <Scissors {...props} />;
      case 'vet':   return <Stethoscope {...props} />;
      case 'loja':  return <ShoppingBag {...props} fillOpacity={isSelected ? 1 : 0.4} />; 
      case 'hotel': return <Home {...props} />;
      default:      return <Store {...props} />;
    }
  };

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

    if (!error) setLocais(data || []);
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

    if (error) alert('Erro ao salvar!');
    else {
      alert('Configurações salvas! Recarregando página...');
      window.location.reload();
    }
  }

  // --- CRUD LOJAS ---
  async function toggleStatus(local) {
    const novoStatus = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    const { error } = await supabase.from('locais').update({ status: novoStatus }).eq('id', local.id);
    if (!error) setLocais(locais.map(l => l.id === local.id ? { ...l, status: novoStatus } : l));
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

    if (!error) {
      setEditingId(null);
      fetchLocais();
    } else {
      alert('Erro ao atualizar');
    }
  }

  async function handleDelete(id) {
    if(!window.confirm("Tem certeza que deseja apagar?")) return;
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

  // --- FILTRAGEM ---
  const locaisFiltrados = locais.filter(local => {
    if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') return false;
    if (filtroVip && !local.destaque) return false;
    if (filtroCategoria && !local.tags?.includes(filtroCategoria)) return false;
    return true;
  });

  // Estilos Auxiliares
  const btnSidebar = { padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', textAlign: 'left', width: '100%' };
  const inputStyle = { width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh', color: '#334155' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <div style={{ width:'50px', height:'50px', borderRadius:'12px', background: projeto.cor_primaria, display:'flex', alignItems:'center', justifyContent:'center', color:'white', overflow:'hidden' }}>
             {projeto.logo_url ? <img src={projeto.logo_url} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <Store size={24} />}
           </div>
           <div>
             <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>{projeto.nome}</h1>
             <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Painel Administrativo v3.2</p>
           </div>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '10px 20px', cursor: 'pointer', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight:'bold', color: '#475569', display:'flex', alignItems:'center', gap:'8px' }}>
           <ExternalLink size={16} /> Ver App
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', alignItems: 'flex-start' }}>
        
        {/* SIDEBAR */}
        <aside style={{ width: '250px', background: 'white', borderRadius: '12px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <button onClick={() => setActiveTab('lojas')} style={{ ...btnSidebar, background: activeTab === 'lojas' ? '#f1f5f9' : 'transparent', color: activeTab === 'lojas' ? '#0f172a' : '#64748b', fontWeight: activeTab==='lojas'?'bold':'normal' }}>
            <Layout size={18} /> Gestão de Lojas
          </button>
          <button onClick={() => setActiveTab('config')} style={{ ...btnSidebar, background: activeTab === 'config' ? '#f1f5f9' : 'transparent', color: activeTab === 'config' ? '#0f172a' : '#64748b', fontWeight: activeTab==='config'?'bold':'normal' }}>
            <Palette size={18} /> Aparência (App)
          </button>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <main style={{ flex: 1 }}>
          
          {/* ================= ABA: LOJAS ================= */}
          {activeTab === 'lojas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* BARRA DE FILTROS */}
              <div style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                
                {/* Status */}
                <div style={{ display: 'flex', gap: '5px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                  <button onClick={() => setFiltroStatus('todos')} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: filtroStatus==='todos'?'white':'transparent', fontWeight: 'bold', fontSize:'13px' }}>Todos</button>
                  <button onClick={() => setFiltroStatus('publicados')} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: filtroStatus==='publicados'?'white':'transparent', color: '#166534', fontWeight: 'bold', fontSize:'13px' }}>No Ar</button>
                  <button onClick={() => setFiltroStatus('ocultos')} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: filtroStatus==='ocultos'?'white':'transparent', color: '#991b1b', fontWeight: 'bold', fontSize:'13px' }}>Ocultos</button>
                </div>

                {/* VIP */}
                <button onClick={() => setFiltroVip(!filtroVip)} style={{ padding: '8px 14px', borderRadius: '8px', border: filtroVip ? '2px solid #f59e0b' : '1px solid #e2e8f0', background: filtroVip ? '#fffbeb' : 'white', color: filtroVip ? '#b45309' : '#64748b', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} fill={filtroVip ? "currentColor" : "none"} /> VIPs
                </button>

                <div style={{width: '1px', height: '20px', background: '#e2e8f0'}}></div>

                {/* Categorias (Ícones Sólidos) */}
                <div style={{ display: 'flex', gap: '8px', flexWrap:'wrap' }}>
                  {TAGS_OFICIAIS.map(tag => {
                     const isSelected = filtroCategoria === tag.id;
                     return (
                       <button 
                         key={tag.id} 
                         onClick={() => setFiltroCategoria(isSelected ? null : tag.id)}
                         style={{ 
                           padding: '8px 14px', borderRadius: '20px', border: isSelected ? 'none' : '1px solid #e2e8f0', cursor: 'pointer', 
                           background: isSelected ? tag.color : 'white', 
                           color: isSelected ? 'white' : '#64748b',
                           display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '13px',
                           boxShadow: isSelected ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s'
                         }}>
                         {getIconeCategoria(tag.id, isSelected)}
                         {tag.label}
                       </button>
                     )
                   })}
                </div>
              </div>

              {/* LISTAGEM DE LOCAIS */}
              {loading ? <p>Carregando...</p> : locaisFiltrados.map(local => {
                 const isVisible = local.status === 'PUBLICAR_APP';
                 const isEditing = editingId === local.id;

                 return (
                    <div key={local.id} style={{ 
                      padding: '20px', background: 'white', borderRadius: '12px', 
                      borderLeft: isEditing ? `5px solid ${projeto.cor_primaria}` : (local.destaque ? '5px solid #f59e0b' : '1px solid #e2e8f0'),
                      opacity: (isVisible || isEditing) ? 1 : 0.6,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      
                      {isEditing ? (
                         /* --- MODO EDIÇÃO --- */
                         <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} style={{ ...inputStyle, fontWeight:'bold' }} />
                              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fffbeb', padding: '0 15px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #fcd34d' }}>
                                <input type="checkbox" checked={editForm.destaque} onChange={e => setEditForm({...editForm, destaque: e.target.checked})} />
                                <span style={{fontWeight:'bold', color: '#b45309', fontSize: '12px'}}>VIP</span>
                              </label>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '10px' }}>
                              <input type="number" step="0.1" value={editForm.nota} onChange={e => setEditForm({...editForm, nota: e.target.value})} placeholder="Nota" style={inputStyle} />
                              <input type="number" value={editForm.avaliacoes} onChange={e => setEditForm({...editForm, avaliacoes: e.target.value})} placeholder="Avaliações" style={inputStyle} />
                              <input type="text" value={editForm.instagram_url} onChange={e => setEditForm({...editForm, instagram_url: e.target.value})} placeholder="Instagram URL" style={inputStyle} />
                            </div>

                            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {TAGS_OFICIAIS.map(tag => (
                                <div key={tag.id} onClick={() => toggleTagForm(tag.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', background: editForm.tags?.includes(tag.id) ? tag.color : 'white', color: editForm.tags?.includes(tag.id) ? 'white' : '#64748b', fontSize: '12px', fontWeight: 'bold', border: editForm.tags?.includes(tag.id) ? 'none' : '1px solid #cbd5e1' }}>
                                  {editForm.tags?.includes(tag.id) ? <CheckSquare size={16} /> : <Square size={16} />} {tag.label}
                                </div>
                              ))}
                            </div>

                            <div style={{display:'flex', gap:'10px'}}>
                              <button onClick={handleUpdateLocal} style={{ flex:1, padding:'12px', background:'#22c55e', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                                <Save size={18}/> Salvar
                              </button>
                              <button onClick={()=>setEditingId(null)} style={{ padding:'12px 20px', background:'#ef4444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                                <X size={18}/> Cancelar
                              </button>
                            </div>
                         </div>
                      ) : (
                         /* --- MODO VISUALIZAÇÃO --- */
                         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div>
                               <h3 style={{margin:'0 0 5px 0', color:'#1e293b', display:'flex', alignItems:'center', gap:'8px'}}>
                                 {local.nome}
                                 {local.destaque && <Star size={14} fill="#f59e0b" color="#f59e0b" />}
                                 {!isVisible && <span style={{fontSize:'10px', background:'#e2e8f0', padding:'2px 6px', borderRadius:'4px', color:'#64748b', fontWeight:'bold'}}>OCULTO</span>}
                               </h3>
                               <div style={{fontSize:'12px', color:'#64748b', marginBottom:'8px'}}>📍 {local.endereco || 'Sem endereço'}</div>
                               
                               {/* Tags Labels */}
                               <div style={{ display: 'flex', gap: '5px' }}>
                                 {local.tags && local.tags.map(t => (
                                   <span key={t} style={{ fontSize: '10px', background: TAGS_OFICIAIS.find(to => to.id === t)?.color || '#cbd5e1', padding: '2px 8px', borderRadius: '10px', color: 'white', fontWeight: 'bold', display:'flex', alignItems:'center', gap:'4px' }}>
                                     {getIconeCategoria(t, true)} {/* true aqui garante o icone branco */}
                                     {TAGS_OFICIAIS.find(to => to.id === t)?.label || t}
                                   </span>
                                 ))}
                               </div>
                            </div>
                            
                            {/* --- BOTÕES DE AÇÃO --- */}
                            <div style={{display:'flex', gap:'8px'}}>
                               <button 
                                 onClick={()=>toggleStatus(local)} 
                                 title={isVisible ? "Ocultar" : "Publicar"}
                                 style={{ width:'40px', height:'40px', borderRadius:'8px', border:'1px solid #e2e8f0', background: isVisible ? 'white' : '#fee2e2', color: isVisible ? '#64748b' : '#991b1b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                               >
                                 {isVisible ? <Eye size={20}/> : <EyeOff size={20}/>}
                               </button>

                               <button 
                                 onClick={()=>iniciarEdicao(local)} 
                                 title="Editar"
                                 style={{ width:'40px', height:'40px', borderRadius:'8px', border:'none', background:'#eff6ff', color: '#2563eb', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                               >
                                 <Edit size={20}/>
                               </button>

                               <button 
                                 onClick={()=>handleDelete(local.id)} 
                                 title="Excluir"
                                 style={{ width:'40px', height:'40px', borderRadius:'8px', border:'none', background:'#fef2f2', color:'#ef4444', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                               >
                                 <Trash2 size={20}/>
                               </button>
                            </div>
                         </div>
                      )}
                    </div>
                 )
              })}
            </div>
          )}

          {/* ================= ABA: CONFIGURAÇÕES ================= */}
          {activeTab === 'config' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0, color: '#1e293b' }}>
                <Palette size={24} color={projeto.cor_primaria} /> Brand Studio
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Nome Interno</label>
                    <input style={inputStyle} value={configForm.nome} onChange={e => setConfigForm({...configForm, nome: e.target.value})} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Título do App</label>
                    <input style={inputStyle} value={configForm.titulo_pagina} onChange={e => setConfigForm({...configForm, titulo_pagina: e.target.value})} />
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{flex:1}}>
                       <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Cor Primária</label>
                       <input type="color" value={configForm.cor_primaria} onChange={e => setConfigForm({...configForm, cor_primaria: e.target.value})} style={{width:'100%', height:'40px', cursor:'pointer', marginTop:'5px', border:'none', background:'none'}} />
                    </div>
                    <div style={{flex:1}}>
                       <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Cor Destaque</label>
                       <input type="color" value={configForm.cor_destaque} onChange={e => setConfigForm({...configForm, cor_destaque: e.target.value})} style={{width:'100%', height:'40px', cursor:'pointer', marginTop:'5px', border:'none', background:'none'}} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{fontSize:'13px', fontWeight:'bold', color:'#64748b'}}>Logo URL</label>
                    <input style={inputStyle} placeholder="https://..." value={configForm.logo_url} onChange={e => setConfigForm({...configForm, logo_url: e.target.value})} />
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
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}