# 📸 SNAPSHOT COMPLETO - Pet Finder

> Snapshot gerado automaticamente com TODO o código do projeto

**Data:** $(date '+%d/%m/%Y %H:%M:%S')  
**Diretório:** $(pwd)

---

## 📋 ÍNDICE

1. [Estrutura de Pastas](#estrutura)
2. [Dependências](#dependencias)
3. [Código Completo](#codigo)
4. [Estatísticas](#estatisticas)

---

## 1. ESTRUTURA DE PASTAS

### Árvore Completa

```
  .
  dist
  docs
  node_modules
  public
  scripts
  src
  src/assets
  src/components
  src/components/CardItem
  src/components/ChatModal
  src/components/FilterSheet
  src/components/ui
  src/context
  src/hooks
  src/pages
  src/pages/Manager
  src/pages/Manager/components
  src/pages/Processor
  src/pages/Viewer
  src/services
  src/utils
```

### Lista de Arquivos (src/)

```
src/App.jsx
src/assets/components.css
src/assets/design-tokens.css
src/assets/global.css
src/assets/layout.css
src/assets/react.svg
src/assets/spacing.css
src/assets/text.css
src/assets/theme.css
src/assets/tokens.css
src/assets/utilities.css
src/components/CardItem/CardClassic.jsx
src/components/CardItem/index.jsx
src/components/CardItem/pet-card.css
src/components/CardItem/styles.css
src/components/ChatModal/index.jsx
src/components/FilterSheet/index.jsx
src/components/ui/Badge.jsx
src/components/ui/button.css
src/components/ui/Button.jsx
src/components/ui/Card.jsx
src/components/ui/index.js
src/components/ui/Index.jsx
src/context/DataContext.jsx
src/hooks/useDashboardData.jsx
src/hooks/useDashboardFilters.jsx
src/main.jsx
src/pages/Manager/components/DashboardHeader.jsx
src/pages/Manager/components/EmptyState.jsx
src/pages/Manager/components/FilterBar.jsx
src/pages/Manager/components/ProjectFiltersPanel.jsx
src/pages/Manager/components/StoreCardEdit.jsx
src/pages/Manager/components/StoreCard.jsx
src/pages/Manager/index.jsx
src/pages/Manager/Manager.css
src/pages/Processor/index.jsx
src/pages/Viewer/index.jsx
src/pages/Viewer/Viewer.css
src/services/cardService.js
src/services/filterService.js
src/services/supabaseClient.js
src/utils/constants.js
src/utils/generateReport.js
src/utils/index.js
src/utils/textLogic.js
src/utils/theme.js
```

---

## 2. DEPENDÊNCIAS

### package.json

```json
{
  "name": "local-finder",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.90.1",
    "@vitejs/plugin-react": "^5.1.2",
    "framer-motion": "^12.29.0",
    "lucide-react": "^0.562.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.3",
    "react-social-media-embed": "^2.5.18"
  },
  "devDependencies": {
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "eslint": "^9.39.2",
    "eslint-plugin-react": "^7.37.5",
    "typescript": "^5.9.3",
    "vite": "^5.4.0"
  }
}
```

---

## 3. CÓDIGO COMPLETO

### CONFIGURAÇÕES


### 📄 vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

---


### 📄 .gitignore

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

---


### 📄 index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />
    <title>Local Finder Factory</title>
  </head>
  <body>
    <div id="root"></div>
    
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---


### 📄 vercel.json

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

```

---

### CÓDIGO FONTE (src/)

#### 🎨 Assets


### 📄 src/assets/components.css

```css
/* =========================================================
   COMPONENTS — Padrões auxiliares (LEGADO CONTROLADO)
   ---------------------------------------------------------
   ⚠️ Este arquivo NÃO define componentes base do Design System.
   ⚠️ Cards, Buttons e afins vivem em arquivos próprios.
   ========================================================= */

/* ---------------------------------------------------------
   Card helpers (uso opcional)
   --------------------------------------------------------- */

/* Padding padrão para cards legados */
.card-padding {
  padding: 16px;
}

/* Hover genérico para cards interativos */
.card-hover:hover {
  box-shadow: var(--shadow-md);
}
```

---


### 📄 src/assets/design-tokens.css

```css
/* Sistema de Design - Pet Finder */
/* Variáveis CSS para uso em todo o projeto */

:root {
  /* Cores Principais */
  --color-primary: #F97316;
  --color-primary-dark: #EA580C;
  --color-primary-light: #FED7AA;
  --color-primary-bg: #FFF7ED;

  /* VIP/Premium */
  --color-vip: #A855F7;
  --color-vip-dark: #9333EA;
  --color-vip-light: #E9D5FF;
  --color-vip-bg: #FAF5FF;

  /* Sucesso (WhatsApp) */
  --color-success: #22C55E;
  --color-success-dark: #16A34A;

  /* Neutros */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-500: #6B7280;
  --color-gray-700: #374151;
  --color-gray-900: #111827;

  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-vip: 0 0 0 3px rgba(168, 85, 247, 0.1),
                0 10px 15px rgba(168, 85, 247, 0.2);

  /* Espaçamentos */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}
```

---


### 📄 src/assets/global.css

```css
/* ======================================================
   📄 index.css / global.css
   Base global da aplicação
   ====================================================== */

/* ======================================================
   🔹 RESET BÁSICO
   ====================================================== */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

/* ======================================================
   🔹 VARIÁVEIS & TIPOGRAFIA BASE
   ====================================================== */
:root {
  /* Tipografia */
  --font-main: system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  /* Cores base */
  --color-bg: #f8fafc;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;

  /* Brand (ajustável depois) */
  --color-primary: #2563eb;
  --color-primary-soft: #dbeafe;

  /* App shell */
  --app-max-width: 420px;
}

body {
  font-family: var(--font-main);
  color: var(--color-text);
  background: var(--color-bg);

  /* Centralização HORIZONTAL tipo app */
  display: flex;
  justify-content: center;

  /* ⚠️ NUNCA centralizar verticalmente no body */
}

/* ======================================================
   🔹 ROOT DO REACT
   ====================================================== */
#root {
  width: 100%;
  max-width: var(--app-max-width);
  min-height: 100vh;

  /* Importante para páginas longas */
  display: block;
}

/* ======================================================
   🔹 LINKS
   ====================================================== */
a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* ======================================================
   🔹 BOTÕES (BASE NEUTRA)
   ====================================================== */
button {
  font-family: inherit;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: #fff;
  color: inherit;
  cursor: pointer;

  transition: background 0.2s ease, border-color 0.2s ease;
}

button:hover {
  background: #f1f5f9;
}

/* ======================================================
   🔹 SCROLLBAR (DESKTOP)
   ====================================================== */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 6px;
}

/* ======================================================
   🔹 SCROLLBAR (MOBILE / APP-LIKE)
   ====================================================== */
@media (max-width: 768px) {
  ::-webkit-scrollbar {
    display: none;
  }
}
/* ======================================================
   📄 styles.css (ou index.css / App.css)
   Estilos Globais Base do Projeto
====================================================== */

/* ======================================================
   🔹 ROOT CONTAINER
======================================================
🎯 Intenção:
Definir o container principal da aplicação React (#root)

🧠 O que controla:
- Largura máxima do app
- Centralização horizontal
- Espaçamento interno
- Alinhamento de texto padrão

🔒 Observações:
- Este estilo impacta TODA a aplicação
- Qualquer layout quebrado geralmente começa aqui
*/
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

/* ======================================================
   🔹 LOGO BASE
======================================================
🎯 Intenção:
Estilo padrão para logos (ex: Vite / React)

🧠 O que controla:
- Tamanho
- Área de clique
- Otimização de renderização (will-change)
- Transição suave de hover

🔒 Observações:
- Não usar para logos de negócio
- Apenas branding técnico/dev
*/
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

/* ======================================================
   🔹 LOGO — HOVER GENÉRICO
======================================================
🎯 Intenção:
Feedback visual ao passar o mouse

🧠 O que controla:
- Drop shadow suave
- Destaque visual

🔒 Observações:
- Cor genérica (azulada)
*/
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

/* ======================================================
   🔹 LOGO — VARIAÇÃO REACT
======================================================
🎯 Intenção:
Diferenciar logo do React visualmente

🧠 O que controla:
- Cor do glow no hover

🔒 Observações:
- Apenas visual
*/
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

/* ======================================================
   🔹 ANIMAÇÃO: LOGO GIRANDO
======================================================
🎯 Intenção:
Animação demonstrativa (exemplo / showcase)

🧠 O que controla:
- Rotação contínua
- Usada apenas em ambientes de demo

🔒 Observações:
- Não usar em produção final
*/
@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ======================================================
   🔹 PREFERÊNCIA DE MOVIMENTO
======================================================
🎯 Intenção:
Respeitar acessibilidade do usuário

🧠 O que controla:
- Só anima se o usuário NÃO tiver redução de movimento ativada

🔒 Observações:
- Boa prática obrigatória em apps modernos
*/
@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

/* ======================================================
   🔹 CARD GENÉRICO
======================================================
🎯 Intenção:
Estilo base para cards de exemplo

🧠 O que controla:
- Espaçamento interno

🔒 Observações:
- Não confundir com StoreCard / Card do app
*/
.card {
  padding: 2em;
}

/* ======================================================
   🔹 TEXTO AUXILIAR / DOCUMENTAÇÃO
======================================================
🎯 Intenção:
Estilo para textos secundários (ex: links de docs)

🧠 O que controla:
- Cor neutra
- Baixa hierarquia visual

🔒 Observações:
- Não usar para conteúdo principal
*/
.read-the-docs {
  color: #888;
}
```

---


### 📄 src/assets/layout.css

```css
/* =========================================================
   LAYOUT — Utilitários estruturais
   ---------------------------------------------------------
   Este arquivo cobre APENAS estrutura:
   display, direção, alinhamento, distribuição e espaçamento.
   ========================================================= */

/* Flex base */
.flex {
  display: flex;
}

/* Direção */
.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

/* Alinhamento */
.items-center {
  align-items: center;
}

.items-start {
  align-items: flex-start;
}

.items-end {
  align-items: flex-end;
}

/* Distribuição */
.justify-start {
  justify-content: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-end {
  justify-content: flex-end;
}

/* Espaçamento entre itens */
.gap-sm { gap: 8px; }
.gap-md { gap: 12px; }
.gap-lg { gap: 16px; }
.gap-xl { gap: 24px; }

/* =========================================================
   APP BACKGROUND
   ========================================================= */

body {
  background: var(--surface-bg);
  color: var(--text-main);
}

```

---


### 📄 src/assets/spacing.css

```css
/* =========================================================
   SPACING — Utilitários de espaçamento
   ---------------------------------------------------------
   Padding e margin reutilizáveis.
   Não inclui layout, cor ou tipografia.
   ========================================================= */

/* Padding (todos os lados) */
.p-xs { padding: 4px; }
.p-sm { padding: 8px; }
.p-md { padding: 16px; }
.p-lg { padding: 24px; }

/* Padding vertical / horizontal */
.py-sm { padding-top: 8px; padding-bottom: 8px; }
.py-md { padding-top: 16px; padding-bottom: 16px; }

.px-sm { padding-left: 8px; padding-right: 8px; }
.px-md { padding-left: 16px; padding-right: 16px; }

/* Margin (todos os lados) */
.m-sm { margin: 8px; }
.m-md { margin: 16px; }
.m-lg { margin: 24px; }

/* Margin top */
.mt-xs { margin-top: 4px; }
.mt-sm { margin-top: 8px; }
.mt-md { margin-top: 16px; }
.mt-lg { margin-top: 24px; }

/* Margin bottom */
.mb-xs { margin-bottom: 4px; }
.mb-sm { margin-bottom: 8px; }
.mb-md { margin-bottom: 16px; }
.mb-lg { margin-bottom: 24px; }

/* Margin left / right (casos pontuais) */
.ml-sm { margin-left: 8px; }
.mr-sm { margin-right: 8px; }
```

---


### 📄 src/assets/text.css

```css
/* =========================================================
   TEXT — Tipografia base do Design System
   ---------------------------------------------------------
   Define estilos de texto reutilizáveis.
   Não controla layout (margin/padding ficam em spacing.css).
   ========================================================= */

/* ---------------------------------------------------------
   Headings
   --------------------------------------------------------- */

.h1 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
}

.h2 {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
}

.h3 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
}

/* ---------------------------------------------------------
   Texto base
   --------------------------------------------------------- */

.text {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}

.text-sm {
  font-size: 12px;
  line-height: 1.4;
}

.text-lg {
  font-size: 16px;
  line-height: 1.6;
}

/* ---------------------------------------------------------
   Cores de texto
   --------------------------------------------------------- */

.text-muted {
  color: var(--color-text-muted);
}

.text-primary {
  color: var(--color-primary);
}

.text-success {
  color: var(--color-success);
}

.text-warning {
  color: var(--color-warning);
}

.text-danger {
  color: var(--color-danger);
}

/* ---------------------------------------------------------
   Ênfase
   --------------------------------------------------------- */

.text-bold {
  font-weight: 600;
}

.text-semibold {
  font-weight: 500;
}
```

---


### 📄 src/assets/theme.css

```css
/* =========================================================
   THEME — Tokens globais do Design System
   ---------------------------------------------------------
   Fonte única de cores, tipografia, radius e sombras.
   NÃO aplicar layout nem estilos de componentes aqui.
   ========================================================= */

/* =========================================================
   APP THEME TOKENS (Pet Lovers vibe) — editável depois
   ========================================================= */

:root {
  /* Brand */
  --app-primary: #6d5dfc;
  --app-primary-2: #8b7cff;
  --app-primary-contrast: #ffffff;

  /* Backgrounds */
  --app-bg: #f6f7fb;
  --app-surface: #ffffff;
  --app-surface-soft: rgba(255, 255, 255, 0.72);

  /* Text */
  --app-text: #0f172a;
  --app-text-muted: #64748b;

  /* Borders */
  --app-border: rgba(15, 23, 42, 0.10);

  /* Shadow / Elevation */
  --app-shadow-card: 0 10px 28px rgba(0, 0, 0, 0.12);
  --app-shadow-float: 0 14px 34px rgba(0, 0, 0, 0.16);

  /* Radius */
  --app-radius-lg: 24px;
  --app-radius-md: 16px;
  --app-radius-sm: 12px;

  /* Header gradient */
  --app-header-gradient: linear-gradient(135deg, var(--app-primary), var(--app-primary-2));
}



:root {
  /* -------------------------------------------------------
     CORES
     ------------------------------------------------------- */

  --color-primary: #1a73e8;
  --color-primary-soft: #e8f0fe;

  --color-bg: #f8fafc;
  --color-card: #ffffff;

  --color-text: #1f2933;
  --color-text-muted: #6b7280;

  --color-border: #e5e7eb;

  --color-success: #16a34a;
  --color-warning: #f59e0b;
  --color-danger: #dc2626;

  /* -------------------------------------------------------
     TIPOGRAFIA
     ------------------------------------------------------- */

  --font-main: 'Inter', system-ui, -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

  /* -------------------------------------------------------
     RADIUS
     ------------------------------------------------------- */

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  /* -------------------------------------------------------
     SOMBRAS
     ------------------------------------------------------- */

  --shadow-soft: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* ---------------------------------------------------------
   BASE GLOBAL (mínimo necessário)
   --------------------------------------------------------- */

body {
  margin: 0;
  font-family: var(--font-main);
  background: var(--color-bg);
  color: var(--color-text);
}
```

---


### 📄 src/assets/tokens.css

```css
/* =========================================================
   TOKENS — Alias e documentação do Design System
   ---------------------------------------------------------
   Este arquivo NÃO define novos valores.
   Ele expõe aliases semânticos para tokens do theme.css
   e documenta o sistema de design.
   ========================================================= */

/* ---------------------------------------------------------
   CORES (aliases semânticos)
   --------------------------------------------------------- */

:root {
  /* Superfícies */
  --surface-page: var(--color-bg);
  --surface-card: var(--color-card);

  /* Texto */
  --text-primary: var(--color-text);
  --text-muted: var(--color-text-muted);

  /* Ações */
  --action-primary: var(--color-primary);
  --action-success: var(--color-success);
  --action-warning: var(--color-warning);
  --action-danger: var(--color-danger);

  /* Bordas */
  --border-default: var(--color-border);

  /* Sombras */
  --elevation-soft: var(--shadow-soft);
  --elevation-sm: var(--shadow-sm);
  --elevation-md: var(--shadow-md);

  /* Radius */
  --radius-control: var(--radius-md);
  --radius-surface: var(--radius-lg);
}


/* =========================================================
   APP ALIASES — use no CSS (sem depender do nome "app-*")
   ========================================================= */

:root {
  --brand-primary: var(--app-primary);
  --brand-primary-2: var(--app-primary-2);
  --brand-on-primary: var(--app-primary-contrast);

  --surface-bg: var(--app-bg);
  --surface-card: var(--app-surface);
  --surface-glass: var(--app-surface-soft);

  --text-main: var(--app-text);
  --text-muted: var(--app-text-muted);

  --border-soft: var(--app-border);

  --shadow-card: var(--app-shadow-card);
  --shadow-float: var(--app-shadow-float);

  --radius-lg: var(--app-radius-lg);
  --radius-md: var(--app-radius-md);
  --radius-sm: var(--app-radius-sm);

  --header-gradient: var(--app-header-gradient);
}
```

---


### 📄 src/assets/utilities.css

```css
/* =========================================================
   UTILITIES — Helpers genéricos
   ---------------------------------------------------------
   Pequenas classes utilitárias para casos pontuais.
   Não substituem layout.css nem spacing.css.
   ========================================================= */

/* Visibilidade */
.hidden {
  display: none !important;
}

.invisible {
  visibility: hidden;
}

/* Largura / altura */
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

/* Texto */
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

/* Bordas e forma */
.rounded-sm {
  border-radius: var(--radius-sm);
}

.rounded-md {
  border-radius: var(--radius-md);
}

.rounded-lg {
  border-radius: var(--radius-lg);
}

/* Overflow */
.overflow-hidden {
  overflow: hidden;
}

/* Cursor */
.cursor-pointer {
  cursor: pointer;
}

/* Elevação rápida (casos especiais) */
.shadow-sm {
  box-shadow: var(--shadow-sm);
}

.shadow-md {
  box-shadow: var(--shadow-md);
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.overflow-x-auto {
  overflow-x: auto;
}
```

---

#### 🧩 Components


### 📄 src/components/CardItem/CardClassic.jsx

```javascript
// ======================================================
// 🐾 PetCardClassic.jsx
// Card principal do PetList (versão Classic)
// ======================================================
//
// RESPONSABILIDADE
// - Renderizar TODAS as informações visuais do Pet Shop
// - Garantir imagem SEMPRE
// - Controlar expansão (sanfona)
// - NÃO acessar Supabase diretamente
//
// CONTRATO COM SUPABASE
// - Campo de imagem: image_url
// ======================================================

import React, { useState } from "react";
import {
  MapPin,
  MessageCircle,
  Star,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function PetCardClassic({ local, onOpenChat }) {
  const [expanded, setExpanded] = useState(false);

  // =========================
  // DADOS NORMALIZADOS
  // =========================
  const isVip = Boolean(local.destaque);
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);

  // =========================
  // 🖼️ IMAGEM FINAL (CONTRATO)
  // =========================
  const imagemFinal =
    typeof local.image_url === "string" && local.image_url.trim() !== ""
      ? local.image_url
      : "https://images.unsplash.com/photo-abc123?auto=format&fit=crop&w=800&q=80";

  // =========================
  // PLACEHOLDER (se imagem quebrar)
  // =========================
  const getPlaceholderIcon = () => {
    const niche = (local.niche || "").toLowerCase();
    if (niche.includes("vet")) return "🏥";
    if (niche.includes("banho") || niche.includes("tosa")) return "✂️";
    if (niche.includes("hotel")) return "🏨";
    return "🐶";
  };

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        position: "relative"
      }}
    >
      {/* =========================
          SELO VIP
      ========================== */}
      {isVip && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "var(--cor-destaque)",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "700",
            padding: "4px 10px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            zIndex: 2
          }}
        >
          <Award size={12} /> VIP
        </div>
      )}

      {/* =========================
          IMAGEM
      ========================== */}
<img
  src={imagemFinal}
  alt={local.nome}
  loading="lazy"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";
  }}
  style={{
    width: "100%",
    height: "160px",
    objectFit: "cover",
    display: "block"
  }}
/>

      {/* =========================
          CONTEÚDO
      ========================== */}
      <div style={{ padding: "16px" }}>
        {/* NOME */}
        <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700 }}>
          {local.nome}
        </h3>

        {/* NOTA */}
        {nota > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "4px",
              fontSize: "13px",
              color: "var(--text-secondary)"
            }}
          >
            <Star size={14} color="#facc15" fill="#facc15" />
            <strong>{nota.toFixed(1)}</strong>
            <span>({avaliacoes} avaliações)</span>
          </div>
        )}

        {/* ENDEREÇO */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginTop: "8px",
            fontSize: "13px",
            color: "var(--text-secondary)"
          }}
        >
          <MapPin size={14} />
          <span>{local.endereco || "Endereço não informado"}</span>
        </div>

        {/* TAGS */}
        {Array.isArray(local.tags) && local.tags.length > 0 && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
            {local.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#f1f5f9",
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontWeight: 600
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* =========================
            TOGGLE EXTRA
        ========================== */}
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            marginTop: "12px",
            width: "100%",
            background: "transparent",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            padding: "8px",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            gap: "6px"
          }}
        >
          Conteúdo extra {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>

        {/* =========================
            SANFONA
        ========================== */}
        <div
          style={{
            maxHeight: expanded ? "300px" : "0",
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition: "all 0.35s ease",
            marginTop: expanded ? "10px" : "0"
          }}
        >
          <div
            style={{
              padding: "12px",
              background: "#f8fafc",
              borderRadius: "10px",
              fontSize: "13px",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }}
          >
            {local.aberto_agora !== null && (
              <div>{local.aberto_agora ? "🟢 Aberto agora" : "🔴 Fechado"}</div>
            )}
            {local.horario_fechamento && (
              <div>⏰ Até {local.horario_fechamento}</div>
            )}
            {local.estacionamento && <div>🅿️ Estacionamento disponível</div>}
          </div>
        </div>
      </div>

      {/* =========================
          CTA
      ========================== */}
      <button
        onClick={() => onOpenChat?.(local)}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          background: "#25D366",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          gap: "8px"
        }}
      >
        <MessageCircle size={20} /> Falar com a loja
      </button>
    </div>
  );
}
```

---


### 📄 src/components/CardItem/index.jsx

```javascript
// src/components/CardItem/index.jsx
import React, { useState } from "react";
import {
  Star,
  MessageCircle,
  Scissors,
  Stethoscope,
  Car,
  ChevronDown,
  ChevronUp,
  MapPin,
  Award,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "./pet-card.css";

export default function PetCardMapStyle({ local, onOpenChat, isNovo = false }) {
  const nota = Number(local.nota || 0);
  const avaliacoes = Number(local.avaliacoes || 0);
  const [expanded, setExpanded] = useState(false);
  const isVip = Boolean(local.destaque);

  const imagem =
    typeof local.image_url === "string" && local.image_url.trim() !== ""
      ? local.image_url
      : "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";

  return (
    <div
      className={`pet-card-wrapper ${isVip ? 'is-vip' : ''}`}
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
      }}
    >
      {/* IMAGEM */}
      <div className="pet-card-image-wrapper relative w-full">
        <img
          src={imagem}
          alt={local.nome}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80";
          }}
          className="pet-card-image w-full"
          style={{ height: "180px", objectFit: "cover" }}
        />

        {/* BADGE VIP MELHORADO */}
        {isVip && (
          <div className="badge-vip-modern">
            <Sparkles size={12} />
            <span>PARCEIRO VIP</span>
          </div>
              )}

                {/* BADGE NOVO */}
        {isNovo && !isVip && (
          <span className="badge-novo">
            ✨ NOVO
          </span>
        )}

        {/* STATUS */}
        {local.aberto_agora && (
          <span className="badge-status badge-open">
            <span className="status-dot"></span>
            ABERTO AGORA
          </span>
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="pet-card p-md">
        <h3 className="pet-title">{local.nome}</h3>

        {/* NOTA */}
        {nota > 0 && (
          <div className="pet-rating flex items-center gap-sm mt-xs text-sm">
            <Star size={14} fill="#FBBF24" color="#FBBF24" />
            <strong className="rating-value">{nota.toFixed(1)}</strong>
            <span className="rating-count">({avaliacoes})</span>
          </div>
        )}

        {/* INFO */}
        <div className="pet-info-grid">
          {local.horario_fechamento && (
            <div className="pet-info-item">
              <span className="pet-info-icon">⏰</span>
              <span>Até {local.horario_fechamento}</span>
            </div>
          )}

          {local.tags?.includes("banho") && (
            <div className="pet-info-item">
              <Scissors size={14} />
              <span>Banho e Tosa</span>
            </div>
          )}

          {local.tags?.includes("vet") && (
            <div className="pet-info-item">
              <Stethoscope size={14} />
              <span>Veterinário</span>
            </div>
          )}

          {local.estacionamento && (
            <div className="pet-info-item">
              <Car size={14} />
              <span>Estacionamento</span>
            </div>
          )}
        </div>

        {/* EXPANDIR */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="pet-expand-btn w-full mt-md flex justify-center items-center gap-sm cursor-pointer"
          style={{
            background: expanded ? "#f8fafc" : "transparent",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "10px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#334155"
          }}
        >
          <MapPin size={14} />
          <span className="text-center text-sm">
            Ver endereço e detalhes
          </span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-sm"
            >
              <div
                className="pet-expanded-content flex flex-col gap-sm p-md"
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#475569",
                  border: "1px solid #e2e8f0"
                }}
              >
                {local.aberto_agora !== null && (
                  <div>{local.aberto_agora ? "🟢 Aberto agora" : "🔴 Fechado"}</div>
                )}

                {local.horario_fechamento && (
                  <div>⏰ Até {local.horario_fechamento}</div>
                )}

                {local.endereco && (
                  <div className="flex gap-sm items-start">
                    <MapPin size={16} className="mt-xs" />
                    <span>{local.endereco}</span>
                  </div>
                )}

                {local.estacionamento && <div>🅿️ Estacionamento disponível</div>}

                {Array.isArray(local.tags) && local.tags.length > 0 && (
                  <div className="flex gap-sm mt-xs">
                    {local.tags.map((tag) => (
                      <span
                        key={tag}
                        className="pet-tag"
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          fontSize: "11px",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontWeight: 600
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <button
          className="btn-whatsapp-modern mt-md w-full flex justify-center gap-sm"
          onClick={() => onOpenChat(local)}
        >
          <MessageCircle size={18} /> 
          <span>Falar no WhatsApp</span>
        </button>
      </div>
    </div>
  );
}```

---


### 📄 src/components/CardItem/pet-card.css

```css
/* =========================================================
   CARD — Base canônica do Design System
   ========================================================= */
.card {
  background: var(--color-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.card-padding {
  padding: 16px;
}

.card-hover:hover {
  box-shadow: var(--shadow-md);
}

/* =========================================================
   PET CARD - Estilos Existentes
   ========================================================= */
.pet-card {
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
}

.pet-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.pet-meta {
  font-size: 13px;
  color: var(--color-muted);
  margin: 0;
}

.btn-whatsapp {
  background: var(--color-whatsapp);
  color: #fff;
  border-radius: var(--radius-md);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-whatsapp:hover {
  background: var(--color-whatsapp-hover);
}

.badge-vip {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #3a2f0b;
  background: linear-gradient(
    135deg,
    #f6e8a6 0%,
    #e6c76a 45%,
    #c8a94a 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 0 0 1px rgba(200, 169, 74, 0.35),
    0 8px 20px rgba(200, 169, 74, 0.35);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
}

.pet-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 10px;
  font-size: 13px;
  color: var(--color-muted);
}

.pet-info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.2;
}

.pet-info-icon {
  font-size: 14px;
}

/* =========================================================
   🆕 MELHORIAS ADICIONADAS - Card Wrapper
   ========================================================= */
.pet-card-wrapper {
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.pet-card-wrapper:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15) !important;
}

/* Card VIP com borda especial */
.pet-card-wrapper.is-vip {
  border-color: var(--color-vip-light);
  box-shadow: var(--shadow-vip) !important;
}

.pet-card-wrapper.is-vip:hover {
  border-color: var(--color-vip);
}

/* =========================================================
   🆕 BADGE VIP MODERNO (Ribbon)
   ========================================================= */
.badge-vip-modern {
  position: absolute;
  top: 16px;
  right: -8px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px 6px 12px;
  background: linear-gradient(135deg, var(--color-vip) 0%, var(--color-vip-dark) 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 4px 0 0 4px;
  box-shadow: 
    0 4px 12px rgba(168, 85, 247, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  animation: vipPulse 2s ease-in-out infinite;
}

.badge-vip-modern::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: -6px;
  width: 0;
  height: 0;
  border-left: 8px solid var(--color-vip-dark);
  border-bottom: 6px solid transparent;
}

@keyframes vipPulse {
  0%, 100% {
    box-shadow: 
      0 4px 12px rgba(168, 85, 247, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 
      0 4px 16px rgba(168, 85, 247, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

/* =========================================================
   🆕 BADGE STATUS (Aberto/Fechado)
   ========================================================= */
.badge-status {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.badge-open {
  background: rgba(34, 197, 94, 0.95);
  color: white;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* =========================================================
   🆕 IMAGEM COM ZOOM
   ========================================================= */
.pet-card-image-wrapper {
  overflow: hidden;
  position: relative;
}

.pet-card-image {
  transition: transform 0.5s ease;
}

.pet-card-wrapper:hover .pet-card-image {
  transform: scale(1.08);
}

/* =========================================================
   🆕 RATING MELHORADO
   ========================================================= */
.pet-rating {
  gap: 6px;
}

.rating-value {
  color: var(--color-gray-900);
  font-weight: 700;
}

.rating-count {
  color: var(--color-gray-500);
  font-size: 13px;
}

/* =========================================================
   🆕 BOTÃO EXPANDIR MELHORADO
   ========================================================= */
.pet-expand-btn {
  transition: all 0.2s;
}

.pet-expand-btn:hover {
  background: var(--color-gray-100) !important;
  border-color: var(--color-gray-300) !important;
}

.pet-expand-btn svg {
  color: var(--color-primary);
}

/* =========================================================
   🆕 BOTÃO WHATSAPP MODERNO
   ========================================================= */
.btn-whatsapp-modern {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success-dark) 100%);
  color: white;
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.btn-whatsapp-modern:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
}

.btn-whatsapp-modern:active {
  transform: translateY(0);
}

/* =========================================================
   🆕 TAGS MELHORADAS
   ========================================================= */
.pet-tag {
  transition: all 0.2s;
}

.pet-tag:hover {
  background: var(--color-primary-bg) !important;
  border-color: var(--color-primary-light) !important;
  color: var(--color-primary-dark) !important;
}

/* =========================================================
   RESPONSIVO
   ========================================================= */
@media (max-width: 640px) {
  .pet-card-wrapper:hover {
    transform: translateY(-4px);
  }
  
  .badge-vip-modern {
    font-size: 9px;
    padding: 5px 14px 5px 10px;
  }
}

/* Badge Novo */
.badge-novo {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 5;
  padding: 4px 10px;
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
}```

---


### 📄 src/components/CardItem/styles.css

```css
/* =========================================================
   CARD — Base canônica do Design System
   ---------------------------------------------------------
   Este arquivo define APENAS o card genérico.
   Variantes específicas (pet-card, etc) ficam fora daqui.
   ========================================================= */

.card {
  background: var(--color-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

/* Padding padrão do card */
.card-padding {
  padding: 16px;
}

/* Variante de interação (hover) */
.card-hover:hover {
  box-shadow: var(--shadow-md);
}
```

---


### 📄 src/components/ChatModal/index.jsx

```javascript
// ======================================================
// 📄 ChatModal.jsx
// Modal de Conversa + Captura de Lead (WhatsApp)
// ======================================================
//
// 🎯 PROPÓSITO
// - Simular um chat inicial humanizado
// - Qualificar o interesse do usuário
// - Capturar lead (nome + telefone)
// - Redirecionar para WhatsApp da loja
//
// 🧠 MODELO MENTAL
// - Conversa guiada por etapas (steps)
// - Bot inicia → usuário responde → lead é capturado
// - Supabase registra o lead com vínculo ao projeto
//
// 🔒 CONTRATO
// - Não decide regras de negócio do projeto
// - Não decide layout global
// - Apenas executa o fluxo de conversa
//

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, User, Phone } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

// ======================================================
// 🔹 COMPONENTE: ChatModal
// ======================================================
//
// 🔑 PROPS
// - local   → loja que receberá o contato
// - projeto → projeto/nicho (branding + vínculo)
// - onClose → callback para fechar o modal
//
export default function ChatModal({ local, projeto, onClose }) {

  // ==============================
  // 🔹 ESTADOS PRINCIPAIS
  // ==============================
  //
  // step:
  // 0 → mensagem inicial do bot
  // 1 → pergunta aberta do usuário
  // 2 → coleta de dados (lead)
  //
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [leadData, setLeadData] = useState({ nome: '', telefone: '' });
  const [isSending, setIsSending] = useState(false);

  // Ref para auto-scroll
  const messagesEndRef = useRef(null);

  // ==============================
  // 🔹 BOOTSTRAP DA CONVERSA
  // ==============================
  //
  // Inicia a conversa automaticamente
  //
  useEffect(() => {
    if (step === 0) {
      setTimeout(() => {
        addBotMessage(`Olá! Sou o assistente virtual da ${local.nome}. 🐶`);
        setTimeout(() => {
          addBotMessage('Como podemos te ajudar hoje?');
          setStep(1);
        }, 1000);
      }, 500);
    }
  }, [step, local.nome]);

  // ==============================
  // 🔹 AUTO-SCROLL
  // ==============================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  // ==============================
  // 🔹 HELPERS DE MENSAGEM
  // ==============================
  const addBotMessage = (text) =>
    setMessages(prev => [...prev, { sender: 'bot', text }]);

  const addUserMessage = (text) =>
    setMessages(prev => [...prev, { sender: 'user', text }]);

  // ==============================
  // 🔹 ETAPA 1: PRIMEIRA INTERAÇÃO
  // ==============================
  //
  // Usuário escreve livremente
  // Bot responde e avança para coleta de lead
  //
  const handleFirstInteraction = () => {
    if (!userInput.trim()) return;

    addUserMessage(userInput);
    setUserInput('');

    setTimeout(() => {
      addBotMessage('Perfeito! Vou transferir para um atendente humano.');
      setTimeout(() => {
        addBotMessage('Para isso, preciso só do seu Nome e WhatsApp.');
        setStep(2);
      }, 1000);
    }, 800);
  };

  // ==============================
  // 🔹 ETAPA 2: ENVIO DO LEAD
  // ==============================
  //
  // - Salva no Supabase
  // - Vínculo com projeto + loja
  // - Redireciona para WhatsApp
  //
  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!leadData.nome || !leadData.telefone) {
      alert('Preencha os dados!');
      return;
    }

    setIsSending(true);

    const { error } = await supabase
      .from('leads')
      .insert({
        nome: leadData.nome,
        telefone: leadData.telefone,
        loja_alvo: local.nome,
        mensagem_inicial:
          messages.find(m => m.sender === 'user')?.text || 'Interesse geral',
        projeto_id: projeto.id // 🔒 vínculo multi-tenant
      });

    if (error) {
      console.error('Erro Supabase:', error);
      alert('Erro ao salvar lead!');
      setIsSending(false);
      return;
    }

    addBotMessage('Tudo certo! Abrindo o WhatsApp…');

    setTimeout(() => {
      const storePhone = local.telefone;
      const text = encodeURIComponent(
        `Olá! Me chamo *${leadData.nome}*. Vim pelo ${projeto.nome} e gostaria de saber sobre: ${
          messages.find(m => m.sender === 'user')?.text
        }`
      );

      window.open(
        `https://wa.me/${storePhone}?text=${text}`,
        '_blank'
      );

      onClose();
    }, 1500);
  };

  // ==============================
  // 🔹 BRANDING DO PROJETO
  // ==============================
  const corBtn = projeto?.cor_primaria || '#075e54';

  // ==============================
  // 🔹 RENDERIZAÇÃO
  // ==============================
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '85vh',
          background: '#e5ddd5',
          display: 'flex',
          flexDirection: 'column',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.2)'
        }}
      >

        {/* ==========================
           🔹 HEADER DO CHAT
        =========================== */}
        <div
          style={{
            padding: '15px',
            background: corBtn,
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: corBtn,
                fontWeight: 'bold'
              }}
            >
              {local.nome.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {local.nome}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                Online agora
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* ==========================
           🔹 ÁREA DE MENSAGENS
        =========================== */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf:
                  msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                background:
                  msg.sender === 'bot' ? 'white' : '#dcf8c6',
                padding: '12px 16px',
                borderRadius: '8px',
                maxWidth: '85%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                fontSize: '15px',
                lineHeight: '1.4'
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* ==========================
           🔹 INPUT / FORMULÁRIO
        =========================== */}
        <div style={{ background: '#f0f0f0', padding: '10px' }}>

          {/* ETAPA 1 */}
          {step === 1 && (
            <div style={{ display: 'flex', gap: '10px', padding: '5px' }}>
              <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyPress={e =>
                  e.key === 'Enter' && handleFirstInteraction()
                }
                placeholder="Digite sua dúvida..."
                autoFocus
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '25px',
                  border: '1px solid #ccc',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleFirstInteraction}
                style={{
                  background: corBtn,
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Send size={20} />
              </button>
            </div>
          )}

          {/* ETAPA 2 */}
          {step === 2 && (
            <form
              onSubmit={handleLeadSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px',
                background: 'white',
                borderRadius: '15px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderBottom: '1px solid #eee',
                  padding: '5px'
                }}
              >
                <User size={18} color="#666" />
                <input
                  required
                  placeholder="Seu Nome"
                  value={leadData.nome}
                  onChange={e =>
                    setLeadData({ ...leadData, nome: e.target.value })
                  }
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: '8px'
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderBottom: '1px solid #eee',
                  padding: '5px'
                }}
              >
                <Phone size={18} color="#666" />
                <input
                  required
                  type="tel"
                  placeholder="Seu WhatsApp (com DDD)"
                  value={leadData.telefone}
                  onChange={e =>
                    setLeadData({
                      ...leadData,
                      telefone: e.target.value
                    })
                  }
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: '8px'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                style={{
                  marginTop: '5px',
                  background: '#25D366',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {isSending
                  ? 'Conectando…'
                  : 'Iniciar Conversa no WhatsApp ➤'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
```

---


### 📄 src/components/FilterSheet/index.jsx

```javascript
// ======================================================
// 📄 FilterSheet.jsx
// Painel de Filtros & Ordenação (Mobile-first)
// ======================================================

import React from 'react';
import {
  X,
  Star,
  TrendingUp,
  Award,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Home
} from 'lucide-react';

// Categorias oficiais
const CATEGORIAS = [
  { id: 'banho', label: 'Banho', icon: <Scissors size={18} /> },
  { id: 'vet', label: 'Vet', icon: <Stethoscope size={18} /> },
  { id: 'loja', label: 'Loja', icon: <ShoppingBag size={18} /> },
  { id: 'hotel', label: 'Hotel', icon: <Home size={18} /> }
];

// Ordenações possíveis
const ORDENACOES = [
  { id: 'melhor_nota', label: 'Melhor nota', icon: <Star size={18} /> },
  { id: 'mais_avaliados', label: 'Mais avaliados', icon: <TrendingUp size={18} /> },
  { id: 'destaques', label: 'Destaques (VIP)', icon: <Award size={18} /> }
];

export default function FilterSheet({
  onClose,
  categoriaAtiva,
  setCategoriaAtiva,
  ordenacaoAtiva,
  setOrdenacaoAtiva
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
    >
      <div
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: '500px',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '20px',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}
      >

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Filtros & Ordenação</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none' }}>
            <X size={24} />
          </button>
        </div>

        {/* ==============================
            🔹 ORDENAÇÃO
        ============================== */}
        <div style={{ marginTop: '25px' }}>
          <h4>Ordenar por</h4>

          {ORDENACOES.map(opt => (
            <label
              key={opt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '10px',
                cursor: 'pointer',
                background:
                  ordenacaoAtiva === opt.id ? '#2563eb' : '#fff',
                color:
                  ordenacaoAtiva === opt.id ? '#fff' : '#1e293b',
                fontWeight: 600
              }}
            >
              <input
                type="radio"
                name="ordenacao"
                checked={ordenacaoAtiva === opt.id}
                onChange={() => setOrdenacaoAtiva(opt.id)}
              />
              {opt.icon} {opt.label}
            </label>
          ))}
        </div>

        {/* ==============================
            🔹 CATEGORIAS
        ============================== */}
        <div style={{ marginTop: '25px' }}>
          <h4>Categoria</h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {CATEGORIAS.map(cat => {
              const ativo = categoriaAtiva === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaAtiva(ativo ? null : cat.id)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    background: ativo ? '#2563eb' : '#fff',
                    color: ativo ? '#fff' : '#64748b',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {cat.icon} {cat.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
```

---


### 📄 src/components/ui/Badge.jsx

```javascript

export default function Badge({ label, type = 'default' }) {
  return (
    <span className={`badge badge-${type}`}>
      {label}
    </span>
  );
}
```

---


### 📄 src/components/ui/button.css

```css
/* =========================================================
   BUTTON — Base canônica do Design System
   ---------------------------------------------------------
   Define apenas o botão genérico.
   Botões específicos (ex: WhatsApp) ficam fora daqui.
   ========================================================= */

/* Botão base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 10px 14px;
  border-radius: var(--radius-md);

  font-family: var(--font-main);
  font-size: 14px;
  font-weight: 500;

  border: none;
  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.1s ease;
}

/* Variante primária */
.btn-primary {
  background: var(--color-primary);
  color: #fff;
}

.btn-primary:hover {
  filter: brightness(0.95);
}

/* Variante neutra */
.btn-secondary {
  background: #fff;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-bg);
}

/* Estado desabilitado */
.btn:disabled,
.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Botão largura total (helper) */
.btn-block {
  width: 100%;
}
```

---


### 📄 src/components/ui/Button.jsx

```javascript
export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

---


### 📄 src/components/ui/Card.jsx

```javascript
export default function Card({ children, className = '' }) {
  return (
    <div className={`card card-padding ${className}`}>
      {children}
    </div>
  );
}
```

---


### 📄 src/components/ui/index.js

```javascript
// Barrel export - facilita imports
export { default as Badge } from './Badge';
export { default as Button } from './Button';
export { default as Card } from './Card';
```

---


### 📄 src/components/ui/Index.jsx

```javascript
export { default as Card } from './Card';
export { default as Button } from './Button';
export { default as Badge } from './Badge';
```

---

#### 🔄 Context


### 📄 src/context/DataContext.jsx

```javascript
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('locais') // ⚠️ AJUSTE AQUI
        .select('*')
      
      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <DataContext.Provider value={{ items, setItems, loading, fetchItems }}>
      {children}
    </DataContext.Provider>
  )
}```

---

#### 🪝 Hooks


### 📄 src/hooks/useDashboardData.jsx

```javascript
// ======================================================
// 📄 useDashboardData.jsx
// Hook de dados do Dashboard (CRUD + Estado)
// ======================================================

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// ======================================================
// 🔹 HOOK: useDashboardData
// ======================================================
//
// 🎯 INTENÇÃO GERAL
// Centralizar TODA a lógica de dados do Dashboard:
// - Buscar locais
// - Atualizar status (publicar / ocultar)
// - Editar dados do local
// - Excluir local
//
// 🧠 MODELO MENTAL
// - O Dashboard consome dados
// - Este hook controla:
//   • estado
//   • loading
//   • erro
//   • sincronização com o banco
//
// 🔒 CONTRATO
// - Nenhum JSX aqui
// - Nenhuma regra de filtro
// - Nenhuma regra de ordenação
// - Apenas dados e efeitos colaterais
//
export function useDashboardData(projetoId) {

  // ==============================
  // 🔹 ESTADOS PRINCIPAIS
  // ==============================
  //
  // locais  → lista de estabelecimentos do projeto
  // loading → estado global de carregamento
  // error   → erro simples (string)
  //
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ==============================
  // 🔹 FETCH DE LOCAIS
  // ==============================
  //
  // 🎯 Intenção:
  // Buscar todos os locais vinculados ao projeto
  //
  // 🛡️ Falha segura:
  // - Não quebra UI
  // - Retorna lista vazia
  //
  const fetchLocais = async () => {
    if (!projetoId) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('locais')
        .select('*')
        .eq('projeto_id', projetoId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setLocais(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar locais:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🔹 TOGGLE DE STATUS (PUBLICAR / OCULTAR)
  // ==============================
  //
  // 🎯 Intenção:
  // Alternar visibilidade do local no app
  //
  // 🧠 Regra:
  // PUBLICAR_APP ↔ RASCUNHO
  //
  // 🔒 Contrato:
  // - Atualiza banco
  // - Atualiza estado local
  // - Não refaz fetch completo
  //
  const toggleStatus = async (local) => {
    const novoStatus =
      local.status === 'PUBLICAR_APP'
        ? 'RASCUNHO'
        : 'PUBLICAR_APP';

    try {
      const { error } = await supabase
        .from('locais')
        .update({ status: novoStatus })
        .eq('id', local.id);

      if (error) throw error;

      // Atualização otimista do estado
      setLocais(locais.map(l =>
        l.id === local.id
          ? { ...l, status: novoStatus }
          : l
      ));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      throw err;
    }
  };

  // ==============================
  // 🔹 ATUALIZAR LOCAL (EDIÇÃO)
  // ==============================
  //
  // 🎯 Intenção:
  // Atualizar dados do local (nome, tags, destaque, etc)
  //
  // 🧠 Decisão:
  // Após update → refetch completo
  // (garante consistência total)
  //
  const updateLocal = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('locais')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchLocais();
    } catch (err) {
      console.error('Erro ao atualizar local:', err);
      throw err;
    }
  };

  // ==============================
  // 🔹 EXCLUIR LOCAL
  // ==============================
  //
  // 🎯 Intenção:
  // Remover definitivamente o local
  //
  // 🧠 Estratégia:
  // - Deleta no banco
  // - Remove do estado local
  //
  const deleteLocal = async (id) => {
    try {
      const { error } = await supabase
        .from('locais')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLocais(locais.filter(l => l.id !== id));
    } catch (err) {
      console.error('Erro ao deletar local:', err);
      throw err;
    }
  };

  // ==============================
  // 🔹 EFEITO DE INICIALIZAÇÃO
  // ==============================
  //
  // 🎯 Intenção:
  // Recarregar locais sempre que o projeto mudar
  //
  useEffect(() => {
    fetchLocais();
  }, [projetoId]);

  // ==============================
  // 🔹 API DO HOOK (RETORNO)
  // ==============================
  //
  // Tudo que o Dashboard pode fazer com dados
  //
  return {
    locais,
    loading,
    error,
    refetch: fetchLocais,
    toggleStatus,
    updateLocal,
    deleteLocal
  };
}
```

---


### 📄 src/hooks/useDashboardFilters.jsx

```javascript
// ======================================================
// 📄 useDashboardFilters.jsx
// Hook de filtros + ordenação do Dashboard / App
// ======================================================

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import { useState, useMemo } from 'react';
import { FILTERS } from '../filters/filters.config';

// ======================================================
// 🔹 FUNÇÃO: aplicarOrdenacao
// ======================================================
//
// 🎯 INTENÇÃO
// Aplicar filtros de ORDENAÇÃO sobre uma lista de locais,
// respeitando a prioridade definida pelo projeto.
//
// 🧠 MODELO MENTAL
// - Ordena, nunca remove
// - Cada filtro soma um "score"
// - A ordem dos filtros define o peso
//
// 🔒 CONTRATO
// - Nunca quebra a listagem
// - Nunca lança erro para fora
// - Nunca muta o array original
//
// 🛡️ FALHA SEGURA
// - Se algo falhar → retorna lista original
//
function aplicarOrdenacao(locais, filtrosAtivos = []) {

  // Se não houver filtros ativos, retorna lista intacta
  if (!Array.isArray(filtrosAtivos) || filtrosAtivos.length === 0) {
    return locais;
  }

  // Criamos cópia para não mutar o array original
  const locaisOrdenados = [...locais];

  try {
    locaisOrdenados.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      filtrosAtivos.forEach((filtroId, index) => {
        const filtro = FILTERS[filtroId];

        // Ignora filtros inexistentes ou que não sejam de ordenação
        if (!filtro || filtro.comportamento !== 'ordenar') return;

        // Peso simples: filtros no início têm mais impacto
        const peso = filtrosAtivos.length - index;

        try {
          scoreA += (filtro.ordenar?.(a) || 0) * peso;
          scoreB += (filtro.ordenar?.(b) || 0) * peso;
        } catch {
          // Falha silenciosa por filtro individual
        }
      });

      return scoreB - scoreA;
    });
  } catch {
    // Falha total → não ordena
    return locais;
  }

  return locaisOrdenados;
}

// ======================================================
// 🔹 HOOK: useDashboardFilters
// ======================================================
//
// 🎯 INTENÇÃO GERAL
// Centralizar TODA a lógica de:
// - Filtros básicos de UI (status, categoria)
// - Ordenação baseada nos filtros ativos do projeto
//
// 🧠 MODELO MENTAL
// - Filtrar primeiro
// - Ordenar depois
// - Nunca quebrar listagem
//
// 🔒 CONTRATO
// - Não conhece Supabase
// - Não conhece Dashboard
// - Apenas recebe dados e retorna dados
//
export function useDashboardFilters(locais, filtrosAtivosProjeto = []) {

  // ==============================
  // 🔹 ESTADOS DE UI
  // ==============================
  //
  // filtroStatus    → publicado / oculto / todos
  // filtroCategoria → tag ativa (ou null)
  //
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  // ==============================
  // 🔹 PIPELINE DE FILTROS
  // ==============================
  //
  // Ordem intencional:
  // 1️⃣ Filtragem básica (restrição)
  // 2️⃣ Ordenação inteligente (ranking)
  //
  const locaisFiltrados = useMemo(() => {

    // ------------------------------
    // 1️⃣ FILTRAGEM BÁSICA (EXISTENTE)
    // ------------------------------
    //
    // 🎯 Intenção:
    // Restringir resultados com base em UI simples
    //
    const filtrados = locais.filter(local => {

      // Status: publicados
      if (filtroStatus === 'publicados' && local.status !== 'PUBLICAR_APP') {
        return false;
      }

      // Status: ocultos
      if (filtroStatus === 'ocultos' && local.status === 'PUBLICAR_APP') {
        return false;
      }

      // Categoria / Tag
      if (filtroCategoria && !local.tags?.includes(filtroCategoria)) {
        return false;
      }

      return true;
    });

    // ------------------------------
    // 2️⃣ ORDENAÇÃO POR PROJETO
    // ------------------------------
    //
    // 🎯 Intenção:
    // Reordenar resultados com base nos filtros
    // ativados no dashboard do projeto
    //
    const filtrosAtivosValidos = Array.isArray(filtrosAtivosProjeto)
      ? filtrosAtivosProjeto
      : [];

    return aplicarOrdenacao(filtrados, filtrosAtivosValidos);

  }, [
    locais,
    filtroStatus,
    filtroCategoria,
    filtrosAtivosProjeto
  ]);

  // ==============================
  // 🔹 API DO HOOK (RETORNO)
  // ==============================
  //
  // Tudo que a UI pode usar
  //
  return {
    filtroStatus,
    setFiltroStatus,
    filtroCategoria,
    setFiltroCategoria,
    locaisFiltrados
  };
}
```

---

#### 📄 Pages


### 📄 src/pages/Manager/components/DashboardHeader.jsx

```javascript
// ======================================================
// 📄 DashboardHeader.jsx
// Função: Cabeçalho principal do Dashboard do Projeto
// ======================================================

// 🔹 DEPENDÊNCIAS
// Componentes visuais e ícones
import React from 'react';
import { Store, ExternalLink } from 'lucide-react';

// ======================================================
// 🔹 DASHBOARD HEADER — IDENTIDADE DO PROJETO
// ======================================================
//
// 🎯 INTENÇÃO
// Exibir identidade básica do projeto (nome + ícone)
// e fornecer acesso rápido ao App público.
//
// 🔒 CONTRATO
// - Deve ser sempre simples e rápido de renderizar
// - Não depende de dados pesados
// - Não deve conter lógica de negócio
//
// 🚫 NÃO FAZER AQUI
// - Não adicionar filtros
// - Não adicionar métricas
// - Não adicionar lógica de permissão
//
// 🚧 FUTURO
// - Pode exibir status do projeto (ativo/inativo)
// - Pode exibir badge de plano (free / pro)
//
export default function DashboardHeader({ projeto, theme }) {
  return (
    // ==============================
    // 🔹 CONTAINER PRINCIPAL
    // ==============================
    <header
      style={{
        background: theme.card,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      {/* ==============================
          🔹 IDENTIDADE DO PROJETO
          ============================== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        
        {/* ÍCONE / LOGO DO PROJETO */}
        <div
          style={{
            width: '40px',
            height: '40px',
            background: theme.primary,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          <Store size={22} />
        </div>

        {/* NOME DO PROJETO */}
        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
          {projeto.nome}
        </h1>
      </div>

      {/* ==============================
          🔹 AÇÃO PRINCIPAL
          ============================== */}
      {/* CTA DE NAVEGAÇÃO — NÃO É CONVERSÃO */}
      <button
        onClick={() => window.location.href = `/${projeto.slug}`}
        style={{
          padding: '8px 16px',
          background: 'white',
          border: `1px solid ${theme.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}
      >
        <ExternalLink size={16} />
        Ver App
      </button>
    </header>
  );
}
```

---


### 📄 src/pages/Manager/components/EmptyState.jsx

```javascript
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
```

---


### 📄 src/pages/Manager/components/FilterBar.jsx

```javascript
// ======================================================
// 📄 FilterBar.jsx
// Função: Barra de filtros do Dashboard (Admin)
// ======================================================

// 🔹 DEPENDÊNCIAS
// Constantes globais de filtros e categorias
import React from 'react';
import { TAGS_OFICIAIS, STATUS_FILTROS } from '../../utils/constants';

// ======================================================
// 🔹 FILTER BAR — CONTROLE DE VISUALIZAÇÃO
// ======================================================
//
// 🎯 INTENÇÃO
// Permitir que o administrador:
// - Filtre lojas por status (publicado / oculto / todos)
// - Filtre lojas por categoria (tags)
//
// 🔒 CONTRATO
// - Não busca dados
// - Não ordena ranking
// - Apenas altera estado local
//
// 🧠 PRINCÍPIO
// Filtros aqui são *ferramentas de leitura*, não regras de negócio.
//
// 🚫 NÃO FAZER AQUI
// - Não alterar filtros ativos do projeto
// - Não salvar nada no banco
// - Não aplicar ordenação
//
// 🚧 FUTURO
// - Pode ser reutilizado na PetList (modo leitura)
// - Pode virar scroll horizontal no mobile
//
export default function FilterBar({ 
  filtroStatus, 
  setFiltroStatus, 
  filtroCategoria, 
  setFiltroCategoria,
  theme 
}) {
  return (
    // ==============================
    // 🔹 CONTAINER GERAL
    // ==============================
    <div
      style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      
      {/* ==============================
          🔹 FILTRO DE STATUS (SEGMENTADO)
          ============================== */}
      {/* Controle rápido para visibilidade no dashboard */}
      <div
        style={{
          display: 'flex',
          background: '#e2e8f0',
          padding: '4px',
          borderRadius: '8px'
        }}
      >
        {STATUS_FILTROS.map(status => (
          <button
            key={status}
            onClick={() => setFiltroStatus(status)}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              background: filtroStatus === status ? 'white' : 'transparent',
              color: theme.text,
              fontWeight: 'bold',
              fontSize: '11px',
              boxShadow:
                filtroStatus === status
                  ? '0 1px 2px rgba(0,0,0,0.1)'
                  : 'none',
              transition: 'all 0.2s'
            }}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ==============================
          🔹 FILTRO POR CATEGORIA (TAGS)
          ============================== */}
      {/* Chips de categoria para leitura rápida */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {TAGS_OFICIAIS.map(tag => {
          const isActive = filtroCategoria === tag.id;
          
          return (
            <button
              key={tag.id}
              onClick={() => setFiltroCategoria(isActive ? null : tag.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                border: `1px solid ${isActive ? tag.color : theme.border}`,
                background: isActive ? tag.color : 'white',
                color: isActive ? 'white' : theme.textSec,
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---


### 📄 src/pages/Manager/components/ProjectFiltersPanel.jsx

```javascript
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
```

---


### 📄 src/pages/Manager/components/StoreCardEdit.jsx

```javascript
// ======================================================
// 📄 StoreCardEdit.jsx
// Função: Edição inline de um estabelecimento (Dashboard)
// ======================================================

// 🔹 DEPENDÊNCIAS
import React, { useState } from 'react';

// 🔹 CONSTANTES DE PRODUTO
// Lista oficial de categorias/tags disponíveis
import { TAGS_OFICIAIS } from '../../utils/constants';

// ======================================================
// 🔹 STORE CARD EDIT — MODO EDIÇÃO
// ======================================================
//
// 🎯 INTENÇÃO
// Permitir a edição rápida dos principais atributos do local:
// - Nome
// - Destaque (indireto, via tags no futuro)
// - Categorias (tags)
//
// 🔒 CONTRATO
// - Este componente NÃO salva direto no banco
// - Apenas coleta dados e delega o save
// - Não altera visibilidade (status)
// - Não altera filtros globais
//
// 🧠 UX
// - Edição inline, sem navegação
// - Ações claras: Salvar ou Cancelar
//
// 🚫 NÃO FAZER AQUI
// - Não chamar Supabase diretamente
// - Não aplicar validações complexas
// - Não alterar ranking
//
// 🚧 FUTURO
// - Adicionar edição de telefone / WhatsApp
// - Adicionar toggle de destaque explícito
// - Adicionar preview do card público
//
export default function StoreCardEdit({ local, theme, onSave, onCancel }) {

  // ==============================
  // 🔹 ESTADO LOCAL DO FORMULÁRIO
  // ==============================
  //
  // 🎯 Intenção:
  // Inicializar o formulário com dados atuais do local
  //
  const [formData, setFormData] = useState({
    nome: local.nome,
    destaque: local.destaque,
    tags: local.tags || []
  });

  // ==============================
  // 🔹 TOGGLE DE TAG
  // ==============================
  //
  // 🎯 Intenção:
  // Adicionar ou remover categorias do local
  //
  const toggleTag = (tagId) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(t => t !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  // ==============================
  // 🔹 SUBMISSÃO DO FORMULÁRIO
  // ==============================
  //
  // 🔒 CONTRATO
  // - Delegar persistência ao componente pai
  // - Nunca salvar diretamente aqui
  //
  const handleSubmit = () => {
    onSave(local.id, formData);
  };

  // ==============================
  // 🔹 RENDER DO CARD DE EDIÇÃO
  // ==============================
  return (
    <div
      style={{
        background: theme.card,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* ==============================
            🔹 TÍTULO DE CONTEXTO
            ============================== */}
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
          Editando: {local.nome}
        </div>

        {/* ==============================
            🔹 CAMPO — NOME DO LOCAL
            ============================== */}
        <input
          value={formData.nome}
          onChange={e =>
            setFormData({ ...formData, nome: e.target.value })
          }
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: `1px solid ${theme.border}`,
            outline: 'none'
          }}
          placeholder="Nome do local"
        />

        {/* ==============================
            🔹 TAGS / CATEGORIAS
            ============================== */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {TAGS_OFICIAIS.map(tag => {
            const ativo = formData.tags.includes(tag.id);

            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${theme.border}`,
                  background: ativo ? tag.color : 'white',
                  color: ativo ? 'white' : theme.textSec,
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: '600'
                }}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {/* ==============================
            🔹 AÇÕES
            ============================== */}
        <div style={{ display: 'flex', gap: '10px' }}>
          
          {/* SALVAR */}
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '10px',
              background: theme.success,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Salvar
          </button>
          
          {/* CANCELAR */}
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              background: '#f1f5f9',
              color: theme.text,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
```

---


### 📄 src/pages/Manager/components/StoreCard.jsx

```javascript
// ======================================================
// 📄 StoreCard.jsx
// Função: Card administrativo de um estabelecimento
// ======================================================

// 🔹 DEPENDÊNCIAS
// Ícones de ação administrativa
import React from 'react';
import { Eye, EyeOff, Edit, Trash2, Star } from 'lucide-react';

// ======================================================
// 🔹 STORE CARD — VISÃO ADMINISTRATIVA
// ======================================================
//
// 🎯 INTENÇÃO
// Exibir um estabelecimento no Dashboard permitindo:
// - Visualizar dados básicos
// - Controlar visibilidade no App
// - Editar informações
// - Excluir o registro
//
// 🔒 CONTRATO
// - Este card NÃO é conversão
// - Não deve conter CTA de WhatsApp
// - Não deve conter lógica de ranking
//
// 🧠 DIFERENÇA IMPORTANTE
// Este card NÃO é o mesmo da PetList.
// Aqui o foco é controle, não atração.
//
// 🚫 NÃO FAZER AQUI
// - Não aplicar filtros
// - Não aplicar ordenação
// - Não navegar para o App
//
// 🚧 FUTURO
// - Pode exibir métricas (cliques, leads)
// - Pode exibir badges extras (ex: “premium”)
//
export default function StoreCard({
  local,
  theme,
  onToggleStatus,
  onEdit,
  onDelete
}) {

  // ==============================
  // 🔹 ESTADO DERIVADO
  // ==============================
  //
  // 🎯 Intenção:
  // Determinar rapidamente se o local está visível no App
  //
  const isVisible = local.status === 'PUBLICAR_APP';

  // ==============================
  // 🔹 RENDER DO CARD
  // ==============================
  return (
    <div
      style={{
        background: theme.card,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        padding: '16px',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* ==============================
            🔹 INFORMAÇÕES DO LOCAL
            ============================== */}
        <div>
          
          {/* NOME + DESTAQUE */}
          <div
            style={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {local.nome}

            {/* BADGE DE DESTAQUE (VISUAL) */}
            {local.destaque && (
              <Star size={14} fill="#f59e0b" color="#f59e0b" />
            )}
          </div>

          {/* ENDEREÇO */}
          <div
            style={{
              fontSize: '12px',
              color: theme.textSec,
              marginTop: '4px'
            }}
          >
            {local.endereco || 'Sem endereço cadastrado'}
          </div>
        </div>

        {/* ==============================
            🔹 AÇÕES ADMINISTRATIVAS
            ============================== */}
<div
  style={{
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    marginTop: '12px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '12px'
  }}
>
  {/* VISIBILIDADE */}
  <button
    onClick={() => onToggleStatus(local)}
    style={{
      padding: '8px 14px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      background:
        local.status === 'PUBLICAR_APP'
          ? 'var(--cor-primaria)'
          : '#e2e8f0',
      color:
        local.status === 'PUBLICAR_APP'
          ? '#fff'
          : '#475569'
    }}
  >
    {local.status === 'PUBLICAR_APP'
      ? '👁 Visível no App'
      : '🚫 Oculto'}
  </button>

  {/* EDITAR */}
  <button
    onClick={() => onEdit(local)}
    style={{
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-card)',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      fontSize: '13px'
    }}
  >
    ✏️ Editar
  </button>

  {/* EXCLUIR */}
  <button
    onClick={() => onDelete(local.id)}
    style={{
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid #fecaca',
      background: '#fee2e2',
      color: '#b91c1c',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 600
    }}
  >
    🗑 Excluir
  </button>
</div>

      </div>
    </div>
  );
}
```

---


### 📄 src/pages/Manager/index.jsx

```javascript
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from '../../services/supabaseClient';


/* ======================================================
   DASHBOARD — PET FINDER
   3 seções (1 e 2 config; 3 CRUD real em 'locais')
====================================================== */

export default function Dashboard() {
  /* ======================================================
     SEÇÃO 1 — ORDENAÇÃO PADRÃO DA PETLIST
  ====================================================== */
  const [ordenacaoPadrao, setOrdenacaoPadrao] = useState("padrao");

  /* ======================================================
     SEÇÃO 2 — FILTROS ATIVOS NA PETLIST (checklist que controla UI do App)
  ====================================================== */
  const [filtros, setFiltros] = useState({
    categoria: true,
    bemAvaliados: true,
    instagram: true,
    whatsapp: true,
    destaque: true
  });

  const toggleFiltro = (key) => {
    setFiltros((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const salvarConfiguracoes = async () => {
    console.log("Ordenação padrão:", ordenacaoPadrao);
    console.log("Filtros ativos:", filtros);
    alert("Configurações salvas (mock).");
  };

  /* ======================================================
     SEÇÃO 3 — CRUD REAL (SUPABASE: tabela locais)
  ====================================================== */
  const STATUS_VISIBLE = "ativo";
  const STATUS_HIDDEN = "oculto";

  const [locais, setLocais] = useState([]);
  const [loadingLocais, setLoadingLocais] = useState(true);
  const [errorLocais, setErrorLocais] = useState("");

  const [query, setQuery] = useState("");
  const [onlyHidden, setOnlyHidden] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nome: "",
    telefone: "",
    endereco: "",
    site: "",
    niche: "",
    status: STATUS_VISIBLE,
    origem: "",
    is_whatsapp: false,
    instagram_url: "",
    destaque: false,
    image_url: "",
    google_maps_url: "",
    horario_fechamento: "",
    aberto_agora: false,
    estacionamento: false,
    nota: null,
    avaliacoes: null
  });

  const resetForm = () => {
    setForm({
      ...form,
      id: null,
      nome: "",
      telefone: "",
      endereco: "",
      site: "",
      niche: "",
      origem: "",
      instagram_url: "",
      image_url: "",
      google_maps_url: "",
      horario_fechamento: "",
      nota: null,
      avaliacoes: null
    });
  };

  const isHiddenStatus = (s) =>
    ["oculto", "hidden", "inativo", "offline"].includes(
      (s || "").toString().toLowerCase()
    );

  const fetchAllLocais = async () => {
    setLoadingLocais(true);
    setErrorLocais("");

    try {
      const { data, error } = await supabase
        .from("locais")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLocais(data || []);
    } catch (err) {
      setErrorLocais(err.message);
    } finally {
      setLoadingLocais(false);
    }
  };

  useEffect(() => {
    fetchAllLocais();
  }, []);

  const locaisFiltrados = useMemo(() => {
    let list = [...locais];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((l) =>
        [l.nome, l.endereco, l.niche, l.site, l.telefone]
          .filter(Boolean)
          .some((x) => x.toLowerCase().includes(q))
      );
    }

    if (onlyHidden) list = list.filter((l) => isHiddenStatus(l.status));
    if (onlyFeatured) list = list.filter((l) => l.destaque);

    return list;
  }, [locais, query, onlyHidden, onlyFeatured]);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onEdit = (row) => {
    setForm({
      id: row.id,
      nome: row.nome || "",
      telefone: row.telefone || "",
      endereco: row.endereco || "",
      site: row.site || "",
      niche: row.niche || "",
      status: row.status || STATUS_VISIBLE,
      origem: row.origem || "",
      is_whatsapp: Boolean(row.is_whatsapp),
      instagram_url: row.instagram_url || "",
      destaque: Boolean(row.destaque),
      image_url: row.image_url || "",
      google_maps_url: row.google_maps_url || "",
      horario_fechamento: row.horario_fechamento || "",
      aberto_agora: Boolean(row.aberto_agora),
      estacionamento: Boolean(row.estacionamento),
      nota: row.nota ?? null,
      avaliacoes: row.avaliacoes ?? null
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este local?")) return;

    try {
      const { error } = await supabase.from("locais").delete().eq("id", id);
      if (error) throw error;
      await fetchAllLocais();
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nome: form.nome,
      telefone: form.telefone,
      endereco: form.endereco,
      site: form.site,
      niche: form.niche,
      status: form.status,
      origem: form.origem,
      is_whatsapp: form.is_whatsapp,
      instagram_url: form.instagram_url,
      destaque: form.destaque,
      image_url: form.image_url,
      google_maps_url: form.google_maps_url,
      horario_fechamento: form.horario_fechamento,
      aberto_agora: form.aberto_agora,
      estacionamento: form.estacionamento,
      nota: form.nota === "" ? null : form.nota,
      avaliacoes: form.avaliacoes === "" ? null : form.avaliacoes
    };

    try {
      if (form.id) {
        const { error } = await supabase
          .from("locais")
          .update(payload)
          .eq("id", form.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("locais").insert([payload]);
        if (error) throw error;
      }

      resetForm();
      await fetchAllLocais();
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }
  };


  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

useEffect(() => {
  const onResize = () => setIsMobile(window.innerWidth < 900);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);


  return (
    <div className="p-lg">
      <header className="mb-lg">
        <h1 style={{ marginBottom: 6 }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
          Painel de administração do Pet Finder
        </p>
      </header>

      {/* ======================================================
          SEÇÃO 1 — ORDENAÇÃO PADRÃO
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 1 — Ordenação Padrão</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "padrao"}
              onChange={() => setOrdenacaoPadrao("padrao")}
            />
            <span style={{ marginLeft: 8 }}>Padrão (created_at)</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "melhor_nota"}
              onChange={() => setOrdenacaoPadrao("melhor_nota")}
            />
            <span style={{ marginLeft: 8 }}>Melhor nota</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "mais_avaliados"}
              onChange={() => setOrdenacaoPadrao("mais_avaliados")}
            />
            <span style={{ marginLeft: 8 }}>Mais avaliados</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "destaques"}
              onChange={() => setOrdenacaoPadrao("destaques")}
            />
            <span style={{ marginLeft: 8 }}>Destaques</span>
          </label>
        </div>
      </div>

      {/* ======================================================
          SEÇÃO 2 — FILTROS ATIVOS
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 2 — Filtros Ativos na PetList</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.categoria}
              onChange={() => toggleFiltro("categoria")}
            />
            <span style={{ marginLeft: 8 }}>Filtro categoria</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.bemAvaliados}
              onChange={() => toggleFiltro("bemAvaliados")}
            />
            <span style={{ marginLeft: 8 }}>Bem avaliados</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.instagram}
              onChange={() => toggleFiltro("instagram")}
            />
            <span style={{ marginLeft: 8 }}>Com Instagram</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.whatsapp}
              onChange={() => toggleFiltro("whatsapp")}
            />
            <span style={{ marginLeft: 8 }}>Com WhatsApp</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.destaque}
              onChange={() => toggleFiltro("destaque")}
            />
            <span style={{ marginLeft: 8 }}>Somente destaques</span>
          </label>
        </div>

        <div style={{ marginTop: 14 }}>
          <button style={primaryBtn} onClick={salvarConfiguracoes}>
            Salvar configurações (mock)
          </button>
        </div>
      </div>

      {/* ======================================================
          SEÇÃO 3 — CRUD LOCAIS (SUPABASE)
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 3 — CRUD Locais (Supabase)</h2>

        {/* Busca / filtros */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <input
            style={{ ...input, minWidth: 260 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome/endereço/nicho/site/telefone..."
          />

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={onlyHidden}
              onChange={() => setOnlyHidden((v) => !v)}
            />
            <span style={{ marginLeft: 8 }}>Somente ocultos</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={onlyFeatured}
              onChange={() => setOnlyFeatured((v) => !v)}
            />
            <span style={{ marginLeft: 8 }}>Somente destaques</span>
          </label>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input
              style={input}
              value={form.nome}
              onChange={(e) => onChange("nome", e.target.value)}
              placeholder="Nome"
              required
            />

            <input
              style={input}
              value={form.telefone}
              onChange={(e) => onChange("telefone", e.target.value)}
              placeholder="Telefone"
            />

            <input
              style={input}
              value={form.endereco}
              onChange={(e) => onChange("endereco", e.target.value)}
              placeholder="Endereço"
            />

            <input
              style={input}
              value={form.site}
              onChange={(e) => onChange("site", e.target.value)}
              placeholder="Site"
            />

            <input
              style={input}
              value={form.niche}
              onChange={(e) => onChange("niche", e.target.value)}
              placeholder="Nicho (banho/vet/loja/hotel...)"
            />

            <input
              style={input}
              value={form.origem}
              onChange={(e) => onChange("origem", e.target.value)}
              placeholder="Origem"
            />

            <input
              style={input}
              value={form.instagram_url}
              onChange={(e) => onChange("instagram_url", e.target.value)}
              placeholder="Instagram URL"
            />

            <input
              style={input}
              value={form.image_url}
              onChange={(e) => onChange("image_url", e.target.value)}
              placeholder="Image URL"
            />

            <input
              style={input}
              value={form.google_maps_url}
              onChange={(e) => onChange("google_maps_url", e.target.value)}
              placeholder="Google Maps URL"
            />

            <input
              style={input}
              value={form.horario_fechamento}
              onChange={(e) => onChange("horario_fechamento", e.target.value)}
              placeholder="Horário fechamento (ex: 19:30)"
            />

            <input
              style={input}
              value={form.nota ?? ""}
              onChange={(e) => onChange("nota", e.target.value)}
              placeholder="Nota (ex: 4.7)"
            />

            <input
              style={input}
              value={form.avaliacoes ?? ""}
              onChange={(e) => onChange("avaliacoes", e.target.value)}
              placeholder="Avaliações (ex: 120)"
            />
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.is_whatsapp}
                onChange={() => onChange("is_whatsapp", !form.is_whatsapp)}
              />
              <span style={{ marginLeft: 8 }}>WhatsApp</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.destaque}
                onChange={() => onChange("destaque", !form.destaque)}
              />
              <span style={{ marginLeft: 8 }}>Destaque</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.aberto_agora}
                onChange={() => onChange("aberto_agora", !form.aberto_agora)}
              />
              <span style={{ marginLeft: 8 }}>Aberto agora</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.estacionamento}
                onChange={() => onChange("estacionamento", !form.estacionamento)}
              />
              <span style={{ marginLeft: 8 }}>Estacionamento</span>
            </label>

            <select
              style={{ ...input, width: 200 }}
              value={form.status}
              onChange={(e) => onChange("status", e.target.value)}
            >
              <option value={STATUS_VISIBLE}>Visível</option>
              <option value={STATUS_HIDDEN}>Oculto</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button style={primaryBtn} type="submit">
              {form.id ? "Atualizar" : "Criar"}
            </button>
            <button style={secondaryBtn} type="button" onClick={resetForm}>
              Limpar
            </button>
          </div>
        </form>

        {/* Lista/Tabela */}
        <div style={{ marginTop: 18 }}>
          {loadingLocais && <div style={{ color: "#64748b" }}>Carregando locais...</div>}
          {errorLocais && <div style={{ color: "#b91c1c" }}>Erro: {errorLocais}</div>}

{!loadingLocais && !errorLocais && (
  <>
    {isMobile ? (
      <div style={{ display: "grid", gap: 12 }}>
        {locaisFiltrados.map((l) => (
          <div key={l.id} style={box}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{l.nome}</div>
            <div style={{ color: "#475569", fontSize: 13, marginBottom: 6 }}>
              <strong>Nicho:</strong> {l.niche || "-"} &nbsp; | &nbsp;
              <strong>Status:</strong> {l.status || "-"} &nbsp; | &nbsp;
              <strong>Destaque:</strong> {l.destaque ? "⭐" : "-"}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={miniBtn} onClick={() => onEdit(l)}>Editar</button>
              <button style={miniBtn} onClick={() => onDelete(l.id)}>Deletar</button>
            </div>
          </div>
        ))}

        {locaisFiltrados.length === 0 && (
          <div style={{ color: "#475569" }}>Nenhum local encontrado.</div>
        )}
      </div>
    ) : (
      <div style={{ width: "100%" }}>
        <table style={{ ...table, minWidth: "unset" }}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>Nicho</th>
              <th style={th}>Status</th>
              <th style={th}>Destaque</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {locaisFiltrados.map((l) => (
              <tr key={l.id}>
                <td style={td}>{l.nome}</td>
                <td style={td}>{l.niche}</td>
                <td style={td}>{l.status}</td>
                <td style={td}>{l.destaque ? "⭐" : ""}</td>
                <td style={td}>
                  <button style={miniBtn} onClick={() => onEdit(l)}>Editar</button>
                  <button style={{ ...miniBtn, marginLeft: 8 }} onClick={() => onDelete(l.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
            {locaisFiltrados.length === 0 && (
              <tr>
                <td style={td} colSpan={5}>
                  Nenhum local encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </>
)}

        </div>
      </div>
    </div>
  );
}

/* ======================================================
   ESTILOS LOCAIS (mantidos — admin/backoffice)
====================================================== */

const box = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 18,
  marginBottom: 18,
  boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
};

const h2 = {
  fontSize: 16,
  margin: "0 0 12px 0"
};

const radioLabel = {
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  color: "#334155"
};

const checkLabel = {
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  color: "#334155"
};

const input = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: 14
};

const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #1d4ed8",
  background: "#1d4ed8",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  background: "#fff",
  color: "#0f172a",
  fontWeight: 700,
  cursor: "pointer"
};

const miniBtn = {
  padding: "6px 10px",
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600
};

const table = {
  width: "100%",
  minWidth: "760px",      // <-- força scroll quando a tela é estreita
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: 10,
  fontSize: 13,
  borderBottom: "1px solid #e2e8f0",
  color: "#475569",
  whiteSpace: "nowrap"
};

const td = {
  padding: 10,
  fontSize: 13,
  borderBottom: "1px solid #f1f5f9",
  color: "#0f172a",
  whiteSpace: "nowrap"
};
```

---


### 📄 src/pages/Manager/Manager.css

```css
/* Estilos específicos da página Manager */
.manager-container {
  padding: 2rem;
}

/* Copie estilos relevantes do antigo Dashboard aqui */
```

---


### 📄 src/pages/Processor/index.jsx

```javascript
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
<div
  className="mx-auto p-lg"
  style={{
    maxWidth: '800px',
    fontFamily: 'sans-serif',
    color: '#334155'
  }}
>


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
     <div className="relative">
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
```

---


### 📄 src/pages/Viewer/index.jsx

```javascript
// ======================================================
// 📄 PetList.jsx - VERSÃO FINAL COMPLETA
// Tela principal do App (usuário final)
// ======================================================

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import ChatModal from '../../components/ChatModal';
import PetCardMapStyle from '../../components/CardItem';
import './Viewer.css';

// Ícones
import { 
  Store, 
  X, 
  Star, 
  TrendingUp, 
  Award,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Home,
  ChevronUp,
  Sparkles
} from 'lucide-react';

// ======================================================
// 🔹 HELPERS
// ======================================================
const DEFAULT_FILTROS_APP = ['categoria', 'bem_avaliados', 'com_instagram'];

const getFiltrosAtivos = (projeto) => {
  if (Array.isArray(projeto?.filtros_ativos) && projeto.filtros_ativos.length > 0) {
    return projeto.filtros_ativos;
  }
  return DEFAULT_FILTROS_APP;
};

// Verificar se é novo (cadastrado nos últimos 7 dias)
const isNovo = (createdAt) => {
  if (!createdAt) return false;
  const dataAtual = new Date();
  const dataCriacao = new Date(createdAt);
  const diffDias = (dataAtual - dataCriacao) / (1000 * 60 * 60 * 24);
  return diffDias <= 7;
};

// ======================================================
// 🔹 SKELETON LOADING
// ======================================================
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image" />
    <div className="skeleton-content">
      <div className="skeleton-title" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  </div>
);

// ======================================================
// 🔹 COMPONENTE PRINCIPAL
// ======================================================
export default function PetList({ projeto }) {
  const [locais, setLocais] = useState([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [ordenacao, setOrdenacao] = useState('melhor_nota');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const toolbarRef = useRef(null);
  const filtrosAtivos = getFiltrosAtivos(projeto);
  const hasFiltro = (id) => filtrosAtivos.includes(id);

  // ======================================================
  // 🔹 SCROLL TO TOP BUTTON
  // ======================================================
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ======================================================
  // 🔹 BUSCA DE LOCAIS
  // ======================================================
  useEffect(() => {
    async function buscarLocais() {
      setLoading(true);

      const { data, error } = await supabase
        .from("locais")
        .select("*")
        .eq("status", "PUBLICAR_APP")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar locais:", error);
        setLocais([]);
      } else {
        setLocais(data || []);
      }

      setLoading(false);
    }

    buscarLocais();
  }, []);

  // ======================================================
  // 🔹 FILTROS + ORDENAÇÃO COM TRANSIÇÃO
  // ======================================================
  useEffect(() => {
    setIsTransitioning(true);
    
    const timeout = setTimeout(() => {
      let resultado = [...locais];

      if (hasFiltro('categoria') && filtroCategoria) {
        resultado = resultado.filter(
          l => Array.isArray(l.tags) && l.tags.includes(filtroCategoria)
        );
      }

      if (ordenacao === 'melhor_nota') {
        resultado.sort((a, b) => Number(b.nota || 0) - Number(a.nota || 0));
      }

      if (ordenacao === 'mais_avaliados') {
        resultado.sort((a, b) => Number(b.avaliacoes || 0) - Number(a.avaliacoes || 0));
      }

      if (ordenacao === 'destaques') {
        resultado.sort((a, b) => Number(b.destaque) - Number(a.destaque));
      }

      setLocaisFiltrados(resultado);
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [locais, filtroCategoria, ordenacao, filtrosAtivos]);

  // Estatísticas para o header
  const stats = {
    total: locais.length,
    vips: locais.filter(l => l.destaque).length,
    abertos: locais.filter(l => l.aberto_agora).length
  };

  // ======================================================
  // 🔹 RENDER
  // ======================================================
  return (
    <div className="app-shell">
      {/* HEADER HERO */}
      <header className="app-header-modern">
        <div className="hero-pattern"></div>
        <div className="app-header-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Serviços verificados</span>
          </div>
          
          <h1 className="hero-title">🐾 Pet Finder</h1>
          <p className="hero-subtitle">Os melhores serviços para o seu melhor amigo</p>
          
          {/* Estatísticas */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.total}+</span>
              <span className="stat-label">Parceiros</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{stats.vips}</span>
              <span className="stat-label">VIP</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{stats.abertos}</span>
              <span className="stat-label">Abertos</span>
            </div>
          </div>
        </div>
      </header>

      {/* FILTROS DE CATEGORIA - STICKY */}
      {hasFiltro('categoria') && (
        <div className="petlist-toolbar sticky-toolbar" ref={toolbarRef}>
          <button 
            onClick={() => setFiltroCategoria(null)}
            className={`filter-btn ${!filtroCategoria ? 'active' : ''}`}
          >
            <Store size={14} />
            <span>Todos</span>
          </button>

          <button 
            onClick={() => setFiltroCategoria('banho')}
            className={`filter-btn ${filtroCategoria === 'banho' ? 'active' : ''}`}
          >
            <Scissors size={14} />
            <span>Banho & Tosa</span>
          </button>

          <button 
            onClick={() => setFiltroCategoria('vet')}
            className={`filter-btn ${filtroCategoria === 'vet' ? 'active' : ''}`}
          >
            <Stethoscope size={14} />
            <span>Veterinário</span>
          </button>

          <button 
            onClick={() => setFiltroCategoria('loja')}
            className={`filter-btn ${filtroCategoria === 'loja' ? 'active' : ''}`}
          >
            <ShoppingBag size={14} />
            <span>Pet Shop</span>
          </button>

          <button 
            onClick={() => setFiltroCategoria('hotel')}
            className={`filter-btn ${filtroCategoria === 'hotel' ? 'active' : ''}`}
          >
            <Home size={14} />
            <span>Hotel</span>
          </button>

          {filtroCategoria && (
            <button 
              onClick={() => setFiltroCategoria(null)}
              className="filter-btn clear-btn"
            >
              <X size={14} />
              <span>Limpar</span>
            </button>
          )}
        </div>
      )}

      {/* ORDENAÇÃO - STICKY */}
      <div className="petlist-toolbar sticky-toolbar">
        <button 
          onClick={() => setOrdenacao('melhor_nota')}
          className={`filter-btn ${ordenacao === 'melhor_nota' ? 'active' : ''}`}
        >
          <Star size={14} />
          <span>Melhor Avaliados</span>
        </button>

        <button 
          onClick={() => setOrdenacao('mais_avaliados')}
          className={`filter-btn ${ordenacao === 'mais_avaliados' ? 'active' : ''}`}
        >
          <TrendingUp size={14} />
          <span>Mais Populares</span>
        </button>

        <button 
          onClick={() => setOrdenacao('destaques')}
          className={`filter-btn ${ordenacao === 'destaques' ? 'active' : ''}`}
        >
          <Award size={14} />
          <span>Parceiros VIP</span>
        </button>
      </div>

      {/* CONTADOR DE RESULTADOS */}
      {!loading && locaisFiltrados.length > 0 && (
        <div className="results-counter">
          <span className="results-text">
            Mostrando <strong>{Math.min(limit, locaisFiltrados.length)}</strong> de{' '}
            <strong>{locaisFiltrados.length}</strong> {locaisFiltrados.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>
      )}

      {/* SKELETON LOADING */}
      {loading && (
        <div className="petlist-container">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* LISTA DE CARDS COM ANIMAÇÃO */}
      {!loading && (
        <AnimatePresence mode="wait">
          <motion.div 
            className={`petlist-container ${isTransitioning ? 'transitioning' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {locaisFiltrados.slice(0, limit).map((local, index) => (
              <motion.div
                key={local.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="card-wrapper-animated"
              >
                <PetCardMapStyle
                  local={local}
                  onOpenChat={(local) => setSelectedLocal(local)}
                  isNovo={isNovo(local.created_at)}
                />
              </motion.div>
            ))}

            {/* CARREGAR MAIS */}
            {limit < locaisFiltrados.length && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setLimit((prev) => prev + 6)}
                className="load-more-btn"
              >
                <span>Carregar mais serviços</span>
                <span className="load-more-count">
                  ({locaisFiltrados.length - limit} restantes)
                </span>
              </motion.button>
            )}

            {/* EMPTY STATE MELHORADO */}
            {locaisFiltrados.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="empty-state"
              >
                <div className="empty-icon">🔍</div>
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente ajustar os filtros ou buscar por outra categoria</p>
                
                {/* Sugestões */}
                <div className="empty-suggestions">
                  <p className="suggestions-title">Sugestões:</p>
                  <div className="suggestions-chips">
                    <button onClick={() => setFiltroCategoria(null)} className="suggestion-chip">
                      Ver todos
                    </button>
                    <button onClick={() => setOrdenacao('destaques')} className="suggestion-chip">
                      Ver VIPs
                    </button>
                    <button onClick={() => setOrdenacao('melhor_nota')} className="suggestion-chip">
                      Melhor avaliados
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFiltroCategoria(null);
                    setOrdenacao('melhor_nota');
                  }}
                  className="empty-btn"
                >
                  Limpar todos os filtros
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* BOTÃO SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="scroll-to-top"
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT MODAL */}
      {selectedLocal && (
        <ChatModal
          local={selectedLocal}
          projeto={projeto}
          onClose={() => setSelectedLocal(null)}
        />
      )}
    </div>
  );
}```

---


### 📄 src/pages/Viewer/Viewer.css

```css
/* =========================================================
   ESTILOS ANTIGOS (MANTIDOS)
   ========================================================= */

.petlist-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.app-shell {
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 80px;
}

.app-header {
  background: var(--header-gradient);
  color: var(--brand-on-primary);
  padding: 28px 20px 52px;
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
}

.app-header h1 {
  font-size: 22px;
  font-weight: 600;
}

.app-header p {
  font-size: 14px;
  opacity: 0.8;
}

.filter-chip {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: #fff;
  font-size: 13px;
}

.filter-chip.active {
  background: var(--color-primary);
  color: #fff;
}

.app-header-text h1 {
  font-size: 26px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

.app-header-text p {
  margin: 8px 0 0;
  font-size: 14px;
  opacity: 0.92;
}

/* =========================================================
   🆕 MELHORIAS ADICIONADAS
   ========================================================= */

/* HERO HEADER MODERNO */
.app-header-modern {
  position: relative;
  padding: 48px 20px 40px;
  text-align: center;
  background: linear-gradient(to bottom, var(--color-primary-bg) 0%, #FFFFFF 100%);
  overflow: hidden;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20px 20px, rgba(249, 115, 22, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.app-header-content {
  position: relative;
  z-index: 1;
}

/* Badge "Serviços Verificados" */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: white;
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: 16px;
  box-shadow: var(--shadow-sm);
}

.hero-badge-dot {
  width: 8px;
  height: 8px;
  background: var(--color-success);
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Título do Hero */
.hero-title {
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(14px, 3vw, 16px);
  color: var(--color-gray-500);
  margin: 0 0 24px 0;
  font-weight: 500;
}

/* Estatísticas */
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 400px;
  margin: 0 auto;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--color-gray-500);
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--color-gray-200);
}

/* =========================================================
   🆕 TOOLBAR STICKY
   ========================================================= */
.petlist-toolbar {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  padding: 12px;
  margin: 16px 16px;
  box-shadow: var(--shadow-sm);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  position: relative;
  z-index: 50;
  transition: all 0.3s;
}

.sticky-toolbar {
  position: sticky;
  top: 16px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
}

/* Botões de Filtro Modernos */
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: white;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  color: var(--color-gray-700);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.filter-btn:hover {
  border-color: var(--color-primary-light);
  background: var(--color-primary-bg);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  border-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.filter-btn svg {
  flex-shrink: 0;
}

/* Botão Limpar */
.clear-btn {
  background: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.clear-btn:hover {
  background: var(--color-gray-100);
  border-color: var(--color-gray-400);
}

/* =========================================================
   🆕 CONTADOR DE RESULTADOS
   ========================================================= */
.results-counter {
  text-align: center;
  padding: 12px 16px;
  margin: 0 16px;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-200);
}

.results-text {
  font-size: 14px;
  color: var(--color-gray-700);
}

.results-text strong {
  color: var(--color-primary);
  font-weight: 700;
}

/* =========================================================
   🆕 SKELETON LOADING
   ========================================================= */
.skeleton-card {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.skeleton-image {
  width: 100%;
  height: 180px;
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.skeleton-content {
  padding: 20px;
}

.skeleton-title {
  height: 20px;
  background: var(--color-gray-200);
  border-radius: 4px;
  margin-bottom: 12px;
  width: 70%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.skeleton-text {
  height: 14px;
  background: var(--color-gray-200);
  border-radius: 4px;
  margin-bottom: 8px;
  animation: shimmer 1.5s ease-in-out infinite;
}

.skeleton-text.short {
  width: 50%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* =========================================================
   🆕 TRANSIÇÃO SUAVE
   ========================================================= */
.petlist-container.transitioning {
  opacity: 0.4;
  pointer-events: none;
}

.card-wrapper-animated {
  position: relative;
}

/* =========================================================
   🆕 SCROLL TO TOP BUTTON
   ========================================================= */
.scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
  cursor: pointer;
  transition: all 0.3s;
}

.scroll-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.5);
}

.scroll-to-top:active {
  transform: translateY(-2px) scale(1);
}

/* =========================================================
   LOADING
   ========================================================= */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-gray-200);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  color: var(--color-gray-500);
  font-size: 14px;
  font-weight: 500;
}

/* =========================================================
   BOTÃO CARREGAR MAIS
   ========================================================= */
.load-more-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 32px;
  margin: 20px auto;
  background: white;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  color: var(--color-gray-700);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: var(--shadow-sm);
}

.load-more-btn:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-bg);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.load-more-count {
  font-size: 12px;
  color: var(--color-gray-500);
  font-weight: 500;
}

/* =========================================================
   🆕 EMPTY STATE MELHORADO
   ========================================================= */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 8px 0;
}

.empty-state p {
  font-size: 14px;
  color: var(--color-gray-500);
  margin: 0 0 24px 0;
  max-width: 300px;
}

.empty-suggestions {
  margin-bottom: 24px;
}

.suggestions-title {
  font-size: 13px;
  color: var(--color-gray-700);
  font-weight: 600;
  margin-bottom: 12px;
}

.suggestions-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.suggestion-chip {
  padding: 8px 16px;
  background: var(--color-gray-100);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  color: var(--color-gray-700);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.suggestion-chip:hover {
  background: var(--color-primary-bg);
  border-color: var(--color-primary-light);
  color: var(--color-primary-dark);
}

.empty-btn {
  padding: 12px 24px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.empty-btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
}

/* =========================================================
   RESPONSIVO
   ========================================================= */
@media (max-width: 640px) {
  .app-shell {
    padding-bottom: 100px;
  }

  .app-header-modern {
    padding: 36px 16px 32px;
  }

  .hero-stats {
    gap: 16px;
    padding: 16px;
  }

  .stat-value {
    font-size: 20px;
  }

  .stat-divider {
    height: 30px;
  }

  .petlist-toolbar {
    margin: 12px;
    padding: 10px;
  }

  .sticky-toolbar {
    top: 12px;
  }

  .filter-btn {
    padding: 8px 12px;
    font-size: 12px;
  }

  .filter-btn span {
    display: none;
  }

  .filter-btn svg {
    margin: 0;
  }

  .results-counter {
    margin: 0 12px;
  }

  .scroll-to-top {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
  }
}```

---

#### 🔧 Services


### 📄 src/services/cardService.js

```javascript
import { supabase } from './supabaseClient'

const TABLE_NAME = 'seu_nome_da_tabela' // ⚠️ AJUSTE AQUI

export const getCards = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const getCardById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}

export const createCard = async (cardData) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([cardData])
    .select()
  
  return { data: data?.[0], error }
}

export const updateCard = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select()
  
  return { data: data?.[0], error }
}

export const deleteCard = async (id) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
  
  return { error }
}```

---


### 📄 src/services/filterService.js

```javascript
/**
 * SISTEMA GLOBAL DE FILTROS
 * =========================
 *
 * Este arquivo define TODOS os filtros possíveis da plataforma.
 *
 * ➜ Filtros são infraestrutura.
 * ➜ Nunca são criados pelo dashboard.
 * ➜ Funcionam em qualquer nicho (multi-tenant).
 *
 * O dashboard apenas:
 * - ativa ou desativa filtros por projeto
 * - define prioridade entre filtros de ordenação
 *
 * Este arquivo deve ser legível como documentação viva.
 */

/**
 * Cada filtro segue um contrato fixo.
 * Se alguém não entender o filtro lendo apenas este arquivo,
 * o filtro está mal definido.
 */

export const FILTERS = {
  /**
   * ⭐ FILTRO: Bem avaliados
   * ----------------------
   * Intenção:
   * Priorizar locais com boa reputação.
   *
   * Impacto:
   * Reorganiza o ranking, não remove resultados.
   *
   * Limite:
   * Se o local não tiver avaliação, ele é ignorado pelo filtro.
   */
  bem_avaliados: {
    id: 'bem_avaliados',

    nome_humano: 'Bem avaliados',

    descricao:
      'Prioriza locais com avaliação igual ou superior a 4.0. Não remove resultados.',

    tipo: 'ordenacao',

    campo_afetado: 'nota',

    comportamento: 'ordenar',

    /**
     * Função de ordenação.
     * Retorna um número para comparação.
     * Quanto maior, mais acima no ranking.
     */
    ordenar: (local) => {
      if (typeof local.nota !== 'number') return 0;
      if (local.nota < 4) return 0;
      return local.nota;
    },

    /**
     * Fallback seguro:
     * Se algo falhar, o filtro não interfere na lista.
     */
    fallback: () => 0
  },

  /**
   * 💬 FILTRO: WhatsApp disponível
   * -----------------------------
   * Intenção:
   * Priorizar locais com contato rápido.
   *
   * Impacto:
   * Reorganiza o ranking.
   *
   * Limite:
   * Não remove locais sem WhatsApp.
   */
  whatsapp_disponivel: {
    id: 'whatsapp_disponivel',

    nome_humano: 'WhatsApp disponível',

    descricao:
      'Prioriza locais que possuem WhatsApp ativo para contato direto.',

    tipo: 'ordenacao',

    campo_afetado: 'is_whatsapp',

    comportamento: 'ordenar',

    ordenar: (local) => {
      if (local.is_whatsapp === true) return 1;
      return 0;
    },

    fallback: () => 0
  },

  /**
   * 💎 FILTRO: Destaque / VIP
   * ------------------------
   * Intenção:
   * Dar prioridade a locais destacados pelo projeto.
   *
   * Impacto:
   * Reorganiza o ranking.
   *
   * Limite:
   * Não remove locais comuns.
   */
  destaque: {
    id: 'destaque',

    nome_humano: 'Destaque',

    descricao:
      'Prioriza locais marcados como destaque (VIP). Não remove resultados.',

    tipo: 'ordenacao',

    campo_afetado: 'destaque',

    comportamento: 'ordenar',

    ordenar: (local) => {
      if (local.destaque === true) return 1;
      return 0;
    },

    fallback: () => 0
  }
};
```

---


### 📄 src/services/supabaseClient.js

```javascript
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// CONFIGURAÇÃO DO SUPABASE
// ------------------------------------------------------------------
// ⚠️ ATENÇÃO: Use apenas a 'Publishable Key' aqui. 
// Nunca coloque a 'Secret Key' (service_role) no front-end.

const supabaseUrl = 'https://yakmsnadietjagzrctyp.supabase.co'; 
const supabaseKey = 'sb_publishable_JnzduU-F6qpkX82P8G1o5A_WHj_dh5v'; 

export const supabase = createClient(supabaseUrl, supabaseKey);```

---

#### 🛠️ Utils


### 📄 src/utils/constants.js

```javascript
// ======================================================
// 📄 constants.js
// Constantes globais do App / Dashboard
// ======================================================
//
// 🎯 PROPÓSITO DESTE ARQUIVO
// Centralizar TODAS as constantes de domínio:
// - Tags oficiais
// - Status
// - Tema
// - Definição de filtros do app
//
// 🧠 MODELO MENTAL
// - Nada aqui contém lógica
// - Nada aqui acessa banco
// - Tudo aqui é reutilizável entre projetos
//
// 🔒 CONTRATO
// - Arquivo seguro para edição por humanos
// - Mudanças aqui não quebram a aplicação
// - Pode ser lido como documentação viva
//

// ======================================================
// 🔹 TAGS OFICIAIS (CATEGORIAS)
// ======================================================
//
// 🎯 INTENÇÃO
// Definir as categorias possíveis de um local
//
// 🧠 USO
// - Dashboard (edição do local)
// - Filtros do app
// - Cards visuais
//
// 🔒 CONTRATO
// - id   → usado em código / banco
// - label → exibido ao usuário
// - color → identidade visual da tag
//
export const TAGS_OFICIAIS = [
  { id: 'banho', label: 'Banho', color: '#3b82f6' },
  { id: 'vet',   label: 'Vet',   color: '#10b981' },
  { id: 'loja',  label: 'Loja',  color: '#f59e0b' },
  { id: 'hotel', label: 'Hotel', color: '#8b5cf6' }
];

// ======================================================
// 🔹 STATUS DE FILTRO (UI)
// ======================================================
//
// 🎯 INTENÇÃO
// Controlar visualização no Dashboard
//
// 🧠 USO
// - Filtro rápido: todos / publicados / ocultos
//
export const STATUS_FILTROS = ['todos', 'publicados', 'ocultos'];

// ======================================================
// 🔹 STATUS DE DADOS (BANCO)
// ======================================================
//
// 🎯 INTENÇÃO
// Padronizar valores usados no banco
//
// 🧠 USO
// - Comparações
// - Toggle de visibilidade
//
export const STATUS_TYPES = {
  PUBLICADO: 'PUBLICAR_APP',
  RASCUNHO: 'RASCUNHO'
};

// ======================================================
// 🔹 TEMA PADRÃO DO SISTEMA
// ======================================================
//
// 🎯 INTENÇÃO
// Definir cores base do app
//
// 🧠 MODELO
// - Pode ser sobrescrito por projeto
// - Nunca depende de CSS externo
//
export const THEME_COLORS = {
  primary: '#2563eb',
  bg: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',
  textSec: '#64748b',
  border: '#e2e8f0',
  danger: '#ef4444',
  success: '#22c55e'
};

// ======================================================
// 🔹 FUNÇÃO: getTheme
// ======================================================
//
// 🎯 INTENÇÃO
// Gerar tema final baseado no projeto
//
// 🧠 REGRA
// - Projeto pode sobrescrever apenas cor primária
// - Todo o resto permanece consistente
//
export const getTheme = (projeto) => ({
  primary: projeto?.cor_primaria || THEME_COLORS.primary,
  bg: THEME_COLORS.bg,
  card: THEME_COLORS.card,
  text: THEME_COLORS.text,
  textSec: THEME_COLORS.textSec,
  border: THEME_COLORS.border,
  danger: THEME_COLORS.danger,
  success: THEME_COLORS.success
});

// ======================================================
// 🔹 FILTROS DISPONÍVEIS NO APP
// ======================================================
//
// 🎯 INTENÇÃO
// Definir QUAIS filtros existem no sistema
//
// 🧠 MODELO MENTAL
// - Código define o que é possível
// - Dashboard decide o que está ativo
//
// 🔒 CONTRATO
// - id           → chave técnica
// - label        → nome exibido
// - description  → explicação humana
// - group        → filtro ou ordenação
//
export const FILTROS_APP = [
  {
    id: 'categoria',
    label: 'Categoria',
    description: 'Banho, Vet, Loja, Hotel',
    group: 'filtro'
  },
  {
    id: 'bem_avaliados',
    label: 'Bem avaliados ⭐',
    description: 'Nota ≥ 4.5 e pelo menos 40 avaliações',
    group: 'filtro'
  },
  {
    id: 'com_instagram',
    label: 'Com Instagram 📸',
    description: 'Exibe apenas lojas com Instagram',
    group: 'filtro'
  },
  {
    id: 'ordenar_melhor_nota',
    label: 'Ordenar por melhor nota',
    description: 'Usuário pode priorizar qualidade',
    group: 'ordenacao'
  },
  {
    id: 'ordenar_mais_avaliados',
    label: 'Ordenar por mais avaliados',
    description: 'Usuário pode priorizar popularidade',
    group: 'ordenacao'
  }
];

// ======================================================
// 🔹 FILTROS PADRÃO ATIVOS (MVP)
// ======================================================
//
// 🎯 INTENÇÃO
// Garantir experiência mínima sem configuração
//
// 🧠 REGRA
// - Aplicado quando projeto ainda não definiu filtros
// - Pode ser alterado no dashboard
//
export const DEFAULT_FILTROS_APP = [
  'categoria',
  'bem_avaliados',
  'com_instagram'
];
```

---


### 📄 src/utils/generateReport.js

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para Node.js (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nome do arquivo de saída
const outputFileName = 'RELATORIO_TECNICO.txt';

// Pasta base: a MESMA pasta onde este arquivo está
const baseDir = __dirname;

// Arquivos para ignorar
const ignoreFiles = ['vite-env.d.ts', '.DS_Store'];

// Conteúdo inicial do relatório
let reportContent = `RELATÓRIO TÉCNICO DO PROJETO
Data: ${new Date().toLocaleString()}
Pasta analisada: ${baseDir}

====================================

`;

function scanDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else {
      const isValidFile =
        !ignoreFiles.includes(file) &&
        (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css'));

      if (isValidFile) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const relativePath = path.relative(baseDir, fullPath);

        reportContent += `
--- ARQUIVO: ${relativePath} ---
${content}
----------------------------------
`;
      }
    }
  });
}

// (Opcional) tentar ler package.json apenas se existir NA MESMA PASTA
const pkgPath = path.join(baseDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = fs.readFileSync(pkgPath, 'utf8');
  reportContent += `
--- PACKAGE.JSON ---
${pkg}
--------------------
`;
}

// Executa o scan
scanDirectory(baseDir);

// Salva o relatório
const outputPath = path.join(baseDir, outputFileName);
fs.writeFileSync(outputPath, reportContent);

console.log(`✅ Relatório gerado com sucesso: ${outputPath}`);
console.log(`👉 Este relatório analisa apenas a pasta onde o script está.`);
```

---


### 📄 src/utils/index.js

```javascript
// Barrel export - facilita imports
export * from './constants';
export * from './textLogic';
export * from './theme';
```

---


### 📄 src/utils/textLogic.js

```javascript
// Funções puras de processamento de texto
// Extraia a lógica do AdminGenerator para cá

export const processText = (inputText) => {
  // Sua lógica aqui
  return inputText.trim()
}

export const validateInput = (text) => {
  if (!text || text.trim() === '') {
    return { valid: false, error: 'Campo obrigatório' }
  }
  return { valid: true, error: null }
}```

---


### 📄 src/utils/theme.js

```javascript

```

---

#### 🏠 Root Files


### 📄 src/App.jsx

```javascript
// ======================================================
// 📄 App.jsx
// Entry Point + Roteamento Global (Multi-Tenant)
// ======================================================
//
// 🎯 PROPÓSITO DESTE ARQUIVO
// - Definir TODAS as rotas do sistema
// - Resolver qual app/nicho deve ser carregado
// - Injetar configuração do projeto nas telas
//
// 🧠 MODELO MENTAL
// - HomeFactory → lista de apps existentes
// - UniversalLoader → resolve qual app carregar
// - Telas nunca decidem contexto sozinhas
//
// 🔒 CONTRATO
// - Nenhuma regra de negócio pesada aqui
// - Nenhuma lógica de filtro
// - Apenas orquestração e injeção de dados
//
// ======================================================

// ======================================================
// 🔹 DEPENDÊNCIAS
// ======================================================
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import { supabase } from './services/supabaseClient';
import { FolderPlus } from 'lucide-react';
import { DataProvider } from './context/DataContext';

// ======================================================
// 🔹 TELAS DO SISTEMA
// ======================================================
import Viewer from './pages/Viewer';
import Processor from './pages/Processor';
import Manager from './pages/Manager';

// ======================================================
// 🔹 ESTILOS
// ======================================================
import './assets/global.css';
import './assets/theme.css';

// ======================================================
// 🔹 COMPONENTE: UniversalLoader
// ======================================================
//
// 🎯 INTENÇÃO
// Resolver dinamicamente QUAL app deve ser carregado
// com base na URL (/pets, /mecanicos, etc)
//
// 🧠 MODELO MENTAL
// - URL define o nicho
// - Nicho busca um projeto no banco
// - Projeto injeta configuração nas telas
//
// 🔒 CONTRATO
// - Se não encontrar projeto → erro controlado
// - Nunca renderiza tela sem projeto válido
//
function UniversalLoader() {
  const { nicho } = useParams(); // slug do projeto
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // 🔹 FETCH DO PROJETO
  // ==============================
  useEffect(() => {
    async function carregarProjeto() {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .eq('slug', nicho)
        .single();

      if (error || !data) {
        setProjeto(null); // 404 lógico
      } else {
        setProjeto(data);
      }
      setLoading(false);
    }
    carregarProjeto();
  }, [nicho]);

  // ==============================
  // 🔹 ESTADOS DE SEGURANÇA
  // ==============================
  if (loading) {
    return <div style={{ padding: 20 }}>Carregando Fábrica…</div>;
  }

  if (!projeto) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h2>🚫 Nicho não encontrado</h2>
        <Link to="/">Voltar para a Home</Link>
      </div>
    );
  }

  // ==============================
  // 🔹 RENDERIZAÇÃO DO APP
  // ==============================
  //
  // Projeto encontrado → injetamos config nas telas
  //
  return (
    <div>
      {/* =====================================
         🔹 MENU LOCAL (DEV / TESTES)
      ====================================== */}
      <nav
        style={{
          padding: '10px',
          background: '#f8fafc',
          borderBottom: '1px solid #eee',
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          fontSize: '14px'
        }}
      >
        <Link
          to={`/${nicho}`}
          style={{ fontWeight: 'bold', color: projeto.cor_primaria }}
        >
          {projeto.nome}
        </Link>
        <Link to={`/${nicho}/dashboard`} style={{ color: '#64748b' }}>
          Dashboard
        </Link>
        <Link to={`/${nicho}/admin`} style={{ color: '#64748b' }}>
          Admin SQL
        </Link>
        <Link to="/" style={{ color: '#94a3b8' }}>
          🏠 Sair
        </Link>
      </nav>

      {/* =====================================
         🔹 ROTAS DO PROJETO
      ====================================== */}
      <Routes>
        <Route path="/" element={<Viewer projeto={projeto} />} />
        <Route path="/dashboard" element={<Manager projeto={projeto} />} />
        <Route path="/admin" element={<Processor projeto={projeto} />} />
      </Routes>
    </div>
  );
}

// ======================================================
// 🔹 TELA: HomeFactory
// ======================================================
//
// 🎯 INTENÇÃO
// Listar todos os projetos/nichos existentes
//
// 🧠 MODELO MENTAL
// - Cada card = um app independente
// - Clique → entra no app
//
// 🔒 CONTRATO
// - Não cria projetos
// - Apenas navega
//
function HomeFactory() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    supabase
      .from('projetos')
      .select('*')
      .then(({ data }) => setProjetos(data || []));
  }, []);

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif'
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        🏭 Fábrica de Apps
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px'
        }}
      >
        {/* =============================
           🔹 PROJETOS EXISTENTES
        ============================== */}
        {projetos.map(proj => (
          <Link key={proj.id} to={`/${proj.slug}`} style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: '30px',
                borderRadius: '12px',
                background: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                textAlign: 'center',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚀</div>
              <h3 style={{ margin: 0, color: '#1e293b' }}>{proj.nome}</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                /{proj.slug}
              </span>
            </div>
          </Link>
        ))}

        {/* =============================
           🔹 CARD FUTURO (CRIAR NOVO)
        ============================== */}
        <div
          style={{
            padding: '30px',
            borderRadius: '12px',
            border: '2px dashed #cbd5e1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            cursor: 'not-allowed'
          }}
        >
          <FolderPlus size={32} />
          <span style={{ fontWeight: 'bold', marginTop: '10px' }}>
            Novo Nicho
          </span>
          <span style={{ fontSize: '10px' }}>
            (Em breve no Painel)
          </span>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// 🔹 ROOT DO APP
// ======================================================
//
// 🎯 INTENÇÃO
// Definir roteamento global
//
export default function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          {/* Home / Fábrica */}
          <Route path="/" element={<HomeFactory />} />
          
          {/* Apps Dinâmicos com Multi-Tenant */}
          <Route path="/:nicho/*" element={<UniversalLoader />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}
```

---


### 📄 src/main.jsx

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/global.css";
import "./assets/theme.css";
import "./assets/design-tokens.css"; // ← NOVA LINHA ADICIONADA
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)```

---

## 4. ESTATÍSTICAS

### Contagem de Arquivos

| Tipo | Arquivos | Linhas de Código |
|------|----------|------------------|
| JSX  | 22 | 4171 |
| JS   | 9  | 477 |
| CSS  | 14 | 1797 |
| **TOTAL** | **45** | **6445** |

### Estrutura src/

```
src
  assets
  components
  components/CardItem
  components/ChatModal
  components/FilterSheet
  components/ui
  context
  hooks
  pages
  pages/Manager
  pages/Manager/components
  pages/Processor
  pages/Viewer
  services
  utils
```

### Arquivos por Pasta

```
      9 src/assets
      6 src/pages/Manager/components
      6 src/components/ui
      5 src/utils
      4 src/components/CardItem
      3 src/services
      2 src/pages/Viewer
      2 src/pages/Manager
      2 src/hooks
      2 src
      1 src/pages/Processor
      1 src/context
      1 src/components/FilterSheet
      1 src/components/ChatModal
```

---

## ✅ FIM DO SNAPSHOT

**Arquivo gerado com sucesso!**

Este arquivo contém:
- ✅ Estrutura completa de pastas
- ✅ Todos os códigos fonte
- ✅ Todas as configurações
- ✅ Estatísticas detalhadas

**Use este arquivo para:**
- 📋 Documentação completa
- 🔍 Análise de estrutura
- 🤖 Consulta com IA
- 📦 Backup de código

