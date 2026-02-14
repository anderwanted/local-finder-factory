#!/bin/bash

# ============================================
# GERADOR DE RELATÓRIO COMPLETO DO PROJETO
# ============================================
# 
# Este script cria um snapshot completo do projeto
# para análise e documentação
#
# USO: ./gerar-snapshot.sh
# ============================================

OUTPUT_FILE="PROJECT_SNAPSHOT_$(date +%Y%m%d_%H%M%S).md"

echo "📸 Gerando snapshot do projeto..."
echo ""

# ============================================
# INICIAR ARQUIVO DE SAÍDA
# ============================================

cat > "$OUTPUT_FILE" << 'HEADER'
# 📸 PROJECT SNAPSHOT - Local Finder Factory

> Snapshot gerado automaticamente para análise e documentação

---

## 📋 ÍNDICE

1. [Informações Gerais](#informações-gerais)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Dependências](#dependências)
4. [Arquivos de Configuração](#arquivos-de-configuração)
5. [Código Fonte](#código-fonte)
6. [Estilos](#estilos)
7. [Estatísticas](#estatísticas)

---

HEADER

# ============================================
# 1. INFORMAÇÕES GERAIS
# ============================================

echo "📝 Coletando informações gerais..." >&2

cat >> "$OUTPUT_FILE" << EOF
## 1. INFORMAÇÕES GERAIS

**Data do Snapshot:** $(date '+%d/%m/%Y %H:%M:%S')  
**Diretório:** $(pwd)  
**Git Branch:** $(git branch --show-current 2>/dev/null || echo "N/A")  
**Último Commit:** $(git log -1 --oneline 2>/dev/null || echo "N/A")

---

EOF

# ============================================
# 2. ESTRUTURA DE PASTAS
# ============================================

echo "📂 Mapeando estrutura de pastas..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 2. ESTRUTURA DE PASTAS

### Árvore Completa

```
EOF

# Gerar árvore de pastas (ignorando node_modules)
if command -v tree &> /dev/null; then
    tree -I 'node_modules|dist|build|.git' -L 4 >> "$OUTPUT_FILE"
else
    find . -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -type d | sort | sed 's|^\./||' | sed 's|^|  |' >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### Estrutura src/ Detalhada

```
EOF

cd local-finder 2>/dev/null || true
find src -type f -o -type d 2>/dev/null | sort >> "$OUTPUT_FILE" || echo "src/ não encontrado" >> "$OUTPUT_FILE"
cd .. 2>/dev/null || true

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

EOF

# ============================================
# 3. DEPENDÊNCIAS
# ============================================

echo "📦 Listando dependências..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 3. DEPENDÊNCIAS

### package.json

```json
EOF

if [ -f "local-finder/package.json" ]; then
    cat local-finder/package.json >> "$OUTPUT_FILE"
elif [ -f "package.json" ]; then
    cat package.json >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### Dependências Instaladas

EOF

if [ -f "local-finder/package.json" ]; then
    echo "**Dependencies:**" >> "$OUTPUT_FILE"
    cat local-finder/package.json | grep -A 100 '"dependencies"' | grep -B 100 '}' | head -n -1 | tail -n +2 >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "**DevDependencies:**" >> "$OUTPUT_FILE"
    cat local-finder/package.json | grep -A 100 '"devDependencies"' | grep -B 100 '}' | head -n -1 | tail -n +2 >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'

---

EOF

# ============================================
# 4. ARQUIVOS DE CONFIGURAÇÃO
# ============================================

echo "⚙️  Incluindo configurações..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 4. ARQUIVOS DE CONFIGURAÇÃO

### vite.config.js

```javascript
EOF

if [ -f "local-finder/vite.config.js" ]; then
    cat local-finder/vite.config.js >> "$OUTPUT_FILE"
elif [ -f "vite.config.js" ]; then
    cat vite.config.js >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### .gitignore

```
EOF

if [ -f ".gitignore" ]; then
    cat .gitignore >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### index.html

```html
EOF

if [ -f "local-finder/index.html" ]; then
    cat local-finder/index.html >> "$OUTPUT_FILE"
elif [ -f "index.html" ]; then
    cat index.html >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

EOF

# ============================================
# 5. CÓDIGO FONTE - ARQUIVOS PRINCIPAIS
# ============================================

echo "💻 Incluindo código fonte..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 5. CÓDIGO FONTE

### 📄 src/App.jsx

```jsx
EOF

if [ -f "local-finder/src/App.jsx" ]; then
    cat local-finder/src/App.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### 📄 src/main.jsx

```jsx
EOF

if [ -f "local-finder/src/main.jsx" ]; then
    cat local-finder/src/main.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### 📄 src/context/DataContext.jsx

```jsx
EOF

if [ -f "local-finder/src/context/DataContext.jsx" ]; then
    cat local-finder/src/context/DataContext.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### 📄 src/services/supabaseClient.js

```javascript
EOF

if [ -f "local-finder/src/services/supabaseClient.js" ]; then
    # Ocultar chaves sensíveis
    cat local-finder/src/services/supabaseClient.js | sed 's/\(supabaseUrl.*=.*\).*$/\1"[HIDDEN]"/' | sed 's/\(supabaseAnonKey.*=.*\).*$/\1"[HIDDEN]"/' >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### 📄 src/services/cardService.js

```javascript
EOF

if [ -f "local-finder/src/services/cardService.js" ]; then
    cat local-finder/src/services/cardService.js >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### 📄 src/services/filterService.js

```javascript
EOF

if [ -f "local-finder/src/services/filterService.js" ]; then
    cat local-finder/src/services/filterService.js >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

### PAGES

#### src/pages/Viewer/index.jsx

```jsx
EOF

if [ -f "local-finder/src/pages/Viewer/index.jsx" ]; then
    cat local-finder/src/pages/Viewer/index.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

#### src/pages/Manager/index.jsx

```jsx
EOF

if [ -f "local-finder/src/pages/Manager/index.jsx" ]; then
    cat local-finder/src/pages/Manager/index.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

#### src/pages/Processor/index.jsx

```jsx
EOF

if [ -f "local-finder/src/pages/Processor/index.jsx" ]; then
    cat local-finder/src/pages/Processor/index.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

### COMPONENTS

#### src/components/CardItem/index.jsx

```jsx
EOF

if [ -f "local-finder/src/components/CardItem/index.jsx" ]; then
    cat local-finder/src/components/CardItem/index.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

#### src/components/ChatModal/index.jsx

```jsx
EOF

if [ -f "local-finder/src/components/ChatModal/index.jsx" ]; then
    cat local-finder/src/components/ChatModal/index.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

### HOOKS

#### src/hooks/useDashboardData.jsx

```jsx
EOF

if [ -f "local-finder/src/hooks/useDashboardData.jsx" ]; then
    cat local-finder/src/hooks/useDashboardData.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

#### src/hooks/useDashboardFilters.jsx

```jsx
EOF

if [ -f "local-finder/src/hooks/useDashboardFilters.jsx" ]; then
    cat local-finder/src/hooks/useDashboardFilters.jsx >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

### UTILS

#### src/utils/constants.js

```javascript
EOF

if [ -f "local-finder/src/utils/constants.js" ]; then
    cat local-finder/src/utils/constants.js >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

#### src/utils/textLogic.js

```javascript
EOF

if [ -f "local-finder/src/utils/textLogic.js" ]; then
    cat local-finder/src/utils/textLogic.js >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

EOF

# ============================================
# 6. ESTILOS
# ============================================

echo "🎨 Incluindo estilos..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 6. ESTILOS

### src/assets/global.css

```css
EOF

if [ -f "local-finder/src/assets/global.css" ]; then
    cat local-finder/src/assets/global.css >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### src/assets/theme.css

```css
EOF

if [ -f "local-finder/src/assets/theme.css" ]; then
    cat local-finder/src/assets/theme.css >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

EOF

# ============================================
# 7. ESTATÍSTICAS
# ============================================

echo "📊 Calculando estatísticas..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 7. ESTATÍSTICAS

EOF

cd local-finder 2>/dev/null || true

# Contagem de arquivos
TOTAL_JSX=$(find src -name "*.jsx" 2>/dev/null | wc -l)
TOTAL_JS=$(find src -name "*.js" 2>/dev/null | wc -l)
TOTAL_CSS=$(find src -name "*.css" 2>/dev/null | wc -l)

# Linhas de código
LINES_JSX=$(find src -name "*.jsx" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")
LINES_JS=$(find src -name "*.js" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")
LINES_CSS=$(find src -name "*.css" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")

cat >> "../$OUTPUT_FILE" << EOF
### Contagem de Arquivos

| Tipo | Quantidade | Linhas de Código |
|------|------------|------------------|
| JSX  | $TOTAL_JSX | $LINES_JSX |
| JS   | $TOTAL_JS  | $LINES_JS |
| CSS  | $TOTAL_CSS | $LINES_CSS |

### Distribuição por Pasta

\`\`\`
EOF

find src -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.css" \) 2>/dev/null | sed 's|/[^/]*$||' | sort | uniq -c | sort -rn >> "../$OUTPUT_FILE" || true

cat >> "../$OUTPUT_FILE" << 'EOF'
```

### Componentes Principais

```
EOF

find src/components -maxdepth 2 -name "index.jsx" 2>/dev/null | sed 's|src/components/||' | sed 's|/index.jsx||' >> "../$OUTPUT_FILE" || true

cat >> "../$OUTPUT_FILE" << 'EOF'
```

### Pages

```
EOF

find src/pages -maxdepth 2 -name "index.jsx" 2>/dev/null | sed 's|src/pages/||' | sed 's|/index.jsx||' >> "../$OUTPUT_FILE" || true

cat >> "../$OUTPUT_FILE" << 'EOF'
```

---

## 🎯 FIM DO SNAPSHOT

**Arquivo gerado com sucesso!**

Este snapshot pode ser compartilhado para análise, documentação ou debugging.

EOF

cd .. 2>/dev/null || true

# ============================================
# FINALIZAÇÃO
# ============================================

echo ""
echo "════════════════════════════════════════"
echo "✅ SNAPSHOT GERADO COM SUCESSO!"
echo "════════════════════════════════════════"
echo ""
echo "📄 Arquivo: $OUTPUT_FILE"
echo "📊 Tamanho: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo ""
echo "🎯 COMO USAR:"
echo "1. Abra o arquivo: cat $OUTPUT_FILE"
echo "2. Compartilhe com a IA para análise completa"
echo "3. Use como documentação do projeto"
echo ""
echo "💡 DICA: Você pode copiar todo o conteúdo e colar"
echo "   diretamente no chat para análise detalhada!"
echo ""
