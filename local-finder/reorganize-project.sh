#!/bin/bash

# Script de Reorganização do Projeto Local Finder Factory
# Execute dentro da pasta local-finder/

echo "🚀 Iniciando reorganização do projeto..."

# Criar nova estrutura de pastas
echo "📁 Criando nova estrutura de pastas..."
mkdir -p src/assets
mkdir -p src/components/CardItem
mkdir -p src/components/ChatModal
mkdir -p src/components/SortableList
mkdir -p src/components/TextProcessor
mkdir -p src/components/ui
mkdir -p src/context
mkdir -p src/pages/Viewer
mkdir -p src/pages/Manager
mkdir -p src/pages/Processor
mkdir -p src/services
mkdir -p src/utils

# BACKUP - Criar backup da estrutura antiga
echo "💾 Criando backup..."
mkdir -p ../backup-$(date +%Y%m%d-%H%M%S)
cp -r src/* ../backup-$(date +%Y%m%d-%H%M%S)/

# ASSETS - Mover e consolidar estilos globais
echo "🎨 Reorganizando assets..."
cat src/index.css src/App.css > src/assets/global.css
mv src/styles/theme.css src/assets/theme.css 2>/dev/null || true
mv src/styles/tokens.css src/assets/tokens.css 2>/dev/null || true

# Mover estilos de componentes para suas pastas
mv src/styles/button.css src/components/ui/button.css 2>/dev/null || true
mv src/styles/card.css src/components/CardItem/styles.css 2>/dev/null || true

# COMPONENTS - Reorganizar componentes
echo "🧩 Reorganizando componentes..."

# PetCard vira CardItem
if [ -f "src/components/pet/PetCardMapStyle.jsx" ]; then
    mv src/components/pet/PetCardMapStyle.jsx src/components/CardItem/index.jsx
fi

# ChatModal para sua própria pasta
if [ -f "src/ChatModal.jsx" ]; then
    mv src/ChatModal.jsx src/components/ChatModal/index.jsx
fi

# Manter Button onde está (já está correto)
# src/components/ui/Button.jsx permanece

# PAGES - Reorganizar páginas
echo "📄 Reorganizando páginas..."

if [ -f "src/PetList.jsx" ]; then
    mv src/PetList.jsx src/pages/Viewer/index.jsx
    # Mover CSS relacionado se existir
    [ -f "src/styles/petlist.css" ] && mv src/styles/petlist.css src/pages/Viewer/Viewer.css
fi

if [ -f "src/Dashboard.jsx" ]; then
    mv src/Dashboard.jsx src/pages/Manager/index.jsx
fi

if [ -f "src/AdminGenerator.jsx" ]; then
    mv src/AdminGenerator.jsx src/pages/Processor/index.jsx
fi

# SERVICES - Reorganizar serviços
echo "🔧 Reorganizando services..."

if [ -f "src/supabaseClient.js" ]; then
    mv src/supabaseClient.js src/services/supabaseClient.js
fi

if [ -f "src/filters/filters.config.js" ]; then
    mv src/filters/filters.config.js src/services/filterService.js
fi

# LIMPEZA - Remover pastas vazias antigas
echo "🧹 Limpando pastas antigas..."
rmdir src/components/pet 2>/dev/null || true
rmdir src/filters 2>/dev/null || true
rmdir src/styles 2>/dev/null || true

# Remover arquivos antigos de CSS já consolidados
rm -f src/App.css src/index.css 2>/dev/null || true

echo ""
echo "✅ Reorganização concluída!"
echo ""
echo "📝 PRÓXIMOS PASSOS:"
echo "1. Atualize os imports nos arquivos (execute o script de atualização)"
echo "2. Teste o projeto: npm run dev"
echo "3. Se tudo estiver ok, delete o backup: rm -rf ../backup-*"
echo ""
echo "⚠️  IMPORTANTE: Revise os imports nos arquivos movidos!"
