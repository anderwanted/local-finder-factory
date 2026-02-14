// ======================================================
// 📄 ProjectFiltersPanel.jsx
// Função: Painel de controle dos filtros ativos por projeto
// ======================================================

// 🔹 DEPENDÊNCIAS EXTERNAS
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

// 🔹 CONSTANTES DE PRODUTO
// - FILTROS_APP: filtros exibidos no dashboard (UI)
// - DEFAULT_FILTROS_APP: fallback quando projeto não tem filtros
import { FILTROS_APP, DEFAULT_FILTROS_APP } from '../../utils/constants';

// 🔹 DEFINIÇÃO GLOBAL DOS FILTROS (infra)
import { FILTERS } from '../../filters/filters.config';

// ======================================================
// 🔹 LISTA GLOBAL DE FILTROS DISPONÍVEIS
// ======================================================
//
// 🎯 INTENÇÃO
// Ter acesso a todos os filtros possíveis definidos no código,
// independentemente do projeto.
//
// 🔒 CONTRATO
// - Nunca modificar essa lista aqui
// - Ela representa a "fonte de verdade" do sistema
//
const filtrosDisponiveis = Object.values(FILTERS);

// ======================================================
// 🔹 PROJECT FILTERS PANEL — ADMIN
// ======================================================
//
// 🎯 INTENÇÃO
// Permitir que o administrador do projeto:
// - Ative ou desative filtros
// - Controle quais filtros afetam ranking e listagem
//
// 🔒 CONTRATO
// - O dashboard NÃO cria filtros
// - O dashboard NÃO altera lógica de filtros
// - Apenas ativa/desativa por projeto
//
// 🚫 NÃO FAZER AQUI
// - Não implementar ordenação
// - Não implementar lógica de filtro
// - Não decidir comportamento de ranking
//
// 🚧 FUTURO
// - Explicar impacto do filtro (ex: “afeta ranking”)
// - Exibir preview do efeito do filtro
//
export default function ProjectFiltersPanel({ projeto, theme, onUpdate }) {

  // ==============================
  // 🔹 ESTADO LOCAL DO PAINEL
  // ==============================
  const [ativos, setAtivos] = useState([]);
  const [saving, setSaving] = useState(false);

  // ==============================
  // 🔹 SINCRONIZAÇÃO COM O PROJETO
  // ==============================
  //
  // 🎯 Intenção:
  // Garantir que o painel reflita o estado real do projeto
  //
  useEffect(() => {
    setAtivos(
      projeto.filtros_ativos && projeto.filtros_ativos.length > 0
        ? projeto.filtros_ativos
        : DEFAULT_FILTROS_APP
    );
  }, [projeto]);

  // ==============================
  // 🔹 TOGGLE DE FILTRO (LOCAL)
  // ==============================
  //
  // 🎯 Intenção:
  // Ativar ou desativar filtros SEM salvar ainda
  //
  const toggleFiltro = (id) => {
    setAtivos(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  // ==============================
  // 🔹 SALVAR CONFIGURAÇÃO NO PROJETO
  // ==============================
  //
  // 🔒 CONTRATO
  // - Falha não deve quebrar UI
  // - Estado local só reflete backend após sucesso
  //
  const salvar = async () => {
    setSaving(true);

    const { error } = await supabase
      .from('projetos')
      .update({ filtros_ativos: ativos })
      .eq('id', projeto.id);

    setSaving(false);

    if (error) {
      alert('Erro ao salvar filtros');
      return;
    }

    onUpdate?.(ativos);
  };

  // ==============================
  // 🔹 RENDERIZAÇÃO POR GRUPO (UI)
  // ==============================
  //
  // 🎯 Intenção:
  // Agrupar filtros por tipo (filtro / ordenação)
  //
  const renderGroup = (group, title) => (
    <>
      <h4 style={{ margin: '15px 0 5px', fontSize: '14px' }}>{title}</h4>

      {FILTROS_APP
        .filter(f => f.group === group)
        .map(filtro => (
          <label
            key={filtro.id}
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              padding: '8px 0',
              cursor: 'pointer'
            }}
          >
            <input
              type="checkbox"
              checked={ativos.includes(filtro.id)}
              onChange={() => toggleFiltro(filtro.id)}
            />

            <div>
              <div style={{ fontWeight: '600', fontSize: '13px' }}>
                {filtro.label}
              </div>
              <div style={{ fontSize: '12px', color: theme.textSec }}>
                {filtro.description}
              </div>
            </div>
          </label>
        ))}
    </>
  );

  // ==============================
  // 🔹 RENDER PRINCIPAL
  // ==============================
  return (
    <div
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}
    >
      {/* ==============================
          🔹 CABEÇALHO DO PAINEL
          ============================== */}
      <h3 style={{ marginTop: 0 }}>Filtros visíveis no App</h3>
      <p style={{ fontSize: '13px', color: theme.textSec }}>
        Ative apenas os filtros que fazem sentido para este nicho.
      </p>

      {/* ==============================
          🔹 GRUPOS DE FILTROS
          ============================== */}
      {renderGroup('filtro', 'Filtros')}
      {renderGroup('ordenacao', 'Ordenação')}

      {/* ==============================
          🔹 AÇÃO DE SALVAR
          ============================== */}
      <button
        onClick={salvar}
        disabled={saving}
        style={{
          marginTop: '15px',
          padding: '10px 16px',
          background: theme.primary,
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {saving ? 'Salvando…' : 'Salvar filtros'}
      </button>

      {/* ======================================================
          ⚠️ ÁREA EXPERIMENTAL / DUPLICADA
          ======================================================
          🚨 OBSERVAÇÃO IMPORTANTE
          Este bloco abaixo:
          - Duplica a renderização dos filtros
          - Mistura duas abordagens diferentes
          - Deve ser REVISADO no próximo ciclo
          ====================================================== */}



      {/* ==============================
          🔹 LISTA COMPLETA DE FILTROS (DEBUG / FUTURO)
          ============================== */}
      {filtrosDisponiveis.map((filtro) => {
        const ativo = projeto.filtros_ativos?.includes(filtro.id);

        return (
          <div
            key={filtro.id}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px',
              background: ativo ? 'var(--bg-card)' : 'transparent'
            }}
          >
            <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={ativo}
                onChange={async () => {
                  const novosFiltros = ativo
                    ? projeto.filtros_ativos.filter((f) => f !== filtro.id)
                    : [...(projeto.filtros_ativos || []), filtro.id];

                  await supabase
                    .from('projetos')
                    .update({ filtros_ativos: novosFiltros })
                    .eq('id', projeto.id);

                  projeto.filtros_ativos = novosFiltros;
                }}
              />

              <div>
                <strong>{filtro.nome_humano}</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {filtro.descricao}
                </div>
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}
