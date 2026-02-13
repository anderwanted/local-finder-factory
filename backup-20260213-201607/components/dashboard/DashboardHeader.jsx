// ======================================================
// 📄 DashboardHeader.jsx
// Função: Cabeçalho principal do Dashboard do Projeto
// ======================================================

// 🔹 DEPENDÊNCIAS
// Componentes visuais e ícones
import React from 'react';
import { Store, ExternalLink } from 'lucide-react';

// ======================================================
// 🔹 DASHBOARD HEADER — IDENTIDADE DO PROJETO
// ======================================================
//
// 🎯 INTENÇÃO
// Exibir identidade básica do projeto (nome + ícone)
// e fornecer acesso rápido ao App público.
//
// 🔒 CONTRATO
// - Deve ser sempre simples e rápido de renderizar
// - Não depende de dados pesados
// - Não deve conter lógica de negócio
//
// 🚫 NÃO FAZER AQUI
// - Não adicionar filtros
// - Não adicionar métricas
// - Não adicionar lógica de permissão
//
// 🚧 FUTURO
// - Pode exibir status do projeto (ativo/inativo)
// - Pode exibir badge de plano (free / pro)
//
export default function DashboardHeader({ projeto, theme }) {
  return (
    // ==============================
    // 🔹 CONTAINER PRINCIPAL
    // ==============================
    <header
      style={{
        background: theme.card,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      {/* ==============================
          🔹 IDENTIDADE DO PROJETO
          ============================== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        
        {/* ÍCONE / LOGO DO PROJETO */}
        <div
          style={{
            width: '40px',
            height: '40px',
            background: theme.primary,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          <Store size={22} />
        </div>

        {/* NOME DO PROJETO */}
        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
          {projeto.nome}
        </h1>
      </div>

      {/* ==============================
          🔹 AÇÃO PRINCIPAL
          ============================== */}
      {/* CTA DE NAVEGAÇÃO — NÃO É CONVERSÃO */}
      <button
        onClick={() => window.location.href = `/${projeto.slug}`}
        style={{
          padding: '8px 16px',
          background: 'white',
          border: `1px solid ${theme.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}
      >
        <ExternalLink size={16} />
        Ver App
      </button>
    </header>
  );
}
