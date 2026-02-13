// ======================================================
// 📄 EmptyState.jsx
// Função: Estados vazios do Dashboard e App
// ======================================================

// 🔹 DEPENDÊNCIAS
// Ícones visuais para comunicação sem texto excessivo
import React from 'react';
import { Search, Store } from 'lucide-react';

// ======================================================
// 🔹 EMPTY STATE — FEEDBACK AO USUÁRIO
// ======================================================
//
// 🎯 INTENÇÃO
// Comunicar claramente ao usuário que:
// - Não há resultados para os filtros aplicados
// - Ou ainda não existem dados cadastrados no projeto
//
// 🔒 CONTRATO
// - Nunca deve quebrar renderização
// - Nunca deve bloquear interação
// - Deve ser sempre leve e amigável
//
// 🧠 PRINCÍPIO DE UX
// - Não culpar o usuário
// - Sempre sugerir um próximo passo
//
// 🚫 NÃO FAZER AQUI
// - Não inserir lógica de negócio
// - Não consultar dados
// - Não alterar estado global
//
// 🚧 FUTURO
// - Pode receber CTA contextual (ex: "Cadastrar loja")
// - Pode variar mensagens por nicho
//
export default function EmptyState({ type = 'filter', theme }) {

  // ==============================
  // 🔹 EMPTY STATE — FILTRO SEM RESULTADO
  // ==============================
  if (type === 'filter') {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: theme.textSec
        }}
      >
        {/* ÍCONE DE BUSCA */}
        <Search size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />

        {/* MENSAGEM PRINCIPAL */}
        <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
          Nenhuma loja encontrada
        </p>

        {/* MENSAGEM DE APOIO */}
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.7 }}>
          Tente ajustar os filtros acima
        </p>
      </div>
    );
  }

  // ==============================
  // 🔹 EMPTY STATE — PROJETO SEM DADOS
  // ==============================
  if (type === 'no-data') {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: theme.textSec
        }}
      >
        {/* ÍCONE DE LOJA */}
        <Store size={56} style={{ opacity: 0.2, marginBottom: '20px' }} />

        {/* MENSAGEM PRINCIPAL */}
        <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
          Nenhuma loja cadastrada ainda
        </p>

        {/* PRÓXIMO PASSO SUGERIDO */}
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.7 }}>
          Use o Admin Generator para começar
        </p>
      </div>
    );
  }

  // ==============================
  // 🔹 FALLBACK DE SEGURANÇA
  // ==============================
  // Caso o tipo não seja reconhecido,
  // não renderiza nada (falha silenciosa)
  return null;
}
