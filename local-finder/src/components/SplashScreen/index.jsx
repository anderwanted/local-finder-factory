// src/components/SplashScreen/index.jsx
import React, { useEffect, useState } from 'react';
import './splash.css';

export function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Espera 2 segundos e depois faz fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Após animação de fade (500ms), notifica que terminou
      setTimeout(() => {
        onFinish?.();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`splash-screen ${!isVisible ? 'fade-out' : ''}`}>
      <div className="splash-content">
        {/* Logo / Ícone */}
        <div className="splash-logo">
          <div className="splash-paw">🐾</div>
        </div>

        {/* Nome do app */}
        <h1 className="splash-title">Pet Finder</h1>
        <p className="splash-subtitle">Encontre os melhores serviços</p>

        {/* Loading dots */}
        <div className="splash-loading">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
}
