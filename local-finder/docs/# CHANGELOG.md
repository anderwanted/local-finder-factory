# CHANGELOG.md

Este documento registra decisões estruturais e estratégicas do projeto.
Mudanças pequenas não entram aqui.
Somente alterações que impactam arquitetura, dados ou regras operacionais.

---

# [2.1.0] - 2026-02-21
## Consolidação Estrutural do MVP

### 🎯 Estratégia

- Formalização do PRODUCT_CORE como documento estratégico completo.
- Definição oficial do nicho pet como foco central do produto.
- Confirmação de que o produto é:
  - Aplicação web com cara de app
  - Multi-tenant por projeto
  - Baseado em dados refinados do Google Maps

---

### 🏗 Arquitetura

- Confirmação de que o tenant raiz é `projetos`.
- Roteamento oficial via `/:slug` → resolve `projetos.slug`.
- Isolamento por `projeto_id`.
- RLS confirmado como ativo em:
  - projetos
  - locais
  - leads

- Decisão de manter leitura pública atual:
  - App lê direto de `locais`.
  - Filtro de visibilidade (`status = PUBLICAR_APP`) feito no React.
  - View `v_locais_app` ainda não utilizada.

---

### 🗄 Modelo de Dados

- Enum oficial `status_local` confirmado:
  - RASCUNHO
  - PUBLICAR_APP
  - VENDA_B2B
  - LIXO

- Confirmação de que:
  - `locais.projeto_id` referencia `projetos.id`
  - `leads.projeto_id` referencia `projetos.id`

- Definição de que `projeto_id` é obrigatório para qualquer dado público.

---

### ⚙ Operações

- Status controla visibilidade no app.
- LIXO é exclusão lógica (não delete físico).
- Lead obrigatório antes de redirecionamento para WhatsApp.
- Featured (`destaque`) influencia apenas ordenação.

---

### 📌 Decisão Importante

Optou-se por:

Manter a arquitetura atual funcional (AS-IS),
documentando claramente como está implementada,
sem migração imediata para view SQL.

Motivo:
Estabilidade do MVP e simplicidade acima de refatoração.

---

# Backlog Estrutural (Não Executado)

- Padronizar leitura pública com:
  - filtro por `projeto_id`
  - filtro por `status`
- Migrar leitura para `v_locais_app`
- Documentar policies detalhadas de RLS
- Avaliar conversão de `locais.niche` para FK estruturada

---

# Política de Registro

Entram neste arquivo:

- Mudança de enum
- Mudança de fluxo principal
- Mudança de tenant
- Mudança de regra de visibilidade
- Mudança estrutural de banco

Não entram:

- Ajustes de UI
- Correções pequenas
- Refatorações internas sem impacto estrutural