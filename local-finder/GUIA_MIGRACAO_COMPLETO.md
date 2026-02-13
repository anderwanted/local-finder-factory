# 📚 Guia Completo de Migração - Local Finder Factory

## 🎯 Objetivo
Reorganizar o projeto para seguir a estrutura de pastas ideal sugerida, melhorando:
- ✅ Separação de responsabilidades
- ✅ Escalabilidade
- ✅ Manutenibilidade
- ✅ Padrões da indústria

---

## 📂 Nova Estrutura de Pastas

```
src/
├── assets/
│   ├── global.css              # Merge de index.css + App.css
│   ├── theme.css               # Design tokens
│   └── tokens.css              # Aliases semânticos
│
├── components/
│   ├── CardItem/               # Antigo: PetCardMapStyle
│   │   ├── index.jsx
│   │   └── styles.css
│   ├── ChatModal/              # Antigo: ChatModal.jsx no root
│   │   └── index.jsx
│   ├── SortableList/           # NOVO - Para funcionalidade de drag & drop
│   │   └── index.jsx
│   ├── TextProcessor/          # NOVO - Para processamento de texto
│   │   └── index.jsx
│   └── ui/
│       ├── Button.jsx          # Mantém como está
│       └── button.css
│
├── context/
│   └── DataContext.jsx         # NOVO - Gerenciamento de estado global
│
├── pages/
│   ├── Viewer/                 # Antigo: PetList.jsx
│   │   ├── index.jsx
│   │   └── Viewer.css
│   ├── Manager/                # Antigo: Dashboard.jsx
│   │   └── index.jsx
│   └── Processor/              # Antigo: AdminGenerator.jsx
│       └── index.jsx
│
├── services/
│   ├── supabaseClient.js       # Movido de src/
│   ├── cardService.js          # NOVO - CRUD operations
│   └── filterService.js        # Antigo: filters.config.js
│
├── utils/
│   └── textLogic.js            # NOVO - Lógica pura de processamento
│
└── App.jsx                     # Mantém no root
```

---

## 🔄 Mudanças de Imports Necessárias

### 1. **App.jsx** (src/App.jsx)

**ANTES:**
```jsx
import './App.css'
import PetList from './PetList'
import Dashboard from './Dashboard'
import AdminGenerator from './AdminGenerator'
```

**DEPOIS:**
```jsx
import './assets/global.css'
import Viewer from './pages/Viewer'
import Manager from './pages/Manager'
import Processor from './pages/Processor'
```

---

### 2. **main.jsx** (src/main.jsx)

**ANTES:**
```jsx
import './index.css'
import App from './App.jsx'
```

**DEPOIS:**
```jsx
import './assets/global.css'
import App from './App.jsx'
```

---

### 3. **Viewer (PetList)** (src/pages/Viewer/index.jsx)

**ANTES:**
```jsx
import './styles/petlist.css'
import { supabase } from './supabaseClient'
import ChatModal from './ChatModal'
import PetCardMapStyle from './components/pet/PetCardMapStyle'
```

**DEPOIS:**
```jsx
import './Viewer.css'
import { supabase } from '../../services/supabaseClient'
import ChatModal from '../../components/ChatModal'
import CardItem from '../../components/CardItem'
```

---

### 4. **Manager (Dashboard)** (src/pages/Manager/index.jsx)

**ANTES:**
```jsx
import { supabase } from './supabaseClient'
import './App.css'
```

**DEPOIS:**
```jsx
import { supabase } from '../../services/supabaseClient'
import './Manager.css'
```

---

### 5. **Processor (AdminGenerator)** (src/pages/Processor/index.jsx)

**ANTES:**
```jsx
import { supabase } from './supabaseClient'
```

**DEPOIS:**
```jsx
import { supabase } from '../../services/supabaseClient'
```

---

### 6. **CardItem (PetCardMapStyle)** (src/components/CardItem/index.jsx)

**ANTES:**
```jsx
import '../../styles/card.css'
```

**DEPOIS:**
```jsx
import './styles.css'
```

---

### 7. **ChatModal** (src/components/ChatModal/index.jsx)

**ANTES:**
```jsx
import { supabase } from './supabaseClient'
```

**DEPOIS:**
```jsx
import { supabase } from '../../services/supabaseClient'
```

---

### 8. **Button** (src/components/ui/Button.jsx)

**ANTES:**
```jsx
import '../../styles/button.css'
```

**DEPOIS:**
```jsx
import './button.css'
```

---

## 🆕 Novos Arquivos a Criar

### 1. **DataContext.jsx** (src/context/DataContext.jsx)

```jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('your_table_name')
        .select('*')
      
      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    items,
    setItems,
    loading,
    fetchItems
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
```

---

### 2. **cardService.js** (src/services/cardService.js)

```javascript
import { supabase } from './supabaseClient'

// GET - Buscar todos os cards
export const getCards = async () => {
  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching cards:', error)
    return { data: null, error }
  }
}

// GET BY ID - Buscar card específico
export const getCardById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching card:', error)
    return { data: null, error }
  }
}

// INSERT - Criar novo card
export const createCard = async (cardData) => {
  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .insert([cardData])
      .select()
    
    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    console.error('Error creating card:', error)
    return { data: null, error }
  }
}

// UPDATE - Atualizar card existente
export const updateCard = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    console.error('Error updating card:', error)
    return { data: null, error }
  }
}

// DELETE - Deletar card
export const deleteCard = async (id) => {
  try {
    const { error } = await supabase
      .from('your_table_name')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error deleting card:', error)
    return { error }
  }
}
```

---

### 3. **textLogic.js** (src/utils/textLogic.js)

```javascript
// Lógica pura de processamento de texto
// Extraia a lógica do AdminGenerator para cá

export const processText = (inputText) => {
  // Sua lógica de processamento aqui
  return inputText.trim().toUpperCase() // Exemplo
}

export const validateInput = (text) => {
  if (!text || text.trim() === '') {
    return { valid: false, error: 'Texto não pode estar vazio' }
  }
  return { valid: true, error: null }
}

export const formatOutput = (data) => {
  // Formatação de saída
  return JSON.stringify(data, null, 2)
}
```

---

## 🔧 Arquivo atualizado: App.jsx

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import Viewer from './pages/Viewer'
import Manager from './pages/Manager'
import Processor from './pages/Processor'
import './assets/global.css'

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Viewer />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/processor" element={<Processor />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
```

---

## 📝 Checklist de Migração

### Fase 1: Preparação
- [ ] Fazer backup do projeto (`git commit` ou copiar pasta)
- [ ] Executar script de reorganização
- [ ] Verificar se todas as pastas foram criadas

### Fase 2: Atualização de Imports
- [ ] Atualizar App.jsx
- [ ] Atualizar main.jsx
- [ ] Atualizar Viewer (PetList)
- [ ] Atualizar Manager (Dashboard)
- [ ] Atualizar Processor (AdminGenerator)
- [ ] Atualizar CardItem (PetCardMapStyle)
- [ ] Atualizar ChatModal
- [ ] Atualizar Button

### Fase 3: Criação de Novos Arquivos
- [ ] Criar DataContext.jsx
- [ ] Criar cardService.js
- [ ] Criar textLogic.js

### Fase 4: Testes
- [ ] Rodar `npm run dev`
- [ ] Testar navegação entre páginas
- [ ] Testar funcionalidades existentes
- [ ] Verificar se não há erros no console

### Fase 5: Limpeza
- [ ] Remover arquivos duplicados (App.css, index.css antigos)
- [ ] Remover pastas vazias
- [ ] Atualizar .gitignore se necessário

---

## ⚡ Comandos Rápidos

```bash
# 1. Fazer backup
git add .
git commit -m "backup antes da reorganização"

# 2. Executar script de reorganização
chmod +x reorganize-project.sh
./reorganize-project.sh

# 3. Testar
npm run dev

# 4. Se tudo OK, commitar
git add .
git commit -m "reorganização da estrutura de pastas"
```

---

## 🚨 Problemas Comuns

### Erro: "Cannot find module"
**Solução:** Verifique o caminho relativo dos imports. Use `../` para subir níveis.

### Erro: "Unexpected token"
**Solução:** Verifique se todos os arquivos .jsx têm a extensão correta.

### Estilos não aplicados
**Solução:** Verifique se os arquivos CSS foram movidos e importados corretamente.

### Context não funciona
**Solução:** Certifique-se de que o DataProvider envolve a aplicação no App.jsx.

---

## 💡 Benefícios da Nova Estrutura

✅ **Separação clara de responsabilidades**
- Pages = Lógica de roteamento
- Components = UI reutilizável
- Services = Comunicação com backend
- Utils = Funções puras

✅ **Facilita escalabilidade**
- Fácil adicionar novas páginas
- Componentes isolados e testáveis
- Lógica de negócio centralizada

✅ **Manutenção simplificada**
- Fácil encontrar arquivos
- Imports mais claros
- Menos acoplamento

✅ **Alinhado com boas práticas**
- Padrão da indústria
- Preparado para crescimento
- Facilita onboarding de novos devs

---

## 📞 Próximos Passos Após Migração

1. **Implementar testes unitários** em `utils/` e `services/`
2. **Documentar componentes** com JSDoc ou Storybook
3. **Adicionar TypeScript** (opcional, mas recomendado)
4. **Implementar lazy loading** nas rotas
5. **Configurar ESLint/Prettier** para manter padrões

---

**Boa sorte com a migração! 🚀**
