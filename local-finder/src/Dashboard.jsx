import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, X, CheckSquare, Square, 
  Eye, EyeOff, Filter, Star, ExternalLink, 
  Settings, Layout, Palette, Store 
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  const [activeTab, setActiveTab] = useState('lojas'); // 'lojas' | 'config'
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- ESTADOS DO PAINEL DE LOJAS ---
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filtroStatus, setFiltroStatus] = useState('todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [filtroVip, setFiltroVip] = useState(false);

  // --- ESTADOS DO PAINEL DE CONFIG (BRAND STUDIO) ---
  const [configForm, setConfigForm] = useState({
    nome: projeto.nome,
    titulo_pagina: projeto.titulo_pagina,
    cor_primaria: projeto.cor_primaria,
    cor_destaque: projeto.cor_destaque,
    slug: projeto.slug
  });

  // Tags Oficiais
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

    if (!error) setLocais(data || []);
    setLoading(false);
  }

  // --- LÓGICA DE SALVAR CONFIGURAÇÕES ---
  async function handleSaveConfig() {
    const { error } = await supabase
      .from('projetos')
      .update({
        nome: configForm.nome,
        titulo_pagina: configForm.titulo_pagina,
        cor_primaria: configForm.cor_primaria,
        cor_destaque: configForm.cor_destaque
      })
      .eq('id', projeto.id);

    if (error) {
      alert('Erro ao salvar configurações!');
    } else {
      alert('Sucesso! A página será recarregada para aplicar as novas cores.');
      window.location.reload(); // Recarrega para aplicar o tema novo
    }
  }

  // --- LÓGICA DE CRUD DE LOJAS (Mantida igual) ---
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
    }
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

  // Filtros
  const locaisFiltrados = locais.filter(local => {
    if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') return false;
    if (filtroVip && !local.destaque) return false;
    if (filtroCategoria && !local.tags?.includes(filtroCategoria)) return false;
    return true;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* --- HEADER GERAL --- */}
      <header style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', 
        background:'white', padding:'20px', borderRadius:'16px', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.05)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <div style={{ width:'50px', height:'50px', borderRadius:'12px', background: projeto.cor_primaria, display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}>
             <Store size={24} />
           </div>
           <div>
             <h1 style={{ color: '#1e293b', margin: 0, fontSize: '1.5rem' }}>{projeto.nome}</h1>
             <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748b' }}>Painel Administrativo v3.0</p>
           </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '10px 20px', cursor: 'pointer', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight:'bold', color: '#475569', display:'flex', alignItems:'center', gap:'8px' }}>
             <ExternalLink size={16} /> Ver App
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', alignItems: 'flex-start' }}>
        
        {/* --- MENU LATERAL (SIDEBAR) --- */}
        <aside style={{ width: '250px', background: 'white', borderRadius: '16px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '5px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <MenuButton active={activeTab === 'lojas'} onClick={() => setActiveTab('lojas')} icon={<Layout size={18} />}>
            Gestão de Lojas
          </MenuButton>
          <MenuButton active={activeTab === 'config'} onClick={() => setActiveTab('config')} icon={<Settings size={18} />}>
            Configurações (App)
          </MenuButton>
        </aside>

        {/* --- ÁREA DE CONTEÚDO --- */}
        <main style={{ flex: 1 }}>
          
          {/* ABA: CONFIGURAÇÕES (BRAND STUDIO) */}
          {activeTab === 'config' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0, color: '#1e293b' }}>
                <Palette size={24} color={projeto.cor_primaria} /> Brand Studio
              </h2>
              <p style={{ color: '#64748b', marginBottom: '30px' }}>Personalize a identidade visual do seu aplicativo.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                
                {/* FORMULÁRIO */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <FormGroup label="Nome do Projeto (Interno)">
                    <input className="input-field" value={configForm.nome} onChange={e => setConfigForm({...configForm, nome: e.target.value})} />
                  </FormGroup>

                  <FormGroup label="Título na Home do App">
                    <input className="input-field" value={configForm.titulo_pagina} onChange={e => setConfigForm({...configForm, titulo_pagina: e.target.value})} />
                  </FormGroup>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <FormGroup label="Cor Principal">
                      <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                        <input type="color" value={configForm.cor_primaria} onChange={e => setConfigForm({...configForm, cor_primaria: e.target.value})} style={{width:'50px', height:'50px', border:'none', cursor:'pointer'}} />
                        <span style={{fontFamily:'monospace'}}>{configForm.cor_primaria}</span>
                      </div>
                    </FormGroup>

                    <FormGroup label="Cor de Destaque (VIP)">
                      <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                        <input type="color" value={configForm.cor_destaque} onChange={e => setConfigForm({...configForm, cor_destaque: e.target.value})} style={{width:'50px', height:'50px', border:'none', cursor:'pointer'}} />
                        <span style={{fontFamily:'monospace'}}>{configForm.cor_destaque}</span>
                      </div>
                    </FormGroup>
                  </div>

                  <button onClick={handleSaveConfig} style={{ marginTop: '10px', padding: '15px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Save size={20} /> Salvar Alterações
                  </button>
                </div>

                {/* PREVIEW AO VIVO */}
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                  <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#94a3b8', marginTop: 0 }}>Preview Visual</h3>
                  
                  {/* Miniatura do App */}
                  <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                    {/* Header Fake */}
                    <div style={{ background: `linear-gradient(180deg, white, #f8fafc)`, padding: '15px', borderBottom: '1px solid #f1f5f9' }}>
                      <h4 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>{configForm.titulo_pagina}</h4>
                      
                      <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                        <div style={{ background: configForm.cor_primaria, width: '60px', height: '20px', borderRadius: '10px' }}></div>
                        <div style={{ border: '1px solid #e2e8f0', width: '60px', height: '20px', borderRadius: '10px' }}></div>
                      </div>
                    </div>

                    {/* Card Fake */}
                    <div style={{ padding: '15px' }}>
                      <div style={{ padding: '10px', borderRadius: '10px', border: `2px solid ${configForm.cor_destaque}`, position: 'relative' }}>
                         <div style={{ position: 'absolute', top: 0, right: 0, background: configForm.cor_destaque, color: 'white', fontSize: '8px', padding: '2px 6px', borderBottomLeftRadius: '6px' }}>VIP</div>
                         <div style={{ height: '10px', width: '60%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '5px' }}></div>
                         <button style={{ width: '100%', padding: '8px', background: configForm.cor_destaque, color: 'white', border: 'none', borderRadius: '6px', fontSize: '10px', marginTop: '10px' }}>Botão VIP</button>
                      </div>

                      <div style={{ marginTop: '10px', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                         <div style={{ height: '10px', width: '60%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '5px' }}></div>
                         <button style={{ width: '100%', padding: '8px', background: configForm.cor_primaria, color: 'white', border: 'none', borderRadius: '6px', fontSize: '10px', marginTop: '10px' }}>Botão Normal</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ABA: GESTÃO DE LOJAS (Conteúdo Antigo) */}
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
              </div>

              {/* Lista de Lojas */}
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
                         /* FORMULÁRIO DE EDIÇÃO (Simplificado para o exemplo) */
                         <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                            <input value={editForm.nome} onChange={e=>setEditForm({...editForm, nome:e.target.value})} className="input-field" />
                            <div style={{display:'flex', gap:'10px'}}>
                              <button onClick={handleUpdateLocal} style={{padding:'10px', background:'#22c55e', color:'white', border:'none', borderRadius:'6px', cursor:'pointer'}}>Salvar</button>
                              <button onClick={()=>setEditingId(null)} style={{padding:'10px', background:'#ef4444', color:'white', border:'none', borderRadius:'6px', cursor:'pointer'}}>Cancelar</button>
                            </div>
                         </div>
                      ) : (
                         /* CARD DE VISUALIZAÇÃO */
                         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div>
                               <h3 style={{margin:'0 0 5px 0', color:'#1e293b'}}>{local.nome} {local.destaque && '⭐'}</h3>
                               <div style={{fontSize:'12px', color:'#64748b'}}>📍 {local.endereco}</div>
                               <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                                 {local.tags && local.tags.map(t => (
                                   <span key={t} style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>
                                     {TAGS_OFICIAIS.find(to => to.id === t)?.label || t}
                                   </span>
                                 ))}
                               </div>
                            </div>
                            <div style={{display:'flex', gap:'8px'}}>
                               <ActionButton onClick={()=>toggleStatus(local)} color={isVisible ? '#64748b' : '#ef4444'}>{isVisible ? <Eye size={18}/> : <EyeOff size={18}/>}</ActionButton>
                               <ActionButton onClick={()=>iniciarEdicao(local)} color={projeto.cor_primaria}><Edit size={18}/></ActionButton>
                               <ActionButton onClick={()=>handleDelete(local.id)} color="#ef4444"><Trash2 size={18}/></ActionButton>
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

      {/* ESTILOS INLINE PARA FACILITAR */}
      <style>{`
        .input-field { width: 100%; padding: 10px; border: 1px solid #cbd5e1; borderRadius: 8px; fontSize: 14px; }
      `}</style>
    </div>
  );
}

// COMPONENTES DE UI
function MenuButton({ active, onClick, icon, children }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '10px', padding: '12px',
      background: active ? '#f1f5f9' : 'transparent', border: 'none', borderRadius: '8px',
      color: active ? '#0f172a' : '#64748b', fontWeight: active ? 'bold' : 'normal',
      cursor: 'pointer', textAlign: 'left', fontSize: '14px', width: '100%'
    }}>
      {icon} {children}
    </button>
  )
}

function FormGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b' }}>{label}</label>
      {children}
    </div>
  )
}

function FilterButton({ active, onClick, children }) {
  return <button onClick={onClick} style={{ padding:'8px 12px', background: active ? 'white' : 'transparent', border:'none', borderRadius:'6px', color: active?'black':'#64748b', fontWeight: active?'bold':'normal', cursor:'pointer', boxShadow: active?'0 1px 2px rgba(0,0,0,0.1)':'none' }}>{children}</button>
}

function ActionButton({ onClick, color, children }) {
  return <button onClick={onClick} style={{ width:'36px', height:'36px', borderRadius:'8px', border:`1px solid ${color}20`, background:`${color}10`, color:color, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{children}</button>
}