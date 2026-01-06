import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { FolderPlus } from 'lucide-react';

// Importação das Telas
import PetList from './PetList';
import AdminGenerator from './AdminGenerator';
import Dashboard from './Dashboard';

// --- COMPONENTE CAMALEÃO (Carrega o App certo baseado na URL) ---
function UniversalLoader() {
  const { nicho } = useParams(); // Pega o "pets" da URL
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarProjeto() {
      // Busca as configs desse nicho no banco
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .eq('slug', nicho)
        .single();

      if (error || !data) {
        setProjeto(null); // Projeto não existe (404)
      } else {
        setProjeto(data);
      }
      setLoading(false);
    }
    carregarProjeto();
  }, [nicho]);

  if (loading) return <div style={{padding:20}}>Carregando Fábrica...</div>;
  
  if (!projeto) return (
    <div style={{padding:20, textAlign:'center'}}>
      <h2>🚫 Nicho não encontrado</h2>
      <Link to="/">Voltar para a Home</Link>
    </div>
  );

  // Se achou o projeto, renderiza o App "injetando" as configurações dele
  return (
    <div>
      {/* Menu de Navegação Local (Só para testes) */}
      <nav style={{ padding: '10px', background: '#f8fafc', borderBottom:'1px solid #eee', display: 'flex', gap: '15px', justifyContent:'center', fontSize:'14px' }}>
         <Link to={`/${nicho}`} style={{fontWeight:'bold', color: projeto.cor_primaria}}>{projeto.nome}</Link>
         <Link to={`/${nicho}/dashboard`} style={{color:'#64748b'}}>Dashboard</Link>
         <Link to={`/${nicho}/admin`} style={{color:'#64748b'}}>Admin SQL</Link>
         <Link to="/" style={{color:'#94a3b8'}}>🏠 Sair</Link>
      </nav>

      <Routes>
        {/* Passamos o objeto 'projeto' para dentro das telas */}
        <Route path="/" element={<PetList projeto={projeto} />} />
        <Route path="/dashboard" element={<Dashboard projeto={projeto} />} />
        <Route path="/admin" element={<AdminGenerator projeto={projeto} />} />
      </Routes>
    </div>
  );
}

// --- TELA INICIAL (LISTA DE NICHOS ATIVOS) ---
function HomeFactory() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    supabase.from('projetos').select('*').then(({ data }) => setProjetos(data || []));
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{textAlign:'center', marginBottom:'40px'}}>🏭 Fábrica de Apps</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {/* Lista os projetos que existem no banco */}
        {projetos.map(proj => (
          <Link key={proj.id} to={`/${proj.slug}`} style={{textDecoration:'none'}}>
            <div style={{
              padding: '30px', borderRadius: '12px', background: 'white',
              border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center', transition: 'transform 0.2s', cursor: 'pointer'
            }}>
              <div style={{fontSize:'40px', marginBottom:'10px'}}>🚀</div>
              <h3 style={{margin:0, color:'#1e293b'}}>{proj.nome}</h3>
              <span style={{fontSize:'12px', color:'#64748b'}}>/{proj.slug}</span>
            </div>
          </Link>
        ))}

        {/* Card Fake de "Criar Novo" */}
        <div style={{
          padding: '30px', borderRadius: '12px', border: '2px dashed #cbd5e1',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#94a3b8', cursor: 'not-allowed'
        }}>
          <FolderPlus size={32} />
          <span style={{fontWeight:'bold', marginTop:'10px'}}>Novo Nicho</span>
          <span style={{fontSize:'10px'}}>(Em breve no Painel)</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Raiz: Mostra a Fábrica */}
        <Route path="/" element={<HomeFactory />} />
        
        {/* Rota Dinâmica: Captura /pets, /mecanicos, etc e joga pro Loader */}
        <Route path="/:nicho/*" element={<UniversalLoader />} />
      </Routes>
    </Router>
  );
}