# 🐾 Manual de Operação: Franquia Pet Finder
**Versão:** 2026.1 - SaaS Engine v5.0
**Objetivo:** Guia prático para gestão de rede, cadastro de parceiros e padronização visual.

---

## 1. Gestão de Parceiros (Dashboard)
O Dashboard é o cérebro da sua operação. Através dele, você controla quais lojas aparecem na vitrine e o nível de destaque de cada uma.

### Fluxo de Cadastro de Novos Locais:
1.  **Captura de Dados:** Utilize o Google Maps para localizar o parceiro.
2.  **Extração de Informações:** Utilize o prompt de IA para converter o texto do Google Maps em código SQL compatível.
3.  **Inclusão no Banco:** Insira os dados no Supabase vinculado ao `projeto_id` da sua franquia.
4.  **Ativação:** No Dashboard, localize a nova loja e clique no ícone do **Olho** para torná-la pública.

### Critérios de Destaque (VIP):
* **Selo de Estrela:** Utilize apenas para parceiros que possuem contrato de destaque ou notas superiores a 4.8.
* **Impacto Visual:** Lojas com destaque aparecem com borda dourada e prioridade na listagem do App.

---

## 2. Identidade Visual (Brand Studio)
A consistência da marca é o que gera confiança no usuário final.

* **Cores da Marca:** * `Cor Primária`: Deve ser usada para os botões de ação e ícones de navegação.
    * `Cor de Destaque`: Reservada para Badges, Promoções e Selos VIP.
* **Logotipo:** Utilize sempre URLs de imagens com fundo transparente (PNG) ou hospedadas em serviços de alta velocidade para evitar quebras no carregamento do App.
* **Tema Base:** Recomendamos o uso do tema `Light` para guias comerciais diurnos e o tema `Dark` para operações exclusivas de emergência/plantão 24h.

---

## 3. Classificação por Tags
O sistema Pet Finder v5.0 utiliza 4 categorias principais. Cada parceiro deve ser classificado corretamente para garantir o funcionamento dos filtros:

1.  **Banho:** Estética animal e higiene.
2.  **Vet:** Clínicas, pronto-atendimento e especialidades médicas.
3.  **Loja:** Petshops, venda de ração e acessórios.
4.  **Hotel:** Daycare, hospedagem e adestramento.

---

## 4. Manutenção e Suporte
Para garantir que o App rode perfeitamente em todos os dispositivos dos clientes:

* **Limpeza de Cache:** Se realizar uma alteração visual e ela não aparecer de imediato, instrua o parceiro a realizar o comando `Ctrl + Shift + R` ou limpar os dados de site no navegador.
* **Monitoramento:** Verifique semanalmente se as URLs do Instagram dos parceiros continuam ativas, pois o App utiliza essas rotas para conversão direta.

---

## 💡 Regras de Ouro do Franqueado
1.  **Mobile-First:** Antes de aprovar um parceiro, verifique se a foto de capa e o nome dele estão legíveis em uma tela de celular.
2.  **Dados Precisos:** Nunca publique uma loja sem endereço completo ou telefone de contato.
3.  **Consistência:** Não altere a Cor Primária com frequência; isso confunde a base de usuários recorrentes.

---
© 2026 Pet Finder Factory - Sistema Gerenciador de Ecossistemas Pet.