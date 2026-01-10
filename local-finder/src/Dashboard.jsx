import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Filter, Star, ExternalLink, 
  Settings, Layout, Palette, Store, Sun, Moon, CheckSquare, Square
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  // --- ESTADOS DE NAVEGAÇÃO ---
  const [activeTab, setActiveTab] = useState('lojas'); // 'lojas' | 'config'
  const [loading, setLoading] = useState(true);
  const [locais, setLocais] = useState([]);

  // --- ESTADOS DO PAINEL DE LOJAS (Gestão) ---
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filtroStatus, setFiltroStatus] = useState('todos'); // 'todos', 'publicados', 'ocultos'
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [filtroVip, setFiltroVip] = useState(false);

  // --- ESTADOS DO BRAND STUDIO (Config) ---
  const [configForm, setConfigForm] = useState({
    nome: projeto.nome,
    titulo_pagina: projeto.titulo_pagina,
    cor_primaria: projeto.cor_primaria,
    cor_destaque: projeto.cor_destaque,
    slug: projeto.slug,
    logo_url: projeto.logo_url || '',
    estilo_borda: projeto.estilo_borda || 'redondo',
    tema_base: projeto.tema_base || 'light'
  });

  // TAGS OFICIAIS (Para os checkboxes)
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
    const { data } = await supabase
      .from('locais')
      .select('*')
      .eq('projeto_id', projeto.id)
      .order('created_at', { ascending: false });
    
    setLocais(data || []);
    setLoading(false);
  }

  // --- AÇÃO: SALVAR CONFIGURAÇÕES (Brand Studio) ---
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

    if (error) {
      alert('Erro ao salvar configurações!');
    } else {
      alert('Configurações salvas! A página será recarregada.');
      window.location.reload();
    }
  }

  // --- AÇÕES: GESTÃO DE LOJAS (CRUD Completo) ---
  async function toggleStatus(local) {
    const novoStatus = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    const { error } = await supabase.from('locais').update({ status: novoStatus }).eq('id', local.id);
    if (!error) {
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

    if (error) {
      alert('Erro ao atualizar!');
    } else {
      setEditingId(null);
      fetchLocais();
    }
  }

  async function handleDelete(id) {
    if(!window.confirm("Tem certeza que deseja apagar este local permanentemente?")) return;
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

  // --- FILTROS DA LISTA ---
  const locaisFiltrados = locais.filter(local => {
    if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') return false;
    if (filtroVip && !local.destaque) return false;
    if (filtroCategoria && !local.tags?.includes(filtroCategoria)) return false;
    return true;
  });

  // Variáveis para Preview Visual
  const isDark = configForm.tema_base === 'dark';
  const bgPreview = isDark ? '#0f172a' : '#f8fafc';
  const cardPreview = isDark ? '#1e293b' : 'white';
  const textPreview = isDark ? '#f1f5f9' : '#1e293b';
  const radiusPreview = configForm.estilo_borda === 'quadrado' ? '0px' : (configForm.estilo_borda === 'pilula' ? '25px' : '12px');

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* --- HEADER --- */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background:'white', padding:'20px', borderRadius:'16px', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <div style={{ width:'50px', height:'50px', borderRadius:'12px', background: projeto.cor_primaria, display:'flex', alignItems:'center', justifyContent:'center', color:'white', overflow:'hidden' }}>
             {projeto.logo_url ? <img src={projeto.logo_url} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <Store size={24} />}
           </div>
           <div>
             <h1 style={{ color: '#1e293b', margin: 0, fontSize: '1.5rem' }}>{projeto.nome}</h1>
             <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748b' }}>Painel Administrativo v3.1</p>
           </div>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '10px 20px', cursor: 'pointer', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight:'bold', color: '#475569', display:'flex', alignItems:'center', gap:'8px' }}>
           <ExternalLink size={16} /> Ver App
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', alignItems: 'flex-start' }}>
        
        {/* --- SIDEBAR MENU --- */}
        <aside style={{ width: '250px', background: 'white', borderRadius: '16px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '5px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <MenuButton active={activeTab === 'lojas'} onClick={() => setActiveTab('lojas')} icon={<Layout size={18} />}>Gestão de Lojas</MenuButton>
          <MenuButton active={activeTab === 'config'} onClick={() => setActiveTab('config')} icon={<Palette size={18} />}>Brand Studio</MenuButton>
        </aside>

        {/* --- ÁREA DE CONTEÚDO --- */}
        <main style={{ flex: 1 }}>
          
          {/* ================= ABA: BRAND STUDIO (CONFIG) ================= */}
          {activeTab === 'config' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0, color: '#1e293b' }}>
                <Palette size={24} color={projeto.cor_primaria} /> Brand Studio
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Formulário */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <FormGroup label="Nome do Projeto (Interno)">
                    <input className="input-field" value={configForm.nome} onChange={e => setConfigForm({...configForm, nome: e.target.value})} />
                  </FormGroup>
                  <FormGroup label="Título na Home do App">
                    <input className="input-field" value={configForm.titulo_pagina} onChange={e => setConfigForm({...configForm, titulo_pagina: e.target.value})} />
                  </FormGroup>
                  <FormGroup label="Logo URL (Opcional)">
                    <div style={{display:'flex', gap:'10px'}}>
                      <input className="input-field" placeholder="https://..." value={configForm.logo_url} onChange={e => setConfigForm({...configForm, logo_url: e.target.value})} />
                      <div style={{width:'40px', height:'40px', background:'#eee', borderRadius:'8px', overflow:'hidden', flexShrink:0}}>
                        {configForm.logo_url && <img src={configForm.logo_url} style={{width:'100%', height:'100%', objectFit:'contain'}} />}
                      </div>
                    </div>
                  </FormGroup>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <FormGroup label="Cor Primária">
                      <input type="color" value={configForm.cor_primaria} onChange={e => setConfigForm({...configForm, cor_primaria: e.target.value})} style={{width:'100%', height:'40px', cursor:'pointer'}} />
                    </FormGroup>
                    <FormGroup label="Cor Destaque">
                      <input type="color" value={configForm.cor_destaque} onChange={e => setConfigForm({...configForm, cor_destaque: e.target.value})} style={{width:'100%', height:'40px', cursor:'pointer'}} />
                    </FormGroup>
                  </div>
                  <FormGroup label="Estilo dos Botões">
                    <select className="input-field" value={configForm.estilo_borda} onChange={e => setConfigForm({...configForm, estilo_borda: e.target.value})}>
                      <option value="redondo">Padrão (Redondo)</option>
                      <option value="quadrado">Quadrado (Sério)</option>
                      <option value="pilula">Pílula (Moderno)</option>
                    </select>
                  </FormGroup>
                  <FormGroup label="Tema do App">
                    <div style={{display:'flex', gap:'10px'}}>
                      <button onClick={() => setConfigForm({...configForm, tema_base: 'light'})} style={{flex:1, padding:'10px', border: configForm.tema_base==='light'?'2px solid blue':'1px solid #ccc', borderRadius:'8px', background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}}>
                        <Sun size={16}/> Claro
                      </button>
                      <button onClick={() => setConfigForm({...configForm, tema_base: 'dark'})} style={{flex:1, padding:'10px', border: configForm.tema_base==='dark'?'2px solid blue':'1px solid #ccc', borderRadius:'8px', background:'#1e293b', color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}}>
                        <Moon size={16}/> Escuro
                      </button>
                    </div>
                  </FormGroup>
                  <button onClick={handleSaveConfig} style={{ marginTop: '10px', padding: '15px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Save size={20} /> Salvar Tudo
                  </button>
                </div>

                {/* Preview */}
                <div style={{ background: '#e2e8f0', padding: '20px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#64748b', marginTop: 0 }}>Preview App</h3>
                  <div style={{ background: bgPreview, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1', minHeight: '400px' }}>
                    <div style={{ padding: '20px', borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f5f9' }}>
                      {configForm.logo_url ? <img src={configForm.logo_url} style={{height: '30px', objectFit: 'contain'}} /> : <h4 style={{ margin: 0, fontSize: '18px', color: textPreview }}>{configForm.titulo_pagina || 'Seu App'}</h4>}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                        <div style={{ background: configForm.cor_primaria, padding:'8px 16px', borderRadius: radiusPreview, color:'white', fontSize:'12px', fontWeight:'bold' }}>Banho</div>
                        <div style={{ background: cardPreview, border: isDark ? 'none' : '1px solid #e2e8f0', padding:'8px 16px', borderRadius: radiusPreview, color: isDark ? '#94a3b8' : '#64748b', fontSize:'12px' }}>Vet</div>
                      </div>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <div style={{ background: cardPreview, padding: '15px', borderRadius: radiusPreview, marginBottom:'15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                         <div style={{ height: '12px', width: '60%', background: isDark ? '#334155' : '#e2e8f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                         <button style={{ width: '100%', padding: '12px', background: configForm.cor_primaria, color: 'white', border: 'none', borderRadius: radiusPreview, fontSize: '12px', fontWeight:'bold' }}>Botão Principal</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= ABA: GESTÃO DE LOJAS (CRUD) ================= */}
          {activeTab === 'lojas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Filtros */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <div style={{ background: 'white', padding: '4px', borderRadius: '8px', display: 'flex', gap: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <FilterButton active={filtroStatus === 'todos'} onClick={() => setFiltroStatus('todos')}>Todos</FilterButton>
                  <FilterButton active={filtroStatus === 'publicados'} onClick={() => setFiltroStatus('publicados')}>🟢 No Ar</FilterButton>
                  <FilterButton active={filtroStatus === 'ocultos'} onClick={() => setFiltroStatus('ocultos')}>🔴 Ocultos</FilterButton>
                </div>
                <button onClick={() => setFiltroVip(!filtroVip)} style={{ padding: '8px 16px', borderRadius: '8px', border: filtroVip ? '2px solid #f59e0b' : '1px solid white', background: filtroVip ? '#fffbeb' : 'white', color: filtroVip ? '#b45309' : '#64748b', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <Star size={16} fill={filtroVip ? "currentColor" : "none"} /> VIPs
                </button>
                {/* Categorias */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
                  {TAGS_OFICIAIS.map(tag => (
                     <button key={tag.id} onClick={() => setFiltroCategoria(filtroCategoria === tag.id ? null : tag.id)}
                       style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', background: filtroCategoria === tag.id ? tag.color : 'white', color: filtroCategoria === tag.id ? 'white' : '#64748b', boxShadow: filtroCategoria === tag.id ? '0 2px 5px rgba(0,0,0,0.2)' : '0 1px 2px rgba(0,0,0,0.1)' }}>
                       {tag.label}
                     </button>
                   ))}
                </div>
              </div>

              {/* Lista de Resultados */}
              {loading ? <p>Carregando...</p> : locaisFiltrados.map(local => {
                 const isVisible = local.status === 'PUBLICAR_APP';
                 const isEditing = editingId === local.id;
                 return (
                    <div key={local.id} style={{ 
                      padding: '20px', background: 'white', borderRadius: '10px', 
                      borderLeft: isEditing ? `4px solid ${projeto.cor_primaria}` : (local.destaque ? '4px solid #f59e0b' : '4px solid transparent'),
                      opacity: (isVisible || isEditing) ? 1 : 0.6,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      
                      {isEditing ? (
                         /* --- MODO EDIÇÃO --- */
                         <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                            {/* Nome e VIP */}
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} className="input-field" style={{fontWeight:'bold'}} />
                              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fffbeb', padding: '10px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #fcd34d' }}>
                                <input type="checkbox" checked={editForm.destaque} onChange={e => setEditForm({...editForm, destaque: e.target.checked})} />
                                <span style={{fontWeight:'bold', color: '#b45309', fontSize: '13px'}}>VIP</span>
                              </label>
                            </div>
                            {/* Campos Numéricos */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '10px' }}>
                              <input type="number" step="0.1" value={editForm.nota} onChange={e => setEditForm({...editForm, nota: e.target.value})} placeholder="Nota" className="input-field" />
                              <input type="number" value={editForm.avaliacoes} onChange={e => setEditForm({...editForm, avaliacoes: e.target.value})} placeholder="Avaliações" className="input-field" />
                              <input type="text" value={editForm.instagram_url} onChange={e => setEditForm({...editForm, instagram_url: e.target.value})} placeholder="Instagram URL" className="input-field" />
                            </div>
                            {/* Checkboxes de Tags */}
                            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {TAGS_OFICIAIS.map(tag => (
                                <div key={tag.id} onClick={() => toggleTagForm(tag.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 10px', borderRadius: '15px', background: editForm.tags?.includes(tag.id) ? tag.color : 'white', color: editForm.tags?.includes(tag.id) ? 'white' : '#64748b', fontSize: '12px', fontWeight: 'bold', border: editForm.tags?.includes(tag.id) ? 'none' : '1px solid #cbd5e1' }}>
                                  {editForm.tags?.includes(tag.id) ? <CheckSquare size={14} /> : <Square size={14} />} {tag.label}
                                </div>
                              ))}
                            </div>
                            {/* Botões Ação Edição */}
                            <div style={{display:'flex', gap:'10px'}}>
                              <button onClick={handleUpdateLocal} style={{flex:1, padding:'10px', background:'#22c55e', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}}><Save size={16}/> Salvar</button>
                              <button onClick={()=>setEditingId(null)} style={{padding:'10px 20px', background:'#ef4444', color:'white', border:'none', borderRadius:'6px', cursor:'pointer'}}>Cancelar</button>
                            </div>
                         </div>
                      ) : (
                         /* --- MODO VISUALIZAÇÃO --- */
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
                            <div style={{display:'flex', gap:'8px'}}>
                               <ActionButton onClick={()=>toggleStatus(local)} color={isVisible ? '#64748b' : '#ef4444'} title={isVisible?"Ocultar":"Publicar"}>{isVisible ? <Eye size={18}/> : <EyeOff size={18}/>}</ActionButton>
                               <ActionButton onClick={()=>iniciarEdicao(local)} color={projeto.cor_primaria} title="Editar"><Edit size={18}/></ActionButton>
                               <ActionButton onClick={()=>handleDelete(local.id)} color="#ef4444" title="Excluir"><Trash2 size={18}/></ActionButton>
                            </div>
                         </div>
                      )}
                    </div>
                 )
              })}
            </div>
          )}

        </main>
      </div>

      <style>{`.input-field { width: 100%; padding: 10px; border: 1px solid #cbd5e1; borderRadius: 8px; fontSize: 14px; }`}</style>
    </div>
  );
}

// --- SUB-COMPONENTES DE UI ---
function MenuButton({ active, onClick, icon, children }) {
  return <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: active ? '#f1f5f9' : 'transparent', border: 'none', borderRadius: '8px', color: active ? '#0f172a' : '#64748b', fontWeight: active ? 'bold' : 'normal', cursor: 'pointer', textAlign: 'left', fontSize: '14px', width: '100%' }}>{icon} {children}</button>
}
function FormGroup({ label, children }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b' }}>{label}</label>{children}</div>
}
function FilterButton({ active, onClick, children }) {
  return <button onClick={onClick} style={{ padding:'8px 12px', background: active ? 'white' : 'transparent', border:'none', borderRadius:'6px', color: active?'black':'#64748b', fontWeight: active?'bold':'normal', cursor:'pointer', boxShadow: active?'0 1px 2px rgba(0,0,0,0.1)':'none' }}>{children}</button>
}
function ActionButton({ onClick, color, children, title }) {
  return <button onClick={onClick} title={title} style={{ width:'36px', height:'36px', borderRadius:'8px', border:`1px solid ${color}20`, background:`${color}10`, color:color, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{children}</button>
}