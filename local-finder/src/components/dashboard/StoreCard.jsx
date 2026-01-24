// ======================================================
// 📄 StoreCard.jsx
// Função: Card administrativo de um estabelecimento
// ======================================================

// 🔹 DEPENDÊNCIAS
// Ícones de ação administrativa
import React from 'react';
import { Eye, EyeOff, Edit, Trash2, Star } from 'lucide-react';

// ======================================================
// 🔹 STORE CARD — VISÃO ADMINISTRATIVA
// ======================================================
//
// 🎯 INTENÇÃO
// Exibir um estabelecimento no Dashboard permitindo:
// - Visualizar dados básicos
// - Controlar visibilidade no App
// - Editar informações
// - Excluir o registro
//
// 🔒 CONTRATO
// - Este card NÃO é conversão
// - Não deve conter CTA de WhatsApp
// - Não deve conter lógica de ranking
//
// 🧠 DIFERENÇA IMPORTANTE
// Este card NÃO é o mesmo da PetList.
// Aqui o foco é controle, não atração.
//
// 🚫 NÃO FAZER AQUI
// - Não aplicar filtros
// - Não aplicar ordenação
// - Não navegar para o App
//
// 🚧 FUTURO
// - Pode exibir métricas (cliques, leads)
// - Pode exibir badges extras (ex: “premium”)
//
export default function StoreCard({
  local,
  theme,
  onToggleStatus,
  onEdit,
  onDelete
}) {

  // ==============================
  // 🔹 ESTADO DERIVADO
  // ==============================
  //
  // 🎯 Intenção:
  // Determinar rapidamente se o local está visível no App
  //
  const isVisible = local.status === 'PUBLICAR_APP';

  // ==============================
  // 🔹 RENDER DO CARD
  // ==============================
  return (
    <div
      style={{
        background: theme.card,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        padding: '16px',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* ==============================
            🔹 INFORMAÇÕES DO LOCAL
            ============================== */}
        <div>
          
          {/* NOME + DESTAQUE */}
          <div
            style={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {local.nome}

            {/* BADGE DE DESTAQUE (VISUAL) */}
            {local.destaque && (
              <Star size={14} fill="#f59e0b" color="#f59e0b" />
            )}
          </div>

          {/* ENDEREÇO */}
          <div
            style={{
              fontSize: '12px',
              color: theme.textSec,
              marginTop: '4px'
            }}
          >
            {local.endereco || 'Sem endereço cadastrado'}
          </div>
        </div>

        {/* ==============================
            🔹 AÇÕES ADMINISTRATIVAS
            ============================== */}
<div
  style={{
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    marginTop: '12px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '12px'
  }}
>
  {/* VISIBILIDADE */}
  <button
    onClick={() => onToggleStatus(local)}
    style={{
      padding: '8px 14px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      background:
        local.status === 'PUBLICAR_APP'
          ? 'var(--cor-primaria)'
          : '#e2e8f0',
      color:
        local.status === 'PUBLICAR_APP'
          ? '#fff'
          : '#475569'
    }}
  >
    {local.status === 'PUBLICAR_APP'
      ? '👁 Visível no App'
      : '🚫 Oculto'}
  </button>

  {/* EDITAR */}
  <button
    onClick={() => onEdit(local)}
    style={{
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-card)',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      fontSize: '13px'
    }}
  >
    ✏️ Editar
  </button>

  {/* EXCLUIR */}
  <button
    onClick={() => onDelete(local.id)}
    style={{
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid #fecaca',
      background: '#fee2e2',
      color: '#b91c1c',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 600
    }}
  >
    🗑 Excluir
  </button>
</div>

      </div>
    </div>
  );
}
