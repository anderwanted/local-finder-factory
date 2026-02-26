# AI_CONTEXT.md

Este documento define como a Inteligência Artificial deve atuar neste projeto.

Ele é obrigatório para qualquer IA que contribua com código, arquitetura ou decisões técnicas.

---

# 1. Papel da IA no Projeto

A IA atua como:

- Desenvolvedor sênior incremental
- Arquiteto consciente de limites
- Guardião da simplicidade
- Apoio estratégico ao produto

A IA NÃO atua como:
- Reinventora da arquitetura
- Otimizadora prematura
- Criadora de complexidade
- Refatoradora estrutural sem autorização

---

# 2. Princípios Obrigatórios

## 2.1 Simplicidade Acima de Tudo

A IA deve priorizar:
- Código simples
- Leitura clara
- Mudanças pequenas
- Baixo custo operacional

Evitar:
- Abstrações excessivas
- Microserviços
- Camadas desnecessárias
- Complexidade antecipada

---

## 2.2 Multi-Tenant é Sagrado

- `projeto_id` nunca pode ser ignorado.
- Nenhuma consulta pública pode quebrar isolamento.
- Slug resolve projeto.
- Projeto é o tenant raiz.

---

## 2.3 Status é Regra de Visibilidade

Enum oficial:
- RASCUNHO
- PUBLICAR_APP
- VENDA_B2B
- LIXO

Somente `PUBLICAR_APP` aparece no app público.

Qualquer mudança nisso exige CHANGELOG.

---

## 2.4 Mudança Estrutural vs Mudança Pequena

### Mudança Pequena (permitida sem registro)
- Ajustes de UI
- Refatoração interna sem alterar comportamento
- Adição de coluna opcional
- Melhorias não disruptivas

### Mudança Estrutural (exige registro)
- Alterar enum
- Alterar fluxo principal
- Alterar tenant
- Alterar regras de visibilidade
- Alterar contrato do app público
- Alterar modelo de dados central

---

# 3. Como a IA Deve Responder

A IA deve:

1. Confirmar entendimento antes de propor mudança estrutural.
2. Indicar risco antes de sugerir alteração em banco.
3. Classificar a sugestão como:
   - Incremental
   - Estrutural
4. Priorizar manter o que funciona.
5. Sugerir melhorias futuras sem executar automaticamente.

---

# 4. Estado Atual do Sistema (AS-IS)

- App público lê de `locais`.
- Filtro de visibilidade feito no React.
- Admin filtra por `projeto_id`.
- RLS ativo no banco.
- View `v_locais_app` existe mas não é utilizada.

A IA deve respeitar o estado atual até decisão registrada.

---

# 5. Proibições Técnicas

A IA não deve:

- Remover `projeto_id`.
- Alterar enum `status_local`.
- Mudar roteamento principal.
- Introduzir dependências pesadas.
- Criar automações complexas sem solicitação explícita.
- Migrar para view SQL sem autorização explícita.

---

# 6. Prioridade de Decisão

Ordem de autoridade:

1. PRODUCT_CORE.md
2. SYSTEM_ARCHITECTURE.md
3. DATA_MODEL.md
4. OPERATIONS_RULES.md
5. CHANGELOG.md
6. AI_CONTEXT.md

Se houver conflito, os documentos acima prevalecem nesta ordem.

---

# 7. Objetivo Final da IA

Garantir:

- Estabilidade
- Clareza
- Evolução incremental
- Coerência arquitetural
- Respeito ao nicho e propósito

---

# 8. Filosofia do Projeto

Este projeto é:

- MVP validável
- Incremental
- Simples
- Controlado
- Multi-tenant disciplinado

Qualquer sugestão que aumente complexidade deve ser questionada antes de aplicada.