# DESIGN_SYSTEM.md
Versão: 1.0.0  
Data: 2026-02-21  
Status: Documento Oficial (Camada de UX/UI)  
Escopo: Web App com “cara de app” + Multi-tenant visual (por projeto)

---

## 0) Objetivo

Padronizar a experiência visual e de interação do produto para que:

- A UI seja **consistente**, **moderna**, **rápida** e **simples**.
- Tenants (projetos) possam ter **personalização** (cores/logo) sem virar um “Frankenstein”.
- Componentes, tipografia, espaçamento, estados e padrões sejam replicáveis.
- A equipe (humana ou IA) construa telas sem improviso.

**Regra de ouro:**  
> Design System reduz decisões repetidas.  
> Se uma decisão se repete 2x, vira padrão aqui.

---

## 1) Princípios do Design

### 1.1 Simplicidade
- Poucos elementos por tela.
- Hierarquia clara: título → conteúdo → ação.
- Evitar “enfeites” que reduzam conversão.

### 1.2 “Cara de App”
- Layout responsivo com toque mobile-first.
- CTAs grandes o suficiente para toque.
- Cards, listas e estados bem definidos.

### 1.3 Clareza e Conversão
- O usuário deve entender em segundos:
  - “o que é isso”
  - “qual serviço”
  - “como contato”
- CTA primário sempre visível no detalhe.

### 1.4 Consistência Multi-tenant
- Cada projeto pode mudar **cores e logo**, mas:
  - tipografia
  - layout
  - componentes
  - espaçamentos
  - estados
continuam coerentes.

---

## 2) Sistema de Tokens (Fonte de Verdade Visual)

### 2.1 Tokens Base (globais)
Estes tokens não mudam por tenant (só com decisão de design global):

- Fonte (font family)
- Escala tipográfica (tamanhos e pesos)
- Espaçamentos (spacing scale)
- Radius (bordas)
- Shadow (sombras)
- Motion (duração/curvas)
- Z-index (camadas)

### 2.2 Tokens por Tenant (derivados do banco)
Vêm de `projetos` e podem variar por tenant:

- `cor_primaria` → Primary
- `cor_destaque` → Accent
- `tema_base` → Light/Dark (ou base neutra)
- `estilo_borda` → Radius style (controlado)
- `logo_url` → Logo

**Limite:** tenant NÃO define tipografia e spacing.  
Somente cor e imagem.

---

## 3) Paleta e Cores

### 3.1 Camadas de cor
- **Brand Primary:** cor do projeto (CTA primário, foco, chips selecionados)
- **Accent:** destaques (badges, highlights)
- **Neutros:** fundo, texto, bordas
- **Semânticas:** sucesso, aviso, erro

### 3.2 Tokens de cor recomendados

#### Neutros (globais)
- `bg` (background principal)
- `surface` (cards)
- `surface-2` (áreas elevadas)
- `border`
- `text`
- `text-muted`

#### Brand (por tenant)
- `primary`
- `primary-contrast` (texto em cima do primary)
- `accent`
- `accent-contrast`

#### Semânticas (globais)
- `success`
- `warning`
- `danger`
- `info`

### 3.3 Regras de contraste (obrigatórias)
- Texto em cima de `primary` deve ter contraste mínimo (WCAG AA).
- Caso o tenant forneça cor ruim, o sistema deve:
  - ajustar contraste automaticamente **ou**
  - cair para variação segura (`primarySafe`)

**Regra:** nunca sacrificar legibilidade por estética.

---

## 4) Tipografia

### 4.1 Fontes
- Default: `Inter` (ou sistema equivalente)
- Fallback: `system-ui`

### 4.2 Escala tipográfica (global)
- Display: 28–32
- H1: 22–24
- H2: 18–20
- Body: 15–16
- Small: 13–14
- Micro: 11–12

### 4.3 Pesos
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### 4.4 Regras
- Use H1 apenas 1 vez por tela.
- Não usar texto “micro” para informação essencial.
- Labels importantes sempre com peso 500+.

---

## 5) Spacing, Grid e Layout

### 5.1 Escala de spacing (global)
Use sempre múltiplos de 4:

- 4, 8, 12, 16, 20, 24, 32, 40, 48

### 5.2 Containers
- Mobile: padding lateral 16
- Desktop: container max 1100–1200 (conforme necessidade)
- Cards: padding interno 12–16

### 5.3 Grid
- Mobile: 1 coluna
- Tablet: 2 colunas (listagens)
- Desktop: 3 colunas (listagens), detalhe centralizado

---

## 6) Bordas, Radius e Shadow

### 6.1 Radius (global)
- `xs`: 6
- `sm`: 10
- `md`: 14
- `lg`: 18
- `xl`: 22

### 6.2 Shadow (global)
- `sm`: discreto para cards
- `md`: modais e superfícies elevadas
- Evitar sombras pesadas

### 6.3 Multi-tenant: estilo_borda
Tenant pode escolher apenas entre:
- “soft” (md)
- “rounded” (lg/xl)

Não permitir valores arbitrários.

---

## 7) Motion e Microinterações

### 7.1 Objetivo
Motion existe para:
- feedback
- hierarquia
- suavidade

Não para “show”.

### 7.2 Duração
- `fast`: 120–160ms
- `base`: 180–240ms
- `slow`: 280–360ms

### 7.3 Regras
- Hover e press devem ter feedback.
- Skeleton para carregamento.
- Transições leves, sem bounce exagerado.

---

## 8) Componentes Oficiais (Catálogo)

> Estes são os componentes base.  
> Se criar novo componente, ele deve seguir este padrão e ser registrado aqui.

### 8.1 Navegação
- **TopBar / AppHeader**
  - logo do projeto
  - título curto
  - botão “voltar” quando aplicável
- **Tabs** (ex.: Home / Favoritos)
- **BottomNav** (opcional, se for PWA/app-like)

### 8.2 Listagem (core do produto)
- **LocalCard**
  - imagem
  - nome
  - categoria/nicho
  - rating + reviews
  - tags
  - badge `open_now`
  - badge `featured`
  - CTA secundário “ver detalhes”

### 8.3 Detalhe (conversão)
- **LocalDetailHeader**
  - imagem grande (hero)
  - nome
  - rating
  - status de aberto
- **InfoList**
  - endereço, telefone, site, instagram, maps
- **PrimaryCTA**
  - “Falar no WhatsApp”
  - fica sticky no mobile (quando possível)

### 8.4 Formulários
- **TextField**
- **PhoneField** (máscara leve)
- **Textarea**
- **Checkbox** (consentimento se necessário)
- **FormActions** (botão primário + secundário)

### 8.5 Feedback e Estados
- **Skeleton**
- **EmptyState** (sem resultados)
- **ErrorState**
- **Toast / Alert**
- **LoadingOverlay** (evitar sempre, usar com cuidado)

### 8.6 Chips e Badges
- **Chip** (filtro)
- **Badge** (open_now, featured, status)
- **TagPill** (tags do local)

### 8.7 Modal & Drawer
- Modal para confirmação e detalhes rápidos.
- Drawer recomendado no mobile.

---

## 9) Estados de UI (obrigatórios)

Toda tela deve ter:
- Loading
- Empty
- Error
- Success feedback (quando ação acontece)

### 9.1 Loading
- Use skeleton sempre que possível.
- Não usar spinner sozinho em listagens.

### 9.2 Empty
- Mostrar mensagem + sugestão:
  - trocar filtro
  - buscar outro termo
  - voltar

### 9.3 Error
- Texto claro, sem código técnico.
- Oferecer ação:
  - “tentar novamente”
  - “voltar”

---

## 10) Padrões de Página (Templates)

### 10.1 Página de Listagem
- Header com nome do projeto (branding)
- Barra de busca
- Chips de filtros
- Cards em grid
- Estado empty e loading

### 10.2 Página de Detalhe
- Hero com imagem
- Informações essenciais acima da dobra
- CTA WhatsApp primário sempre fácil
- Links auxiliares (site/instagram/maps)

### 10.3 Página de Lead
- Form simples (nome, telefone, mensagem)
- CTA “Enviar e abrir WhatsApp”
- Mensagem de confiança (“rápido e direto”)

### 10.4 Favoritos
- Lista simples
- Sem animações exageradas

---

## 11) Regras de Acessibilidade (obrigatórias)

- Contraste AA
- Botões com área mínima de toque
- Labels em inputs
- Focus visível em navegação por teclado
- Texto não pode depender só de cor (use ícone/badge)

---

## 12) Multi-tenant Visual (Como aplicar)

### 12.1 O que muda por projeto
- Logo
- Primary/Accent
- Tema base (light/dark)
- Bordas (soft/rounded)

### 12.2 O que NÃO muda
- Estrutura de layout
- Espaçamentos
- Tipografia
- Componentes e estados

### 12.3 Fonte dos dados
- `projetos` fornece tokens (cor, logo, tema)

### 12.4 Regra de fallback
Se o projeto não tiver cor/tema válido:
- usar tema default global
- registrar aviso no console (apenas dev)

---

## 13) Convenções de Código (UI)

### 13.1 Nomeação
- Componentes: `PascalCase`
- Hooks: `useX`
- Tokens: `kebab-case` ou `camelCase` conforme padrão do projeto (definir 1 e manter)

### 13.2 Evitar
- estilos inline espalhados sem padrão
- duplicação de componentes
- cores hardcoded fora de tokens

### 13.3 Aceitar
- um “theme object” por projeto
- CSS variables por tenant (recomendado)

---

## 14) Checklist de Qualidade (antes de subir UI)

- [ ] Usa tokens, não cores soltas
- [ ] Tem loading/empty/error
- [ ] CTA principal existe e é claro
- [ ] Mobile-first OK
- [ ] Contraste OK
- [ ] Sem “select *” de UI (ex.: sem dados desnecessários)
- [ ] Não quebra multi-tenant visual

---

## 15) Governança do Design System

### 15.1 Mudanças permitidas (incrementais)
- Ajustar espaçamento de um componente
- Melhorar copy
- Ajustar radius dentro do padrão

### 15.2 Mudanças estruturais (exigem registro)
- Trocar tipografia global
- Trocar escala de spacing
- Trocar padrão de layout principal
- Alterar regras de multi-tenant visual

Toda mudança estrutural deve entrar no CHANGELOG.

---

## 16) Status

Este documento é oficial.
Ele é uma camada acima dos 4 pilares estruturais.

Se houver conflito:
- PRODUCT_CORE manda no propósito e UX central.
- DESIGN_SYSTEM manda na consistência visual.

---