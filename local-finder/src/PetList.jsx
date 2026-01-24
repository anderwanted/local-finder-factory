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
import { supabase } from './supabaseClient';


// Componentes
import ChatModal from './ChatModal';
//import PetCardClassic from './components/pet/PetCardClassic';
import PetCardMapStyle from './components/pet/PetCardMapStyle';
import './styles/petlist.css';



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

    // Categoria
    if (hasFiltro('categoria') && filtroCategoria) {
      resultado = resultado.filter(
        l =>
          Array.isArray(l.tags) &&
          l.tags.includes(filtroCategoria)
      );
    }

    // Ordenação padrão
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
    <div
      style={{
        background: 'var(--bg-app)',
        minHeight: '100vh',
        padding: '16px'
      }}
    >
      {/* HEADER SIMPLES */}
      <header style={{ marginBottom: '16px' }}>
        <h1 style={{ margin: 0 }}>{projeto.nome}</h1>
      </header>

      {/* FILTROS FIXOS NO TOPO */}
      {hasFiltro('categoria') && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
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
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
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
      {loading && <p>Carregando...</p>}

      {!loading && (
        <div className="petlist-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
        style={{
          margin: '20px auto',
          display: 'block',
          padding: '12px 20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: '#fff',
          fontWeight: 600,
          cursor: 'pointer'
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
