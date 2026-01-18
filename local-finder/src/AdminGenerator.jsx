// ======================================================
// 📄 AdminGenerator.jsx
// Gerador de Prompt para Ingestão de Dados (Admin Tool)
// ======================================================
//
// 🎯 PROPÓSITO
// Facilitar a criação de dados estruturados (SQL UPSERT)
// a partir de texto desorganizado + URL do Google Maps.
//
// 🧠 MODELO MENTAL
// - O humano copia dados do Google Maps
// - O sistema gera um PROMPT blindado
// - A IA externa retorna SQL pronto
//
// 🔒 CONTRATO
// - Não grava no banco
// - Apenas gera texto
// - Nunca executa SQL
//

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useState } from 'react';
import { Copy, Check, MapPin, MousePointer, Globe, ArrowRight } from 'lucide-react';

// ======================================================
// 🔹 COMPONENTE PRINCIPAL
// ======================================================
export default function AdminGenerator({ projeto }) {

  // ==============================
  // 🔹 ESTADOS
  // ==============================
  //
  // rawInput → texto bruto colado pelo usuário
  // copied   → feedback visual de cópia
  //
  const [rawInput, setRawInput] = useState('');
  const [copied, setCopied] = useState(false);

  // ==============================
  // 🔹 TEMA DO PROJETO
  // ==============================
  //
  // 🎯 Usa a cor primária do projeto
  // 🔒 Fallback seguro
  //
  const corTema = projeto?.cor_primaria || '#2563eb';

  // ======================================================
  // 🔹 PROMPT MESTRE (VERSÃO BLINDADA)
  // ======================================================
  //
  // 🎯 INTENÇÃO
  // Gerar um comando SQL consistente, padronizado e seguro
  //
  // 🧠 REGRAS
  // - Tags fechadas
  // - Extração rigorosa
  // - Destaque calculado
  // - UPSERT idempotente
  //
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
   - Latitude/Longitude: Tente extrair da URL (procure padrões como @-23.xxx,-46.xxx).
     Se não achar, use NULL.
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

  // ==============================
  // 🔹 AÇÃO: COPIAR PROMPT
  // ==============================
  //
  // 🎯 Junta prompt + texto do usuário
  // 🔒 Apenas copia para clipboard
  //
  const handleCopy = () => {
    const fullText = `${PROMPT_MESTRE}\n${rawInput}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ==============================
  // 🔹 FALLBACK DE SEGURANÇA
  // ==============================
  if (!projeto) return <p>Erro: Projeto não identificado.</p>;

  // ======================================================
  // 🔹 RENDER
  // ======================================================
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'sans-serif',
      color: '#334155'
    }}>

      {/* ==========================================
          🔹 HEADER INSTRUCIONAL
         ========================================== */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        marginBottom: '25px',
        borderLeft: `6px solid ${corTema}`
      }}>
        <h2 style={{
          color: '#1e293b',
          marginTop: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Globe size={24} color={corTema} />
          Gerador de Dados Inteligente
        </h2>

        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Siga o fluxo abaixo para popular o app <strong>{projeto.nome}</strong> com precisão.
        </p>

        {/* ==============================
            🔹 STEPS VISUAIS
           ============================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '20px'
        }}>
          <StepCard
            icon={<MapPin size={20} />}
            title="1. Google Maps"
            text="Pesquise o local e CLIQUE NO PINO para abrir os detalhes."
            color={corTema}
          />

          <StepCard
            icon={<MousePointer size={20} />}
            title="2. Captura Total"
            text="Dê Ctrl+A na aba lateral esquerda e copie todo o texto."
            color={corTema}
          />

          <StepCard
            icon={<Globe size={20} />}
            title="3. URL GPS"
            text="Copie também o link do navegador para pegar a latitude."
            color={corTema}
          />
        </div>
      </div>

      {/* ==========================================
          🔹 ÁREA DE AÇÃO
         ========================================== */}
      <div style={{ position: 'relative' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          Cole tudo aqui (Texto Bagunçado + URL):
        </label>

        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder={`Exemplo:\nPet Shop do Zé\n4.8 estrelas\nRua das Flores, 123\n\nhttps://google.com/maps/...`}
          style={{
            width: '100%',
            height: '200px',
            padding: '15px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            fontSize: '14px',
            fontFamily: 'monospace',
            resize: 'vertical',
            outlineColor: corTema
          }}
        />

        {/* ==============================
            🔹 BOTÃO PRINCIPAL
           ============================== */}
        <div style={{ marginTop: '15px' }}>
          <button
            onClick={handleCopy}
            disabled={!rawInput}
            style={{
              width: '100%',
              padding: '16px',
              background: copied ? '#22c55e' : (rawInput ? corTema : '#cbd5e1'),
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: rawInput ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s',
              boxShadow: rawInput ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            {copied
              ? <><Check /> Prompt Copiado! Cole na IA.</>
              : <><Copy /> Gerar Comando SQL</>
            }
            {!copied && rawInput && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// 🔹 COMPONENTE AUXILIAR: StepCard
// ======================================================
//
// 🎯 INTENÇÃO
// Visualizar o fluxo de passos de forma didática
//
function StepCard({ icon, title, text, color }) {
  return (
    <div style={{
      background: '#f8fafc',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
        color,
        fontWeight: 'bold'
      }}>
        {icon} {title}
      </div>
      <p style={{
        margin: 0,
        fontSize: '12px',
        color: '#64748b',
        lineHeight: '1.4'
      }}>
        {text}
      </p>
    </div>
  );
}
