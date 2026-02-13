#!/usr/bin/env python3
"""
Script para atualizar automaticamente os imports após reorganização
Execute: python3 update-imports.py
"""

import os
import re
from pathlib import Path

# Mapeamento de mudanças de imports
IMPORT_REPLACEMENTS = {
    # Em App.jsx
    "src/App.jsx": [
        (r"import ['\"]\.\/App\.css['\"]", "import './assets/global.css'"),
        (r"import PetList from ['\"]\.\/PetList['\"]", "import Viewer from './pages/Viewer'"),
        (r"import Dashboard from ['\"]\.\/Dashboard['\"]", "import Manager from './pages/Manager'"),
        (r"import AdminGenerator from ['\"]\.\/AdminGenerator['\"]", "import Processor from './pages/Processor'"),
    ],
    
    # Em main.jsx
    "src/main.jsx": [
        (r"import ['\"]\.\/index\.css['\"]", "import './assets/global.css'"),
    ],
    
    # Em Viewer (antigo PetList)
    "src/pages/Viewer/index.jsx": [
        (r"import ['\"]\.\/styles\/petlist\.css['\"]", "import './Viewer.css'"),
        (r"import ['\"]\.\.\/styles\/petlist\.css['\"]", "import './Viewer.css'"),
        (r"from ['\"]\.\/supabaseClient['\"]", "from '../../services/supabaseClient'"),
        (r"from ['\"]\.\/ChatModal['\"]", "from '../../components/ChatModal'"),
        (r"from ['\"]\.\/components\/pet\/PetCardMapStyle['\"]", "from '../../components/CardItem'"),
    ],
    
    # Em Manager (antigo Dashboard)
    "src/pages/Manager/index.jsx": [
        (r"from ['\"]\.\/supabaseClient['\"]", "from '../../services/supabaseClient'"),
        (r"import ['\"]\.\/App\.css['\"]", "import './Manager.css'"),
    ],
    
    # Em Processor (antigo AdminGenerator)
    "src/pages/Processor/index.jsx": [
        (r"from ['\"]\.\/supabaseClient['\"]", "from '../../services/supabaseClient'"),
    ],
    
    # Em CardItem (antigo PetCardMapStyle)
    "src/components/CardItem/index.jsx": [
        (r"import ['\"]\.\.\/\.\.\/styles\/card\.css['\"]", "import './styles.css'"),
    ],
    
    # Em ChatModal
    "src/components/ChatModal/index.jsx": [
        (r"from ['\"]\.\/supabaseClient['\"]", "from '../../services/supabaseClient'"),
    ],
    
    # Em Button
    "src/components/ui/Button.jsx": [
        (r"import ['\"]\.\.\/\.\.\/styles\/button\.css['\"]", "import './button.css'"),
    ],
}


def update_imports_in_file(filepath, replacements):
    """Atualiza imports em um arquivo específico"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Atualizado: {filepath}")
            return True
        else:
            print(f"⏭️  Sem mudanças: {filepath}")
            return False
            
    except FileNotFoundError:
        print(f"⚠️  Arquivo não encontrado: {filepath}")
        return False
    except Exception as e:
        print(f"❌ Erro em {filepath}: {e}")
        return False


def main():
    print("🔄 Iniciando atualização de imports...\n")
    
    # Mudar para o diretório local-finder se existir
    if os.path.exists('local-finder'):
        os.chdir('local-finder')
        print("📁 Mudando para diretório local-finder/\n")
    
    updated_count = 0
    
    for filepath, replacements in IMPORT_REPLACEMENTS.items():
        if update_imports_in_file(filepath, replacements):
            updated_count += 1
    
    print(f"\n{'='*60}")
    print(f"✨ Atualização concluída!")
    print(f"📊 Arquivos atualizados: {updated_count}/{len(IMPORT_REPLACEMENTS)}")
    print(f"{'='*60}")
    
    print("\n📝 PRÓXIMOS PASSOS:")
    print("1. Revise os arquivos modificados")
    print("2. Execute: npm run dev")
    print("3. Teste todas as funcionalidades")
    print("4. Commit as mudanças: git add . && git commit -m 'update imports'")


if __name__ == "__main__":
    main()
