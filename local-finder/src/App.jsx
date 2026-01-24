// ======================================================
// 📄 App.jsx
// Entry Point + Roteamento Global (Multi-Tenant)
// ======================================================
//
// 🎯 PROPÓSITO DESTE ARQUIVO
// - Definir TODAS as rotas do sistema
// - Resolver qual app/nicho deve ser carregado
// - Injetar configuração do projeto nas telas
//
// 🧠 MODELO MENTAL
// - HomeFactory → lista de apps existentes
// - UniversalLoader → resolve qual app carregar
// - Telas nunca decidem contexto sozinhas
//
// 🔒 CONTRATO
// - Nenhuma regra de negócio pesada aqui
// - Nenhuma lógica de filtro
// - Apenas orquestração e injeção de dados
//

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';

import { supabase } from './supabaseClient';
import { FolderPlus } from 'lucide-react';

// ======================================================
// 🔹 TELAS DO SISTEMA
// ======================================================
import PetList from './PetList';
import AdminGenerator from './AdminGenerator';
import Dashboard from './Dashboard';
import './styles/components.css';
import './styles/theme.css';


// ======================================================
// 🔹 COMPONENTE: UniversalLoader
// ======================================================
//
// 🎯 INTENÇÃO
// Resolver dinamicamente QUAL app deve ser carregado
// com base na URL (/pets, /mecanicos, etc)
//
// 🧠 MODELO MENTAL
// - URL define o nicho
// - Nicho busca um projeto no banco
// - Projeto injeta configuração nas telas
//
// 🔒 CONTRATO
// - Se não encontrar projeto → erro controlado
// - Nunca renderiza tela sem projeto válido
//
function UniversalLoader() {
  const { nicho } = useParams(); // slug do projeto
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // 🔹 FETCH DO PROJETO
  // ==============================
  useEffect(() => {
    async function carregarProjeto() {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .eq('slug', nicho)
        .single();

      if (error || !data) {
        setProjeto(null); // 404 lógico
      } else {
        setProjeto(data);
      }
      setLoading(false);
    }

    carregarProjeto();
  }, [nicho]);

  // ==============================
  // 🔹 ESTADOS DE SEGURANÇA
  // ==============================
  if (loading) {
    return <div style={{ padding: 20 }}>Carregando Fábrica…</div>;
  }

  if (!projeto) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h2>🚫 Nicho não encontrado</h2>
        <Link to="/">Voltar para a Home</Link>
      </div>
    );
  }

  // ==============================
  // 🔹 RENDERIZAÇÃO DO APP
  // ==============================
  //
  // Projeto encontrado → injetamos config nas telas
  //
  return (
    <div>

      {/* =====================================
         🔹 MENU LOCAL (DEV / TESTES)
      ====================================== */}
      <nav
        style={{
          padding: '10px',
          background: '#f8fafc',
          borderBottom: '1px solid #eee',
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          fontSize: '14px'
        }}
      >
        <Link
          to={`/${nicho}`}
          style={{ fontWeight: 'bold', color: projeto.cor_primaria }}
        >
          {projeto.nome}
        </Link>

        <Link to={`/${nicho}/dashboard`} style={{ color: '#64748b' }}>
          Dashboard
        </Link>

        <Link to={`/${nicho}/admin`} style={{ color: '#64748b' }}>
          Admin SQL
        </Link>

        <Link to="/" style={{ color: '#94a3b8' }}>
          🏠 Sair
        </Link>
      </nav>

      {/* =====================================
         🔹 ROTAS DO PROJETO
      ====================================== */}
      <Routes>
        <Route path="/" element={<PetList projeto={projeto} />} />
        <Route path="/dashboard" element={<Dashboard projeto={projeto} />} />
        <Route path="/admin" element={<AdminGenerator projeto={projeto} />} />
      </Routes>
    </div>
  );
}

// ======================================================
// 🔹 TELA: HomeFactory
// ======================================================
//
// 🎯 INTENÇÃO
// Listar todos os projetos/nichos existentes
//
// 🧠 MODELO MENTAL
// - Cada card = um app independente
// - Clique → entra no app
//
// 🔒 CONTRATO
// - Não cria projetos
// - Apenas navega
//
function HomeFactory() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    supabase
      .from('projetos')
      .select('*')
      .then(({ data }) => setProjetos(data || []));
  }, []);

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif'
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        🏭 Fábrica de Apps
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px'
        }}
      >
        {/* =============================
           🔹 PROJETOS EXISTENTES
        ============================== */}
        {projetos.map(proj => (
          <Link key={proj.id} to={`/${proj.slug}`} style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: '30px',
                borderRadius: '12px',
                background: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚀</div>
              <h3 style={{ margin: 0, color: '#1e293b' }}>{proj.nome}</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                /{proj.slug}
              </span>
            </div>
          </Link>
        ))}

        {/* =============================
           🔹 CARD FUTURO (CRIAR NOVO)
        ============================== */}
        <div
          style={{
            padding: '30px',
            borderRadius: '12px',
            border: '2px dashed #cbd5e1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            cursor: 'not-allowed'
          }}
        >
          <FolderPlus size={32} />
          <span style={{ fontWeight: 'bold', marginTop: '10px' }}>
            Novo Nicho
          </span>
          <span style={{ fontSize: '10px' }}>
            (Em breve no Painel)
          </span>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// 🔹 ROOT DO APP
// ======================================================
//
// 🎯 INTENÇÃO
// Definir roteamento global
//
export default function App() {
  return (
    <Router>
      <Routes>

        {/* Home / Fábrica */}
        <Route path="/" element={<HomeFactory />} />

        {/* Apps Dinâmicos */}
        <Route path="/:nicho/*" element={<UniversalLoader />} />

      </Routes>
    </Router>
  );
}
