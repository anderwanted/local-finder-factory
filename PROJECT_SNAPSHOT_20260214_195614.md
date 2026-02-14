```

---

## 3. DEPENDÊNCIAS

### package.json

```json
{
  "name": "local-finder",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.90.1",
    "@vitejs/plugin-react": "^5.1.2",
    "framer-motion": "^12.29.0",
    "lucide-react": "^0.562.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.3",
    "react-social-media-embed": "^2.5.18"
  },
  "devDependencies": {
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "eslint": "^9.39.2",
    "eslint-plugin-react": "^7.37.5",
    "typescript": "^5.9.3",
    "vite": "^5.4.0"
  }
}
```

### Dependências Instaladas

**Dependencies:**
    "@supabase/supabase-js": "^2.90.1",
    "@vitejs/plugin-react": "^5.1.2",
    "framer-motion": "^12.29.0",
    "lucide-react": "^0.562.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.3",
    "react-social-media-embed": "^2.5.18"
  },
  "devDependencies": {
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "eslint": "^9.39.2",
    "eslint-plugin-react": "^7.37.5",
    "typescript": "^5.9.3",
    "vite": "^5.4.0"
  }

**DevDependencies:**
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "eslint": "^9.39.2",
    "eslint-plugin-react": "^7.37.5",
    "typescript": "^5.9.3",
    "vite": "^5.4.0"
  }

---

## 4. ARQUIVOS DE CONFIGURAÇÃO

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### .gitignore

```
node_modules
dist
.env

```

### index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />
    <title>Local Finder Factory</title>
  </head>
  <body>
    <div id="root"></div>
    
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 5. CÓDIGO FONTE

### 📄 src/App.jsx

```jsx
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
import { supabase } from './services/supabaseClient';
import { FolderPlus } from 'lucide-react';
import { DataProvider } from './context/DataContext';

// ======================================================
// 🔹 TELAS DO SISTEMA
// ======================================================
import Viewer from './pages/Viewer';
import Processor from './pages/Processor';
import Manager from './pages/Manager';

// ======================================================
// 🔹 ESTILOS
// ======================================================
import './assets/global.css';
import './assets/theme.css';

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
        <Route path="/" element={<Viewer projeto={projeto} />} />
        <Route path="/dashboard" element={<Manager projeto={projeto} />} />
        <Route path="/admin" element={<Processor projeto={projeto} />} />
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
    <DataProvider>
      <Router>
        <Routes>
          {/* Home / Fábrica */}
          <Route path="/" element={<HomeFactory />} />
          
          {/* Apps Dinâmicos com Multi-Tenant */}
          <Route path="/:nicho/*" element={<UniversalLoader />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}
```

### 📄 src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/global.css";
import "./assets/theme.css"; // ✅ Caminho novo!
import App from "./App.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


```

### 📄 src/context/DataContext.jsx

```jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('seu_nome_da_tabela') // ⚠️ AJUSTE AQUI
        .select('*')
      
      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <DataContext.Provider value={{ items, setItems, loading, fetchItems }}>
      {children}
    </DataContext.Provider>
  )
}```

### 📄 src/services/supabaseClient.js

```javascript
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// CONFIGURAÇÃO DO SUPABASE
// ------------------------------------------------------------------
// ⚠️ ATENÇÃO: Use apenas a 'Publishable Key' aqui. 
// Nunca coloque a 'Secret Key' (service_role) no front-end.

const supabaseUrl = 'https://yakmsnadietjagzrctyp.supabase.co'; "[HIDDEN]"
const supabaseKey = 'sb_publishable_JnzduU-F6qpkX82P8G1o5A_WHj_dh5v'; 

export const supabase = createClient(supabaseUrl, supabaseKey);```

### 📄 src/services/cardService.js

```javascript
import { supabase } from './supabaseClient'

const TABLE_NAME = 'seu_nome_da_tabela' // ⚠️ AJUSTE AQUI

export const getCards = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const getCardById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}

export const createCard = async (cardData) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([cardData])
    .select()
  
  return { data: data?.[0], error }
}

export const updateCard = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select()
  
  return { data: data?.[0], error }
}

export const deleteCard = async (id) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
  
  return { error }
}```

### 📄 src/services/filterService.js

```javascript
/**
 * SISTEMA GLOBAL DE FILTROS
 * =========================
 *
 * Este arquivo define TODOS os filtros possíveis da plataforma.
 *
 * ➜ Filtros são infraestrutura.
 * ➜ Nunca são criados pelo dashboard.
 * ➜ Funcionam em qualquer nicho (multi-tenant).
 *
 * O dashboard apenas:
 * - ativa ou desativa filtros por projeto
 * - define prioridade entre filtros de ordenação
 *
 * Este arquivo deve ser legível como documentação viva.
 */

/**
 * Cada filtro segue um contrato fixo.
 * Se alguém não entender o filtro lendo apenas este arquivo,
 * o filtro está mal definido.
 */

export const FILTERS = {
  /**
   * ⭐ FILTRO: Bem avaliados
   * ----------------------
   * Intenção:
   * Priorizar locais com boa reputação.
   *
   * Impacto:
   * Reorganiza o ranking, não remove resultados.
   *
   * Limite:
   * Se o local não tiver avaliação, ele é ignorado pelo filtro.
   */
  bem_avaliados: {
    id: 'bem_avaliados',

    nome_humano: 'Bem avaliados',

    descricao:
      'Prioriza locais com avaliação igual ou superior a 4.0. Não remove resultados.',

    tipo: 'ordenacao',

    campo_afetado: 'nota',

    comportamento: 'ordenar',

    /**
     * Função de ordenação.
     * Retorna um número para comparação.
     * Quanto maior, mais acima no ranking.
     */
    ordenar: (local) => {
      if (typeof local.nota !== 'number') return 0;
      if (local.nota < 4) return 0;
      return local.nota;
    },

    /**
     * Fallback seguro:
     * Se algo falhar, o filtro não interfere na lista.
     */
    fallback: () => 0
  },

  /**
   * 💬 FILTRO: WhatsApp disponível
   * -----------------------------
   * Intenção:
   * Priorizar locais com contato rápido.
   *
   * Impacto:
   * Reorganiza o ranking.
   *
   * Limite:
   * Não remove locais sem WhatsApp.
   */
  whatsapp_disponivel: {
    id: 'whatsapp_disponivel',

    nome_humano: 'WhatsApp disponível',

    descricao:
      'Prioriza locais que possuem WhatsApp ativo para contato direto.',

    tipo: 'ordenacao',

    campo_afetado: 'is_whatsapp',

    comportamento: 'ordenar',

    ordenar: (local) => {
      if (local.is_whatsapp === true) return 1;
      return 0;
    },

    fallback: () => 0
  },

  /**
   * 💎 FILTRO: Destaque / VIP
   * ------------------------
   * Intenção:
   * Dar prioridade a locais destacados pelo projeto.
   *
   * Impacto:
   * Reorganiza o ranking.
   *
   * Limite:
   * Não remove locais comuns.
   */
  destaque: {
    id: 'destaque',

    nome_humano: 'Destaque',

    descricao:
      'Prioriza locais marcados como destaque (VIP). Não remove resultados.',

    tipo: 'ordenacao',

    campo_afetado: 'destaque',

    comportamento: 'ordenar',

    ordenar: (local) => {
      if (local.destaque === true) return 1;
      return 0;
    },

    fallback: () => 0
  }
};
```

---

### PAGES

#### src/pages/Viewer/index.jsx

```jsx
// ======================================================
// 📄 PetList.jsx
// Tela principal do App (usuário final)
// ======================================================
//
// 🎯 PROPÓSITO
// - Listar pet shops do projeto
// - Permitir filtros e ordenação
// - Exibir cards interativos
//
// 🔒 CONTRATO
// - Não escreve no banco
// - Apenas leitura + interação
//

import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

// Componentes
import ChatModal from '../../components/ChatModal';
import PetCardMapStyle from '../../components/CardItem';
import './Viewer.css';

// Ícones
import { Store, X } from 'lucide-react';

// ======================================================
// 🔹 HELPERS
// ======================================================
const DEFAULT_FILTROS_APP = ['categoria', 'bem_avaliados', 'com_instagram'];

const getFiltrosAtivos = (projeto) => {
  if (Array.isArray(projeto?.filtros_ativos) && projeto.filtros_ativos.length > 0) {
    return projeto.filtros_ativos;
  }
  return DEFAULT_FILTROS_APP;
};

// ======================================================
// 🔹 COMPONENTE
// ======================================================
export default function PetList({ projeto }) {
  const [locais, setLocais] = useState([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [ordenacao, setOrdenacao] = useState('melhor_nota');

  const filtrosAtivos = getFiltrosAtivos(projeto);
  const hasFiltro = (id) => filtrosAtivos.includes(id);

  // ======================================================
  // 🔹 BUSCA DE LOCAIS (APENAS PUBLICADOS NO APP)
  // ======================================================
  useEffect(() => {
    async function buscarLocais() {
      setLoading(true);

      const { data, error } = await supabase
        .from("locais")
        .select("*")
        .eq("status", "PUBLICAR_APP")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar locais:", error);
        setLocais([]);
      } else {
        setLocais(data || []);
      }

      setLoading(false);
    }

    buscarLocais();
  }, []);

  // ======================================================
  // 🔹 FILTROS + ORDENAÇÃO
  // ======================================================
  useEffect(() => {
    let resultado = [...locais];

    if (hasFiltro('categoria') && filtroCategoria) {
      resultado = resultado.filter(
        l =>
          Array.isArray(l.tags) &&
          l.tags.includes(filtroCategoria)
      );
    }

    if (ordenacao === 'melhor_nota') {
      resultado.sort((a, b) => Number(b.nota || 0) - Number(a.nota || 0));
    }

    if (ordenacao === 'mais_avaliados') {
      resultado.sort((a, b) => Number(b.avaliacoes || 0) - Number(a.avaliacoes || 0));
    }

    if (ordenacao === 'destaques') {
      resultado.sort((a, b) => Number(b.destaque) - Number(a.destaque));
    }

    setLocaisFiltrados(resultado);
  }, [locais, filtroCategoria, ordenacao, filtrosAtivos]);

  // ======================================================
  // 🔹 RENDER
  // ======================================================
  return (
    <div className="app-shell">
      {/* HEADER */}
      <header className="app-header">
        <div className="app-header-text">
          <h1>Pet Finder</h1>
          <p>Serviços confiáveis para o seu pet</p>
        </div>
      </header>

      {/* FILTROS */}
      {hasFiltro('categoria') && (
        <div className="petlist-toolbar flex gap-sm mb-sm">

          {filtroCategoria && (
            <button onClick={() => setFiltroCategoria(null)}>
              <X size={16} />
            </button>
          )}

          <button onClick={() => setFiltroCategoria(null)}>
            <Store size={14} /> Todos
          </button>

          <button onClick={() => setFiltroCategoria('banho')}>Banho</button>
          <button onClick={() => setFiltroCategoria('vet')}>Vet</button>
          <button onClick={() => setFiltroCategoria('loja')}>Loja</button>
          <button onClick={() => setFiltroCategoria('hotel')}>Hotel</button>
        </div>
      )}

      {/* ORDENAÇÃO */}
<div className="petlist-toolbar flex gap-sm mb-md">

        <button onClick={() => setOrdenacao('melhor_nota')}>
          ⭐ Melhor nota
        </button>
        <button onClick={() => setOrdenacao('mais_avaliados')}>
          📈 Mais avaliados
        </button>
        <button onClick={() => setOrdenacao('destaques')}>
          🏆 Destaques
        </button>
      </div>

      {/* LISTA */}
      {loading && (
        <p className="px-md">
          Carregando...
        </p>
      )}

      {!loading && (
        <div className="petlist-container">
          {locaisFiltrados.slice(0, limit).map((local) => (
            <PetCardMapStyle
              key={local.id}
              local={local}
              onOpenChat={(local) => setSelectedLocal(local)}
            />
          ))}

          {limit < locaisFiltrados.length && (
            <button
              onClick={() => setLimit((prev) => prev + 6)}
              className="cursor-pointer"
              style={{
                margin: '20px auto',
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#fff',
                fontWeight: 600
              }}
            >
              Carregar mais
            </button>
          )}
        </div>
      )}

      {/* CHAT */}
      {selectedLocal && (
        <ChatModal
          local={selectedLocal}
          projeto={projeto}
          onClose={() => setSelectedLocal(null)}
        />
      )}
    </div>
  );
}
```

#### src/pages/Manager/index.jsx

```jsx
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from '../../services/supabaseClient';

/* ======================================================
   DASHBOARD — PET FINDER
   3 seções (1 e 2 config; 3 CRUD real em 'locais')
====================================================== */

export default function Dashboard() {
  /* ======================================================
     SEÇÃO 1 — ORDENAÇÃO PADRÃO DA PETLIST
  ====================================================== */
  const [ordenacaoPadrao, setOrdenacaoPadrao] = useState("padrao");

  /* ======================================================
     SEÇÃO 2 — FILTROS ATIVOS NA PETLIST (checklist que controla UI do App)
  ====================================================== */
  const [filtros, setFiltros] = useState({
    categoria: true,
    bemAvaliados: true,
    instagram: true,
    whatsapp: true,
    destaque: true
  });

  const toggleFiltro = (key) => {
    setFiltros((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const salvarConfiguracoes = async () => {
    console.log("Ordenação padrão:", ordenacaoPadrao);
    console.log("Filtros ativos:", filtros);
    alert("Configurações salvas (mock).");
  };

  /* ======================================================
     SEÇÃO 3 — CRUD REAL (SUPABASE: tabela locais)
  ====================================================== */
  const STATUS_VISIBLE = "ativo";
  const STATUS_HIDDEN = "oculto";

  const [locais, setLocais] = useState([]);
  const [loadingLocais, setLoadingLocais] = useState(true);
  const [errorLocais, setErrorLocais] = useState("");

  const [query, setQuery] = useState("");
  const [onlyHidden, setOnlyHidden] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nome: "",
    telefone: "",
    endereco: "",
    site: "",
    niche: "",
    status: STATUS_VISIBLE,
    origem: "",
    is_whatsapp: false,
    instagram_url: "",
    destaque: false,
    image_url: "",
    google_maps_url: "",
    horario_fechamento: "",
    aberto_agora: false,
    estacionamento: false,
    nota: null,
    avaliacoes: null
  });

  const resetForm = () => {
    setForm({
      ...form,
      id: null,
      nome: "",
      telefone: "",
      endereco: "",
      site: "",
      niche: "",
      origem: "",
      instagram_url: "",
      image_url: "",
      google_maps_url: "",
      horario_fechamento: "",
      nota: null,
      avaliacoes: null
    });
  };

  const isHiddenStatus = (s) =>
    ["oculto", "hidden", "inativo", "offline"].includes(
      (s || "").toString().toLowerCase()
    );

  const fetchAllLocais = async () => {
    setLoadingLocais(true);
    setErrorLocais("");

    try {
      const { data, error } = await supabase
        .from("locais")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLocais(data || []);
    } catch (err) {
      setErrorLocais(err.message);
    } finally {
      setLoadingLocais(false);
    }
  };

  useEffect(() => {
    fetchAllLocais();
  }, []);

  const locaisFiltrados = useMemo(() => {
    let list = [...locais];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((l) =>
        [l.nome, l.endereco, l.niche, l.site, l.telefone]
          .filter(Boolean)
          .some((x) => x.toLowerCase().includes(q))
      );
    }

    if (onlyHidden) list = list.filter((l) => isHiddenStatus(l.status));
    if (onlyFeatured) list = list.filter((l) => l.destaque);

    return list;
  }, [locais, query, onlyHidden, onlyFeatured]);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onEdit = (row) => {
    setForm({
      id: row.id,
      nome: row.nome || "",
      telefone: row.telefone || "",
      endereco: row.endereco || "",
      site: row.site || "",
      niche: row.niche || "",
      status: row.status || STATUS_VISIBLE,
      origem: row.origem || "",
      is_whatsapp: Boolean(row.is_whatsapp),
      instagram_url: row.instagram_url || "",
      destaque: Boolean(row.destaque),
      image_url: row.image_url || "",
      google_maps_url: row.google_maps_url || "",
      horario_fechamento: row.horario_fechamento || "",
      aberto_agora: Boolean(row.aberto_agora),
      estacionamento: Boolean(row.estacionamento),
      nota: row.nota ?? null,
      avaliacoes: row.avaliacoes ?? null
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este local?")) return;

    try {
      const { error } = await supabase.from("locais").delete().eq("id", id);
      if (error) throw error;
      await fetchAllLocais();
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nome: form.nome,
      telefone: form.telefone,
      endereco: form.endereco,
      site: form.site,
      niche: form.niche,
      status: form.status,
      origem: form.origem,
      is_whatsapp: form.is_whatsapp,
      instagram_url: form.instagram_url,
      destaque: form.destaque,
      image_url: form.image_url,
      google_maps_url: form.google_maps_url,
      horario_fechamento: form.horario_fechamento,
      aberto_agora: form.aberto_agora,
      estacionamento: form.estacionamento,
      nota: form.nota === "" ? null : form.nota,
      avaliacoes: form.avaliacoes === "" ? null : form.avaliacoes
    };

    try {
      if (form.id) {
        const { error } = await supabase
          .from("locais")
          .update(payload)
          .eq("id", form.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("locais").insert([payload]);
        if (error) throw error;
      }

      resetForm();
      await fetchAllLocais();
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }
  };


  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

useEffect(() => {
  const onResize = () => setIsMobile(window.innerWidth < 900);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);


  return (
    <div className="p-lg">
      <header className="mb-lg">
        <h1 style={{ marginBottom: 6 }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
          Painel de administração do Pet Finder
        </p>
      </header>

      {/* ======================================================
          SEÇÃO 1 — ORDENAÇÃO PADRÃO
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 1 — Ordenação Padrão</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "padrao"}
              onChange={() => setOrdenacaoPadrao("padrao")}
            />
            <span style={{ marginLeft: 8 }}>Padrão (created_at)</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "melhor_nota"}
              onChange={() => setOrdenacaoPadrao("melhor_nota")}
            />
            <span style={{ marginLeft: 8 }}>Melhor nota</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "mais_avaliados"}
              onChange={() => setOrdenacaoPadrao("mais_avaliados")}
            />
            <span style={{ marginLeft: 8 }}>Mais avaliados</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "destaques"}
              onChange={() => setOrdenacaoPadrao("destaques")}
            />
            <span style={{ marginLeft: 8 }}>Destaques</span>
          </label>
        </div>
      </div>

      {/* ======================================================
          SEÇÃO 2 — FILTROS ATIVOS
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 2 — Filtros Ativos na PetList</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.categoria}
              onChange={() => toggleFiltro("categoria")}
            />
            <span style={{ marginLeft: 8 }}>Filtro categoria</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.bemAvaliados}
              onChange={() => toggleFiltro("bemAvaliados")}
            />
            <span style={{ marginLeft: 8 }}>Bem avaliados</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.instagram}
              onChange={() => toggleFiltro("instagram")}
            />
            <span style={{ marginLeft: 8 }}>Com Instagram</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.whatsapp}
              onChange={() => toggleFiltro("whatsapp")}
            />
            <span style={{ marginLeft: 8 }}>Com WhatsApp</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.destaque}
              onChange={() => toggleFiltro("destaque")}
            />
            <span style={{ marginLeft: 8 }}>Somente destaques</span>
          </label>
        </div>

        <div style={{ marginTop: 14 }}>
          <button style={primaryBtn} onClick={salvarConfiguracoes}>
            Salvar configurações (mock)
          </button>
        </div>
      </div>

      {/* ======================================================
          SEÇÃO 3 — CRUD LOCAIS (SUPABASE)
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 3 — CRUD Locais (Supabase)</h2>

        {/* Busca / filtros */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <input
            style={{ ...input, minWidth: 260 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome/endereço/nicho/site/telefone..."
          />

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={onlyHidden}
              onChange={() => setOnlyHidden((v) => !v)}
            />
            <span style={{ marginLeft: 8 }}>Somente ocultos</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={onlyFeatured}
              onChange={() => setOnlyFeatured((v) => !v)}
            />
            <span style={{ marginLeft: 8 }}>Somente destaques</span>
          </label>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input
              style={input}
              value={form.nome}
              onChange={(e) => onChange("nome", e.target.value)}
              placeholder="Nome"
              required
            />

            <input
              style={input}
              value={form.telefone}
              onChange={(e) => onChange("telefone", e.target.value)}
              placeholder="Telefone"
            />

            <input
              style={input}
              value={form.endereco}
              onChange={(e) => onChange("endereco", e.target.value)}
              placeholder="Endereço"
            />

            <input
              style={input}
              value={form.site}
              onChange={(e) => onChange("site", e.target.value)}
              placeholder="Site"
            />

            <input
              style={input}
              value={form.niche}
              onChange={(e) => onChange("niche", e.target.value)}
              placeholder="Nicho (banho/vet/loja/hotel...)"
            />

            <input
              style={input}
              value={form.origem}
              onChange={(e) => onChange("origem", e.target.value)}
              placeholder="Origem"
            />

            <input
              style={input}
              value={form.instagram_url}
              onChange={(e) => onChange("instagram_url", e.target.value)}
              placeholder="Instagram URL"
            />

            <input
              style={input}
              value={form.image_url}
              onChange={(e) => onChange("image_url", e.target.value)}
              placeholder="Image URL"
            />

            <input
              style={input}
              value={form.google_maps_url}
              onChange={(e) => onChange("google_maps_url", e.target.value)}
              placeholder="Google Maps URL"
            />

            <input
              style={input}
              value={form.horario_fechamento}
              onChange={(e) => onChange("horario_fechamento", e.target.value)}
              placeholder="Horário fechamento (ex: 19:30)"
            />

            <input
              style={input}
              value={form.nota ?? ""}
              onChange={(e) => onChange("nota", e.target.value)}
              placeholder="Nota (ex: 4.7)"
            />

            <input
              style={input}
              value={form.avaliacoes ?? ""}
              onChange={(e) => onChange("avaliacoes", e.target.value)}
              placeholder="Avaliações (ex: 120)"
            />
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.is_whatsapp}
                onChange={() => onChange("is_whatsapp", !form.is_whatsapp)}
              />
              <span style={{ marginLeft: 8 }}>WhatsApp</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.destaque}
                onChange={() => onChange("destaque", !form.destaque)}
              />
              <span style={{ marginLeft: 8 }}>Destaque</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.aberto_agora}
                onChange={() => onChange("aberto_agora", !form.aberto_agora)}
              />
              <span style={{ marginLeft: 8 }}>Aberto agora</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.estacionamento}
                onChange={() => onChange("estacionamento", !form.estacionamento)}
              />
              <span style={{ marginLeft: 8 }}>Estacionamento</span>
            </label>

            <select
              style={{ ...input, width: 200 }}
              value={form.status}
              onChange={(e) => onChange("status", e.target.value)}
            >
              <option value={STATUS_VISIBLE}>Visível</option>
              <option value={STATUS_HIDDEN}>Oculto</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button style={primaryBtn} type="submit">
              {form.id ? "Atualizar" : "Criar"}
            </button>
            <button style={secondaryBtn} type="button" onClick={resetForm}>
              Limpar
            </button>
          </div>
        </form>

        {/* Lista/Tabela */}
        <div style={{ marginTop: 18 }}>
          {loadingLocais && <div style={{ color: "#64748b" }}>Carregando locais...</div>}
          {errorLocais && <div style={{ color: "#b91c1c" }}>Erro: {errorLocais}</div>}

{!loadingLocais && !errorLocais && (
  <>
    {isMobile ? (
      <div style={{ display: "grid", gap: 12 }}>
        {locaisFiltrados.map((l) => (
          <div key={l.id} style={box}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{l.nome}</div>
            <div style={{ color: "#475569", fontSize: 13, marginBottom: 6 }}>
              <strong>Nicho:</strong> {l.niche || "-"} &nbsp; | &nbsp;
              <strong>Status:</strong> {l.status || "-"} &nbsp; | &nbsp;
              <strong>Destaque:</strong> {l.destaque ? "⭐" : "-"}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={miniBtn} onClick={() => onEdit(l)}>Editar</button>
              <button style={miniBtn} onClick={() => onDelete(l.id)}>Deletar</button>
            </div>
          </div>
        ))}

        {locaisFiltrados.length === 0 && (
          <div style={{ color: "#475569" }}>Nenhum local encontrado.</div>
        )}
      </div>
    ) : (
      <div style={{ width: "100%" }}>
        <table style={{ ...table, minWidth: "unset" }}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>Nicho</th>
              <th style={th}>Status</th>
              <th style={th}>Destaque</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {locaisFiltrados.map((l) => (
              <tr key={l.id}>
                <td style={td}>{l.nome}</td>
                <td style={td}>{l.niche}</td>
                <td style={td}>{l.status}</td>
                <td style={td}>{l.destaque ? "⭐" : ""}</td>
                <td style={td}>
                  <button style={miniBtn} onClick={() => onEdit(l)}>Editar</button>
                  <button style={{ ...miniBtn, marginLeft: 8 }} onClick={() => onDelete(l.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
            {locaisFiltrados.length === 0 && (
              <tr>
                <td style={td} colSpan={5}>
                  Nenhum local encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </>
)}

        </div>
      </div>
    </div>
  );
}

/* ======================================================
   ESTILOS LOCAIS (mantidos — admin/backoffice)
====================================================== */

const box = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 18,
  marginBottom: 18,
  boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
};

const h2 = {
  fontSize: 16,
  margin: "0 0 12px 0"
};

const radioLabel = {
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  color: "#334155"
};

const checkLabel = {
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  color: "#334155"
};

const input = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: 14
};

const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #1d4ed8",
  background: "#1d4ed8",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  background: "#fff",
  color: "#0f172a",
  fontWeight: 700,
  cursor: "pointer"
};

const miniBtn = {
  padding: "6px 10px",
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600
};

const table = {
  width: "100%",
  minWidth: "760px",      // <-- força scroll quando a tela é estreita
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: 10,
  fontSize: 13,
  borderBottom: "1px solid #e2e8f0",
  color: "#475569",
  whiteSpace: "nowrap"
};

const td = {
  padding: 10,
  fontSize: 13,
  borderBottom: "1px solid #f1f5f9",
  color: "#0f172a",
  whiteSpace: "nowrap"
};
```

#### src/pages/Processor/index.jsx

```jsx
// ======================================================
// 📄 AdminGenerator.jsx
// Gerador de Prompt para Ingestão de Dados (Admin Tool)
// ======================================================
//
// 🎯 PROPÓSITO
// Facilitar a criação de dados estruturados (SQL UPSERT)
// a partir de texto desorganizado + URL do Google Maps.
//
// 🧠 MODELO MENTAL
// - O humano copia dados do Google Maps
// - O sistema gera um PROMPT blindado
// - A IA externa retorna SQL pronto
//
// 🔒 CONTRATO
// - Não grava no banco
// - Apenas gera texto
// - Nunca executa SQL
//

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useState } from 'react';
import { Copy, Check, MapPin, MousePointer, Globe, ArrowRight } from 'lucide-react';

// ======================================================
// 🔹 COMPONENTE PRINCIPAL
// ======================================================
export default function AdminGenerator({ projeto }) {

  // ==============================
  // 🔹 ESTADOS
  // ==============================
  //
  // rawInput → texto bruto colado pelo usuário
  // copied   → feedback visual de cópia
  //
  const [rawInput, setRawInput] = useState('');
  const [copied, setCopied] = useState(false);

  // ==============================
  // 🔹 TEMA DO PROJETO
  // ==============================
  //
  // 🎯 Usa a cor primária do projeto
  // 🔒 Fallback seguro
  //
  const corTema = projeto?.cor_primaria || '#2563eb';

  // ======================================================
  // 🔹 PROMPT MESTRE (VERSÃO BLINDADA)
  // ======================================================
  //
  // 🎯 INTENÇÃO
  // Gerar um comando SQL consistente, padronizado e seguro
  //
  // 🧠 REGRAS
  // - Tags fechadas
  // - Extração rigorosa
  // - Destaque calculado
  // - UPSERT idempotente
  //
  const PROMPT_MESTRE = `
Atue como Engenheiro de Dados Sênior.
Contexto: Estamos populando o banco do projeto "${projeto?.nome || 'Geral'}" (ID: '${projeto?.id}').

ANALISE O TEXTO SUJO E A URL ABAIXO PARA GERAR UM 'UPSERT' SQL.

1. REGRAS DE TAGS (Rigoroso):
   Analise o texto e categorize APENAS com estas tags permitidas:
   - 'banho' -> Se tiver banho, tosa, estética.
   - 'vet'   -> Se for clínica, hospital, vacinas, cirurgia.
   - 'loja'  -> Se vender ração, acessórios, brinquedos.
   - 'hotel' -> Se tiver hospedagem ou creche.
   *Um local pode ter várias tags. Ex: ARRAY['banho', 'vet']*

2. REGRAS DE EXTRAÇÃO:
   - Nome, Telefone (formato 5511...), Endereço.
   - Nota e Avaliações (números).
   - Latitude/Longitude: Tente extrair da URL (procure padrões como @-23.xxx,-46.xxx).
     Se não achar, use NULL.
   - Destaque: TRUE se (nota >= 4.8 e avaliacoes > 40).

3. SAÍDA ESPERADA (SQL):
   INSERT INTO locais (nome, telefone, endereco, nota, avaliacoes, destaque, tags, latitude, longitude, projeto_id)
   VALUES (...)
   ON CONFLICT (nome, endereco) DO UPDATE SET
   tags = EXCLUDED.tags,
   nota = EXCLUDED.nota,
   avaliacoes = EXCLUDED.avaliacoes,
   latitude = EXCLUDED.latitude,
   longitude = EXCLUDED.longitude;

DADOS BRUTOS (TEXTO + URL):
`;

  // ==============================
  // 🔹 AÇÃO: COPIAR PROMPT
  // ==============================
  //
  // 🎯 Junta prompt + texto do usuário
  // 🔒 Apenas copia para clipboard
  //
  const handleCopy = () => {
    const fullText = `${PROMPT_MESTRE}\n${rawInput}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ==============================
  // 🔹 FALLBACK DE SEGURANÇA
  // ==============================
  if (!projeto) return <p>Erro: Projeto não identificado.</p>;

  // ======================================================
  // 🔹 RENDER
  // ======================================================
  return (
<div
  className="mx-auto p-lg"
  style={{
    maxWidth: '800px',
    fontFamily: 'sans-serif',
    color: '#334155'
  }}
>


      {/* ==========================================
          🔹 HEADER INSTRUCIONAL
         ========================================== */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        marginBottom: '25px',
        borderLeft: `6px solid ${corTema}`
      }}>
        <h2 style={{
          color: '#1e293b',
          marginTop: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Globe size={24} color={corTema} />
          Gerador de Dados Inteligente
        </h2>

        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Siga o fluxo abaixo para popular o app <strong>{projeto.nome}</strong> com precisão.
        </p>

        {/* ==============================
            🔹 STEPS VISUAIS
           ============================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '20px'
        }}>
          <StepCard
            icon={<MapPin size={20} />}
            title="1. Google Maps"
            text="Pesquise o local e CLIQUE NO PINO para abrir os detalhes."
            color={corTema}
          />

          <StepCard
            icon={<MousePointer size={20} />}
            title="2. Captura Total"
            text="Dê Ctrl+A na aba lateral esquerda e copie todo o texto."
            color={corTema}
          />

          <StepCard
            icon={<Globe size={20} />}
            title="3. URL GPS"
            text="Copie também o link do navegador para pegar a latitude."
            color={corTema}
          />
        </div>
      </div>

      {/* ==========================================
          🔹 ÁREA DE AÇÃO
         ========================================== */}
     <div className="relative">
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          Cole tudo aqui (Texto Bagunçado + URL):
        </label>

        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder={`Exemplo:\nPet Shop do Zé\n4.8 estrelas\nRua das Flores, 123\n\nhttps://google.com/maps/...`}
          style={{
            width: '100%',
            height: '200px',
            padding: '15px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '14px',
            fontFamily: 'monospace',
            resize: 'vertical',
            outlineColor: corTema
          }}
        />

        {/* ==============================
            🔹 BOTÃO PRINCIPAL
           ============================== */}
        <div style={{ marginTop: '15px' }}>
          <button
            onClick={handleCopy}
            disabled={!rawInput}
            style={{
              width: '100%',
              padding: '16px',
              background: copied ? '#22c55e' : (rawInput ? corTema : '#cbd5e1'),
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: rawInput ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s',
              boxShadow: rawInput ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            {copied
              ? <><Check /> Prompt Copiado! Cole na IA.</>
              : <><Copy /> Gerar Comando SQL</>
            }
            {!copied && rawInput && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// 🔹 COMPONENTE AUXILIAR: StepCard
// ======================================================
//
// 🎯 INTENÇÃO
// Visualizar o fluxo de passos de forma didática
//
function StepCard({ icon, title, text, color }) {
  return (
    <div style={{
      background: '#f8fafc',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
        color,
        fontWeight: 'bold'
      }}>
        {icon} {title}
      </div>
      <p style={{
        margin: 0,
        fontSize: '12px',
        color: '#64748b',
        lineHeight: '1.4'
      }}>
        {text}
      </p>
    </div>
  );
}
```

---

### COMPONENTS

#### src/components/CardItem/index.jsx

```jsx
// src/components/pet/PetCardMapStyle.jsx
import React, { useState } from "react";
import {
  Star,
  MessageCircle,
  Scissors,
  Stethoscope,
  Car,
  ChevronDown,
  ChevronUp,
  MapPin,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/pet-card.css";

export default function PetCardMapStyle({ local, onOpenChat }) {
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);
  const [expanded, setExpanded] = useState(false);
  const isVip = Boolean(local.destaque);

  const imagem =
    typeof local.image_url === "string" && local.image_url.trim() !== ""
      ? local.image_url
      : "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
      }}
    >
      {/* IMAGEM */}
      <div className="relative w-full">

        <img
          src={imagem}
          alt={local.nome}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full"
          style={{ height: "160px", objectFit: "cover" }}
        />

        {/* BADGE VIP */}
        {isVip && (
          <div className="badge-vip">
            <Award size={14} />
            <span>VIP</span>
          </div>
        )}

        {/* STATUS */}
        {local.aberto_agora && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#22c55e",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "999px"
            }}
          >
            ABERTO AGORA
          </span>
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="pet-card p-md">
        <h3 className="pet-title">{local.nome}</h3>

        {/* NOTA */}
        {nota > 0 && (
          <div className="flex items-center gap-sm mt-xs text-sm">
            <Star size={14} fill="#facc15" color="#facc15" />
            <strong>{nota.toFixed(1)}</strong>
            <span>({avaliacoes} avaliações)</span>
          </div>
        )}

        {/* INFO */}
        <div className="pet-info-grid">
          {local.horario_fechamento && (
            <div className="pet-info-item">
              <span className="pet-info-icon">⏰</span>
              <span>Até {local.horario_fechamento}</span>
            </div>
          )}

          {local.tags?.includes("banho") && (
            <div className="pet-info-item">
              <Scissors size={14} />
              <span>Banho e Tosa</span>
            </div>
          )}

          {local.tags?.includes("vet") && (
            <div className="pet-info-item">
              <Stethoscope size={14} />
              <span>Veterinário</span>
            </div>
          )}

          {local.estacionamento && (
            <div className="pet-info-item">
              <Car size={14} />
              <span>Estacionamento</span>
            </div>
          )}
        </div>

        {/* EXPANDIR */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full mt-md flex justify-center items-center gap-sm cursor-pointer"
          style={{
            background: expanded ? "#f8fafc" : "transparent",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "10px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#334155"
          }}
        >
          <span className="text-center text-sm">
            Toque para ver endereço e mais informações
          </span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-sm"
            >
              <div
                className="flex flex-col gap-sm p-md"
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#475569",
                  border: "1px solid #e2e8f0"
                }}
              >
                {local.aberto_agora !== null && (
                  <div>{local.aberto_agora ? "🟢 Aberto agora" : "🔴 Fechado"}</div>
                )}

                {local.horario_fechamento && (
                  <div>⏰ Até {local.horario_fechamento}</div>
                )}

                {local.endereco && (
                  <div className="flex gap-sm items-start">
                    <MapPin size={16} className="mt-xs" />
                    <span>{local.endereco}</span>
                  </div>
                )}

                {local.estacionamento && <div>🅿️ Estacionamento disponível</div>}

                {Array.isArray(local.tags) && local.tags.length > 0 && (
                  <div className="flex gap-sm mt-xs">
                    {local.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          fontSize: "11px",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontWeight: 600
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <button
          className="btn-whatsapp mt-md w-full flex justify-center gap-sm"
          onClick={() => onOpenChat(local)}
        >
          <MessageCircle size={18} /> Falar no WhatsApp
        </button>
      </div>
    </div>
  );
}
```

#### src/components/ChatModal/index.jsx

```jsx
// ======================================================
// 📄 ChatModal.jsx
// Modal de Conversa + Captura de Lead (WhatsApp)
// ======================================================
//
// 🎯 PROPÓSITO
// - Simular um chat inicial humanizado
// - Qualificar o interesse do usuário
// - Capturar lead (nome + telefone)
// - Redirecionar para WhatsApp da loja
//
// 🧠 MODELO MENTAL
// - Conversa guiada por etapas (steps)
// - Bot inicia → usuário responde → lead é capturado
// - Supabase registra o lead com vínculo ao projeto
//
// 🔒 CONTRATO
// - Não decide regras de negócio do projeto
// - Não decide layout global
// - Apenas executa o fluxo de conversa
//

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, User, Phone } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

// ======================================================
// 🔹 COMPONENTE: ChatModal
// ======================================================
//
// 🔑 PROPS
// - local   → loja que receberá o contato
// - projeto → projeto/nicho (branding + vínculo)
// - onClose → callback para fechar o modal
//
export default function ChatModal({ local, projeto, onClose }) {

  // ==============================
  // 🔹 ESTADOS PRINCIPAIS
  // ==============================
  //
  // step:
  // 0 → mensagem inicial do bot
  // 1 → pergunta aberta do usuário
  // 2 → coleta de dados (lead)
  //
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [leadData, setLeadData] = useState({ nome: '', telefone: '' });
  const [isSending, setIsSending] = useState(false);

  // Ref para auto-scroll
  const messagesEndRef = useRef(null);

  // ==============================
  // 🔹 BOOTSTRAP DA CONVERSA
  // ==============================
  //
  // Inicia a conversa automaticamente
  //
  useEffect(() => {
    if (step === 0) {
      setTimeout(() => {
        addBotMessage(`Olá! Sou o assistente virtual da ${local.nome}. 🐶`);
        setTimeout(() => {
          addBotMessage('Como podemos te ajudar hoje?');
          setStep(1);
        }, 1000);
      }, 500);
    }
  }, [step, local.nome]);

  // ==============================
  // 🔹 AUTO-SCROLL
  // ==============================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  // ==============================
  // 🔹 HELPERS DE MENSAGEM
  // ==============================
  const addBotMessage = (text) =>
    setMessages(prev => [...prev, { sender: 'bot', text }]);

  const addUserMessage = (text) =>
    setMessages(prev => [...prev, { sender: 'user', text }]);

  // ==============================
  // 🔹 ETAPA 1: PRIMEIRA INTERAÇÃO
  // ==============================
  //
  // Usuário escreve livremente
  // Bot responde e avança para coleta de lead
  //
  const handleFirstInteraction = () => {
    if (!userInput.trim()) return;

    addUserMessage(userInput);
    setUserInput('');

    setTimeout(() => {
      addBotMessage('Perfeito! Vou transferir para um atendente humano.');
      setTimeout(() => {
        addBotMessage('Para isso, preciso só do seu Nome e WhatsApp.');
        setStep(2);
      }, 1000);
    }, 800);
  };

  // ==============================
  // 🔹 ETAPA 2: ENVIO DO LEAD
  // ==============================
  //
  // - Salva no Supabase
  // - Vínculo com projeto + loja
  // - Redireciona para WhatsApp
  //
  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!leadData.nome || !leadData.telefone) {
      alert('Preencha os dados!');
      return;
    }

    setIsSending(true);

    const { error } = await supabase
      .from('leads')
      .insert({
        nome: leadData.nome,
        telefone: leadData.telefone,
        loja_alvo: local.nome,
        mensagem_inicial:
          messages.find(m => m.sender === 'user')?.text || 'Interesse geral',
        projeto_id: projeto.id // 🔒 vínculo multi-tenant
      });

    if (error) {
      console.error('Erro Supabase:', error);
      alert('Erro ao salvar lead!');
      setIsSending(false);
      return;
    }

    addBotMessage('Tudo certo! Abrindo o WhatsApp…');

    setTimeout(() => {
      const storePhone = local.telefone;
      const text = encodeURIComponent(
        `Olá! Me chamo *${leadData.nome}*. Vim pelo ${projeto.nome} e gostaria de saber sobre: ${
          messages.find(m => m.sender === 'user')?.text
        }`
      );

      window.open(
        `https://wa.me/${storePhone}?text=${text}`,
        '_blank'
      );

      onClose();
    }, 1500);
  };

  // ==============================
  // 🔹 BRANDING DO PROJETO
  // ==============================
  const corBtn = projeto?.cor_primaria || '#075e54';

  // ==============================
  // 🔹 RENDERIZAÇÃO
  // ==============================
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '85vh',
          background: '#e5ddd5',
          display: 'flex',
          flexDirection: 'column',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.2)'
        }}
      >

        {/* ==========================
           🔹 HEADER DO CHAT
        =========================== */}
        <div
          style={{
            padding: '15px',
            background: corBtn,
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: corBtn,
                fontWeight: 'bold'
              }}
            >
              {local.nome.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {local.nome}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                Online agora
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* ==========================
           🔹 ÁREA DE MENSAGENS
        =========================== */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf:
                  msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                background:
                  msg.sender === 'bot' ? 'white' : '#dcf8c6',
                padding: '12px 16px',
                borderRadius: '8px',
                maxWidth: '85%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                fontSize: '15px',
                lineHeight: '1.4'
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* ==========================
           🔹 INPUT / FORMULÁRIO
        =========================== */}
        <div style={{ background: '#f0f0f0', padding: '10px' }}>

          {/* ETAPA 1 */}
          {step === 1 && (
            <div style={{ display: 'flex', gap: '10px', padding: '5px' }}>
              <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyPress={e =>
                  e.key === 'Enter' && handleFirstInteraction()
                }
                placeholder="Digite sua dúvida..."
                autoFocus
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '25px',
                  border: '1px solid #ccc',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleFirstInteraction}
                style={{
                  background: corBtn,
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Send size={20} />
              </button>
            </div>
          )}

          {/* ETAPA 2 */}
          {step === 2 && (
            <form
              onSubmit={handleLeadSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px',
                background: 'white',
                borderRadius: '15px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderBottom: '1px solid #eee',
                  padding: '5px'
                }}
              >
                <User size={18} color="#666" />
                <input
                  required
                  placeholder="Seu Nome"
                  value={leadData.nome}
                  onChange={e =>
                    setLeadData({ ...leadData, nome: e.target.value })
                  }
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: '8px'
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderBottom: '1px solid #eee',
                  padding: '5px'
                }}
              >
                <Phone size={18} color="#666" />
                <input
                  required
                  type="tel"
                  placeholder="Seu WhatsApp (com DDD)"
                  value={leadData.telefone}
                  onChange={e =>
                    setLeadData({
                      ...leadData,
                      telefone: e.target.value
                    })
                  }
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: '8px'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                style={{
                  marginTop: '5px',
                  background: '#25D366',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {isSending
                  ? 'Conectando…'
                  : 'Iniciar Conversa no WhatsApp ➤'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

### HOOKS

#### src/hooks/useDashboardData.jsx

```jsx
// ======================================================
// 📄 useDashboardData.jsx
// Hook de dados do Dashboard (CRUD + Estado)
// ======================================================

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// ======================================================
// 🔹 HOOK: useDashboardData
// ======================================================
//
// 🎯 INTENÇÃO GERAL
// Centralizar TODA a lógica de dados do Dashboard:
// - Buscar locais
// - Atualizar status (publicar / ocultar)
// - Editar dados do local
// - Excluir local
//
// 🧠 MODELO MENTAL
// - O Dashboard consome dados
// - Este hook controla:
//   • estado
//   • loading
//   • erro
//   • sincronização com o banco
//
// 🔒 CONTRATO
// - Nenhum JSX aqui
// - Nenhuma regra de filtro
// - Nenhuma regra de ordenação
// - Apenas dados e efeitos colaterais
//
export function useDashboardData(projetoId) {

  // ==============================
  // 🔹 ESTADOS PRINCIPAIS
  // ==============================
  //
  // locais  → lista de estabelecimentos do projeto
  // loading → estado global de carregamento
  // error   → erro simples (string)
  //
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ==============================
  // 🔹 FETCH DE LOCAIS
  // ==============================
  //
  // 🎯 Intenção:
  // Buscar todos os locais vinculados ao projeto
  //
  // 🛡️ Falha segura:
  // - Não quebra UI
  // - Retorna lista vazia
  //
  const fetchLocais = async () => {
    if (!projetoId) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('locais')
        .select('*')
        .eq('projeto_id', projetoId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setLocais(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar locais:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🔹 TOGGLE DE STATUS (PUBLICAR / OCULTAR)
  // ==============================
  //
  // 🎯 Intenção:
  // Alternar visibilidade do local no app
  //
  // 🧠 Regra:
  // PUBLICAR_APP ↔ RASCUNHO
  //
  // 🔒 Contrato:
  // - Atualiza banco
  // - Atualiza estado local
  // - Não refaz fetch completo
  //
  const toggleStatus = async (local) => {
    const novoStatus =
      local.status === 'PUBLICAR_APP'
        ? 'RASCUNHO'
        : 'PUBLICAR_APP';

    try {
      const { error } = await supabase
        .from('locais')
        .update({ status: novoStatus })
        .eq('id', local.id);

      if (error) throw error;

      // Atualização otimista do estado
      setLocais(locais.map(l =>
        l.id === local.id
          ? { ...l, status: novoStatus }
          : l
      ));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      throw err;
    }
  };

  // ==============================
  // 🔹 ATUALIZAR LOCAL (EDIÇÃO)
  // ==============================
  //
  // 🎯 Intenção:
  // Atualizar dados do local (nome, tags, destaque, etc)
  //
  // 🧠 Decisão:
  // Após update → refetch completo
  // (garante consistência total)
  //
  const updateLocal = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('locais')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchLocais();
    } catch (err) {
      console.error('Erro ao atualizar local:', err);
      throw err;
    }
  };

  // ==============================
  // 🔹 EXCLUIR LOCAL
  // ==============================
  //
  // 🎯 Intenção:
  // Remover definitivamente o local
  //
  // 🧠 Estratégia:
  // - Deleta no banco
  // - Remove do estado local
  //
  const deleteLocal = async (id) => {
    try {
      const { error } = await supabase
        .from('locais')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLocais(locais.filter(l => l.id !== id));
    } catch (err) {
      console.error('Erro ao deletar local:', err);
      throw err;
    }
  };

  // ==============================
  // 🔹 EFEITO DE INICIALIZAÇÃO
  // ==============================
  //
  // 🎯 Intenção:
  // Recarregar locais sempre que o projeto mudar
  //
  useEffect(() => {
    fetchLocais();
  }, [projetoId]);

  // ==============================
  // 🔹 API DO HOOK (RETORNO)
  // ==============================
  //
  // Tudo que o Dashboard pode fazer com dados
  //
  return {
    locais,
    loading,
    error,
    refetch: fetchLocais,
    toggleStatus,
    updateLocal,
    deleteLocal
  };
}
```

#### src/hooks/useDashboardFilters.jsx

```jsx
// ======================================================
// 📄 useDashboardFilters.jsx
// Hook de filtros + ordenação do Dashboard / App
// ======================================================

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import { useState, useMemo } from 'react';
import { FILTERS } from '../filters/filters.config';

// ======================================================
// 🔹 FUNÇÃO: aplicarOrdenacao
// ======================================================
//
// 🎯 INTENÇÃO
// Aplicar filtros de ORDENAÇÃO sobre uma lista de locais,
// respeitando a prioridade definida pelo projeto.
//
// 🧠 MODELO MENTAL
// - Ordena, nunca remove
// - Cada filtro soma um "score"
// - A ordem dos filtros define o peso
//
// 🔒 CONTRATO
// - Nunca quebra a listagem
// - Nunca lança erro para fora
// - Nunca muta o array original
//
// 🛡️ FALHA SEGURA
// - Se algo falhar → retorna lista original
//
function aplicarOrdenacao(locais, filtrosAtivos = []) {

  // Se não houver filtros ativos, retorna lista intacta
  if (!Array.isArray(filtrosAtivos) || filtrosAtivos.length === 0) {
    return locais;
  }

  // Criamos cópia para não mutar o array original
  const locaisOrdenados = [...locais];

  try {
    locaisOrdenados.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      filtrosAtivos.forEach((filtroId, index) => {
        const filtro = FILTERS[filtroId];

        // Ignora filtros inexistentes ou que não sejam de ordenação
        if (!filtro || filtro.comportamento !== 'ordenar') return;

        // Peso simples: filtros no início têm mais impacto
        const peso = filtrosAtivos.length - index;

        try {
          scoreA += (filtro.ordenar?.(a) || 0) * peso;
          scoreB += (filtro.ordenar?.(b) || 0) * peso;
        } catch {
          // Falha silenciosa por filtro individual
        }
      });

      return scoreB - scoreA;
    });
  } catch {
    // Falha total → não ordena
    return locais;
  }

  return locaisOrdenados;
}

// ======================================================
// 🔹 HOOK: useDashboardFilters
// ======================================================
//
// 🎯 INTENÇÃO GERAL
// Centralizar TODA a lógica de:
// - Filtros básicos de UI (status, categoria)
// - Ordenação baseada nos filtros ativos do projeto
//
// 🧠 MODELO MENTAL
// - Filtrar primeiro
// - Ordenar depois
// - Nunca quebrar listagem
//
// 🔒 CONTRATO
// - Não conhece Supabase
// - Não conhece Dashboard
// - Apenas recebe dados e retorna dados
//
export function useDashboardFilters(locais, filtrosAtivosProjeto = []) {

  // ==============================
  // 🔹 ESTADOS DE UI
  // ==============================
  //
  // filtroStatus    → publicado / oculto / todos
  // filtroCategoria → tag ativa (ou null)
  //
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  // ==============================
  // 🔹 PIPELINE DE FILTROS
  // ==============================
  //
  // Ordem intencional:
  // 1️⃣ Filtragem básica (restrição)
  // 2️⃣ Ordenação inteligente (ranking)
  //
  const locaisFiltrados = useMemo(() => {

    // ------------------------------
    // 1️⃣ FILTRAGEM BÁSICA (EXISTENTE)
    // ------------------------------
    //
    // 🎯 Intenção:
    // Restringir resultados com base em UI simples
    //
    const filtrados = locais.filter(local => {

      // Status: publicados
      if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') {
        return false;
      }

      // Status: ocultos
      if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') {
        return false;
      }

      // Categoria / Tag
      if (filtroCategoria && !local.tags?.includes(filtroCategoria)) {
        return false;
      }

      return true;
    });

    // ------------------------------
    // 2️⃣ ORDENAÇÃO POR PROJETO
    // ------------------------------
    //
    // 🎯 Intenção:
    // Reordenar resultados com base nos filtros
    // ativados no dashboard do projeto
    //
    const filtrosAtivosValidos = Array.isArray(filtrosAtivosProjeto)
      ? filtrosAtivosProjeto
      : [];

    return aplicarOrdenacao(filtrados, filtrosAtivosValidos);

  }, [
    locais,
    filtroStatus,
    filtroCategoria,
    filtrosAtivosProjeto
  ]);

  // ==============================
  // 🔹 API DO HOOK (RETORNO)
  // ==============================
  //
  // Tudo que a UI pode usar
  //
  return {
    filtroStatus,
    setFiltroStatus,
    filtroCategoria,
    setFiltroCategoria,
    locaisFiltrados
  };
}
```

---

### UTILS

#### src/utils/constants.js

```javascript
// ======================================================
// 📄 constants.js
// Constantes globais do App / Dashboard
// ======================================================
//
// 🎯 PROPÓSITO DESTE ARQUIVO
// Centralizar TODAS as constantes de domínio:
// - Tags oficiais
// - Status
// - Tema
// - Definição de filtros do app
//
// 🧠 MODELO MENTAL
// - Nada aqui contém lógica
// - Nada aqui acessa banco
// - Tudo aqui é reutilizável entre projetos
//
// 🔒 CONTRATO
// - Arquivo seguro para edição por humanos
// - Mudanças aqui não quebram a aplicação
// - Pode ser lido como documentação viva
//

// ======================================================
// 🔹 TAGS OFICIAIS (CATEGORIAS)
// ======================================================
//
// 🎯 INTENÇÃO
// Definir as categorias possíveis de um local
//
// 🧠 USO
// - Dashboard (edição do local)
// - Filtros do app
// - Cards visuais
//
// 🔒 CONTRATO
// - id   → usado em código / banco
// - label → exibido ao usuário
// - color → identidade visual da tag
//
export const TAGS_OFICIAIS = [
  { id: 'banho', label: 'Banho', color: '#3b82f6' },
  { id: 'vet',   label: 'Vet',   color: '#10b981' },
  { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
  { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
];

// ======================================================
// 🔹 STATUS DE FILTRO (UI)
// ======================================================
//
// 🎯 INTENÇÃO
// Controlar visualização no Dashboard
//
// 🧠 USO
// - Filtro rápido: todos / publicados / ocultos
//
export const STATUS_FILTROS = ['todos', 'publicados', 'ocultos'];

// ======================================================
// 🔹 STATUS DE DADOS (BANCO)
// ======================================================
//
// 🎯 INTENÇÃO
// Padronizar valores usados no banco
//
// 🧠 USO
// - Comparações
// - Toggle de visibilidade
//
export const STATUS_TYPES = {
  PUBLICADO: 'PUBLICAR_APP',
  RASCUNHO: 'RASCUNHO'
};

// ======================================================
// 🔹 TEMA PADRÃO DO SISTEMA
// ======================================================
//
// 🎯 INTENÇÃO
// Definir cores base do app
//
// 🧠 MODELO
// - Pode ser sobrescrito por projeto
// - Nunca depende de CSS externo
//
export const THEME_COLORS = {
  primary: '#2563eb',
  bg: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',
  textSec: '#64748b',
  border: '#e2e8f0',
  danger: '#ef4444',
  success: '#22c55e'
};

// ======================================================
// 🔹 FUNÇÃO: getTheme
// ======================================================
//
// 🎯 INTENÇÃO
// Gerar tema final baseado no projeto
//
// 🧠 REGRA
// - Projeto pode sobrescrever apenas cor primária
// - Todo o resto permanece consistente
//
export const getTheme = (projeto) => ({
  primary: projeto?.cor_primaria || THEME_COLORS.primary,
  bg: THEME_COLORS.bg,
  card: THEME_COLORS.card,
  text: THEME_COLORS.text,
  textSec: THEME_COLORS.textSec,
  border: THEME_COLORS.border,
  danger: THEME_COLORS.danger,
  success: THEME_COLORS.success
});

// ======================================================
// 🔹 FILTROS DISPONÍVEIS NO APP
// ======================================================
//
// 🎯 INTENÇÃO
// Definir QUAIS filtros existem no sistema
//
// 🧠 MODELO MENTAL
// - Código define o que é possível
// - Dashboard decide o que está ativo
//
// 🔒 CONTRATO
// - id           → chave técnica
// - label        → nome exibido
// - description  → explicação humana
// - group        → filtro ou ordenação
//
export const FILTROS_APP = [
  {
    id: 'categoria',
    label: 'Categoria',
    description: 'Banho, Vet, Loja, Hotel',
    group: 'filtro'
  },
  {
    id: 'bem_avaliados',
    label: 'Bem avaliados ⭐',
    description: 'Nota ≥ 4.5 e pelo menos 40 avaliações',
    group: 'filtro'
  },
  {
    id: 'com_instagram',
    label: 'Com Instagram 📸',
    description: 'Exibe apenas lojas com Instagram',
    group: 'filtro'
  },
  {
    id: 'ordenar_melhor_nota',
    label: 'Ordenar por melhor nota',
    description: 'Usuário pode priorizar qualidade',
    group: 'ordenacao'
  },
  {
    id: 'ordenar_mais_avaliados',
    label: 'Ordenar por mais avaliados',
    description: 'Usuário pode priorizar popularidade',
    group: 'ordenacao'
  }
];

// ======================================================
// 🔹 FILTROS PADRÃO ATIVOS (MVP)
// ======================================================
//
// 🎯 INTENÇÃO
// Garantir experiência mínima sem configuração
//
// 🧠 REGRA
// - Aplicado quando projeto ainda não definiu filtros
// - Pode ser alterado no dashboard
//
export const DEFAULT_FILTROS_APP = [
  'categoria',
  'bem_avaliados',
  'com_instagram'
];
```

#### src/utils/textLogic.js

```javascript
// Funções puras de processamento de texto
// Extraia a lógica do AdminGenerator para cá

export const processText = (inputText) => {
  // Sua lógica aqui
  return inputText.trim()
}

export const validateInput = (text) => {
  if (!text || text.trim() === '') {
    return { valid: false, error: 'Campo obrigatório' }
  }
  return { valid: true, error: null }
}```

---

## 6. ESTILOS

### src/assets/global.css

```css
/* ======================================================
   📄 index.css / global.css
   Base global da aplicação
   ====================================================== */

/* ======================================================
   🔹 RESET BÁSICO
   ====================================================== */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

/* ======================================================
   🔹 VARIÁVEIS & TIPOGRAFIA BASE
   ====================================================== */
:root {
  /* Tipografia */
  --font-main: system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  /* Cores base */
  --color-bg: #f8fafc;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;

  /* Brand (ajustável depois) */
  --color-primary: #2563eb;
  --color-primary-soft: #dbeafe;

  /* App shell */
  --app-max-width: 420px;
}

body {
  font-family: var(--font-main);
  color: var(--color-text);
  background: var(--color-bg);

  /* Centralização HORIZONTAL tipo app */
  display: flex;
  justify-content: center;

  /* ⚠️ NUNCA centralizar verticalmente no body */
}

/* ======================================================
   🔹 ROOT DO REACT
   ====================================================== */
#root {
  width: 100%;
  max-width: var(--app-max-width);
  min-height: 100vh;

  /* Importante para páginas longas */
  display: block;
}

/* ======================================================
   🔹 LINKS
   ====================================================== */
a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* ======================================================
   🔹 BOTÕES (BASE NEUTRA)
   ====================================================== */
button {
  font-family: inherit;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: #fff;
  color: inherit;
  cursor: pointer;

  transition: background 0.2s ease, border-color 0.2s ease;
}

button:hover {
  background: #f1f5f9;
}

/* ======================================================
   🔹 SCROLLBAR (DESKTOP)
   ====================================================== */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 6px;
}

/* ======================================================
   🔹 SCROLLBAR (MOBILE / APP-LIKE)
   ====================================================== */
@media (max-width: 768px) {
  ::-webkit-scrollbar {
    display: none;
  }
}
/* ======================================================
   📄 styles.css (ou index.css / App.css)
   Estilos Globais Base do Projeto
====================================================== */

/* ======================================================
   🔹 ROOT CONTAINER
======================================================
🎯 Intenção:
Definir o container principal da aplicação React (#root)

🧠 O que controla:
- Largura máxima do app
- Centralização horizontal
- Espaçamento interno
- Alinhamento de texto padrão

🔒 Observações:
- Este estilo impacta TODA a aplicação
- Qualquer layout quebrado geralmente começa aqui
*/
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

/* ======================================================
   🔹 LOGO BASE
======================================================
🎯 Intenção:
Estilo padrão para logos (ex: Vite / React)

🧠 O que controla:
- Tamanho
- Área de clique
- Otimização de renderização (will-change)
- Transição suave de hover

🔒 Observações:
- Não usar para logos de negócio
- Apenas branding técnico/dev
*/
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

/* ======================================================
   🔹 LOGO — HOVER GENÉRICO
======================================================
🎯 Intenção:
Feedback visual ao passar o mouse

🧠 O que controla:
- Drop shadow suave
- Destaque visual

🔒 Observações:
- Cor genérica (azulada)
*/
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

/* ======================================================
   🔹 LOGO — VARIAÇÃO REACT
======================================================
🎯 Intenção:
Diferenciar logo do React visualmente

🧠 O que controla:
- Cor do glow no hover

🔒 Observações:
- Apenas visual
*/
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

/* ======================================================
   🔹 ANIMAÇÃO: LOGO GIRANDO
======================================================
🎯 Intenção:
Animação demonstrativa (exemplo / showcase)

🧠 O que controla:
- Rotação contínua
- Usada apenas em ambientes de demo

🔒 Observações:
- Não usar em produção final
*/
@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ======================================================
   🔹 PREFERÊNCIA DE MOVIMENTO
======================================================
🎯 Intenção:
Respeitar acessibilidade do usuário

🧠 O que controla:
- Só anima se o usuário NÃO tiver redução de movimento ativada

🔒 Observações:
- Boa prática obrigatória em apps modernos
*/
@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

/* ======================================================
   🔹 CARD GENÉRICO
======================================================
🎯 Intenção:
Estilo base para cards de exemplo

🧠 O que controla:
- Espaçamento interno

🔒 Observações:
- Não confundir com StoreCard / Card do app
*/
.card {
  padding: 2em;
}

/* ======================================================
   🔹 TEXTO AUXILIAR / DOCUMENTAÇÃO
======================================================
🎯 Intenção:
Estilo para textos secundários (ex: links de docs)

🧠 O que controla:
- Cor neutra
- Baixa hierarquia visual

🔒 Observações:
- Não usar para conteúdo principal
*/
.read-the-docs {
  color: #888;
}
```

### src/assets/theme.css

```css
/* =========================================================
   THEME — Tokens globais do Design System
   ---------------------------------------------------------
   Fonte única de cores, tipografia, radius e sombras.
   NÃO aplicar layout nem estilos de componentes aqui.
   ========================================================= */

/* =========================================================
   APP THEME TOKENS (Pet Lovers vibe) — editável depois
   ========================================================= */

:root {
  /* Brand */
  --app-primary: #6d5dfc;
  --app-primary-2: #8b7cff;
  --app-primary-contrast: #ffffff;

  /* Backgrounds */
  --app-bg: #f6f7fb;
  --app-surface: #ffffff;
  --app-surface-soft: rgba(255, 255, 255, 0.72);

  /* Text */
  --app-text: #0f172a;
  --app-text-muted: #64748b;

  /* Borders */
  --app-border: rgba(15, 23, 42, 0.10);

  /* Shadow / Elevation */
  --app-shadow-card: 0 10px 28px rgba(0, 0, 0, 0.12);
  --app-shadow-float: 0 14px 34px rgba(0, 0, 0, 0.16);

  /* Radius */
  --app-radius-lg: 24px;
  --app-radius-md: 16px;
  --app-radius-sm: 12px;

  /* Header gradient */
  --app-header-gradient: linear-gradient(135deg, var(--app-primary), var(--app-primary-2));
}



:root {
  /* -------------------------------------------------------
     CORES
     ------------------------------------------------------- */

  --color-primary: #1a73e8;
  --color-primary-soft: #e8f0fe;

  --color-bg: #f8fafc;
  --color-card: #ffffff;

  --color-text: #1f2933;
  --color-text-muted: #6b7280;

  --color-border: #e5e7eb;

  --color-success: #16a34a;
  --color-warning: #f59e0b;
  --color-danger: #dc2626;

  /* -------------------------------------------------------
     TIPOGRAFIA
     ------------------------------------------------------- */

  --font-main: 'Inter', system-ui, -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

  /* -------------------------------------------------------
     RADIUS
     ------------------------------------------------------- */

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  /* -------------------------------------------------------
     SOMBRAS
     ------------------------------------------------------- */

  --shadow-soft: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* ---------------------------------------------------------
   BASE GLOBAL (mínimo necessário)
   --------------------------------------------------------- */

body {
  margin: 0;
  font-family: var(--font-main);
  background: var(--color-bg);
  color: var(--color-text);
}
```

---

## 7. ESTATÍSTICAS

### Contagem de Arquivos

| Tipo | Quantidade | Linhas de Código |
|------|------------|------------------|
| JSX  | 22 | 3957 |
| JS   | 10  | 667 |
| CSS  | 13 | 1157 |

### Distribuição por Pasta

```
      7 src/styles
      6 src/components/ui
      6 src/components/dashboard
      3 src/utils
      3 src/services
      3 src/assets
      3 src
      2 src/pages/Viewer
      2 src/pages/Manager
      2 src/hooks
      2 src/components/pet
      2 src/components/CardItem
      1 src/pages/Processor
      1 src/context
      1 src/components/ChatModal
      1 src/components
```

### Componentes Principais

```
ChatModal
CardItem
```

### Pages

```
Viewer
Manager
Processor
```

---

## 🎯 FIM DO SNAPSHOT

**Arquivo gerado com sucesso!**

Este snapshot pode ser compartilhado para análise, documentação ou debugging.

