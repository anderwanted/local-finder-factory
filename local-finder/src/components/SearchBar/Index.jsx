// src/components/SearchBar/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './search-bar.css';

export function SearchBar({ value, onChange, total }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={`search-wrapper ${focused ? 'focused' : ''}`}>
      <div className="search-icon">
        <Search size={18} />
      </div>

      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar estabelecimento..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="search-input"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />

      {/* Contador sutil */}
      {value && total !== undefined && (
        <span className="search-counter">
          {total}
        </span>
      )}

      {/* Botão limpar */}
      {value && (
        <button
          className="search-clear"
          onClick={handleClear}
          aria-label="Limpar busca"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
} 
