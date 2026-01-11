A IA NÃO deve:
- Reescrever arquivos
- Alterar conteúdo fora do evento permitido
- Atualizar arquivos estáticos

A IA DEVE:
- Sugerir UPDATE_LOG primeiro
- Solicitar confirmação antes de adendos
- Preservar regras anteriores



# ARCHITECTURE — Organização Técnica

## STACK
- React + Vite
- React Router DOM
- Supabase (DB + RLS)
- Vercel (Deploy)
- Lucide React
- react-social-media-embed

## ROTEAMENTO
- `/` → HomeFactory (lista projetos)
- `/:slug` → App público
- `/:slug/dashboard` → Gestão
- `/:slug/admin` → Ingestão IA

## MULTI-TENANCY
- Tabela `projetos` define identidade visual
- Todas as tabelas possuem `projeto_id`
- UniversalLoader resolve slug → projeto

## BANCO DE DADOS
### projetos
- id, nome, slug
- cor_primaria, cor_destaque
- tema_base, logo_url

### locais
- id, projeto_id
- nome, endereco
- status (PUBLICAR_APP | RASCUNHO)
- tags (text[])
- destaque (boolean)
- nota, avaliacoes, instagram_url

### leads
- id, projeto_id
- nome, telefone
- loja_alvo
- mensagem_inicial
- created_at

## COMPONENTES-CHAVE
- PetList → vitrine pública
- ChatModal → funil de conversão
- Dashboard → CRUD e controle
- AdminGenerator → prompt SQL IA

## PRINCÍPIO
> Clareza > abstração  
> Estabilidade > elegância
