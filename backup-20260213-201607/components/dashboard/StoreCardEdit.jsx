// ======================================================
// 📄 StoreCardEdit.jsx
// Função: Edição inline de um estabelecimento (Dashboard)
// ======================================================

// 🔹 DEPENDÊNCIAS
import React, { useState } from 'react';

// 🔹 CONSTANTES DE PRODUTO
// Lista oficial de categorias/tags disponíveis
import { TAGS_OFICIAIS } from '../../utils/constants';

// ======================================================
// 🔹 STORE CARD EDIT — MODO EDIÇÃO
// ======================================================
//
// 🎯 INTENÇÃO
// Permitir a edição rápida dos principais atributos do local:
// - Nome
// - Destaque (indireto, via tags no futuro)
// - Categorias (tags)
//
// 🔒 CONTRATO
// - Este componente NÃO salva direto no banco
// - Apenas coleta dados e delega o save
// - Não altera visibilidade (status)
// - Não altera filtros globais
//
// 🧠 UX
// - Edição inline, sem navegação
// - Ações claras: Salvar ou Cancelar
//
// 🚫 NÃO FAZER AQUI
// - Não chamar Supabase diretamente
// - Não aplicar validações complexas
// - Não alterar ranking
//
// 🚧 FUTURO
// - Adicionar edição de telefone / WhatsApp
// - Adicionar toggle de destaque explícito
// - Adicionar preview do card público
//
export default function StoreCardEdit({ local, theme, onSave, onCancel }) {

  // ==============================
  // 🔹 ESTADO LOCAL DO FORMULÁRIO
  // ==============================
  //
  // 🎯 Intenção:
  // Inicializar o formulário com dados atuais do local
  //
  const [formData, setFormData] = useState({
    nome: local.nome,
    destaque: local.destaque,
    tags: local.tags || []
  });

  // ==============================
  // 🔹 TOGGLE DE TAG
  // ==============================
  //
  // 🎯 Intenção:
  // Adicionar ou remover categorias do local
  //
  const toggleTag = (tagId) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(t => t !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  // ==============================
  // 🔹 SUBMISSÃO DO FORMULÁRIO
  // ==============================
  //
  // 🔒 CONTRATO
  // - Delegar persistência ao componente pai
  // - Nunca salvar diretamente aqui
  //
  const handleSubmit = () => {
    onSave(local.id, formData);
  };

  // ==============================
  // 🔹 RENDER DO CARD DE EDIÇÃO
  // ==============================
  return (
    <div
      style={{
        background: theme.card,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* ==============================
            🔹 TÍTULO DE CONTEXTO
            ============================== */}
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
          Editando: {local.nome}
        </div>

        {/* ==============================
            🔹 CAMPO — NOME DO LOCAL
            ============================== */}
        <input
          value={formData.nome}
          onChange={e =>
            setFormData({ ...formData, nome: e.target.value })
          }
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: `1px solid ${theme.border}`,
            outline: 'none'
          }}
          placeholder="Nome do local"
        />

        {/* ==============================
            🔹 TAGS / CATEGORIAS
            ============================== */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {TAGS_OFICIAIS.map(tag => {
            const ativo = formData.tags.includes(tag.id);

            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${theme.border}`,
                  background: ativo ? tag.color : 'white',
                  color: ativo ? 'white' : theme.textSec,
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: '600'
                }}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {/* ==============================
            🔹 AÇÕES
            ============================== */}
        <div style={{ display: 'flex', gap: '10px' }}>
          
          {/* SALVAR */}
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '10px',
              background: theme.success,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Salvar
          </button>
          
          {/* CANCELAR */}
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              background: '#f1f5f9',
              color: theme.text,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
