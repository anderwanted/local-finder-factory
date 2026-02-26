# SYSTEM_ARCHITECTURE.md
Versão: 2.1.0
Data: 2026-02-21

# 1. Visão Arquitetural

Arquitetura simples, multi-tenant e incremental.

Stack:
- React
- Supabase (Postgres)
- RLS ativado

---

# 2. Tenant

Tenant raiz: projetos

Identificador público: projetos.slug

Fluxo:
- Rota /:slug
- Busca projeto por slug
- Obtém projeto.id
- Isola dados por projeto_id

---

# 3. Leitura Atual (AS-IS)

App Público:
- Lê direto de locais
- Filtra status PUBLICAR_APP no React

Admin:
- Filtra por projeto_id

Views existem mas não são usadas no app.

---

# 4. Escrita

- CRUD direto em locais
- Status atualizado direto em locais
- Leads salvos com projeto_id

---

# 5. Princípios Arquiteturais

- Simplicidade
- Evitar camadas desnecessárias
- Banco como fonte de verdade
- Multi-tenant obrigatório