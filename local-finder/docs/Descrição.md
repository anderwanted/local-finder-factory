
SYSTEM_CORE = Constituição

BUSINESS_RULES = Lei Orgânica

ARCHITECTURE = Código de Obras

UX_UI_RULES = Guia de Estilo

UPDATE_LOG = Diário Oficial

🧭 CONCEITO-CHAVE: EVENTO → ARQUIVO

Você não decide “qual MD editar”.
Você identifica o tipo de mudança feita — o arquivo é consequência.

🧩 MATRIZ DE DECISÃO (GUARDE ISSO)
O que mudou no projeto?	Arquivo permitido
Nada mudou, só estou continuando	❌ nenhum
Corrigi bug	UPDATE_LOG.md
Refatorei código	UPDATE_LOG.md
Criei nova tela	UPDATE_LOG.md
Nova tabela / rota	UPDATE_LOG.md + ARCHITECTURE.md
Mudou regra de negócio	UPDATE_LOG.md + BUSINESS_RULES.md
Mudou visual / UX	UPDATE_LOG.md + UX_UI_RULES.md
Mudou identidade do produto	❌ não permitido
Mudou papel da IA	❌ não permitido

👉 UPDATE_LOG.md é sempre obrigatório quando algo muda.

🧠 COMO A IA SABE O QUE FAZER

Cada MD começa com um BLOCO DE CONTROLE, assim:

# STATUS DE MANUTENÇÃO
- Tipo: ESTÁTICO / EVOLUTIVO / LOG
- Pode ser editado pelo gestor? SIM / NÃO
- Pode ser alterado pela IA? SOB EVENTO / NUNCA
- Forma de alteração: ADENDO / EXTENSÃO / LOG


A IA lê isso primeiro.
Ela não decide — ela obedece.

📁 REGRA POR ARQUIVO (DETALHADA)
1️⃣ SYSTEM_CORE.md

Tipo: ESTÁTICO
Quem pode editar: ninguém

- Este arquivo NÃO DEVE ser alterado.
- Se este arquivo mudar, considera-se um NOVO PRODUTO.
- A IA deve rejeitar pedidos que tentem modificá-lo.

Evento válido para mudança?

❌ Nenhum.

2️⃣ BUSINESS_RULES.md

Tipo: SEMI-ESTÁTICO

Quando editar?

✅ Somente se UMA REGRA DE NEGÓCIO mudar

Exemplos:

Novo critério de VIP

Novo modelo de monetização

Nova regra de curadoria

Como editar?

❌ Nunca reescrever
✅ Somente ADENDO DATADO

## ADENDO — 2026-01
Regra nova adicionada: X
Regras anteriores continuam válidas.


A IA entende:

“Isso é uma exceção, não uma substituição.”

3️⃣ ARCHITECTURE.md

Tipo: EVOLUTIVO CONTROLADO

Quando editar?

✅ Quando estrutura muda, não quando código muda

Exemplos válidos:

Nova tabela

Nova responsabilidade de componente

Nova rota base

Exemplos inválidos:

Ajuste de CSS

Refatoração interna

Forma correta:
## EXTENSÃO — v5.1
- Nova tabela: leads_qualificados
- Nova rota: /:slug/leads

4️⃣ UX_UI_RULES.md

Tipo: DIRETRIZ

Quando editar?

✅ Quando uma regra visual passa a valer para todo o sistema

Exemplos:

“Botões primários agora podem ter animação”

“Dark mode virou obrigatório”

Como editar?
## AJUSTE GLOBAL — 2026-02
Nova diretriz: X


Nunca mexer nos princípios iniciais.

5️⃣ UPDATE_LOG.md

Tipo: LOG VIVO
Este é o ÚNICO arquivo de edição frequente

Sempre que:

algo foi feito

algo foi decidido

algo foi corrigido

Estrutura fixa:
## 2026-01-10
### Mudança
- Ajustado ChatModal para garantir projeto_id

### Impacto
- Nenhum impacto em regras de negócio

### Arquivos afetados
- ChatModal.jsx


A IA usa isso como memória de curto prazo.

🧑‍💼 REGRA SIMPLES PARA VOCÊ (GESTOR)

Guarde essa frase:

Se eu precisei pensar “onde anotar isso”, é UPDATE_LOG.
Se virou regra, vira adendo.
Se virou estrutura, vira extensão.

Você nunca escolhe o arquivo por vontade, só por tipo de mudança.