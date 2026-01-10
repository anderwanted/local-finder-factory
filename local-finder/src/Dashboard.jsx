import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Filter, Star, ExternalLink, 
  Settings, Layout, Palette, Store, Image as ImageIcon, Moon, Sun
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  const [activeTab, setActiveTab] = useState('lojas'); 
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- ESTADOS DO PAINEL DE LOJAS ---
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filtroStatus, setFiltroStatus] = useState('todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [filtroVip, setFiltroVip] = useState(false);

  // --- ESTADOS DO BRAND STUDIO ---
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
      alert('Configurações salvas!');
      window.location.reload();
    }
  }

  // --- CRUD Lógica simplificada ---
  async function toggleStatus(local) {
    const novoStatus = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    const { error } = await supabase.from('locais').update({ status: novoStatus }).eq('id', local.id);
    if (!error) fetchLocais();
  }
  async function handleUpdateLocal() { /* Lógica de update igual anterior */ }
  async function handleDelete(id) { /* Lógica delete igual anterior */ }
  // -------------------------------

  // Variáveis para Preview
  const isDark = configForm.tema_base === 'dark';
  const bgPreview = isDark ? '#0f172a' : '#f8fafc';
  const cardPreview = isDark ? '#1e293b' : 'white';
  const textPreview = isDark ? '#f1f5f9' : '#1e293b';
  const radiusPreview = configForm.estilo_borda === 'quadrado' ? '0px' : (configForm.estilo_borda === 'pilula' ? '25px' : '12px');

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background:'white', padding:'20px', borderRadius:'16px', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <div style={{ width:'50px', height:'50px', borderRadius:'12px', background: projeto.cor_primaria, display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}>
             {projeto.logo_url ? <img src={projeto.logo_url} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'12px'}} /> : <Store size={24} />}
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
        
        {/* MENU */}
        <aside style={{ width: '250px', background: 'white', borderRadius: '16px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <MenuButton active={activeTab === 'lojas'} onClick={() => setActiveTab('lojas')} icon={<Layout size={18} />}>Gestão de Lojas</MenuButton>
          <MenuButton active={activeTab === 'config'} onClick={() => setActiveTab('config')} icon={<Palette size={18} />}>Brand Studio</MenuButton>
        </aside>

        {/* CONTEÚDO */}
        <main style={{ flex: 1 }}>
          
          {/* ABA CONFIGURAÇÃO */}
          {activeTab === 'config' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                
                {/* FORMULÁRIO */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{marginTop:0}}>Identidade Visual</h3>
                  
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

                {/* PREVIEW AO VIVO */}
                <div style={{ background: '#e2e8f0', padding: '20px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#64748b', marginTop: 0 }}>Preview App</h3>
                  
                  <div style={{ background: bgPreview, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1', minHeight: '400px' }}>
                    {/* Header Preview */}
                    <div style={{ padding: '20px', borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f5f9' }}>
                      {configForm.logo_url ? (
                        <img src={configForm.logo_url} style={{height: '30px', objectFit: 'contain'}} />
                      ) : (
                        <h4 style={{ margin: 0, fontSize: '18px', color: textPreview }}>{configForm.titulo_pagina || 'Seu App'}</h4>
                      )}
                      
                      {/* Botões Categoria */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                        <div style={{ background: configForm.cor_primaria, padding:'8px 16px', borderRadius: radiusPreview, color:'white', fontSize:'12px', fontWeight:'bold' }}>Banho</div>
                        <div style={{ background: cardPreview, border: isDark ? 'none' : '1px solid #e2e8f0', padding:'8px 16px', borderRadius: radiusPreview, color: isDark ? '#94a3b8' : '#64748b', fontSize:'12px' }}>Vet</div>
                      </div>
                    </div>

                    {/* Card Preview */}
                    <div style={{ padding: '20px' }}>
                      <div style={{ background: cardPreview, padding: '15px', borderRadius: radiusPreview, marginBottom:'15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                         <div style={{ height: '12px', width: '60%', background: isDark ? '#334155' : '#e2e8f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                         <div style={{ height: '8px', width: '40%', background: isDark ? '#334155' : '#e2e8f0', borderRadius: '4px', marginBottom: '15px' }}></div>
                         <button style={{ width: '100%', padding: '12px', background: configForm.cor_primaria, color: 'white', border: 'none', borderRadius: radiusPreview, fontSize: '12px', fontWeight:'bold' }}>Botão Principal</button>
                      </div>
                    </div>
                  </div>
                  <p style={{textAlign:'center', fontSize:'12px', color:'#666', marginTop:'10px'}}>*Prévia aproximada</p>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'lojas' && (
            <div style={{textAlign: 'center', padding:'50px', color:'#666'}}>
               Seu painel de gestão continua aqui... (Simplificado para focar no código acima)
               <br/>
               <button onClick={()=>setActiveTab('config')} style={{marginTop:'10px', color:'blue', cursor:'pointer', border:'none', background:'none', textDecoration:'underline'}}>Ir para Configurações</button>
            </div>
          )}
        </main>
      </div>
      <style>{`.input-field { width: 100%; padding: 10px; border: 1px solid #cbd5e1; borderRadius: 8px; fontSize: 14px; }`}</style>
    </div>
  );
}

function MenuButton({ active, onClick, icon, children }) {
  return <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: active ? '#f1f5f9' : 'transparent', border: 'none', borderRadius: '8px', color: active ? '#0f172a' : '#64748b', fontWeight: active ? 'bold' : 'normal', cursor: 'pointer', textAlign: 'left', fontSize: '14px', width: '100%' }}>{icon} {children}</button>
}
function FormGroup({ label, children }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b' }}>{label}</label>{children}</div>
}