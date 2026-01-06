import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// Recebe 'projeto' via props
export default function AdminGenerator({ projeto }) {
  const [rawInput, setRawInput] = useState('');
  const [copied, setCopied] = useState(false);

  // O Prompt agora é DINÂMICO. Ele injeta o ID do projeto automaticamente.
  const PROMPT_MESTRE = `
Atue como Engenheiro de Dados Sênior.
Contexto: Estamos populando o banco de dados do projeto "${projeto?.nome || 'Geral'}".
ID do Projeto (Obrigatório): '${projeto?.id}'

Analise os dados brutos e gere INSERT INTO para PostgreSQL.

Regras:
1. Tabela: 'locais'.
2. Colunas: nome, telefone, endereco, site, niche, origem, is_whatsapp, tags, nota, avaliacoes, destaque, projeto_id.
3. Telefone: Formato 5511999999999.
4. Regra VIP: SE (nota >= 4.5 E avaliacoes >= 50) ENTÃO destaque = TRUE.
5. IMPORTANTE: Todas as linhas DEVEM ter a coluna 'projeto_id' com o valor '${projeto?.id}'.
6. Use UPSERT.

DADOS BRUTOS:
`;

  const handleCopy = () => {
    const fullText = `${PROMPT_MESTRE}\n${rawInput}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!projeto) return <p>Erro: Projeto não identificado.</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{color: projeto.cor_primaria}}>⚙️ Gerador: {projeto.nome}</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Este prompt já vai embutir o ID correto do projeto. É só colar na IA e rodar o SQL.
      </p>
      
      <textarea
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder={`Cole dados de ${projeto.nome} aqui...`}
        style={{ width: '100%', height: '200px', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
      />

      <button
        onClick={handleCopy}
        style={{
          width: '100%', padding: '15px',
          background: copied ? '#22c55e' : projeto.cor_primaria, // Usa a cor do nicho!
          color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
        }}
      >
        {copied ? <><Check /> Copiado!</> : <><Copy /> Gerar Prompt para {projeto.nome}</>}
      </button>
    </div>
  );
}