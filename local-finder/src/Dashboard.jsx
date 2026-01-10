import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
// Importação mínima para não dar erro de referência
import { 
  Trash2, Edit, Save, Eye, EyeOff, Star, Layout, Palette, Store, Sun, Moon 
} from 'lucide-react';

export default function Dashboard({ projeto }) {
  const [activeTab, setActiveTab] = useState('lojas');
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [configForm, setConfigForm] = useState({
    nome: '',
    titulo_pagina: '',
    cor_primaria: '#2563eb',
    tema_base: 'light'
  });

  // Sincroniza os dados assim que o projeto chega
  useEffect(() => {
    if (projeto?.id) {
      setConfigForm({
        nome: projeto.nome || '',
        titulo_pagina: projeto.titulo_pagina || '',
        cor_primaria: projeto.cor_primaria || '#2563eb',
        tema_base: projeto.tema_base || 'light'
      });
      buscarLocais();
    }
  }, [projeto]);

  const isDark = configForm.tema_base === 'dark';

  async function buscarLocais() {
    setLoading(true);
    const { data } = await supabase
      .from('locais')
      .select('*')
      .eq('projeto_id', projeto.id)
      .order('created_at', { ascending: false });
    setLocais(data || []);
    setLoading(false);
  }

  async function salvarConfigs() {
    const { error } = await supabase.from('projetos').update({
      nome: configForm.nome,
      titulo_pagina: configForm.titulo_pagina,
      cor_primaria: configForm.cor_primaria,
      tema_base: configForm.tema_base
    }).eq('id', projeto.id);
    
    if (!error) {
      alert("Configurações salvas!");
      window.location.reload();
    }
  }

  // Proteção: Se o projeto ainda não carregou, não renderiza o resto
  if (!projeto) return <div style={{padding: 50, color: '#666'}}>Carregando...</div>;

  return (
    <div style={{ 
      background: isDark ? '#0f172a' : '#f8fafc', 
      color: isDark ? '#f8fafc' : '#1e293b', 
      minHeight: '100vh', 
      padding: '20px',
      fontFamily: 'sans-serif' 
    }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '15px', background: isDark ? '#1e293b' : '#fff', borderRadius: '12px', border: '1px solid #ccc' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>{configForm.nome || 'Dashboard'}</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActiveTab('lojas')} style={{ padding: '8px', cursor: 'pointer' }}>Lojas</button>
          <button onClick={() => setActiveTab('config')} style={{ padding: '8px', cursor: 'pointer' }}>Cores</button>
        </nav>
      </header>

      <main>
        {activeTab === 'lojas' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {loading ? <p>Buscando lojas...</p> : locais.map(local => (
              <div key={local.id} style={{ padding: '15px', background: isDark ? '#1e293b' : '#fff', borderRadius: '8px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{local.nome}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => {setEditingId(local.id); setEditForm(local)}} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'blue' }}><Edit size={20}/></button>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'red' }}><Trash2 size={20}/></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: isDark ? '#1e293b' : '#fff', padding: '20px', borderRadius: '12px' }}>
            <h2>Aparência</h2>
            <div style={{ marginBottom: '15px' }}>
              <label>Cor Primária:</label><br/>
              <input type="color" value={configForm.cor_primaria} onChange={e => setConfigForm({...configForm, cor_primaria: e.target.value})} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Tema:</label><br/>
              <button onClick={() => setConfigForm({...configForm, tema_base: 'light'})} style={{ padding: '10px', marginRight: '10px', background: configForm.tema_base === 'light' ? 'blue' : '#ccc', color: 'white' }}>Claro</button>
              <button onClick={() => setConfigForm({...configForm, tema_base: 'dark'})} style={{ padding: '10px', background: configForm.tema_base === 'dark' ? 'blue' : '#ccc', color: 'white' }}>Escuro</button>
            </div>
            <button onClick={salvarConfigs} style={{ padding: '15px', background: 'green', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Salvar Tudo</button>
          </div>
        )}
      </main>
    </div>
  );
}