# UI_COMPONENTS_MAP.md
Versão: 1.0.0  
Data: 2026-02-21  
Fonte: IMPORTS_MAP.txt (extração automática de imports)  
Objetivo: Mapear dependências reais entre Pages → Components → UI primitives.

> Observação: este arquivo reflete o que foi importado no código no momento da extração.
> Se algum componente é renderizado via composição indireta (props/children) ou import dinâmico,
> ele pode não aparecer aqui.

---

## 1) Entry Points e Shell do App

### 1.1 `src/main.jsx`
**Importa**
- `App` ← `src/App.jsx`
- CSS Globais:
  - `src/assets/global.css`
  - `src/assets/theme.css`
  - `src/assets/design-tokens.css`

**Papel**
- Bootstrap do app (React root)
- Carregamento de tokens/tema globais

---

### 1.2 `src/App.jsx`
**Importa**
- Router:
  - `BrowserRouter, Routes, Route, Navigate, useParams` (react-router-dom)
- Supabase:
  - `supabase` ← `src/services/supabaseClient`
- UI/Componentes:
  - `SplashScreen` ← `src/components/SplashScreen`
  - `BottomNav` ← `src/components/BottomNav`
- Pages:
  - `PetList` ← `src/pages/Viewer` (Viewer)
  - `Manager` ← `src/pages/Manager`
  - `Processor` ← `src/pages/Processor`
- Hook:
  - `useFavoritos` ← `src/hooks/useFavoritos`
- CSS:
  - `src/assets/global.css`

**Papel**
- Shell de rotas + layout macro (navegação e páginas)
- Orquestração das telas Viewer/Manager/Processor

---

## 2) Pages → Componentes

## 2.1 Viewer (App Público)
### `src/pages/Viewer/index.jsx`
**Importa**
- Dados:
  - `supabase` ← `src/services/supabaseClient`
- Animação:
  - `motion, AnimatePresence` (framer-motion)
- Componentes do app:
  - `ChatModal` ← `src/components/ChatModal`
  - `PetCardMapStyle` ← `src/components/CardItem`
  - `SearchBar` ← `src/components/SearchBar`
  - `ModalSheet` ← `src/components/ModalSheet`
  - `HeroGridCategories` ← `./HeroGridCategories`
- Hook:
  - `useFavoritos` ← `src/hooks/useFavoritos`
- Ícones:
  - `X, Star, TrendingUp, ChevronUp` (lucide-react)
- CSS:
  - `Viewer.css`
  - `favoritos.css`
  - `hero-grid.css`

**Responsabilidade**
- Listagem pública
- Busca/filtros
- Favoritos (feature)
- Modal de chat/lead e/ou detalhes (via ChatModal/ModalSheet)
- UI com animações leves

**Dependências diretas**
- ChatModal → Supabase
- CardItem → (imports truncados na extração; ver observações)
- SearchBar → UI de busca
- ModalSheet → overlay animado (framer-motion)

---

### `src/pages/Viewer/HeroGridCategories.jsx`
**Importa**
- Ícones:
  - `Store, Scissors, Stethoscope, Hotel, Sparkles, Grid3x3` (lucide-react)
- CSS:
  - `hero-grid.css`

**Responsabilidade**
- Grid visual de categorias/nichos no Viewer

**Observação**
- No `IMPORTS_MAP.txt` apareceu uma linha estranha:
  - `import { HeroGridCategories } from './HeroGridCategories'; // ou ajuste o path`
  Isso parece **comentário/linha indevida** ou resquício de ajuste. Vale revisar o arquivo para evitar auto-import.

---

## 2.2 Manager (Dashboard/Admin)
### `src/pages/Manager/index.jsx`
**Importa**
- Dados:
  - `supabase` ← `src/services/supabaseClient`

**Observação importante**
- Não aparecem imports dos componentes internos do Manager no log (DashboardHeader, FilterBar etc.).
  Isso significa uma de duas coisas:
  1) eles são importados dentro do próprio `index.jsx`, mas não entraram no recorte enviado, ou
  2) o Manager renderiza pouca coisa diretamente e delega via composição/arquivo diferente.

> Para mapear 100% o Manager → Components, rode novamente o script e me mande o trecho do `IMPORTS_MAP.txt`
> completo (ou abra o `src/pages/Manager/index.jsx` e cole aqui o topo com imports).

---

### Componentes do Manager (page-scoped)
Mesmo sem aparecerem como imports do `Manager/index.jsx` no log, eles existem e importam dependências internas:

#### `src/pages/Manager/components/DashboardHeader.jsx`
- Ícones: `Store, ExternalLink` (lucide-react)

#### `src/pages/Manager/components/EmptyState.jsx`
- Ícones: `Search, Store` (lucide-react)

#### `src/pages/Manager/components/FilterBar.jsx`
- Constantes: `TAGS_OFICIAIS, STATUS_FILTROS` ← `src/pages/utils/constants` (ver Observações/Paths)

#### `src/pages/Manager/components/ProjectFiltersPanel.jsx`
- Dados: `supabase` ← `../../supabaseClient` (**path divergente**, ver Observações)
- Constantes: `FILTROS_APP, DEFAULT_FILTROS_APP` ← `../../utils/constants`
- Config: `FILTERS` ← `../../filters/filters.config` (**não aparece na árvore**, ver Observações)

#### `src/pages/Manager/components/StoreCard.jsx`
- Ícones: `Eye, EyeOff, Edit, Trash2, Star` (lucide-react)

#### `src/pages/Manager/components/StoreCardEdit.jsx`
- Constantes: `TAGS_OFICIAIS` ← `../../utils/constants`

---

## 2.3 Processor (Ferramenta interna)
### `src/pages/Processor/index.jsx`
**Importa**
- Ícones: `Copy, Check, MapPin, MousePointer, Globe, ArrowRight` (lucide-react)

**Responsabilidade**
- Ferramenta interna de processamento/import/refino (a confirmar)

---

## 3) Componentes Reutilizáveis → Dependências

### 3.1 `src/components/BottomNav/index.jsx`
**Importa**
- Ícones: `Home, Heart, User, Search` (lucide-react)
- CSS: `bottom-nav.css`

### 3.2 `src/components/SearchBar/index.jsx`
**Importa**
- Ícones: `Search, X` (lucide-react)
- CSS: `search-bar.css`

### 3.3 `src/components/ModalSheet/index.jsx`
**Importa**
- Animação: `motion, AnimatePresence` (framer-motion)
- CSS: `modal-sheet.css`
- (Há um `import {` truncado na extração → ver Observações)

### 3.4 `src/components/SplashScreen/index.jsx`
**Importa**
- CSS: `splash.css`

### 3.5 `src/components/ChatModal/index.jsx`
**Importa**
- Ícones: `Send, X, User, Phone` (lucide-react)
- Dados: `supabase` ← `src/services/supabaseClient`

### 3.6 `src/components/CardItem/index.jsx`
**Importa**
- CSS: `pet-card.css`
- (Há um `import {` truncado na extração → ver Observações)

---

## 4) UI Primitives → Uso

### `src/components/ui/*`
- `Badge.jsx`
- `Button.jsx` + `button.css`
- `Card.jsx`
- `index.js` (barrel)

> Os imports diretos das primitives não aparecem no recorte enviado (provavelmente são usados dentro dos componentes),
> mas este é o kit base do design system.

---

## 5) Context, Hooks e Services

### 5.1 `src/context/DataContext.jsx`
**Importa**
- `supabase` ← `src/services/supabaseClient`

**Uso**
- Provider de dados (`items`, `fetchItems`, loading)

### 5.2 `src/hooks/useFavoritos.js`
- Hook local de favoritos (usado em `App.jsx` e Viewer)

### 5.3 `src/services/supabaseClient.js`
- Cliente Supabase (fonte única recomendada)

---

## 6) Observações e Alertas Técnicos (baseados nos imports)

### 6.1 Imports truncados
A extração capturou linhas incompletas:
- `src/components/CardItem/index.jsx` → `import {` (incompleto)
- `src/components/ModalSheet/index.jsx` → `import {` (incompleto)

**Ação recomendada**
- Re-rodar o script com captura multi-linha de imports (posso te mandar uma versão melhorada).

### 6.2 Paths divergentes para Supabase
No log aparecem dois padrões diferentes:
- ✅ `src/services/supabaseClient` (padrão correto e presente na árvore)
- ⚠️ `../supabaseClient` e `../../supabaseClient` (não aparecem na árvore)

Exemplos:
- `src/hooks/useDashboardData.jsx` importa `supabase` de `../supabaseClient` (provável path errado)
- `src/pages/Manager/components/ProjectFiltersPanel.jsx` importa `supabase` de `../../supabaseClient` (provável path errado)

**Ação recomendada**
- Padronizar tudo para: `src/services/supabaseClient.js`  
- Isso é incremental e reduz bugs.

### 6.3 Referências a `filters/filters.config` não presentes na árvore
- `useDashboardFilters.jsx` e `ProjectFiltersPanel.jsx` importam `FILTERS` de `../filters/filters.config`
- Esse caminho **não aparece** na árvore enviada

Pode ser:
- pasta não listada no tree (geração parcial), ou
- arquivo realmente ausente/quebrado

**Ação recomendada**
- Confirmar se existe `src/filters/filters.config.*`
- Se não existir, isso é dívida técnica.

---

## 7) Próximo passo opcional (melhorar precisão)
Para mapear o Manager com 100%:
- me mande o topo (imports) do arquivo:
  - `src/pages/Manager/index.jsx`

E, se quiser que eu corrija o script para pegar imports multi-linha, eu te mando uma versão v2.