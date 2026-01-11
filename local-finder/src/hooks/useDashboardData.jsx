// src/hooks/useDashboardData.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useDashboardData(projetoId) {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const toggleStatus = async (local) => {
    const novoStatus = local.status === 'PUBLICAR_APP' ? 'RASCUNHO' : 'PUBLICAR_APP';
    
    try {
      const { error } = await supabase
        .from('locais')
        .update({ status: novoStatus })
        .eq('id', local.id);

      if (error) throw error;

      setLocais(locais.map(l => 
        l.id === local.id ? { ...l, status: novoStatus } : l
      ));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      throw err;
    }
  };

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

  useEffect(() => {
    fetchLocais();
  }, [projetoId]);

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