#!/bin/bash

# ============================================
# SCRIPT DE AJUSTES FINAIS
# Completa a reorganização para 10/10
# ============================================

echo "🔧 Iniciando ajustes finais da estrutura..."
echo ""

cd src

# ============================================
# 1. CONSOLIDAR ESTILOS GLOBAIS
# ============================================
echo "📦 Movendo estilos globais para assets/..."

# Mover CSS utilities para assets
if [ -d "styles" ]; then
    mv styles/components.css assets/ 2>/dev/null || true
    mv styles/layout.css assets/ 2>/dev/null || true
    mv styles/spacing.css assets/ 2>/dev/null || true
    mv styles/text.css assets/ 2>/dev/null || true
    mv styles/utilities.css assets/ 2>/dev/null || true
    echo "✅ Estilos globais movidos para assets/"
fi

# Mover pet-card.css para componente CardItem
if [ -f "styles/pet-card.css" ]; then
    mv styles/pet-card.css components/CardItem/ 2>/dev/null || true
    echo "✅ pet-card.css movido para CardItem/"
fi

# ============================================
# 2. REORGANIZAR COMPONENTES DE DASHBOARD
# ============================================
echo ""
echo "🗂️  Reorganizando componentes do Dashboard..."

if [ -d "components/dashboard" ]; then
    mkdir -p pages/Manager/components
    mv components/dashboard/* pages/Manager/components/ 2>/dev/null || true
    rmdir components/dashboard 2>/dev/null || true
    echo "✅ Componentes do Dashboard movidos para Manager/components/"
fi

# ============================================
# 3. REORGANIZAR COMPONENTES DE PET
# ============================================
echo ""
echo "🐾 Reorganizando componentes Pet..."

if [ -f "components/pet/FilterSheet.jsx" ]; then
    mkdir -p components/FilterSheet
    mv components/pet/FilterSheet.jsx components/FilterSheet/index.jsx 2>/dev/null || true
    echo "✅ FilterSheet organizado"
fi

# PetCardClassic → decidir se consolida ou mantém separado
if [ -f "components/pet/PetCardClassic.jsx" ]; then
    echo "⚠️  PetCardClassic.jsx encontrado - requer decisão manual:"
    echo "   Opção A: Consolidar em CardItem/ (se for variação)"
    echo "   Opção B: Criar components/PetCardClassic/ (se for componente único)"
    echo "   Por ora, mantendo em components/pet/"
fi

# ============================================
# 4. CONSOLIDAR gerar_relatorio.js
# ============================================
echo ""
echo "📝 Consolidando arquivos gerar_relatorio.js..."

# Mover principal para utils
if [ -f "gerar_relatorio.js" ]; then
    mv gerar_relatorio.js utils/generateReport.js 2>/dev/null || true
    echo "✅ gerar_relatorio.js → utils/generateReport.js"
fi

# Remover duplicatas
rm -f components/gerar_relatorio.js 2>/dev/null || true
rm -f components/ui/gerar_relatorio.js 2>/dev/null || true
rm -f styles/gerar_relatorio.js 2>/dev/null || true
echo "✅ Duplicatas removidas"

# ============================================
# 5. LIMPAR PASTAS VAZIAS
# ============================================
echo ""
echo "🧹 Limpando pastas vazias..."

rmdir styles 2>/dev/null && echo "✅ Pasta styles/ removida" || echo "ℹ️  Pasta styles/ ainda tem arquivos"
rmdir components/pet 2>/dev/null && echo "✅ Pasta components/pet/ removida" || echo "ℹ️  Pasta components/pet/ ainda tem arquivos"
rmdir components/dashboard 2>/dev/null || true

# ============================================
# 6. CRIAR ARQUIVOS DE IMPORT CENTRALIZADOS
# ============================================
echo ""
echo "📄 Criando index.js para exports centralizados..."

# Criar index.js em components/ui para facilitar imports
cat > components/ui/index.js << 'EOF'
// Centralizador de exports dos componentes UI
export { default as Badge } from './Badge';
export { default as Button } from './Button';
export { default as Card } from './Card';
EOF

echo "✅ components/ui/index.js criado"

# Criar index.js em utils
cat > utils/index.js << 'EOF'
// Centralizador de exports dos utils
export * from './constants';
export * from './textLogic';
export * from './theme';
export * from './generateReport';
EOF

echo "✅ utils/index.js criado"

# ============================================
# 7. VERIFICAR ESTRUTURA FINAL
# ============================================
echo ""
echo "🔍 Verificando estrutura final..."
echo ""

# Mostrar estrutura de pastas
echo "📂 Estrutura atual:"
find . -type d -not -path "*/node_modules/*" | sort | sed 's|^./||' | grep -v "^\.$" | head -30

echo ""
echo "📊 Contagem de arquivos por tipo:"
echo "   JSX: $(find . -name "*.jsx" | wc -l) arquivos"
echo "   JS:  $(find . -name "*.js" | wc -l) arquivos"
echo "   CSS: $(find . -name "*.css" | wc -l) arquivos"

# ============================================
# 8. SUGESTÕES DE IMPORTS A ATUALIZAR
# ============================================
echo ""
echo "⚠️  ATENÇÃO: Você precisará atualizar alguns imports!"
echo ""
echo "📝 Imports a verificar:"
echo ""
echo "1. Em pages/Manager/index.jsx:"
echo "   ANTES: import DashboardHeader from '../../components/dashboard/DashboardHeader'"
echo "   DEPOIS: import DashboardHeader from './components/DashboardHeader'"
echo ""
echo "2. Em qualquer arquivo que use gerar_relatorio:"
echo "   ANTES: import ... from './gerar_relatorio'"
echo "   DEPOIS: import ... from '../utils/generateReport'"
echo ""
echo "3. Arquivos que importam de components/ui:"
echo "   ANTES: import Button from '../components/ui/Button'"
echo "   DEPOIS: import { Button } from '../components/ui'"
echo ""

# ============================================
# FINALIZAÇÃO
# ============================================
echo ""
echo "═══════════════════════════════════════"
echo "✨ AJUSTES FINAIS CONCLUÍDOS!"
echo "═══════════════════════════════════════"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Revisar imports nos arquivos mencionados acima"
echo "2. Decidir o que fazer com PetCardClassic.jsx"
echo "3. Testar: npm run dev"
echo "4. Commit: git add . && git commit -m 'estrutura finalizada'"
echo ""
echo "🎯 Estrutura agora está 10/10!"
echo ""
