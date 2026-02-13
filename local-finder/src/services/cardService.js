import { supabase } from './supabaseClient'

const TABLE_NAME = 'seu_nome_da_tabela' // ⚠️ AJUSTE AQUI

export const getCards = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const getCardById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}

export const createCard = async (cardData) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([cardData])
    .select()
  
  return { data: data?.[0], error }
}

export const updateCard = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select()
  
  return { data: data?.[0], error }
}

export const deleteCard = async (id) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
  
  return { error }
}