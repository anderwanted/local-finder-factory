// Funções puras de processamento de texto
// Extraia a lógica do AdminGenerator para cá

export const processText = (inputText) => {
  // Sua lógica aqui
  return inputText.trim()
}

export const validateInput = (text) => {
  if (!text || text.trim() === '') {
    return { valid: false, error: 'Campo obrigatório' }
  }
  return { valid: true, error: null }
}