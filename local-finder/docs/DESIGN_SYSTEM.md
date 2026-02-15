# 🎨 Design System - Pet Finder

**Versão:** 1.0  
**Data:** 15/02/2026  
**Status:** Ativo e em uso

> Este documento é a **fonte única de verdade** para decisões visuais do projeto.  
> Consulte sempre antes de criar novos componentes ou alterar estilos.

---

## 📋 Índice Rápido

1. [Cores](#-cores)
2. [Espaçamentos](#-espaçamentos)
3. [Sombras](#-sombras)
4. [Tipografia](#-tipografia)
5. [Componentes](#-componentes)
6. [Animações](#-animações)
7. [Como Usar](#-como-usar-este-documento)

---

## 🎨 Cores

### Paleta Principal

#### **Laranja (Primary)**
```css
--color-primary: #F97316        /* Cor principal - CTAs, títulos, links */
--color-primary-dark: #EA580C   /* Hover states, ênfase */
--color-primary-light: #FED7AA  /* Backgrounds suaves */
--color-primary-bg: #FFF7ED     /* Fundos muito claros */
```

**Quando usar:**
- ✅ Botões primários (WhatsApp, CTAs principais)
- ✅ Links importantes
- ✅ Títulos de destaque (hero section)
- ✅ Ícones de ação

**Não usar para:**
- ❌ Textos longos (cansativo)
- ❌ Fundos escuros (baixo contraste)

---

#### **Roxo (VIP/Premium)**
```css
--color-vip: #A855F7           /* Badges VIP, elementos premium */
--color-vip-dark: #9333EA      /* Hover VIP, ênfase extra */
--color-vip-light: #E9D5FF     /* Background badges */
--color-vip-bg: #FAF5FF        /* Fundos muito claros */
```

**Quando usar:**
- ✅ Badge "PARCEIRO VIP" (ribbon)
- ✅ Bordas de cards VIP
- ✅ Glow effects em estabelecimentos premium
- ✅ Indicadores de destaque

**Regra importante:**
- 🎯 Roxo = **exclusividade e luxo**
- 🎯 Use com moderação (senão perde o impacto)

---

#### **Verde (Sucesso/WhatsApp)**
```css
--color-success: #22C55E        /* WhatsApp, status positivo */
--color-success-dark: #16A34A   /* Hover WhatsApp */
```

**Quando usar:**
- ✅ Botão "Falar no WhatsApp"
- ✅ Badge "Aberto Agora" (status dot)
- ✅ Indicadores de sucesso
- ✅ Mensagens de confirmação

---

#### **Cinzas (Neutros)**
```css
--color-gray-50: #F9FAFB       /* Fundos muito claros */
--color-gray-100: #F3F4F6      /* Fundos cards secundários */
--color-gray-200: #E5E7EB      /* Bordas suaves */
--color-gray-300: #D1D5DB      /* Bordas normais */
--color-gray-500: #6B7280      /* Texto secundário */
--color-gray-700: #374151      /* Texto principal */
--color-gray-900: #111827      /* Texto forte, títulos */
```

**Hierarquia de texto:**
- **900** → Títulos principais
- **700** → Subtítulos, labels
- **500** → Texto secundário, hints

---

## 📏 Espaçamentos

```css
--space-xs: 4px      /* Micro espaçamentos (ícone + texto) */
--space-sm: 8px      /* Gaps pequenos */
--space-md: 16px     /* Padrão entre elementos */
--space-lg: 24px     /* Seções, cards */
--space-xl: 32px     /* Grandes separações */
```

### Regras de Uso

**Dentro de componentes:**
- Padding de cards: `--space-md` (16px)
- Gap entre ícone e texto: `--space-xs` (4px)
- Margem entre elementos: `--space-sm` (8px)

**Entre seções:**
- Margem entre cards: `--space-lg` (24px)
- Margem de seções: `--space-xl` (32px)

**Mobile:**
- Reduzir 25-30% os espaçamentos em telas < 640px

---

## 🌑 Sombras

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1)           /* Elementos discretos */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)           /* Cards padrão */
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)         /* Modais, overlays */
--shadow-vip: 0 0 0 3px rgba(168, 85, 247, 0.1),   /* Cards VIP (glow) */
              0 10px 15px rgba(168, 85, 247, 0.2)
```

### Quando Usar Cada Uma

| Sombra | Uso | Exemplo |
|--------|-----|---------|
| `sm` | Botões, badges | Badge "NOVO", botões secundários |
| `md` | Cards, toolbars | Cards de estabelecimentos |
| `lg` | Modais, dropdowns | ChatModal, FilterSheet |
| `vip` | Cards premium | Cards com `destaque: true` |

---

## ✏️ Tipografia

### Tamanhos Base

```css
/* Headings */
H1: 28-36px (clamp, responsive)
H2: 22-24px
H3: 18-20px

/* Body */
Padrão: 14px
Pequeno: 12-13px
Grande: 16px
```

### Pesos (Weights)

```css
Normal: 400    /* Texto comum */
Medium: 500    /* Ênfase leve */
Semibold: 600  /* Labels, subtítulos */
Bold: 700      /* Títulos, CTAs */
Extrabold: 800 /* Hero, destaque máximo */
```

### Regras

- **Títulos:** sempre `font-weight: 700` ou mais
- **Botões:** sempre `font-weight: 600` ou mais
- **Texto corrido:** `font-weight: 400`
- **Labels/hints:** `font-weight: 500`

---

## 🧩 Componentes

### 1. Card VIP

**Visual:**
- Border: `2px solid var(--color-vip-light)`
- Shadow: `var(--shadow-vip)`
- Badge: Ribbon roxo no topo direito
- Hover: `translateY(-6px)` + shadow aumentado

**Código:**
```jsx
<div className="pet-card-wrapper is-vip">
  <div className="badge-vip-modern">
    <Sparkles size={12} />
    <span>PARCEIRO VIP</span>
  </div>
  {/* ... conteúdo do card */}
</div>
```

**CSS Principal:**
```css
.pet-card-wrapper.is-vip {
  border-color: var(--color-vip-light);
  box-shadow: var(--shadow-vip);
}

.badge-vip-modern {
  background: linear-gradient(135deg, var(--color-vip), var(--color-vip-dark));
  animation: vipPulse 2s ease-in-out infinite;
}
```

---

### 2. Badge Status (Aberto/Fechado)

**Visual:**
- Background: `rgba(34, 197, 94, 0.95)` para aberto
- Border-radius: `var(--radius-full)` (pill)
- Dot pulsante: 6px com animação pulse
- Backdrop blur: `blur(12px)`

**Código:**
```jsx
<span className="badge-status badge-open">
  <span className="status-dot"></span>
  ABERTO AGORA
</span>
```

---

### 3. Badge "NOVO"

**Visual:**
- Background: `linear-gradient(135deg, #10B981, #059669)`
- Position: `top: 12px; left: 12px`
- Font: `10px, uppercase, 700`

**Quando usar:**
- Estabelecimentos cadastrados há menos de 7 dias

**Código:**
```jsx
{isNovo && !isVip && (
  <span className="badge-novo">
    ✨ NOVO
  </span>
)}
```

---

### 4. Botão WhatsApp

**Visual:**
- Background: `linear-gradient(135deg, var(--color-success), var(--color-success-dark))`
- Shadow: `0 4px 12px rgba(34, 197, 94, 0.3)`
- Hover: `translateY(-2px)` + shadow maior

**Código:**
```jsx
<button className="btn-whatsapp-modern" onClick={handleClick}>
  <MessageCircle size={18} />
  <span>Falar no WhatsApp</span>
</button>
```

---

### 5. Botões de Filtro

**Visual:**
- Border: `2px solid var(--color-gray-200)`
- Active: gradient laranja + shadow
- Hover: background claro + borda laranja

**Código:**
```jsx
<button className={`filter-btn ${ativo ? 'active' : ''}`}>
  <Store size={14} />
  <span>Todos</span>
</button>
```

---

## 🎬 Animações

### Durações Padrão

```css
Rápida: 0.2s    /* Hover simples, cor */
Normal: 0.3s    /* Transições padrão */
Suave: 0.4s     /* Entrada de cards */
Lenta: 2s       /* Pulse, loops infinitos */
```

### Easing

```css
Padrão: cubic-bezier(0.4, 0, 0.2, 1)    /* ease-in-out suave */
Entrada: cubic-bezier(0.22, 1, 0.36, 1) /* ease-out elástico */
```

### Animações Existentes

**Pulse (VIP Badge, Status Dot):**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

**Hover Cards:**
```css
transform: translateY(-6px);
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

**Image Zoom:**
```css
.pet-card-image {
  transition: transform 0.5s ease;
}
.pet-card-wrapper:hover .pet-card-image {
  transform: scale(1.08);
}
```

---

## 📐 Border Radius

```css
--radius-sm: 8px       /* Badges pequenos */
--radius-md: 12px      /* Botões, inputs */
--radius-lg: 16px      /* Cards */
--radius-xl: 20px      /* Containers grandes */
--radius-full: 9999px  /* Pills, círculos */
```

### Regras

- **Botões pequenos:** `--radius-md` (12px)
- **Cards:** `--radius-lg` (16px)
- **Badges pill:** `--radius-full`
- **Hero sections:** `--radius-xl` (20px)

---

## 🎯 Como Usar Este Documento

### 1️⃣ **Ao Criar um Novo Componente**

```
ANTES de escrever código:
1. Consultar a seção de Cores → escolher cor apropriada
2. Consultar Espaçamentos → definir padding/margin
3. Consultar Componentes → ver se já existe similar
4. Usar tokens CSS (--color-primary) ao invés de hex (#F97316)
```

**Exemplo:**
```css
/* ❌ ERRADO */
.meu-botao {
  background: #FF5733;  /* cor inventada */
  padding: 15px;        /* valor aleatório */
  border-radius: 10px;  /* não segue padrão */
}

/* ✅ CERTO */
.meu-botao {
  background: var(--color-primary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}
```

---

### 2️⃣ **Ao Trabalhar com IA**

**Sempre inclua na sua solicitação:**

```
"Crie [componente] seguindo o Design System em docs/DESIGN_SYSTEM.md"
```

**Exemplo real:**
```
❌ Ruim:
"Cria um badge pra destacar promoções"

✅ Bom:
"Cria um badge 'PROMOÇÃO' seguindo o Design System (docs/DESIGN_SYSTEM.md).
Use --color-primary para a cor e --shadow-sm para sombra."
```

---

### 3️⃣ **Ao Atualizar Este Documento**

**Quando atualizar:**
- ✅ Adicionou uma nova cor → Documente aqui
- ✅ Criou um componente reutilizável → Adicione na seção Componentes
- ✅ Mudou algum token → Atualize imediatamente
- ✅ Definiu nova animação → Documente na seção Animações

**Como atualizar:**
```bash
# 1. Abrir o arquivo
code docs/DESIGN_SYSTEM.md

# 2. Adicionar na seção apropriada
# Exemplo: Nova cor
## Verde Secundário
--color-secondary: #10B981
Uso: Badges de eco-friendly, sustentabilidade

# 3. Commit
git add docs/DESIGN_SYSTEM.md
git commit -m "docs: adiciona cor secundária ao Design System"
```

---

### 4️⃣ **Checklist de Consistência**

Antes de fazer commit, pergunte:

- [ ] Usei tokens CSS ao invés de valores hardcoded?
- [ ] A cor escolhida está documentada?
- [ ] O espaçamento segue o padrão (xs/sm/md/lg/xl)?
- [ ] A animação usa duração/easing padrão?
- [ ] Se criei algo novo, documentei aqui?

---

## 🔄 Evolução do Design System

### Versão Atual: 1.0 (Básica)

**Próximos Passos (quando tiver tempo):**

- [ ] Adicionar screenshots dos componentes
- [ ] Criar seção de Acessibilidade (contraste, ARIA)
- [ ] Documentar Grid System
- [ ] Adicionar seção de Iconografia
- [ ] Criar Storybook para componentes
- [ ] Dark Mode (se necessário)

---

## 📞 Dúvidas Frequentes

### "Posso criar uma cor nova?"

**Não.** Use as cores existentes. Se realmente precisar:
1. Justifique o porquê
2. Documente aqui ANTES de usar
3. Nomeie seguindo o padrão `--color-[nome]-[variação]`

### "E se eu precisar de um tom intermediário?"

Use as variações light/dark existentes ou rgba():
```css
/* ✅ Bom */
background: rgba(249, 115, 22, 0.1); /* primary com 10% opacity */

/* ❌ Evite */
background: #FFA366; /* tom inventado */
```

### "Posso usar inline styles?"

**Evite.** Prefira classes CSS que usam tokens:
```jsx
/* ❌ Evite */
<div style={{ padding: "16px", color: "#F97316" }}>

/* ✅ Prefira */
<div className="p-md text-primary">
```

---

## 🎯 Regra de Ouro

> **"Se não está documentado aqui, não use."**  
> **"Se usou algo novo, documente aqui."**

---

**Última atualização:** 15/02/2026  
**Mantido por:** Você + IA Assistant  
**Arquivo:** `docs/DESIGN_SYSTEM.md`
