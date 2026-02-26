# DOCUMENTATION_GUIDE.md
Versão: 1.0.0  
Data: 2026-02-21  
Objetivo: Definir como usar, atualizar e governar os documentos do projeto.

---

# 1. Estrutura Oficial de Documentos

## 🔴 Núcleo Estrutural (Base do Projeto)

Estes são os pilares.  
Mudanças aqui podem alterar o sistema inteiro.

- PRODUCT_CORE.md
- SYSTEM_ARCHITECTURE.md
- DATA_MODEL.md
- OPERATIONS_RULES.md

Regra:
Qualquer alteração estrutural deve ser registrada no CHANGELOG.md.

---

## 🟡 Governança e Controle

- CHANGELOG.md
- AI_CONTEXT.md
- ROADMAP.md

Regra:
Servem para controlar evolução e comportamento técnico.

---

## 🔵 Camada Visual e UI

- DESIGN_SYSTEM.md
- UI_COMPONENTS_INDEX.md
- UI_COMPONENTS_MAP.md

Regra:
Regem experiência visual e organização de componentes.
Mudanças aqui não alteram banco nem arquitetura.

---

# 2. Quando Atualizar Cada Documento

## PRODUCT_CORE.md

Atualizar quando:
- Missão mudar
- Público mudar
- Fluxo principal mudar
- Definição de sucesso mudar
- Produto deixar de ser apenas nicho pet

Não atualizar para:
- Ajustes pequenos de UI
- Mudança de texto
- Pequenas melhorias

Se mudar → registrar no CHANGELOG.

---

## SYSTEM_ARCHITECTURE.md

Atualizar quando:
- Mudar tenant
- Mudar roteamento principal
- Migrar para view SQL
- Alterar leitura de dados estruturalmente
- Adicionar camada nova (ex: cache, microserviço)

Não atualizar para:
- Refatoração interna
- Mudança pequena de query

Mudança estrutural → exige CHANGELOG.

---

## DATA_MODEL.md

Atualizar quando:
- Adicionar/remover coluna importante
- Alterar enum
- Criar nova entidade principal
- Mudar relacionamento
- Alterar obrigatoriedade de campo crítico

Nunca alterar enum sem:
1. Atualizar este documento
2. Registrar no CHANGELOG

---

## OPERATIONS_RULES.md

Atualizar quando:
- Regra de status mudar
- Fluxo de lead mudar
- Regra de visibilidade mudar
- LIXO deixar de ser exclusão lógica

Mudança estrutural → registrar no CHANGELOG.

---

## CHANGELOG.md

Atualizar quando:
- Mudança estrutural ocorrer
- Nova versão estrutural for criada
- Roadmap estrutural for executado

Não usar para:
- Ajuste de CSS
- Correção pequena
- Mudança cosmética

---

## AI_CONTEXT.md

Atualizar quando:
- IA passar a ter mais autonomia
- IA puder alterar banco
- Política de mudança estrutural mudar
- Nova regra de governança for criada

---

## ROADMAP.md

Atualizar quando:
- Fase for concluída
- Nova fase for criada
- Prioridade estrutural mudar

---

## DESIGN_SYSTEM.md

Atualizar quando:
- Tipografia global mudar
- Escala de spacing mudar
- Tokens mudarem
- Componente oficial novo for criado
- Regra multi-tenant visual mudar

Não atualizar para:
- Ajuste fino de padding

---

## UI_COMPONENTS_INDEX.md

Atualizar quando:
- Novo componente for criado
- Componente for movido
- Componente for deletado
- Estrutura de pasta mudar

---

## UI_COMPONENTS_MAP.md

Atualizar quando:
- Página passar a usar novo componente
- Componente deixar de ser usado
- Estrutura de imports mudar significativamente

Recomendação:
Gerar automaticamente após grandes alterações.

---

# 3. Classificação de Mudança

## 🟢 Mudança Pequena
Exemplos:
- Ajustar CSS
- Alterar label
- Melhorar copy
- Pequena refatoração

Não exige CHANGELOG.

---

## 🟡 Mudança Incremental
Exemplos:
- Novo campo opcional
- Novo componente
- Novo filtro
- Novo estado visual

Atualizar documento correspondente.

---

## 🔴 Mudança Estrutural
Exemplos:
- Alterar enum
- Alterar tenant
- Alterar fluxo principal
- Alterar regra de visibilidade
- Mudar arquitetura

Exige:
1. Atualizar documento correspondente
2. Atualizar CHANGELOG
3. Incrementar versão

---

# 4. Versionamento

Formato recomendado:

Major.Minor.Patch

Exemplo:

2.1.0

- Major → mudança estrutural
- Minor → nova funcionalidade relevante
- Patch → ajuste pequeno

---

# 5. Ordem de Autoridade

Se houver conflito entre documentos:

1. PRODUCT_CORE.md
2. SYSTEM_ARCHITECTURE.md
3. DATA_MODEL.md
4. OPERATIONS_RULES.md
5. CHANGELOG.md
6. AI_CONTEXT.md
7. DESIGN_SYSTEM.md
8. ROADMAP.md
9. UI_COMPONENTS_*

---

# 6. Fluxo Seguro de Atualização

Sempre seguir:

1. Identificar tipo de mudança (pequena / incremental / estrutural)
2. Atualizar documento correto
3. Registrar no CHANGELOG se estrutural
4. Atualizar versão
5. Só então aplicar no código

Nunca fazer o contrário.

---

# 7. Regra de Ouro

Documentação governa o código.
Código não governa documentação.

Se código divergir do documento:
Documento prevalece até revisão oficial.

---

# STATUS

Este documento define a governança oficial da documentação do projeto.