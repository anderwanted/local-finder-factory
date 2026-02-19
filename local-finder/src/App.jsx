// src/App.jsx - COM SPLASH + BOTTOM NAV
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { supabase } from './services/supabaseClient';

// Componentes
import { SplashScreen } from './components/SplashScreen';
import { BottomNav } from './components/BottomNav';
import PetList from './pages/Viewer';
import Manager from './pages/Manager';
import Processor from './pages/Processor';
import { useFavoritos } from './hooks/useFavoritos';

// CSS global
import './assets/global.css';

// ==========================================
// HOME FACTORY - Carrega projeto dinamicamente
// ==========================================
function HomeFactory() {
  const { slug } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const { total: favoritosCount } = useFavoritos();

  useEffect(() => {
    async function carregarProjeto() {
      const { data } = await supabase
        .from('projetos')
        .select('*')
        .eq('slug', slug)
        .single();
      
      setProjeto(data);
      setLoading(false);
    }
    carregarProjeto();
  }, [slug]);

  // Handler da navbar
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Scroll to top ao trocar de aba
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // TODO: Implementar navegação entre telas
    if (tab === 'favoritos') {
      // Filtrar favoritos na PetList
      console.log('Mostrar favoritos');
    } else if (tab === 'perfil') {
      console.log('Abrir perfil (futuro)');
    } else if (tab === 'search') {
      // Focar no campo de busca
      document.querySelector('.search-input')?.focus();
    }
  };

  if (loading) return null; // Splash cuida do loading

  return (
    <>
      <PetList projeto={projeto} activeTab={activeTab} />
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        favoritosCount={favoritosCount}
      />
    </>
  );
}

// ==========================================
// APP PRINCIPAL
// ==========================================
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* SPLASH SCREEN */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* APP */}
      <BrowserRouter>
        <Routes>
          {/* Viewer (App do usuário) */}
          <Route path="/:slug" element={<HomeFactory />} />
          
          {/* Manager (Admin) */}
          <Route path="/:slug/manager" element={<Manager />} />
          
          {/* Processor (Sistema) */}
          <Route path="/processor" element={<Processor />} />
          
          {/* Redirect */}
          <Route path="/" element={<Navigate to="/pets" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
