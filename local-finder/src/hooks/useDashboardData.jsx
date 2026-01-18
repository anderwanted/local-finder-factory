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
