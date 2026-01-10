
# 🏭 Manual da Franquia (Local Finder Engine)
**Objetivo:** Guia para replicar o modelo de negócios em novos nichos.

## 1. O Conceito "Fábrica"
Este software não é apenas um site, é um motor capaz de gerar múltiplos portais de curadoria.
* **Tenant:** O nicho (ex: Pets, Barbearia).
* **Identidade:** Definida no banco de dados (Cores, Títulos).
* **Regra Única:** O código é o mesmo, o que muda são os dados e as configurações.

## 2. Padrões de Taxonomia (Regra dos 4 Botões)
Para manter o App simples e funcional (estilo iFood), todo nicho deve seguir a regra de simplificação de categorias.
A IA deve ser treinada para converter a "bagunça" do mercado em 4 tags padrão.

### Exemplo: Nicho PETS (`/pets`)
* **Botão 1 (Estética):** Tag `banho` (Engloba: banho, tosa, corte de unhas).
* **Botão 2 (Saúde):** Tag `vet` (Engloba: clínica, hospital, vacina, cirurgia).
* **Botão 3 (Varejo):** Tag `loja` (Engloba: ração, brinquedos, petshop).
* **Botão 4 (Hospedagem):** Tag `hotel` (Engloba: creche, day care, hotelzinho).

### Exemplo: Nicho BARBEARIA (`/barber`) - *Para Futuro*
* **Botão 1:** Tag `corte` (Cabelo, máquina).
* **Botão 2:** Tag `barba` (Barba, toalha quente).
* **Botão 3:** Tag `quimica` (Progressiva, luzes).
* **Botão 4:** Tag `dia_noivo`.

## 3. Hierarquia de Monetização
O sistema reconhece automaticamente 3 níveis de locais:
1.  **Oculto/Rascunho:** Capturado mas não validado. (Não aparece no App).
2.  **Publicado (Standard):** Validado. Aparece na lista e na busca.
3.  **VIP (Premium):**
    * **Destaque:** `TRUE` no banco.
    * **Visual:** Borda colorida, Selo de Recomendado.
    * **Mídia:** Exibe vídeo do Instagram (Reels) direto no card.
    * **Prova Social:** Exibe Nota e Avaliações.

## 4. O Processo de Expansão (Passo a Passo)
Para lançar um novo nicho, siga este roteiro:
1.  **Banco de Dados:** Criar nova linha na tabela `projetos` (ex: slug `mecanicos`, cor `#EF4444`).
2.  **Configuração IA:** Ajustar o `AdminGenerator` com as regras de tradução de tags daquele nicho.
3.  **População:**
    * Busca Manual no Google Maps (Curadoria Visual).
    * Limpeza via IA.
    * Ajuste Fino no Dashboard.
4.  **Validação Visual:** Verificar se os ícones fazem sentido (futuramente parametrizar ícones via config).