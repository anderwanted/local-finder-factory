
# 🐶 Local Finder - Documentação de Negócio & Técnica
**Versão:** MVP 1.0 (Concierge Lead Gen)
**Status:** Pronto para Deploy (Vercel)

## 1. Visão Geral do Produto
O Local Finder é um **Web App de Curadoria (Concierge)** focado em conectar donos de pets a serviços locais de alta qualidade (Pet Shops, Veterinários, Banho e Tosa).
Diferente do Google Maps (que é poluído e genérico), o Local Finder oferece uma lista "limpa", tags claras e um atendimento pré-venda simulado que qualifica o lead antes de enviar para o WhatsApp do lojista.

## 2. Regras de Negócio (Core Rules)
1.  **Modelo Concierge:** O usuário não fala direto com a loja. Ele passa por um "Chat Fake" do App primeiro.
2.  **Pedágio de Lead (Tollgate):** O link do WhatsApp da loja **nunca** é exibido abertamente. O usuário é obrigado a informar **Nome** e **Telefone** no chat para liberar o redirecionamento.
3.  **Curadoria Manual:** Lojas não se cadastram sozinhas (por enquanto). Nós (Admin) inserimos as lojas para garantir qualidade e padronização.
4.  **Mensagem Contextualizada:** O lead chega no WhatsApp do lojista com uma mensagem pronta: *"Olá, me chamo [Nome], vim pelo LocalFinder e quero saber sobre [Assunto]"*.

## 3. Arquitetura Técnica
* **Front-end:** React (Vite) + Lucide React (Ícones).
* **Back-end/Banco:** Supabase (PostgreSQL + RLS Policies).
* **Hospedagem:** Vercel (Front) + Supabase Cloud (Dados).
* **Segurança:** RLS configurado para permitir leitura pública (`locais`) e escrita anônima (`leads`).

## 4. Fluxos Principais
### A. Fluxo de Ingestão de Dados (O "Segredo")
1.  Admin copia dados brutos da lista lateral do Google Maps.
2.  Cola na rota `/admin` do App.
3.  Sistema gera um Prompt de Engenharia de Dados.
4.  Admin joga na IA -> IA devolve SQL limpo.
5.  Admin roda SQL no Supabase.

### B. Fluxo do Usuário Final
1.  Acessa Home (`/`) -> Vê lista filtrada (`status = PUBLICAR_APP`).
2.  Clica em "Falar com Atendente".
3.  Interage com Chat Bot (Simulação de delay e atendimento).
4.  Bot pede Nome/Zap -> Usuário preenche.
5.  **App Salva Lead no Supabase** -> Redireciona para WhatsApp Web/App.

### C. Fluxo Administrativo (Dashboard)
1.  Acessa `/dashboard`.
2.  **Aba Lojas:** Vê todas as lojas. Pode ocultar (Rascunho) ou Publicar com 1 clique.
3.  **Aba Leads:** Vê tabela de quem entrou em contato, telefone e interesse.

## 5. Histórico de Decisões (Log de Ideias)
* ✅ **Ideia Aprovada:** "Gerador de Prompt Local". Em vez de criar um scraper complexo em Python/Selenium (que quebrava muito), criamos um formatador de texto simples que usa a inteligência da IA (ChatGPT) para limpar os dados. Eficiência 10x maior.
* ✅ **Ideia Aprovada:** Dashboard Simples. Controle de visibilidade via booleano no banco, sem precisar de painel admin complexo com login no início.
* ❌ **Ideia Descartada:** Scraper Automático via Extensão. Testamos, mas os seletores CSS do Google Maps mudam dinamicamente e traziam dados sujos. O custo de manutenção não valia a pena para o MVP.
* ❌ **Ideia Descartada:** Captura manual detalhada (clicar loja por loja). Muito lento (2 min/loja). O método de "Copiar Lista" + IA resolveu com 90% da qualidade em 10% do tempo.

## 6. Próximos Passos (Roadmap)
1.  **Geolocalização:** Ordenar lista por "Mais perto de mim".
2.  **Monetização:** Cobrar do lojista para ter destaque ("Super Partner").
3.  **Login de Lojista:** Permitir que o dono da loja veja seus próprios leads (SaaS B2B).


Atualização

# 🐶 Local Finder - Documentação de Negócio & Técnica
**Versão:** MVP 1.5 (Recurso Premium & Dashboard 2.0)
**Status:** Pré-Fábrica (Preparando para Multi-Nicho)

## 1. Visão Geral do Produto
O Local Finder é uma **Plataforma de Curadoria Premium** que conecta clientes a serviços locais. Diferente de listas comuns, oferecemos uma experiência hierárquica onde parceiros "VIP" ganham destaque visual, vídeos embarcados e prova social (notas), aumentando a conversão.

## 2. Regras de Negócio (Core Rules)
1.  **Hierarquia Visual:**
    * **VIP (Destaque):** Card expandido, borda dourada, selo "Recomendado", exibe vídeo do Instagram (Reels) e Nota/Avaliações.
    * **Padrão:** Card simples com nome, endereço e botão de contato.
2.  **Pedágio de Lead (Tollgate):** O link do WhatsApp da loja permanece oculto até o usuário preencher o formulário no Chat Fake.
3.  **Gestão Facilitada:** O Admin não precisa de SQL. O Dashboard permite promover lojas a VIP, editar notas e colar links de mídia visualmente.
4.  **Ingestão IA:** O sistema de cadastro usa IA para ler dados sujos do Google Maps e extrair automaticamente notas e nº de avaliações.

## 3. Arquitetura Técnica
* **Front-end:** React (Vite) + Lucide Icons + `react-social-media-embed`.
* **Estilização:** CSS Inline com **Variáveis CSS** (`var(--cor-primaria)`) preparando para white-label.
* **Back-end/Banco:** Supabase (PostgreSQL).
* **Segurança:** RLS Policies ativas (Leitura pública, Escrita anônima em leads, Edição restrita).

## 4. Estrutura de Dados (Atualizada)
### Tabela `locais`
* `id` (uuid), `nome` (text), `telefone` (text), `endereco` (text)
* `tags` (array), `status` (text: 'RASCUNHO' | 'PUBLICAR_APP')
* `is_whatsapp` (bool)
* **[NOVO]** `nota` (numeric - ex: 4.8)
* **[NOVO]** `avaliacoes` (int - ex: 150)
* **[NOVO]** `instagram_url` (text - Link do Post/Reel)
* **[NOVO]** `destaque` (boolean - Define se é VIP)

### Tabela `leads`
* `id`, `nome`, `telefone`, `loja_alvo`, `mensagem_inicial`, `created_at`.

## 5. Histórico de Evolução
* ✅ **MVP 1.0:** Listagem simples e captura de leads.
* ✅ **MVP 1.5 (Atual):** Implementação de Destaques (VIP), integração com Instagram e Dashboard com edição ativa (CRUD).
* 🔜 **Próximo:** Transformação em "Fábrica de Apps" (Multi-Nicho/Multi-Tenancy).

## 6. Fluxos Principais
### A. Fluxo de Edição VIP (Dashboard)
1.  Admin acessa `/dashboard`.
2.  Clica no ícone de **Lápis** no card da loja.
3.  Insere Nota, Avaliações, Link do Instagram e marca "Destaque".
4.  Salva -> O App final atualiza instantaneamente com o layout Premium.


# 🏭 Fábrica de Apps (Local Finder Engine) - Documentação v2.0
**Status:** Em Produção (Vercel) | **Arquitetura:** Multi-Tenant (Multi-Nicho)

## 1. Visão Geral
O projeto evoluiu de um site único para uma **Fábrica de Plataformas de Curadoria**. O mesmo código-fonte agora gera múltiplos aplicativos (ex: `/pets`, `/mecanicos`, `/barber`), diferenciados por configurações no Banco de Dados (Cores, Títulos, Dados).
A monetização foca no modelo "Premium": estabelecimentos pagam para ter **Destaque Visual** e **Mídia Embarcada** (Instagram).

## 2. Regras de Negócio & Funcionalidades
1.  **Multi-Tenancy (Fábrica):**
    * A rota `/` exibe os nichos disponíveis.
    * A rota `/:nicho` (ex: `/pets`) carrega o App com a identidade visual e dados daquele nicho específico.
2.  **Hierarquia Premium:**
    * **VIP:** Borda colorida, Selo, Nota/Avaliações e Embed de Instagram.
    * **Standard:** Card simples.
3.  **Gestão (Dashboard):**
    * Cada nicho tem seu painel: `/:nicho/dashboard`.
    * Permite edição "No-Code": Alterar notas, promover a Destaque e colar links do Instagram.
    * **Isolamento:** O Gestor de Pets não vê leads de Mecânicos.
4.  **Ingestão IA:** O `AdminGenerator` cria prompts SQL customizados por nicho para popular o banco rapidamente via ChatGPT/Gemini.

## 3. Stack Tecnológico
* **Front:** React (Vite), React Router Dom (Roteamento Dinâmico).
* **Back/DB:** Supabase (PostgreSQL).
* **Deploy:** Vercel (Integração Contínua com GitHub).
* **Bibliotecas Chave:** `lucide-react` (ícones), `react-social-media-embed` (Instagram).

## 4. Estrutura de Banco de Dados (Supabase)
* **`projetos` (A Mãe):** `id`, `slug` (url), `cor_primaria`, `cor_destaque`, `nome`.
* **`locais` (Os Filhos):** `id`, `nome`, `nota`, `avaliacoes`, `instagram_url`, `destaque`, `projeto_id` (FK).
* **`leads` (O Ouro):** `id`, `nome`, `telefone`, `projeto_id` (FK).

## 5. Fluxo de Trabalho (Deploy)
* **Conteúdo (Dados):** Edita-se direto no Dashboard em Produção.
* **Código (Estrutura):** Edita no Localhost -> Commit no Git -> Vercel atualiza automático.





# 🐶 Local Finder - Documentação v2.1 (Visual Update)

## 1. Mudanças Visuais (UX)
* **Navegação:** Substituímos filtros de texto por **4 Botões de Categoria** com ícones (Estilo iFood).
* **Tags Visuais:** No card, as tags aparecem como etiquetas padronizadas.

## 2. Regras de Dados (Taxonomia)
O sistema agora é rígido. Não usamos mais texto livre para tags.
As únicas tags permitidas pelo sistema (para os botões funcionarem) são:
1. `banho` (Estética, Banho e Tosa)
2. `vet` (Clínicas, Hospitais, Vacinas)
3. `loja` (Pet Shops, Rações, Acessórios)
4. `hotel` (Creche, Hospedagem)

## 3. Fluxo de Cadastro (Atualizado)
1. **Ingestão IA:** O prompt agora converte automaticamente termos como "Clínica" para `vet`.
2. **Dashboard:** O campo de tags agora usa **Checkboxes** para evitar erros de digitação.
3. **Geolocalização:** O Banco está preparado para receber Latitude/Longitude (via URL do Maps) para futuro recurso de "Perto de Mim".