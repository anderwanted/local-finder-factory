// src/hooks/useFavoritos.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'petfinder_favoritos';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setFavoritos(JSON.parse(saved));
    } catch (err) {
      setFavoritos([]);
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
    } catch (err) {
      console.error('Erro ao salvar favoritos:', err);
    }
  }, [favoritos]);

  const isFavorito = (id) => favoritos.includes(String(id));

  const toggleFavorito = (id) => {
    const strId = String(id);
    setFavoritos(prev =>
      prev.includes(strId)
        ? prev.filter(f => f !== strId)
        : [...prev, strId]
    );
  };

  return {
    favoritos,
    isFavorito,
    toggleFavorito,
    total: favoritos.length,
    limpar: () => setFavoritos([])
  };
}
