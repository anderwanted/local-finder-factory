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
        <div style={{ display: 'flex', gap: '8px' }}>
          
          {/* TOGGLE VISIBILIDADE */}
          <button
            onClick={() => onToggleStatus(local)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: isVisible ? '#f1f5f9' : '#fee2e2',
              color: isVisible ? theme.textSec : theme.danger
            }}
            title={isVisible ? 'Ocultar' : 'Publicar'}
          >
            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>

          {/* EDITAR */}
          <button
            onClick={() => onEdit(local)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: '#dbeafe',
              color: '#2563eb'
            }}
            title="Editar"
          >
            <Edit size={18} />
          </button>

          {/* EXCLUIR */}
          <button
            onClick={() => onDelete(local.id)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: '#fef2f2',
              color: theme.danger
            }}
            title="Excluir"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
