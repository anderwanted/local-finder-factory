import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Eye, EyeOff, Trash2, MessageSquare, Store, Calendar, Phone, User, Edit, Save, X } from 'lucide-react';

export default function Dashboard({ projeto }) {
  const [activeTab, setActiveTab] = useState('lojas');
  const [lojas, setLojas] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar qual loja estamos editando agora
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (activeTab === 'lojas') fetchLojas();
    if (activeTab === 'leads') fetchLeads();
  }, [activeTab]);

  // --- BUSCAS ---
  async function fetchLojas() {
    setLoading(true);
    const { data } = await supabase
      .from('locais')
      .select('*')
      .eq('projeto_id', projeto.id)
      .order('destaque', { ascending: false }) // VIPs no topo
      .order('created_at', { ascending: false });
    setLojas(data || []);
    setLoading(false);
  }

  async function fetchLeads() {
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').eq('projeto_id', projeto.id).order('created_at', { ascending: false });
    setLeads(data || []);
    setLoading(false);
  }

  // --- AÇÕES ---
  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    const { error } = await supabase.from('locais').update({ status: newStatus }).eq('id', id);
    if (!error) setLojas(lojas.map(l => l.id === id ? { ...l, status: newStatus } : l));
  }

  // Prepara o formulário de edição
  function startEditing(loja) {
    setEditingId(loja.id);
    setEditForm({
      nota: loja.nota || 0,
      avaliacoes: loja.avaliacoes || 0,
      instagram_url: loja.instagram_url || '',
      destaque: loja.destaque || false
    });
  }

  // Salva as edições no banco
  async function saveEdit(id) {
    const { error } = await supabase
      .from('locais')
      .update(editForm) // Envia o formulário todo
      .eq('id', id);

    if (!error) {
      // Atualiza a lista localmente
      setLojas(lojas.map(l => l.id === id ? { ...l, ...editForm } : l));
      setEditingId(null); // Fecha o editor
    } else {
      alert("Erro ao salvar. Verifique o console.");
      console.error(error);
    }
  }

  async function deleteLead(id) {
    if(!confirm("Apagar lead?")) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (!error) setLeads(leads.filter(l => l.id !== id));
  }

  return (
    <div style={{ padding: '20px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Menu Tabs */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveTab('lojas')} style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: activeTab === 'lojas' ? '#2563eb' : 'white', color: activeTab === 'lojas' ? 'white' : '#64748b', fontWeight: 'bold' }}>
          <Store size={20} /> Gestão de Lojas
        </button>
        <button onClick={() => setActiveTab('leads')} style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: activeTab === 'leads' ? '#2563eb' : 'white', color: activeTab === 'leads' ? 'white' : '#64748b', fontWeight: 'bold' }}>
          <MessageSquare size={20} /> Leads
        </button>
      </div>

      {/* --- ABA LOJAS --- */}
      {!loading && activeTab === 'lojas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {lojas.map(loja => (
            <div key={loja.id} style={{
              background: 'white', padding: '20px', borderRadius: '12px',
              borderLeft: loja.status === 'PUBLICAR_APP' ? '5px solid #22c55e' : '5px solid #cbd5e1',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
              
              {/* Cabeçalho do Card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '18px', display:'flex', alignItems:'center', gap:'8px' }}>
                    {loja.nome}
                    {loja.destaque && <span style={{background:'#f59e0b', color:'white', fontSize:'10px', padding:'2px 6px', borderRadius:'4px'}}>VIP</span>}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {loja.status === 'PUBLICAR_APP' ? '✅ Publicado' : '⏸️ Rascunho'} • Nota: {loja.nota} ({loja.avaliacoes})
                  </div>
                </div>

                <div style={{display:'flex', gap:'5px'}}>
                   {/* Botão Editar */}
                   <button 
                    onClick={() => editingId === loja.id ? setEditingId(null) : startEditing(loja)}
                    style={{ background: '#e0f2fe', color: '#0369a1', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    {editingId === loja.id ? <X size={18}/> : <Edit size={18}/>}
                  </button>

                  {/* Botão Publicar/Ocultar */}
                  <button 
                    onClick={() => toggleStatus(loja.id, loja.status)}
                    style={{ background: loja.status === 'PUBLICAR_APP' ? '#f1f5f9' : '#dcfce7', color: loja.status === 'PUBLICAR_APP' ? '#64748b' : '#166534', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    {loja.status === 'PUBLICAR_APP' ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* --- ÁREA DE EDIÇÃO (Só aparece se clicar no lápis) --- */}
              {editingId === loja.id && (
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '10px', border: '1px solid #e2e8f0' }}>
                  <h5 style={{margin:'0 0 10px 0', color:'#475569'}}>Editar Dados Premium</h5>
                  
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'10px'}}>
                    <div>
                      <label style={{fontSize:'12px', fontWeight:'bold', display:'block'}}>Nota (0-5)</label>
                      <input 
                        type="number" step="0.1" 
                        value={editForm.nota} 
                        onChange={e => setEditForm({...editForm, nota: e.target.value})}
                        style={{width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #ccc'}}
                      />
                    </div>
                    <div>
                      <label style={{fontSize:'12px', fontWeight:'bold', display:'block'}}>Avaliações</label>
                      <input 
                        type="number" 
                        value={editForm.avaliacoes} 
                        onChange={e => setEditForm({...editForm, avaliacoes: e.target.value})}
                        style={{width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #ccc'}}
                      />
                    </div>
                  </div>

                  <div style={{marginBottom:'10px'}}>
                    <label style={{fontSize:'12px', fontWeight:'bold', display:'block'}}>Link do Instagram (Reel/Post)</label>
                    <input 
                      type="text" 
                      placeholder="https://instagram.com/..."
                      value={editForm.instagram_url} 
                      onChange={e => setEditForm({...editForm, instagram_url: e.target.value})}
                      style={{width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #ccc'}}
                    />
                  </div>

                  <div style={{marginBottom:'15px', display:'flex', alignItems:'center', gap:'10px'}}>
                    <input 
                      type="checkbox" 
                      id="destaqueCheck"
                      checked={editForm.destaque} 
                      onChange={e => setEditForm({...editForm, destaque: e.target.checked})}
                      style={{width:'20px', height:'20px'}}
                    />
                    <label htmlFor="destaqueCheck" style={{fontWeight:'bold', color: editForm.destaque ? '#f59e0b' : '#333'}}>
                      Marcar como Destaque (VIP)
                    </label>
                  </div>

                  <button 
                    onClick={() => saveEdit(loja.id)}
                    style={{width:'100%', padding:'10px', background:'#2563eb', color:'white', border:'none', borderRadius:'6px', fontWeight:'bold', cursor:'pointer', display:'flex', justifyContent:'center', gap:'5px'}}
                  >
                    <Save size={18} /> Salvar Alterações
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

      {/* --- ABA LEADS (Mantida igual) --- */}
      {!loading && activeTab === 'leads' && (
        /* ... Tabela de Leads igual ao código anterior ... */
        <div style={{ overflowX: 'auto' }}>
           {/* Se quiser manter o código da tabela de leads aqui, posso repetir, 
               mas se você já tem, o foco é a parte de cima */}
           <p style={{textAlign:'center', color:'#666'}}>Lista de Leads (Visualize no código anterior ou mantenha o que já tinha)</p>
           {/* Para facilitar, vou deixar a tabela simples aqui para não quebrar: */}
           <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px' }}>
             <thead><tr style={{background:'#e2e8f0'}}><th style={{padding:'10px'}}>Nome</th><th style={{padding:'10px'}}>Zap</th><th style={{padding:'10px'}}>Loja</th></tr></thead>
             <tbody>
               {leads.map(l => (
                 <tr key={l.id} style={{borderBottom:'1px solid #eee'}}>
                   <td style={{padding:'10px'}}>{l.nome}</td>
                   <td style={{padding:'10px'}}>{l.telefone}</td>
                   <td style={{padding:'10px'}}>{l.loja_alvo}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      )}
    </div>
  );
}