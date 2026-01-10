import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Trash2, Edit, Save, X, Plus, ExternalLink, CheckSquare, Square } from 'lucide-react';

export default function Dashboard({ projeto }) {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Estado do formulário de edição
  const [editForm, setEditForm] = useState({});

  // As tags oficiais que usamos nos botões do App
  const TAGS_OFICIAIS = [
    { id: 'banho', label: 'Banho & Tosa' },
    { id: 'vet',   label: 'Veterinário' },
    { id: 'loja',  label: 'Pet Shop/Loja' },
    { id: 'hotel', label: 'Hotel/Creche' }
  ];

  // Cores do Projeto
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

    if (error) console.error('Erro ao buscar locais:', error);
    else setLocais(data || []);
    setLoading(false);
  }

  async function handleUpdate() {
    const { error } = await supabase
      .from('locais')
      .update({
        nome: editForm.nome,
        nota: editForm.nota,
        avaliacoes: editForm.avaliacoes,
        instagram_url: editForm.instagram_url,
        destaque: editForm.destaque,
        tags: editForm.tags // Salva o array de tags selecionadas
      })
      .eq('id', editingId);

    if (error) {
      alert('Erro ao atualizar!');
    } else {
      setEditingId(null);
      fetchLocais();
    }
  }

  // Função mágica para marcar/desmarcar tags
  const toggleTag = (tagId) => {
    const tagsAtuais = editForm.tags || [];
    if (tagsAtuais.includes(tagId)) {
      // Se já tem, remove
      setEditForm({ ...editForm, tags: tagsAtuais.filter(t => t !== tagId) });
    } else {
      // Se não tem, adiciona
      setEditForm({ ...editForm, tags: [...tagsAtuais, tagId] });
    }
  };

  const iniciarEdicao = (local) => {
    setEditingId(local.id);
    // Garante que tags seja um array, mesmo que venha null do banco
    setEditForm({ ...local, tags: local.tags || [] }); 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: corPrimaria }}>Painel: {projeto.nome}</h1>
        <button onClick={() => window.location.href = `/${projeto.slug}`} style={{ padding: '10px', cursor: 'pointer' }}>
           Ver Site
        </button>
      </header>

      {loading ? <p>Carregando...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {locais.map(local => (
            <div key={local.id} style={{ 
              padding: '20px', background: 'white', borderRadius: '10px', 
              border: editingId === local.id ? `2px solid ${corPrimaria}` : '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              
              {editingId === local.id ? (
                // --- MODO EDIÇÃO ---
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  
                  {/* Linha 1: Nome e Destaque */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input 
                      value={editForm.nome} 
                      onChange={e => setEditForm({...editForm, nome: e.target.value})}
                      style={{ flex: 1, padding: '10px', fontSize: '16px', fontWeight: 'bold' }} 
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fffbeb', padding: '10px', borderRadius: '5px', cursor: 'pointer', border: '1px solid #fcd34d' }}>
                      <input 
                        type="checkbox" 
                        checked={editForm.destaque} 
                        onChange={e => setEditForm({...editForm, destaque: e.target.checked})} 
                      />
                      <span style={{fontWeight:'bold', color: '#b45309'}}>É VIP?</span>
                    </label>
                  </div>

                  {/* Linha 2: Nota, Avaliações e Instagram */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '10px' }}>
                    <div>
                      <label style={{fontSize: '12px', color: '#666'}}>Nota (0-5)</label>
                      <input type="number" step="0.1" value={editForm.nota} onChange={e => setEditForm({...editForm, nota: e.target.value})} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', color: '#666'}}>Nº Avaliações</label>
                      <input type="number" value={editForm.avaliacoes} onChange={e => setEditForm({...editForm, avaliacoes: e.target.value})} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', color: '#666'}}>Link Instagram (Reel/Post)</label>
                      <input type="text" value={editForm.instagram_url} onChange={e => setEditForm({...editForm, instagram_url: e.target.value})} placeholder="https://instagram.com/p/..." style={{ width: '100%', padding: '8px' }} />
                    </div>
                  </div>

                  {/* Linha 3: TAGS (CHECKBOXES) - AQUI ESTÁ A BLINDAGEM */}
                  <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 'bold', color: '#64748b' }}>Categorias (Selecione):</p>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                      {TAGS_OFICIAIS.map(tag => {
                        const isSelected = editForm.tags?.includes(tag.id);
                        return (
                          <div 
                            key={tag.id} 
                            onClick={() => toggleTag(tag.id)}
                            style={{ 
                              display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
                              padding: '6px 12px', borderRadius: '20px',
                              background: isSelected ? corPrimaria : 'white',
                              color: isSelected ? 'white' : '#64748b',
                              border: isSelected ? 'none' : '1px solid #cbd5e1',
                              fontSize: '13px', fontWeight: 'bold', transition: 'all 0.2s'
                            }}
                          >
                            {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                            {tag.label}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={handleUpdate} style={{ flex: 1, padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}>
                      <Save size={18} /> Salvar Alterações
                    </button>
                    <button onClick={() => setEditingId(null)} style={{ padding: '12px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                      Cancelar
                    </button>
                  </div>

                </div>
              ) : (
                // --- MODO VISUALIZAÇÃO ---
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>
                      {local.nome} {local.destaque && <span style={{fontSize:'10px', background:'#fcd34d', padding:'2px 5px', borderRadius:'4px', color:'#78350f'}}>VIP</span>}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '10px' }}>
                      <span>⭐ {local.nota} ({local.avaliacoes})</span>
                      <span>📍 {local.endereco?.substring(0, 30)}...</span>
                    </div>
                    {/* Exibe as tags como etiquetas */}
                    <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
                      {local.tags && local.tags.map(t => (
                        <span key={t} style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>
                          {TAGS_OFICIAIS.find(to => to.id === t)?.label || t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => iniciarEdicao(local)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: corPrimaria }}>
                      <Edit />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}