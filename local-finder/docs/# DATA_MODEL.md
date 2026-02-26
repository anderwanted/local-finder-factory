# DATA_MODEL.md
Versão: 2.1.0
Data: 2026-02-21

# 1. Estrutura Geral

Tenant: projetos.id

RLS ativo em:
- projetos
- locais
- leads

---

# 2. Enum status_local

- RASCUNHO
- PUBLICAR_APP
- VENDA_B2B
- LIXO

---

# 3. Entidades

## projetos
- id
- slug
- branding
- filtros_ativos
- city_id

## locais
- id
- nome
- telefone
- niche (text)
- status (enum)
- projeto_id (FK)
- destaque
- aberto_agora
- nota
- tags
- image_url

## leads
- id
- nome
- telefone
- loja_alvo
- mensagem_inicial
- projeto_id (FK)

---

# 4. Regras Estruturais

- projeto_id nunca pode ser opcional em dados públicos.
- status controla visibilidade.
- enum não pode ser alterado sem CHANGELOG.