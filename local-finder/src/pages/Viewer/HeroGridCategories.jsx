// Adicione este componente no topo do seu Viewer/index.jsx
// ANTES dos filtros atuais

import React from "react";
import { Store, Scissors, Stethoscope, Hotel, Sparkles, Grid3x3 } from "lucide-react";
import "./hero-grid.css";

export function HeroGridCategories({ onFilterChange, currentFilter }) {
  const categories = [
    { id: 'todos', label: 'Todos', icon: Grid3x3, color: 'gray' },
    { id: 'loja', label: 'Pet Shop', icon: Store, color: 'orange' },
    { id: 'banho', label: 'Banho e Tosa', icon: Scissors, color: 'blue' },
    { id: 'vet', label: 'Veterinário', icon: Stethoscope, color: 'green' },
    { id: 'hotel', label: 'Hotel', icon: Hotel, color: 'purple' },
    { id: 'vip', label: 'VIP', icon: Sparkles, color: 'vip' }
  ];

  return (
    <div className="hero-grid-section">
      <div className="hero-grid-header">
        <h2 className="hero-grid-title">Encontre Serviços para seu Pet</h2>
        <p className="hero-grid-subtitle">Escolha a categoria que você precisa</p>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = currentFilter === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange(cat.id)}
              className={`category-card ${cat.color} ${isActive ? 'active' : ''}`}
            >
              <div className="category-icon">
                <Icon size={24} />
              </div>
              <span className="category-label">{cat.label}</span>
              {isActive && <div className="active-indicator" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// USO NO VIEWER/INDEX.JSX:
// ============================================
/*

import { HeroGridCategories } from './HeroGridCategories'; // ou ajuste o path

function Viewer() {
  const [currentFilter, setCurrentFilter] = useState('todos');
  
  // ... resto do código

  return (
    <div className="app-shell">
      {/* NOVO HERO COM GRID *//*}
      <HeroGridCategories 
        onFilterChange={setCurrentFilter}
        currentFilter={currentFilter}
      />

      {/* Resto do conteúdo (pode manter ou remover filtros antigos) *//*}
      <div className="petlist-container">
        {/* cards aqui *//*}
      </div>
    </div>
  );
}

*/
