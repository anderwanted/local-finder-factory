# UI_COMPONENTS_INDEX.md
Versão: 1.0.0  
Data: 2026-02-21  
Escopo: Índice oficial de componentes de UI e onde vivem no código

Este documento lista os componentes existentes no projeto, com:
- caminho do arquivo
- categoria (core UI / feature / page / layout)
- objetivo
- onde é utilizado (quando inferível pela estrutura)
- css associado

> Regra: ao criar/renomear/mover componente, atualizar este índice.

---

## 1) Visão Geral

### Estrutura principal
- `src/components/**` → componentes reutilizáveis (produto/app)
- `src/components/ui/**` → UI primitives (design system: Button, Card, Badge)
- `src/pages/**` → páginas (Viewer / Manager / Processor) e componentes específicos de página
- `src/context/**` → providers (estado/dados)
- `src/hooks/**` → hooks de dados e lógica
- `src/assets/**` → CSS global, tokens e utilitários de layout

---

## 2) UI Primitives (Design System - Base)

> Componentes fundamentais usados por todo o app.  
> Mudanças aqui impactam o produto inteiro.

### 2.1 Badge
- **Path:** `src/components/ui/Badge.jsx`
- **Tipo:** UI Primitive
- **Uso:** status/labels (ex.: aberto, destaque, tags, etc.)
- **CSS:** (provável) `src/components/ui/button.css` e/ou tokens globais

### 2.2 Button
- **Path:** `src/components/ui/Button.jsx`
- **Tipo:** UI Primitive
- **Uso:** CTAs e ações (WhatsApp, salvar, filtros)
- **CSS:** `src/components/ui/button.css`

### 2.3 Card
- **Path:** `src/components/ui/Card.jsx`
- **Tipo:** UI Primitive
- **Uso:** containers de conteúdo e agrupamento
- **CSS:** (provável) tokens globais / layout

### 2.4 UI Barrel Export
- **Path:** `src/components/ui/index.js`
- **Tipo:** Export index
- **Uso:** import centralizado de primitives

---

## 3) Componentes Reutilizáveis (Produto/App)

### 3.1 BottomNav
- **Path:** `src/components/BottomNav/index.jsx`
- **Tipo:** Layout / Navigation
- **Objetivo:** navegação inferior (app-like)
- **CSS:** `src/components/BottomNav/bottom-nav.css`

### 3.2 CardItem (Pet Card)
- **Path:** `src/components/CardItem/index.jsx`
- **Tipo:** Feature Component (List Card)
- **Objetivo:** renderizar card de local/loja/serviço
- **CSS:** `src/components/CardItem/pet-card.css`
- **Observação:** provável “card principal” do Viewer

### 3.3 ChatModal
- **Path:** `src/components/ChatModal/index.jsx`
- **Tipo:** Feature Component (Modal)
- **Objetivo:** modal de chat / simulação de WhatsApp / captura de lead (depende do uso)
- **CSS:** (não listado no tree; pode usar global/layout)

### 3.4 ModalSheet
- **Path:** `src/components/ModalSheet/index.jsx`
- **Tipo:** Overlay / Modal
- **Objetivo:** modal em estilo sheet (mobile-first)
- **CSS:** `src/components/ModalSheet/modal-sheet.css`

### 3.5 SearchBar
- **Path:** `src/components/SearchBar/index.jsx`
- **Tipo:** Input / Search
- **Objetivo:** busca por texto na listagem
- **CSS:** `src/components/SearchBar/search-bar.css`

### 3.6 SplashScreen
- **Path:** `src/components/SplashScreen/index.jsx`
- **Tipo:** Loading / Intro
- **Objetivo:** tela de entrada / carregamento inicial
- **CSS:** `src/components/SplashScreen/splash.css`

---

## 4) Páginas (Screens) e Componentes de Página

> Componentes dentro de `src/pages/**` são “page-scoped”:  
> podem ser reutilizados, mas nascem para uma página.

---

### 4.1 Viewer (App público)
- **Path:** `src/pages/Viewer/index.jsx`
- **Tipo:** Page (Public App)
- **Objetivo:** experiência de listagem/visualização para usuários finais
- **CSS:**
  - `src/pages/Viewer/Viewer.css`
  - `src/pages/Viewer/favoritos.css`
  - `src/pages/Viewer/hero-grid.css`

#### 4.1.1 HeroGridCategories
- **Path:** `src/pages/Viewer/HeroGridCategories.jsx`
- **Tipo:** Page Component (Category Grid)
- **Objetivo:** grid de categorias/nichos para navegação
- **CSS:** `hero-grid.css` (provável)

---

### 4.2 Manager (Dashboard/Admin)
- **Path:** `src/pages/Manager/index.jsx`
- **Tipo:** Page (Admin)
- **Objetivo:** gestão de locais (CRUD), status, filtros, destaque, etc.
- **CSS:** `src/pages/Manager/Manager.css`

#### Componentes do Manager
> Todos em: `src/pages/Manager/components/`

##### 4.2.1 DashboardHeader
- **Path:** `src/pages/Manager/components/DashboardHeader.jsx`
- **Tipo:** Page Component
- **Objetivo:** header do dashboard (título, ações, contexto do projeto)

##### 4.2.2 EmptyState
- **Path:** `src/pages/Manager/components/EmptyState.jsx`
- **Tipo:** Page Component
- **Objetivo:** estado vazio (sem locais/sem filtro)

##### 4.2.3 FilterBar
- **Path:** `src/pages/Manager/components/FilterBar.jsx`
- **Tipo:** Page Component (Filters)
- **Objetivo:** barra de filtros (status/niche/featured/etc.)

##### 4.2.4 ProjectFiltersPanel
- **Path:** `src/pages/Manager/components/ProjectFiltersPanel.jsx`
- **Tipo:** Page Component (Config)
- **Objetivo:** painel de filtros por projeto (provavelmente ligado a `projetos.filtros_ativos`)

##### 4.2.5 StoreCard
- **Path:** `src/pages/Manager/components/StoreCard.jsx`
- **Tipo:** Page Component (Item Card)
- **Objetivo:** card do local no admin (exibição + ações)

##### 4.2.6 StoreCardEdit
- **Path:** `src/pages/Manager/components/StoreCardEdit.jsx`
- **Tipo:** Page Component (Edit Form)
- **Objetivo:** formulário/modal de edição/criação de local
- **Observação:** inclui lógica de `insert/update` em `locais` (confirmado pelos trechos que você mandou)

---

### 4.3 Processor (Processamento)
- **Path:** `src/pages/Processor/index.jsx`
- **Tipo:** Page (Internal Tool)
- **Objetivo:** processamento/importação/refino (a confirmar)
- **CSS:** (não listado; pode usar global)

---

## 5) Context e Providers

### 5.1 DataContext / DataProvider
- **Path:** `src/context/DataContext.jsx`
- **Tipo:** Context Provider
- **Objetivo:** prover `items`, `fetchItems`, loading e dados do app
- **Observação (risco):** há query `.from('locais').select('*')` sem filtro — depende de RLS/policy
- **Recomendação (backlog):** padronizar filtros por tenant e/ou status conforme camada (public/admin)

---

## 6) Hooks

### 6.1 useDashboardData
- **Path:** `src/hooks/useDashboardData.jsx`
- **Tipo:** Hook (Admin Data)
- **Objetivo:** carregar/gerenciar dados do dashboard (locais por projeto)

### 6.2 useDashboardFilters
- **Path:** `src/hooks/useDashboardFilters.jsx`
- **Tipo:** Hook (Admin Filters)
- **Objetivo:** lógica de filtros do dashboard e estados de UI

### 6.3 useFavoritos
- **Path:** `src/hooks/useFavoritos.js`
- **Tipo:** Hook (Feature)
- **Objetivo:** favoritos do usuário (provável localStorage ou estado)
- **Uso:** Viewer (há referência a `useFavoritos()` em HomeFactory)

---

## 7) Services

### 7.1 Supabase Client
- **Path:** `src/services/supabaseClient.js`
- **Tipo:** Service / Client
- **Objetivo:** instância do Supabase para queries e auth
- **Regra:** todos os módulos devem importar daqui (evitar múltiplos clientes)

---

## 8) Utils

### 8.1 constants
- **Path:** `src/utils/constants.js`
- **Tipo:** Config / Constants
- **Objetivo:** constantes de UI e domínio (ex.: status labels, etc.)

### 8.2 generateReport
- **Path:** `src/utils/generateReport.js`
- **Tipo:** Utility
- **Objetivo:** geração de relatório/snapshot (apoio técnico)

### 8.3 index (utils)
- **Path:** `src/utils/index.js`
- **Tipo:** Barrel export

### 8.4 textLogic
- **Path:** `src/utils/textLogic.js`
- **Tipo:** Utility
- **Objetivo:** regras de texto/copy/transformações

---

## 9) CSS/Tokens (Camada Global)

> Fonte de verdade do estilo global e tokens.

- `src/assets/design-tokens.css`
- `src/assets/tokens.css`
- `src/assets/theme.css`
- `src/assets/global.css`
- `src/assets/layout.css`
- `src/assets/spacing.css`
- `src/assets/text.css`
- `src/assets/utilities.css`
- `src/assets/components.css`

---

## 10) Pontos de Atenção (para governança / backlog)

1) **Queries sem filtro** (`select('*')` sem `projeto_id`/`status`):
   - concentradas no `DataContext` e possivelmente em listagens.
   - dependerá de policies de RLS para evitar vazamento.

2) **View `v_locais_app` existe mas não usada**:
   - pode virar contrato do app público na Fase 2 do roadmap.

3) **Duplicidade conceitual de “nicho”**:
   - `locais.niche` (text) e tabela `niches`.
   - decisão futura: converter para FK ou manter text.

---

## 11) Como Atualizar este Índice

Ao criar componente novo:
- Escolher categoria (Primitive / Reutilizável / Page)
- Registrar:
  - Path
  - Objetivo
  - CSS associado
  - Onde é usado (se conhecido)
- Atualizar versão do documento (minor)