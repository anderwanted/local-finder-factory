import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('seu_nome_da_tabela') // ⚠️ AJUSTE AQUI
        .select('*')
      
      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <DataContext.Provider value={{ items, setItems, loading, fetchItems }}>
      {children}
    </DataContext.Provider>
  )
}