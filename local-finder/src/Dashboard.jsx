import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, X, CheckSquare, Square, 
  Eye, EyeOff, Filter, Star, List, Layers 
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // --- ESTADOS DOS FILTROS ---
  const [filtroStatus, setFiltroStatus] = useState('todos'); // 'todos', 'publicados', 'ocultos'
  const [filtroCategoria, setFiltroCategoria] = useState(null); // null ou id da tag
  const [filtroVip, setFiltroVip] = useState(false); // boolean

  // Tags Oficiais
  const TAGS_OFICIAIS = [
    { id: 'banho', label: 'Banho', color: '#3b82f6' },
    { id: 'vet',   label: 'Vet',   color: '#10b981' },
    { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
    { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
  ];

  const corPrimaria = projeto?.cor_primaria || '#2563eb';

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

    if (error) console.error('Erro:', error);
    else setLocais(data || []);
    setLoading(false);
  }

  // --- LÓGICA DE FILTRAGEM ---
  const locaisFiltrados = locais.filter(local => {
    // 1. Filtro de Status
    if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') return false;

    // 2. Filtro VIP
    if (filtroVip && !local.destaque) return false;

    // 3. Filtro de Categoria
    if (filtroCategoria && !local.tags?.includes(filtroCategoria)) return false;

    return true;
  });

  // Contadores para os botões
  const countPublicados = locais.filter(l => l.status === 'PUBLICAR_APP').length;
  const countOcultos = locais.filter(l => l.status !== 'PUBLICAR_APP').length;
  const countVips = locais.filter(l => l.destaque).length;

  // --- AÇÕES DO CRUD ---
  async function toggleStatus(local) {
    const novoStatus = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    const { error } = await supabase.from('locais').update({ status: novoStatus }).eq('id', local.id);
    if (!error) {
      setLocais(locais.map(l => l.id === local.id ? { ...l, status: novoStatus } : l));
    }
  }

  async function handleUpdate() {
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

  const iniciarEdicao = (local) => {
    setEditingId(local.id);
    setEditForm({ ...local, tags: local.tags || [] }); 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 2px 5px rgba(0,0,0,0.05)' }}>
        <div>
           <h1 style={{ color: corPrimaria, margin: 0, fontSize: '1.5rem' }}>Gestão: {projeto.nome}</h1>
           <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748b' }}>Total de {locais.length} locais cadastrados</p>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '10px 20px', cursor: 'pointer', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight:'bold', color: '#475569', display:'flex', alignItems:'center', gap:'8px' }}>
           <ExternalLinkIcon /> Ver App
        </button>
      </header>

      {/* --- BARRA DE FILTROS (DASHBOARD CONTROL) --- */}
      <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Linha 1: Status e VIP */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Botões de Status (Tabs) */}
          <div style={{ background: '#e2e8f0', padding: '4px', borderRadius: '8px', display: 'flex', gap: '4px' }}>
            <FilterButton active={filtroStatus === 'todos'} onClick={() => setFiltroStatus('todos')}>
              Todos ({locais.length})
            </FilterButton>
            <FilterButton active={filtroStatus === 'publicados'} onClick={() => setFiltroStatus('publicados')}>
              🟢 No Ar ({countPublicados})
            </FilterButton>
            <FilterButton active={filtroStatus === 'ocultos'} onClick={() => setFiltroStatus('ocultos')}>
              🔴 Ocultos ({countOcultos})
            </FilterButton>
          </div>

          {/* Botão VIP */}
          <button 
            onClick={() => setFiltroVip(!filtroVip)}
            style={{
              padding: '8px 16px', borderRadius: '8px', border: filtroVip ? '2px solid #f59e0b' : '1px solid #e2e8f0',
              background: filtroVip ? '#fffbeb' : 'white', color: filtroVip ? '#b45309' : '#64748b',
              cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Star size={16} fill={filtroVip ? "currentColor" : "none"} />
            {filtroVip ? `Exibindo VIPs (${countVips})` : 'Filtrar VIPs'}
          </button>
        </div>

        {/* Linha 2: Categorias */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
           <button 
             onClick={() => setFiltroCategoria(null)}
             style={{
               padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold',
               background: filtroCategoria === null ? '#334155' : '#cbd5e1', color: 'white'
             }}
           >
             Todas as Categorias
           </button>
           {TAGS_OFICIAIS.map(tag => (
             <button
               key={tag.id}
               onClick={() => setFiltroCategoria(filtroCategoria === tag.id ? null : tag.id)}
               style={{
                 padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold',
                 background: filtroCategoria === tag.id ? tag.color : 'white',
                 color: filtroCategoria === tag.id ? 'white' : '#64748b',
                 boxShadow: filtroCategoria === tag.id ? '0 2px 5px rgba(0,0,0,0.2)' : '0 1px 2px rgba(0,0,0,0.1)'
               }}
             >
               {tag.label}
             </button>
           ))}
        </div>
      </div>

      {/* --- LISTA DE RESULTADOS --- */}
      {loading ? <p>Carregando...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {locaisFiltrados.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', background: 'white', borderRadius: '12px' }}>
              <Filter size={40} style={{ opacity: 0.2, marginBottom: '10px' }} />
              <p>Nenhum local encontrado com esses filtros.</p>
              <button onClick={() => {setFiltroStatus('todos'); setFiltroVip(false); setFiltroCategoria(null)}} style={{color: corPrimaria, background:'none', border:'none', cursor:'pointer', textDecoration:'underline'}}>Limpar Filtros</button>
            </div>
          )}

          {locaisFiltrados.map(local => {
            const isVisible = local.status === 'PUBLICAR_APP';
            const isEditing = editingId === local.id;

            return (
              <div key={local.id} style={{ 
                padding: '20px', background: 'white', borderRadius: '10px', 
                borderLeft: isEditing ? `4px solid ${corPrimaria}` : (local.destaque ? '4px solid #f59e0b' : '4px solid transparent'),
                opacity: (isVisible || isEditing) ? 1 : 0.6,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                
                {isEditing ? (
                  // --- MODO EDIÇÃO (Mantido igual, mas simplificado visualmente) ---
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} style={{ flex: 1, padding: '10px', fontWeight: 'bold', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fffbeb', padding: '10px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #fcd34d' }}>
                        <input type="checkbox" checked={editForm.destaque} onChange={e => setEditForm({...editForm, destaque: e.target.checked})} />
                        <span style={{fontWeight:'bold', color: '#b45309', fontSize: '13px'}}>VIP</span>
                      </label>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '10px' }}>
                      <input type="number" step="0.1" value={editForm.nota} onChange={e => setEditForm({...editForm, nota: e.target.value})} placeholder="Nota" style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                      <input type="number" value={editForm.avaliacoes} onChange={e => setEditForm({...editForm, avaliacoes: e.target.value})} placeholder="Avaliações" style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                      <input type="text" value={editForm.instagram_url} onChange={e => setEditForm({...editForm, instagram_url: e.target.value})} placeholder="Instagram URL" style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>

                    {/* CHECKBOXES */}
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {TAGS_OFICIAIS.map(tag => (
                        <div key={tag.id} onClick={() => toggleTagForm(tag.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 10px', borderRadius: '15px', background: editForm.tags?.includes(tag.id) ? tag.color : 'white', color: editForm.tags?.includes(tag.id) ? 'white' : '#64748b', fontSize: '12px', fontWeight: 'bold', border: editForm.tags?.includes(tag.id) ? 'none' : '1px solid #cbd5e1' }}>
                          {editForm.tags?.includes(tag.id) ? <CheckSquare size={14} /> : <Square size={14} />} {tag.label}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={handleUpdate} style={{ flex: 1, padding: '10px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}><Save size={16} /> Salvar</button>
                      <button onClick={() => setEditingId(null)} style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  // --- MODO VISUALIZAÇÃO (Card Limpo) ---
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                        {local.nome}
                        {local.destaque && <Star size={14} fill="#f59e0b" color="#f59e0b" />}
                        {!isVisible && <span style={{fontSize:'10px', background:'#e2e8f0', padding:'2px 6px', borderRadius:'4px', color:'#64748b', fontWeight:'bold'}}>OCULTO</span>}
                      </h3>
                      
                      <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '10px', marginBottom: '8px' }}>
                        <span>⭐ {local.nota} ({local.avaliacoes})</span>
                        <span style={{maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>📍 {local.endereco}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '5px' }}>
                        {local.tags && local.tags.map(t => {
                           const tagInfo = TAGS_OFICIAIS.find(to => to.id === t);
                           return (
                            <span key={t} style={{ fontSize: '10px', background: tagInfo ? tagInfo.color : '#cbd5e1', padding: '2px 8px', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>
                              {tagInfo ? tagInfo.label : t}
                            </span>
                           )
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <ActionButton onClick={() => toggleStatus(local)} color={isVisible ? '#64748b' : '#ef4444'} title={isVisible ? "Ocultar" : "Publicar"}>
                        {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                      </ActionButton>
                      <ActionButton onClick={() => iniciarEdicao(local)} color={corPrimaria} title="Editar">
                        <Edit size={18} />
                      </ActionButton>
                      <ActionButton onClick={() => handleDelete(local.id)} color="#ef4444" title="Excluir">
                        <Trash2 size={18} />
                      </ActionButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Componentes Auxiliares para Estilo ---
function FilterButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
      background: active ? 'white' : 'transparent',
      color: active ? '#1e293b' : '#64748b',
      fontWeight: active ? 'bold' : 'normal',
      boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      fontSize: '13px', transition: 'all 0.2s'
    }}>
      {children}
    </button>
  );
}

function ActionButton({ onClick, color, children, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      width: '36px', height: '36px', borderRadius: '8px', border: `1px solid ${color}20`,
      background: `${color}10`, color: color, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {children}
    </button>
  );
}

function ExternalLinkIcon() {
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
}