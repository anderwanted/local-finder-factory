# ROADMAP.md

Este documento define a evolução técnica do projeto.
Ele é incremental e prioriza estabilidade acima de inovação agressiva.

---

# FASE 0 — Estruturação (Concluída)

✔ Consolidação dos 4 documentos base  
✔ Confirmação do modelo multi-tenant  
✔ Enum oficial documentado  
✔ RLS confirmado ativo  
✔ Registro formal no CHANGELOG  

---

# FASE 1 — Padronização Segura (Baixo Risco)

Objetivo: Reduzir inconsistência sem alterar arquitetura.

## 1.1 Padronizar leitura pública

Hoje:
- Algumas queries filtram status no React
- Outras não filtram projeto explicitamente

Meta:
- Todas as queries públicas devem incluir:
  - `.eq('projeto_id', projetoId)`
  - `.eq('status','PUBLICAR_APP')`

Impacto:
- Zero impacto estrutural
- Aumento de segurança

Classificação:
Mudança incremental.

---

## 1.2 Revisar queries “select('*')” sem filtro

Substituir:
- `.select('*')`

Por:
- Seleção explícita de colunas quando possível
- Ou filtro mínimo obrigatório

Impacto:
- Melhora segurança
- Evita vazamento futuro

---

## 1.3 Documentar Policies RLS

Criar seção detalhada no DATA_MODEL ou novo doc:

- Quem pode ler locais?
- Quem pode ler leads?
- Condições de acesso?

Impacto:
- Segurança formalizada
- Nenhuma mudança estrutural

---

# FASE 2 — Consolidação de Contrato do App (Médio Risco Controlado)

Objetivo: Centralizar regra de visibilidade no banco.

## 2.1 Migrar leitura pública para view

Alterar:
- App passa a usar `v_locais_app`

E remover:
- Filtro de status no React

Benefício:
- Banco vira fonte única de verdade
- Evita divergência futura

Classificação:
Mudança estrutural leve (requer CHANGELOG)

---

## 2.2 Formalizar ordenação padrão

Implementar regra:

1. destaque = true
2. nota desc
3. avaliacoes desc
4. created_at desc

Pode ser:
- No React
- Ou na view

---

# FASE 3 — Estrutura de Nichos (Estrutural Controlado)

Objetivo: Eliminar duplicidade entre `locais.niche` (text) e tabela `niches`.

Opção futura:
- Transformar `locais.niche` em FK para `niches.slug`

Benefício:
- Estrutura mais consistente
- Filtros mais seguros

Classificação:
Mudança estrutural (exige migração de dados)

---

# FASE 4 — Otimização de Performance

Somente se necessário:

- Criar índices em:
  - projeto_id
  - status
  - created_at
  - niche
- Avaliar paginação
- Avaliar cache leve

Nunca antecipar otimização sem necessidade real.

---

# FASE 5 — Evolução Pós-Validação

Somente após validação real de uso:

- Marketplace
- Sistema de reserva
- Sistema de favoritos persistente
- Monetização
- Plano B2B

Qualquer um desses exige:
- Revisão do PRODUCT_CORE
- Atualização no CHANGELOG
- Nova versão estrutural

---

# Proibições no Roadmap

Não fazer:

- Microserviços
- GraphQL complexo
- Reestruturação total
- Sistema de permissões complexo
- Automação pesada
- Serviços pagos desnecessários

---

# Critério de Prioridade

Ordem de importância:

1. Segurança multi-tenant
2. Consistência de status
3. Clareza de código
4. Simplicidade
5. Performance
6. Expansão de features

---

# Filosofia

Este projeto evolui por estabilidade.

Nunca por empolgação técnica.