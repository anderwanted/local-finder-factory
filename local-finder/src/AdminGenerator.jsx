import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function AdminGenerator({ projeto }) {
  const [rawInput, setRawInput] = useState('');
  const [copied, setCopied] = useState(false);

  // --- PROMPT BLINDADO V2.0 (Com GPS e Tags Padrão) ---
  const PROMPT_MESTRE = `
Atue como Engenheiro de Dados Sênior.
Contexto: Estamos populando o banco do projeto "${projeto?.nome || 'Geral'}" (ID: '${projeto?.id}').

ANALISE O TEXTO SUJO E A URL ABAIXO PARA GERAR UM 'UPSERT' SQL.

1. REGRAS DE TAGS (Rigoroso):
   Analise o texto e categorize APENAS com estas tags permitidas:
   - 'banho' -> Se tiver banho, tosa, estética.
   - 'vet'   -> Se for clínica, hospital, vacinas, cirurgia.
   - 'loja'  -> Se vender ração, acessórios, brinquedos.
   - 'hotel' -> Se tiver hospedagem ou creche.
   *Um local pode ter várias tags. Ex: ARRAY['banho', 'vet']*

2. REGRAS DE EXTRAÇÃO:
   - Nome, Telefone (formato 5511...), Endereço.
   - Nota e Avaliações (números).
   - Latitude/Longitude: Tente extrair da URL (procure padrões como @-23.xxx,-46.xxx). Se não achar, use NULL.
   - Destaque: TRUE se (nota >= 4.8 e avaliacoes > 40).

3. SAÍDA ESPERADA (SQL):
   INSERT INTO locais (nome, telefone, endereco, nota, avaliacoes, destaque, tags, latitude, longitude, projeto_id)
   VALUES (...)
   ON CONFLICT (nome, endereco) DO UPDATE SET
   tags = EXCLUDED.tags,
   nota = EXCLUDED.nota,
   avaliacoes = EXCLUDED.avaliacoes,
   latitude = EXCLUDED.latitude,
   longitude = EXCLUDED.longitude;

DADOS BRUTOS (TEXTO + URL):
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
      <h2 style={{color: projeto.cor_primaria}}>⚙️ Gerador V2: {projeto.nome}</h2>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Agora a IA padroniza as tags (banho, vet, loja, hotel) e busca GPS na URL.
      </p>
      
      <textarea
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder={`Cole o texto + URL aqui...`}
        style={{ width: '100%', height: '200px', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
      />

      <button
        onClick={handleCopy}
        style={{
          width: '100%', padding: '15px',
          background: copied ? '#22c55e' : projeto.cor_primaria,
          color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
        }}
      >
        {copied ? <><Check /> Copiado!</> : <><Copy /> Gerar Prompt Padrão</>}
      </button>
    </div>
  );
}