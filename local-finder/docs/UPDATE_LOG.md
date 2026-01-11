A IA NÃO deve:
- Reescrever arquivos
- Alterar conteúdo fora do evento permitido
- Atualizar arquivos estáticos

A IA DEVE:
- Sugerir UPDATE_LOG primeiro
- Solicitar confirmação antes de adendos
- Preservar regras anteriores


Tipo do Documento: LOG
Evento válido: QUALQUER MUDANÇA
Forma: LOG CRONOLÓGICO





# UPDATE_LOG — Atualizações Incrementais

## COMO USAR
Sempre que houver mudança:
1. NÃO altere arquivos acima
2. Apenas adicione um novo bloco aqui
3. Cole este arquivo junto com os outros para a IA

## FORMATO OBRIGATÓRIO

### [DATA] — RESUMO
- O que mudou
- Arquivos afetados
- Impacto no negócio ou UX

### DETALHES TÉCNICOS
- Componentes alterados
- Colunas novas (se houver)
- Regras mantidas

---

### EXEMPLO
### 2026-01-10 — Brand Studio
- Adicionada personalização visual por projeto
- Nova tabela: projetos
- Nenhuma regra de funil alterada
