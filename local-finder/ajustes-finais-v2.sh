#!/bin/bash

# ============================================
# SCRIPT DE CORREÇÃO FINAL - V2
# Corrige TODOS os problemas identificados
# ============================================

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  CORREÇÃO FINAL - Local Finder Factory ║"
echo "╔════════════════════════════════════════╗"
echo ""

cd src 2>/dev/null || { echo "❌ Pasta src/ não encontrada!"; exit 1; }

# ============================================
# FASE 1: LIMPEZA DE DUPLICAÇÕES
# ============================================

echo "🧹 FASE 1: Removendo duplicações..."
echo ""

# Consolidar gerar_relatorio.js
if [ -f "gerar_relatorio.js" ]; then
    mkdir -p utils
    mv gerar_relatorio.js utils/generateReport.js
    echo "✅ gerar_relatorio.js → utils/generateReport.js"
else
    echo "⚠️  gerar_relatorio.js não encontrado no root"
fi

# Remover duplicatas
rm -f components/gerar_relatorio.js && echo "✅ Removido components/gerar_relatorio.js" || true
rm -f components/ui/gerar_relatorio.js && echo "✅ Removido components/ui/gerar_relatorio.js" || true
rm -f styles/gerar_relatorio.js && echo "✅ Removido styles/gerar_relatorio.js" || true

# Mover RELATORIO_TECNICO.txt para docs
mkdir -p ../docs
if [ -f "RELATORIO_TECNICO.txt" ]; then
    mv RELATORIO_TECNICO.txt ../docs/
    echo "✅ RELATORIO_TECNICO.txt → docs/"
fi

# Remover duplicatas de relatório
rm -f components/RELATORIO_TECNICO.txt && echo "✅ Removido components/RELATORIO_TECNICO.txt" || true
rm -f components/ui/RELATORIO_TECNICO.txt && echo "✅ Removido components/ui/RELATORIO_TECNICO.txt" || true
rm -f styles/RELATORIO_TECNICO.txt && echo "✅ Removido styles/RELATORIO_TECNICO.txt" || true

# Remover pastas vazias
if [ -d "components/SortableList" ]; then
    rmdir components/SortableList 2>/dev/null && echo "✅ Removida pasta vazia components/SortableList/" || echo "⚠️  components/SortableList/ não está vazia"
fi

if [ -d "components/TextProcessor" ]; then
    rmdir components/TextProcessor 2>/dev/null && echo "✅ Removida pasta vazia components/TextProcessor/" || echo "⚠️  components/TextProcessor/ não está vazia"
fi

echo ""

# ============================================
# FASE 2: CONSOLIDAR ESTILOS
# ============================================

echo "🎨 FASE 2: Consolidando estilos em assets/..."
echo ""

# Criar pasta assets se não existir
mkdir -p assets

# Mover estilos de styles/ para assets/
if [ -d "styles" ]; then
    [ -f "styles/components.css" ] && mv styles/components.css assets/ && echo "✅ components.css → assets/"
    [ -f "styles/layout.css" ] && mv styles/layout.css assets/ && echo "✅ layout.css → assets/"
    [ -f "styles/spacing.css" ] && mv styles/spacing.css assets/ && echo "✅ spacing.css → assets/"
    [ -f "styles/text.css" ] && mv styles/text.css assets/ && echo "✅ text.css → assets/"
    [ -f "styles/utilities.css" ] && mv styles/utilities.css assets/ && echo "✅ utilities.css → assets/"
    
    # Mover pet-card.css para CardItem
    if [ -f "styles/pet-card.css" ]; then
        mkdir -p components/CardItem
        mv styles/pet-card.css components/CardItem/
        echo "✅ pet-card.css → components/CardItem/"
    fi
    
    # Tentar remover pasta styles
    rmdir styles 2>/dev/null && echo "✅ Pasta styles/ removida" || echo "⚠️  Pasta styles/ ainda contém arquivos"
else
    echo "ℹ️  Pasta styles/ não encontrada"
fi

echo ""

# ============================================
# FASE 3: REORGANIZAR COMPONENTES
# ============================================

echo "🗂️  FASE 3: Reorganizando componentes..."
echo ""

# Mover componentes de dashboard para Manager
if [ -d "components/dashboard" ]; then
    mkdir -p pages/Manager/components
    
    if [ "$(ls -A components/dashboard)" ]; then
        mv components/dashboard/* pages/Manager/components/ 2>/dev/null
        echo "✅ Componentes dashboard/ → pages/Manager/components/"
    fi
    
    rmdir components/dashboard 2>/dev/null && echo "✅ Pasta components/dashboard/ removida" || true
else
    echo "ℹ️  Pasta components/dashboard/ não encontrada"
fi

# Reorganizar componentes pet
if [ -d "components/pet" ]; then
    # Mover FilterSheet
    if [ -f "components/pet/FilterSheet.jsx" ]; then
        mkdir -p components/FilterSheet
        mv components/pet/FilterSheet.jsx components/FilterSheet/index.jsx
        echo "✅ FilterSheet.jsx → components/FilterSheet/index.jsx"
    fi
    
    # Mover PetCardClassic
    if [ -f "components/pet/PetCardClassic.jsx" ]; then
        mkdir -p components/CardItem
        mv components/pet/PetCardClassic.jsx components/CardItem/CardClassic.jsx
        echo "✅ PetCardClassic.jsx → components/CardItem/CardClassic.jsx"
    fi
    
    # Remover pasta pet se vazia
    rmdir components/pet 2>/dev/null && echo "✅ Pasta components/pet/ removida" || echo "⚠️  components/pet/ ainda contém arquivos"
else
    echo "ℹ️  Pasta components/pet/ não encontrada"
fi

echo ""

# ============================================
# FASE 4: CRIAR BARREL EXPORTS
# ============================================

echo "📦 FASE 4: Criando barrel exports..."
echo ""

# Criar index.js em components/ui
if [ -d "components/ui" ]; then
    cat > components/ui/index.js << 'EOF'
// Barrel export - facilita imports
export { default as Badge } from './Badge';
export { default as Button } from './Button';
export { default as Card } from './Card';
EOF
    echo "✅ Criado components/ui/index.js"
fi

# Criar index.js em utils
if [ -d "utils" ]; then
    cat > utils/index.js << 'EOF'
// Barrel export - facilita imports
export * from './constants';
export * from './textLogic';
export * from './theme';
EOF
    echo "✅ Criado utils/index.js"
fi

echo ""

# ============================================
# FASE 5: VERIFICAÇÃO FINAL
# ============================================

echo "🔍 FASE 5: Verificando estrutura final..."
echo ""

# Contar arquivos
TOTAL_JSX=$(find . -name "*.jsx" 2>/dev/null | wc -l)
TOTAL_JS=$(find . -name "*.js" 2>/dev/null | wc -l)
TOTAL_CSS=$(find . -name "*.css" 2>/dev/null | wc -l)

echo "📊 Estatísticas:"
echo "   - Arquivos JSX: $TOTAL_JSX"
echo "   - Arquivos JS:  $TOTAL_JS"
echo "   - Arquivos CSS: $TOTAL_CSS"
echo ""

# Verificar problemas restantes
echo "🔎 Verificando problemas restantes..."

# Arquivos duplicados de gerar_relatorio
DUPLICADOS_RELATORIO=$(find . -name "gerar_relatorio.js" 2>/dev/null | wc -l)
if [ $DUPLICADOS_RELATORIO -gt 0 ]; then
    echo "⚠️  Ainda existem $DUPLICADOS_RELATORIO arquivos gerar_relatorio.js"
    find . -name "gerar_relatorio.js" 2>/dev/null
else
    echo "✅ Nenhum arquivo gerar_relatorio.js duplicado"
fi

# Arquivos RELATORIO_TECNICO duplicados
DUPLICADOS_TECNICO=$(find . -name "RELATORIO_TECNICO.txt" 2>/dev/null | wc -l)
if [ $DUPLICADOS_TECNICO -gt 0 ]; then
    echo "⚠️  Ainda existem $DUPLICADOS_TECNICO arquivos RELATORIO_TECNICO.txt em src/"
    find . -name "RELATORIO_TECNICO.txt" 2>/dev/null
else
    echo "✅ Nenhum arquivo RELATORIO_TECNICO.txt em src/"
fi

# Verificar se pasta styles ainda existe
if [ -d "styles" ]; then
    echo "⚠️  Pasta styles/ ainda existe"
    echo "   Conteúdo:"
    ls -la styles/
else
    echo "✅ Pasta styles/ removida"
fi

echo ""

# ============================================
# MOSTRAR ESTRUTURA FINAL
# ============================================

echo "📂 ESTRUTURA FINAL:"
echo ""
find . -maxdepth 3 -type d ! -path "*/node_modules/*" | sort | sed 's|^\./||' | sed 's|^|  |'

echo ""

# ============================================
# PRÓXIMOS PASSOS
# ============================================

echo ""
echo "╔════════════════════════════════════════╗"
echo "║          ✅ CONCLUÍDO!                  ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📝 PRÓXIMOS PASSOS MANUAIS:"
echo ""
echo "1️⃣  ATUALIZAR IMPORTS - Arquivos afetados:"
echo ""
echo "   📄 pages/Manager/index.jsx"
echo "      ANTES: import Header from '../../components/dashboard/DashboardHeader'"
echo "      DEPOIS: import Header from './components/DashboardHeader'"
echo ""
echo "   📄 Arquivos que usam gerar_relatorio:"
echo "      ANTES: import ... from './gerar_relatorio'"
echo "      DEPOIS: import ... from '../utils/generateReport'"
echo ""
echo "   📄 Arquivos que importam de styles/:"
echo "      ANTES: import '../styles/layout.css'"
echo "      DEPOIS: import '../assets/layout.css'"
echo ""
echo "2️⃣  TESTAR APLICAÇÃO:"
echo "      cd .."
echo "      npm run dev"
echo ""
echo "3️⃣  SE TUDO OK, COMMITAR:"
echo "      git add ."
echo "      git commit -m 'refactor: estrutura finalizada e otimizada'"
echo "      git push"
echo ""
echo "4️⃣  GERAR NOVO SNAPSHOT:"
echo "      ./gerar-snapshot.sh"
echo ""
echo "═══════════════════════════════════════════════════"
echo "🎯 Sua estrutura agora está 10/10! 🌟"
echo "═══════════════════════════════════════════════════"
echo ""
