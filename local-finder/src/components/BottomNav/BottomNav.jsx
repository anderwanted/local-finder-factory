// src/components/BottomNav/index.jsx
import React from 'react';
import { Home, Heart, User, Search } from 'lucide-react';
import './bottom-nav.css';

export function BottomNav({ activeTab, onTabChange, favoritosCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'favoritos', label: 'Favoritos', icon: Heart, badge: favoritosCount },
    { id: 'perfil', label: 'Perfil', icon: User }
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
              aria-label={tab.label}
            >
              <div className="nav-icon-wrapper">
                <Icon 
                  size={24} 
                  fill={isActive && tab.id === 'favoritos' ? '#EF4444' : 'none'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {tab.badge > 0 && (
                  <span className="nav-badge">{tab.badge}</span>
                )}
              </div>
              <span className="nav-label">{tab.label}</span>
              
              {/* Indicador ativo */}
              {isActive && <div className="nav-indicator" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
