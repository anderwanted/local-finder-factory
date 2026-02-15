#!/bin/bash

# ============================================
# GERADOR DE SNAPSHOT COMPLETO - V2
# Captura TUDO do projeto
# ============================================

OUTPUT_FILE="PROJECT_COMPLETE_$(date +%Y%m%d_%H%M%S).md"

echo "📸 Gerando snapshot COMPLETO do projeto..."
echo ""

# ============================================
# HEADER
# ============================================

cat > "$OUTPUT_FILE" << 'HEADER'
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

HEADER

# ============================================
# 1. ESTRUTURA DE PASTAS
# ============================================

echo "📂 Mapeando estrutura..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 1. ESTRUTURA DE PASTAS

### Árvore Completa

```
EOF

if command -v tree &> /dev/null; then
    tree -I 'node_modules|dist|build|.git' -L 5 >> "$OUTPUT_FILE"
else
    find . -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -type d | sort | sed 's|^\./||' | sed 's|^|  |' >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

### Lista de Arquivos (src/)

```
EOF

find src -type f 2>/dev/null | sort >> "$OUTPUT_FILE" || echo "src/ não encontrado" >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

EOF

# ============================================
# 2. DEPENDÊNCIAS
# ============================================

echo "📦 Copiando dependências..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 2. DEPENDÊNCIAS

### package.json

```json
EOF

if [ -f "package.json" ]; then
    cat package.json >> "$OUTPUT_FILE"
fi

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

EOF

# ============================================
# 3. CÓDIGO COMPLETO
# ============================================

echo "💻 Copiando TODO o código..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 3. CÓDIGO COMPLETO

EOF

# Função para adicionar arquivo ao snapshot
add_file_to_snapshot() {
    local filepath="$1"
    local filename=$(basename "$filepath")
    local extension="${filename##*.}"
    
    # Determinar linguagem para syntax highlighting
    case "$extension" in
        jsx|js) lang="javascript" ;;
        css) lang="css" ;;
        json) lang="json" ;;
        html) lang="html" ;;
        md) lang="markdown" ;;
        *) lang="text" ;;
    esac
    
    cat >> "$OUTPUT_FILE" << EOF

### 📄 $filepath

\`\`\`$lang
EOF
    
    cat "$filepath" >> "$OUTPUT_FILE" 2>/dev/null || echo "// Erro ao ler arquivo" >> "$OUTPUT_FILE"
    
    cat >> "$OUTPUT_FILE" << 'EOF'
```

---

EOF
}

# ============================================
# ARQUIVOS DE CONFIGURAÇÃO
# ============================================

echo "⚙️  Copiando configurações..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
### CONFIGURAÇÕES

EOF

for file in vite.config.js .gitignore index.html vercel.json; do
    if [ -f "$file" ]; then
        add_file_to_snapshot "$file"
    fi
done

# ============================================
# CÓDIGO FONTE (src/)
# ============================================

echo "📝 Copiando src/..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
### CÓDIGO FONTE (src/)

EOF

# Assets
if [ -d "src/assets" ]; then
    cat >> "$OUTPUT_FILE" << 'EOF'
#### 🎨 Assets

EOF
    find src/assets -type f \( -name "*.css" -o -name "*.js" \) | sort | while read file; do
        add_file_to_snapshot "$file"
    done
fi

# Components
if [ -d "src/components" ]; then
    cat >> "$OUTPUT_FILE" << 'EOF'
#### 🧩 Components

EOF
    find src/components -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.css" \) | sort | while read file; do
        add_file_to_snapshot "$file"
    done
fi

# Context
if [ -d "src/context" ]; then
    cat >> "$OUTPUT_FILE" << 'EOF'
#### 🔄 Context

EOF
    find src/context -type f \( -name "*.jsx" -o -name "*.js" \) | sort | while read file; do
        add_file_to_snapshot "$file"
    done
fi

# Hooks
if [ -d "src/hooks" ]; then
    cat >> "$OUTPUT_FILE" << 'EOF'
#### 🪝 Hooks

EOF
    find src/hooks -type f \( -name "*.jsx" -o -name "*.js" \) | sort | while read file; do
        add_file_to_snapshot "$file"
    done
fi

# Pages
if [ -d "src/pages" ]; then
    cat >> "$OUTPUT_FILE" << 'EOF'
#### 📄 Pages

EOF
    find src/pages -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.css" \) | sort | while read file; do
        add_file_to_snapshot "$file"
    done
fi

# Services
if [ -d "src/services" ]; then
    cat >> "$OUTPUT_FILE" << 'EOF'
#### 🔧 Services

EOF
    find src/services -type f \( -name "*.js" \) | sort | while read file; do
        add_file_to_snapshot "$file"
    done
fi

# Utils
if [ -d "src/utils" ]; then
    cat >> "$OUTPUT_FILE" << 'EOF'
#### 🛠️ Utils

EOF
    find src/utils -type f \( -name "*.js" \) | sort | while read file; do
        add_file_to_snapshot "$file"
    done
fi

# Root files (App.jsx, main.jsx)
cat >> "$OUTPUT_FILE" << 'EOF'
#### 🏠 Root Files

EOF

for file in src/App.jsx src/main.jsx; do
    if [ -f "$file" ]; then
        add_file_to_snapshot "$file"
    fi
done

# ============================================
# 4. ESTATÍSTICAS
# ============================================

echo "📊 Calculando estatísticas..." >&2

cat >> "$OUTPUT_FILE" << 'EOF'
## 4. ESTATÍSTICAS

### Contagem de Arquivos

EOF

TOTAL_JSX=$(find src -name "*.jsx" 2>/dev/null | wc -l)
TOTAL_JS=$(find src -name "*.js" 2>/dev/null | wc -l)
TOTAL_CSS=$(find src -name "*.css" 2>/dev/null | wc -l)

LINES_JSX=$(find src -name "*.jsx" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")
LINES_JS=$(find src -name "*.js" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")
LINES_CSS=$(find src -name "*.css" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")

cat >> "$OUTPUT_FILE" << EOF
| Tipo | Arquivos | Linhas de Código |
|------|----------|------------------|
| JSX  | $TOTAL_JSX | $LINES_JSX |
| JS   | $TOTAL_JS  | $LINES_JS |
| CSS  | $TOTAL_CSS | $LINES_CSS |
| **TOTAL** | **$(($TOTAL_JSX + $TOTAL_JS + $TOTAL_CSS))** | **$(($LINES_JSX + $LINES_JS + $LINES_CSS))** |

### Estrutura src/

\`\`\`
EOF

find src -type d 2>/dev/null | sort | sed 's|src/|  |' >> "$OUTPUT_FILE" || true

cat >> "$OUTPUT_FILE" << 'EOF'
```

### Arquivos por Pasta

```
EOF

find src -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.css" \) 2>/dev/null | sed 's|/[^/]*$||' | sort | uniq -c | sort -rn >> "$OUTPUT_FILE" || true

cat >> "$OUTPUT_FILE" << 'EOF'
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

EOF

# ============================================
# FINALIZAÇÃO
# ============================================

echo ""
echo "════════════════════════════════════════"
echo "✅ SNAPSHOT COMPLETO GERADO!"
echo "════════════════════════════════════════"
echo ""
echo "📄 Arquivo: $OUTPUT_FILE"
echo "📊 Tamanho: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo ""
echo "🎯 COMO USAR:"
echo "1. Abra o arquivo: cat $OUTPUT_FILE"
echo "2. Copie TUDO e cole aqui no chat"
echo "3. Eu vou analisar TODO o projeto!"
echo ""
echo "💡 Ou faça: cat $OUTPUT_FILE | pbcopy (Mac)"
echo "           cat $OUTPUT_FILE | xclip (Linux)"
echo ""
