# OPERATIONS_RULES.md
Versão: 2.1.0
Data: 2026-02-21

# 1. Status

Somente PUBLICAR_APP deve aparecer no app público.

Admin visualiza todos.

LIXO é exclusão lógica.

---

# 2. Lead

Fluxo obrigatório:
Salvar lead → Redirecionar WhatsApp.

Campos obrigatórios:
- nome
- telefone
- projeto_id

---

# 3. Featured

destaque = true apenas influencia ordenação.

---

# 4. Estado Atual

- Filtro de status feito no React.
- View ainda não utilizada.
- RLS ativo.

---

# 5. Backlog

- Padronizar leitura por projeto_id + status.
- Migrar leitura para view.
- Documentar policies RLS.