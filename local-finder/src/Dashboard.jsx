import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  Trash2, Edit, Save, Eye, EyeOff, Star, ExternalLink, 
  Store, CheckSquare, Square, X, Scissors, Stethoscope, 
  ShoppingBag, Home, Search
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  // --- ESTADOS ---
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filtroStatus, setFiltroStatus] = useState('todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  // Cores fixas de alta qualidade para garantir que NADA quebre
  const theme = {
    primary: projeto?.cor_primaria || '#2563eb',
    bg: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
    textSec: '#64748b',
    border: '#e2e8f0',
    danger: '#ef4444',
    success: '#22c55e'
  };

  const TAGS_OFICIAIS = [
    { id: 'banho', label: 'Banho', color: '#3b82f6' },
    { id: 'vet',   label: 'Vet',   color: '#10b981' },
    { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
    { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
  ];

  useEffect(() => {
    if (projeto?.id) buscarDados();
  }, [projeto]);

  async function buscarDados() {
    setLoading(true);
    const { data } = await supabase
      .from('locais')
      .select('*')
      .eq('projeto_id', projeto.id)
      .order('created_at', { ascending: false });
    setLocais(data || []);
    setLoading(false);
  }

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
        destaque: editForm.destaque,
        tags: editForm.tags 
      }).eq('id', editingId);
    
    if (!error) {
      setEditingId(null);
      buscarDados();
    }
  }

  async function handleDelete(id) {
    if(!window.confirm("Tem certeza que deseja excluir esta loja?")) return;
    const { error } = await supabase.from('locais').delete().eq('id', id);
    if (!error) buscarDados();
  }

  const toggleTagForm = (tagId) => {
    const tagsAtuais = editForm.tags || [];
    setEditForm({ ...editForm, tags: tagsAtuais.includes(tagId) ? tagsAtuais.filter(t => t !== tagId) : [...tagsAtuais, tagId] });
  };

  // Filtragem lógica
  const filtrados = locais.filter(l => {
    if (filtroStatus === 'publicados' && l.status !== 'PUBLICAR_APP') return false;
    if (filtroStatus === 'ocultos' && l.status === 'PUBLICAR_APP') return false;
    if (filtroCategoria && !l.tags?.includes(filtroCategoria)) return false;
    return true;
  });

  if (!projeto) return <div style={{padding: 50, textAlign: 'center'}}>Carregando...</div>;

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', color: theme.text, padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER SIMPLIFICADO */}
      <header style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', background: theme.primary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Store size={22} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{projeto.nome}</h1>
        </div>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '8px 16px', background: 'white', border: `1px solid ${theme.border}`, borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <ExternalLink size={16} /> Ver App
        </button>
      </header>

      {/* ÁREA DE GESTÃO */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* BARRA DE FILTROS */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: '#e2e8f0', padding: '4px', borderRadius: '8px' }}>
            {['todos', 'publicados', 'ocultos'].map(s => (
              <button key={s} onClick={() => setFiltroStatus(s)} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: filtroStatus === s ? 'white' : 'transparent', color: theme.text, fontWeight: 'bold', fontSize: '11px', boxShadow: filtroStatus === s ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {TAGS_OFICIAIS.map(tag => (
              <button key={tag.id} onClick={() => setFiltroCategoria(filtroCategoria === tag.id ? null : tag.id)} style={{ padding: '6px 12px', borderRadius: '20px', border: `1px solid ${filtroCategoria === tag.id ? tag.color : theme.border}`, background: filtroCategoria === tag.id ? tag.color : 'white', color: filtroCategoria === tag.id ? 'white' : theme.textSec, cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* LISTA DE LOJAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Carregando dados...</p>
          ) : filtrados.map(local => {
            const isVisible = local.status === 'PUBLICAR_APP';
            const isEditing = editingId === local.id;

            return (
              <div key={local.id} style={{ background: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '16px', transition: 'all 0.2s', boxShadow: isEditing ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}>
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Editando: {local.nome}</div>
                    <input value={editForm.nome} onChange={e => setEditForm({...editForm, nome: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: `1px solid ${theme.border}` }} />
                    
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {TAGS_OFICIAIS.map(tag => (
                        <button key={tag.id} onClick={() => toggleTagForm(tag.id)} style={{ padding: '6px 10px', borderRadius: '6px', border: `1px solid ${theme.border}`, background: editForm.tags?.includes(tag.id) ? tag.color : 'white', color: editForm.tags?.includes(tag.id) ? 'white' : theme.textSec, cursor: 'pointer', fontSize: '11px' }}>
                          {tag.label}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={handleUpdateLocal} style={{ flex: 1, padding: '10px', background: theme.success, color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Salvar</button>
                      <button onClick={() => setEditingId(null)} style={{ padding: '10px 20px', background: '#f1f5f9', color: theme.text, border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {local.nome}
                        {local.destaque && <Star size={14} fill="#f59e0b" color="#f59e0b" />}
                      </div>
                      <div style={{ fontSize: '12px', color: theme.textSec, marginTop: '4px' }}>
                        {local.endereco || 'Sem endereço cadastrado'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => toggleStatus(local)} style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: isVisible ? '#f1f5f9' : '#fee2e2', color: isVisible ? theme.textSec : theme.danger }}>
                        {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button onClick={() => { setEditingId(local.id); setEditForm(local); }} style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#dbeafe', color: '#2563eb' }}>
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(local.id)} style={{ width: '38px', height: '38px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fef2f2', color: theme.danger }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}