# 📖 GUIA PRÁTICO: Como Usar o Design System

**Para:** Você (desenvolvedor) e IA  
**Objetivo:** Explicar de forma simples como usar e manter o DESIGN_SYSTEM.md

---

## 🎯 CENÁRIOS PRÁTICOS

### **Cenário 1: Você Quer Criar um Novo Componente**

**Situação:**
Você precisa criar um badge "EM PROMOÇÃO" para destacar ofertas.

**❌ ANTES (Sem Design System):**
```jsx
// Você inventa tudo do zero
<span style={{
  background: "#FF6B35",  // cor aleatória
  padding: "8px 12px",    // valor inventado
  borderRadius: "8px",    // não segue padrão
  fontSize: "11px"
}}>
  EM PROMOÇÃO
</span>
```

**✅ AGORA (Com Design System):**

```bash
# 1. Abre o DESIGN_SYSTEM.md
code docs/DESIGN_SYSTEM.md

# 2. Consulta seção "Cores"
# Descobre que existe: --color-primary (#F97316)

# 3. Consulta seção "Componentes > Badge"
# Vê exemplos similares (Badge NOVO, Badge VIP)

# 4. Cria seguindo o padrão:
```

```jsx
<span className="badge-promocao">
  🔥 EM PROMOÇÃO
</span>
```

```css
/* CSS seguindo os tokens */
.badge-promocao {
  background: linear-gradient(135deg, 
    var(--color-primary), 
    var(--color-primary-dark)
  );
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 700;
  color: white;
  box-shadow: var(--shadow-sm);
}
```

**Resultado:**
- ✅ Segue o padrão visual
- ✅ Usa tokens CSS (fácil de mudar depois)
- ✅ Consistente com outros badges

---

### **Cenário 2: Trabalhando com IA**

**Situação:**
Você quer que a IA crie um botão secundário.

**❌ PEDIDO RUIM:**
```
"Cria um botão cinza com borda"
```

**Resultado:** IA vai inventar cores e tamanhos aleatórios.

**✅ PEDIDO BOM:**
```
"Cria um botão secundário seguindo o Design System (docs/DESIGN_SYSTEM.md).
Use --color-gray-200 para borda, --space-md para padding, 
e --radius-md para border-radius."
```

**Resultado:** IA vai consultar o arquivo e criar consistente!

---

**✅ PEDIDO AINDA MELHOR:**
```
"Cria um botão secundário idêntico ao .filter-btn mas sem ícone.
Consulte docs/DESIGN_SYSTEM.md seção 'Componentes > Botões de Filtro'."
```

**Resultado:** IA vai copiar o padrão exato!

---

### **Cenário 3: Você Quer Mudar Algo Existente**

**Situação:**
O badge VIP está muito chamativo, você quer suavizar.

**❌ ERRADO (mudar direto no CSS):**
```css
/* pet-card.css */
.badge-vip-modern {
  background: #E9D5FF; /* mudou direto, sem documentar */
}
```

**Problema:** Inconsistência! Outros lugares ainda usam a cor antiga.

**✅ CERTO (atualizar o token):**

```css
/* 1. Mudar no design-tokens.css */
:root {
  --color-vip-light: #F3E8FF; /* suavizado */
}

/* 2. Atualizar DESIGN_SYSTEM.md */
```

```markdown
#### **Roxo (VIP/Premium)**
--color-vip-light: #F3E8FF  /* ATUALIZADO: mais suave */

**Changelog:**
- 16/02/2026: Suavizado vip-light de #E9D5FF para #F3E8FF
```

**Resultado:** 
- ✅ Muda em TODO o projeto automaticamente
- ✅ Fica documentado o porquê
- ✅ Histórico de mudanças

---

### **Cenário 4: Você Criou Algo Novo**

**Situação:**
Você criou um componente "Card de Loading" com skeleton.

**✅ DOCUMENTAR IMEDIATAMENTE:**

```bash
# 1. Abrir DESIGN_SYSTEM.md
code docs/DESIGN_SYSTEM.md

# 2. Adicionar na seção "Componentes"
```

```markdown
### 6. Card Skeleton (Loading)

**Quando usar:**
- Durante carregamento de dados
- Mantém layout estável
- Melhora UX

**Visual:**
- Background: linear-gradient animado
- Cores: --color-gray-200 e --color-gray-100
- Animação: shimmer 1.5s infinite

**Código:**
```jsx
<div className="skeleton-card">
  <div className="skeleton-image" />
  <div className="skeleton-content">
    <div className="skeleton-title" />
    <div className="skeleton-text" />
  </div>
</div>
```

**CSS:**
```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-image {
  background: linear-gradient(90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  animation: shimmer 1.5s ease-in-out infinite;
}
```
```

**Resultado:**
- ✅ Outro dev sabe que existe
- ✅ IA pode reusar esse componente
- ✅ Você não esquece como fez

---

## 🔄 FLUXO DE TRABALHO DIÁRIO

### **1. ANTES de Codificar**
```
1. Abre DESIGN_SYSTEM.md
2. Busca componente similar
3. Copia tokens CSS
4. Codifica
```

### **2. DURANTE o Desenvolvimento**
```
- Usa tokens ao invés de valores hardcoded
- Consulta seções conforme necessário
- Anota mudanças que precisam ser documentadas
```

### **3. DEPOIS de Codificar**
```
1. Se criou algo novo → Documenta
2. Se mudou token → Atualiza documentação
3. Commit: "feat: adiciona badge promoção (seguindo Design System)"
```

---

## 📝 COMO ATUALIZAR O DESIGN SYSTEM

### **Exemplo Real: Adicionar Nova Cor**

```bash
# Situação: Você precisa de uma cor azul para "Verificado"

# 1. Adicionar token no design-tokens.css
```

```css
/* src/assets/design-tokens.css */
:root {
  /* ... cores existentes ... */
  
  /* Azul (Verificado) - NOVO */
  --color-verified: #3B82F6;
  --color-verified-dark: #2563EB;
  --color-verified-light: #DBEAFE;
}
```

```bash
# 2. Documentar no DESIGN_SYSTEM.md
```

```markdown
#### **Azul (Verificado)** 🆕
\`\`\`css
--color-verified: #3B82F6        /* Badges de verificação */
--color-verified-dark: #2563EB   /* Hover */
--color-verified-light: #DBEAFE  /* Background suave */
\`\`\`

**Quando usar:**
- ✅ Badge "Verificado" ao lado do nome
- ✅ Ícones de confirmação
- ✅ Checkmarks

**Não confundir com:**
- Primary (laranja) = Ação principal
- Success (verde) = WhatsApp, status positivo
- Verified (azul) = Validação, confiança
```

```bash
# 3. Commit
git add src/assets/design-tokens.css docs/DESIGN_SYSTEM.md
git commit -m "feat: adiciona cor verified ao Design System"
```

---

## 🤖 PROMPT IDEAL PARA IA

### **Template de Prompt:**

```
Crie [COMPONENTE] seguindo rigorosamente o Design System 
em docs/DESIGN_SYSTEM.md.

Requisitos:
- Use apenas cores documentadas (seção Cores)
- Use tokens CSS, não valores hardcoded
- Siga padrão de [COMPONENTE_SIMILAR] existente
- Padding: var(--space-[tamanho])
- Border-radius: var(--radius-[tamanho])
- Shadow: var(--shadow-[tipo])
```

### **Exemplo Real:**

```
Crie um badge "FRETE GRÁTIS" seguindo o Design System em docs/DESIGN_SYSTEM.md.

Requisitos:
- Cor: --color-success (verde, seção Cores > Verde)
- Estilo: similar ao badge-novo (seção Componentes > Badge NOVO)
- Position: top-left (12px, 12px)
- Font: 10px, uppercase, weight 700
- Border-radius: var(--radius-full)
- Shadow: var(--shadow-sm)
```

**Resultado:** Badge perfeito e consistente! ✅

---

## 🔍 CHECKLIST ANTES DE COMMIT

```bash
[ ] Usei tokens CSS? (--color-primary, não #F97316)
[ ] Consultei DESIGN_SYSTEM.md antes de criar?
[ ] Se criei algo novo, documentei?
[ ] Se mudei token, atualizei documentação?
[ ] Segui o padrão de componentes similares?
[ ] Testei em mobile?
```

---

## 💡 DICAS PRÁTICAS

### **1. Atalho no VSCode**

Crie um snippet:

```json
// .vscode/snippets.code-snippets
{
  "Consultar Design System": {
    "prefix": "ds",
    "body": [
      "/* Consultar: docs/DESIGN_SYSTEM.md */",
      "/* Cor: var(--color-$1) */",
      "/* Espaço: var(--space-$2) */",
      "/* Shadow: var(--shadow-$3) */"
    ]
  }
}
```

Uso: Digita `ds` + Tab → comentário aparece!

---

### **2. Busca Rápida**

```bash
# No terminal, buscar no Design System:
grep -i "whatsapp" docs/DESIGN_SYSTEM.md
grep -i "shadow" docs/DESIGN_SYSTEM.md
```

---

### **3. Link Rápido no README**

Adicione no README.md:

```markdown
## 🎨 Design System

Antes de criar componentes, consulte:
👉 [Design System](docs/DESIGN_SYSTEM.md)
```

---

## 🎯 RESUMO FINAL

### **Para VOCÊ:**
1. **Antes de codificar:** Consulta DESIGN_SYSTEM.md
2. **Durante:** Usa tokens CSS
3. **Depois:** Documenta novidades

### **Para IA:**
1. **Sempre menciona:** "seguindo docs/DESIGN_SYSTEM.md"
2. **Seja específico:** Cita seções e tokens exatos
3. **Peça consistência:** "igual ao componente X"

### **Para o PROJETO:**
1. **Mantém consistência** visual
2. **Facilita manutenção** (muda token, muda tudo)
3. **Acelera desenvolvimento** (não pensa em cores/tamanhos)

---

## 📞 FAQ

**P: E se eu precisar urgente e não tiver tempo de consultar?**

R: Consultar demora 30 segundos e evita 30 minutos de refatoração depois.

**P: E se a IA não seguir o Design System?**

R: Seja mais específico no prompt. Cite seção e tokens exatos.

**P: Preciso atualizar toda vez que mudo algo?**

R: Sim, mas demora 2 minutos. É o "preço" da consistência.

---

**Pronto! Agora você sabe exatamente como usar! 🚀**
