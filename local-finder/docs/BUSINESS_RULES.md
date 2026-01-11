A IA NÃO deve:
- Reescrever arquivos
- Alterar conteúdo fora do evento permitido
- Atualizar arquivos estáticos

A IA DEVE:
- Sugerir UPDATE_LOG primeiro
- Solicitar confirmação antes de adendos
- Preservar regras anteriores

Tipo do Documento: SEMI-ESTÁTICO
Evento válido: Mudança explícita de regra de negócio
Forma: ADENDO DATADO




# BUSINESS_RULES — Regras de Negócio (ESTÁTICO)

## MODELO DE NEGÓCIO
- Gratuito: listagem básica
- Premium (VIP): destaque visual + embed social

## REGRAS COMERCIAIS
1. Destaque é booleano (`destaque = true`)
2. VIP aparece primeiro na lista
3. VIP pode exibir Instagram Embed
4. Não-VIP nunca pode:
   - Quebrar ordem
   - Ter destaque visual

## FUNIL DE LEADS
1. Usuário navega
2. Clica em “Solicitar”
3. Interage com ChatModal
4. Preenche nome + WhatsApp
5. Lead é salvo
6. Só então WhatsApp é liberado

## GOVERNANÇA
- Dono do projeto controla tudo
- Usuário final nunca edita dados
- IA nunca publica direto

Estas regras NÃO mudam sem decisão estratégica.
