
# PLANEJAMENTO_PRODUTO.md — LOCAL FINDER / FÁBRICA DE APPS

## CONTROLE DO DOCUMENTO

Este arquivo define **a estratégia de produto, limites de escopo e critérios de decisão**.

Ele existe para:
- Guiar decisões de produto e negócio
- Evitar scope creep (crescimento descontrolado)
- Manter foco no nicho atual
- Proteger a arquitetura de mudanças arriscadas

⚠️ **Relação com outros documentos:**
- **MANUAL_FRANQUIA.md** → Define o modelo de negócio (o QUE vender)
- **PLANEJAMENTO_PRODUTO.md** → Define como evoluir (QUANDO e COMO crescer)
- **MANUAL_TECNICO.md** → Define como implementar (CÓDIGO)

---

## 🔒 OBJETIVO DESTE DOCUMENTO (NÚCLEO IMUTÁVEL)

> **Este documento existe para responder:**
> "Devemos fazer isso agora, depois ou nunca?"

### Para quem este documento serve
- **Gestores/Fundadores** → Tomar decisões estratégicas
- **IA/Desenvolvedores** → Avaliar viabilidade técnica de ideias
- **Time** → Entender prioridades e limites

### O que este documento NÃO é
- ❌ Um roadmap detalhado de features
- ❌ Uma especificação técnica
- ❌ Um plano de marketing

---

## 📍 CONTEXTO DO PROJETO (ESTADO ATUAL)

### 1. O QUE É O PRODUTO
Um **guia local de serviços pet**, com foco em:
- Ajudar donos de pet a encontrar **serviços específicos com rapidez**
- Oferecer uma experiência **mais convidativa e clara que o Google Maps**
- Valorizar **pequenos pet shops** por meio de curadoria e destaque

### 2. PÚBLICO INICIAL
- **Usuário final:** Dono de pet
- **Cliente pagante:** Pequeno dono de pet shop

### 3. PROBLEMA QUE RESOLVEMOS
**Situação atual do usuário:**
- Usa Google Maps e redes sociais
- Encontra muitas opções genéricas
- Tem dificuldade para achar **serviços específicos** e informações úteis

**Nossa solução:**
- Curadoria manual + regras simples
- Filtros por serviço, contexto e utilidade
- Menos opções, mais relevância

---

## 🎯 DIFERENCIAL REAL (SEM MARKETING)

Nosso diferencial **NÃO** é:
- ❌ "Mais dados que o Google"
- ❌ "Tecnologia avançada de IA"
- ❌ "Marketplace completo"

Nosso diferencial **É**:
- ✅ Aparência mais convidativa
- ✅ Informação organizada por necessidade real
- ✅ Destaque editorial (não só ranking automático)
- ✅ Clareza e confiança na escolha

---

## 💰 MODELO DE NEGÓCIO (INICIAL)

### Monetização
- Destaque pago
- Assinatura mensal/anual
- Compra de leads (opcional)

### Clientes Pagantes Iniciais
- Donos de pet shop

### Objetivo de Validação (MVP)
- **4 clientes/mês** pagando
- **100 visitas diferentes por semana**

---

## 🧭 POSICIONAMENTO E FOCO

### O que somos HOJE
- ✅ Um **produto nichado**
- ✅ Foco em um nicho por vez
- ✅ Dashboard como ferramenta interna

### O que podemos ser NO FUTURO
- ⏳ Uma "fábrica de produtos" (multi-nicho)
- ⏳ Uma plataforma white-label

### Regra de Foco
> **Trabalhar um nicho por vez.**  
> Dashboard existe como **ferramenta interna**, não como produto vendável.  
> Não vender flexibilidade antes de vender resultado.

---

## 🏗️ PRINCÍPIOS DE ARQUITETURA (IMUTÁVEIS)

### Core do Sistema (NÃO deve ser quebrado)
1. **Projeto** (nicho)
2. **Local** (negócio)
3. **Relacionamento Projeto ↔ Local**
4. **Fonte do dado**
5. **Identificador canônico do local**

### Regras Estruturais
- Ideias novas **NÃO devem alterar o core**
- Features devem ser implementadas como:
  - Dados (colunas no banco)
  - Regras (lógica de negócio)
  - Flags (liga/desliga)
  - Views (apresentação)
- **Evitar refatorações transversais**

---

## 🚫 LIMITES E RESTRIÇÕES

### Técnicas
- ❌ Evitar dependência de scraping automático
- ✅ Priorizar processos manuais no início
- ❌ Não criar automações pesadas antes da validação
- ✅ Manter custos baixos e previsíveis

### Operacionais
- ⏱️ Tempo disponível: ~8 horas por semana
- 💵 Orçamento: Mínimo necessário para validação
- 👤 Time: 1-2 pessoas

---

## ✅ PADRÃO DE EVOLUÇÃO SEGURA

**Toda nova ideia deve seguir o fluxo:**

```
Ideia  
  ↓
❓ Pode ser representada como dado?
  ↓
❓ Pode ser desligada sem quebrar o sistema?
  ↓
❓ Afeta apenas um projeto/nicho?
  ↓
❓ Não mexe no core?
  ↓
✅ Se TODAS as respostas = SIM → Implementar
❌ Se ALGUMA resposta = NÃO → Reavaliar ou Adiar
```

### Exemplos Práticos

#### ✅ BOA IDEIA
**"Adicionar campo 'horário de funcionamento' nas lojas"**
- ✅ É um dado (coluna no banco)
- ✅ Pode ficar vazio sem quebrar
- ✅ Afeta só a exibição do local
- ✅ Não mexe no core

**Decisão:** Implementar

---

#### ⚠️ IDEIA ARRISCADA
**"Criar sistema de agendamento online"**
- ❌ Não é só um dado (é um sistema inteiro)
- ❌ Se quebrar, afeta toda experiência
- ❌ Requer integração com cada loja
- ❌ Muda o core do produto

**Decisão:** Adiar até ter validação clara de demanda

---

#### ❌ MÁ IDEIA (AGORA)
**"Transformar em marketplace com pagamentos"**
- ❌ Muda completamente o modelo
- ❌ Cria dependências críticas (gateway de pagamento)
- ❌ Requer infraestrutura nova
- ❌ Altera o core do negócio

**Decisão:** Nunca (ou só após pivô estratégico)

---

## 🤖 COMO A IA DEVE AJUDAR

### A IA DEVE:
- ✅ Questionar ideias que aumentem fragilidade
- ✅ Priorizar simplicidade sobre sofisticação
- ✅ Sugerir soluções compatíveis com arquitetura estável
- ✅ Pensar como um **cofundador técnico e estratégico**
- ✅ Sempre justificar *por que* algo é uma boa ou má ideia

### A IA NÃO DEVE:
- ❌ Sugerir scraping agressivo
- ❌ Sugerir automação prematura
- ❌ Priorizar "escala" antes de validação
- ❌ Criar complexidade sem retorno claro

---

## 📊 MÉTRICA DE SUCESSO

**Este documento está funcionando bem se:**

- ✅ As decisões ficam mais claras
- ✅ O sistema permanece estável
- ✅ Ideias novas não geram retrabalho
- ✅ O foco no nicho é mantido
- ✅ Time evita "shiny object syndrome"

---

## 🔄 COMO ESTE DOCUMENTO EVOLUI

### Pode ser atualizado quando:
- Mudança de estratégia de produto
- Validação de novo modelo de negócio
- Expansão para novo nicho validado
- Mudança de restrições (time, orçamento, tempo)

### NÃO deve ser alterado para:
- ❌ Justificar uma feature específica
- ❌ Contornar restrições técnicas
- ❌ Seguir tendências de mercado sem validação

---

## 🧭 RELAÇÃO COM OUTROS DOCUMENTOS

| Documento | O que define | Quando usar |
|-----------|--------------|-------------|
| **PLANEJAMENTO_PRODUTO.md** | Estratégia e limites | Antes de decidir o QUE fazer |
| **MANUAL_FRANQUIA.md** | Modelo de negócio | Para entender COMO ganhar dinheiro |
| **HISTORICO_UX_UI.md** | Experiência do usuário | Para decidir COMO apresentar |
| **MANUAL_TECNICO.md** | Arquitetura técnica | Para saber COMO implementar |
| **CONTROLADORES.md** | Governança de docs | Para atualizar documentação |

---

## 📝 Template de Avaliação de Ideia

Quando surgir uma nova ideia, preencha:

```
Nome da Ideia: ______________________

1. É um dado ou um sistema?
   [ ] Dado  [ ] Sistema

2. Pode ser desligado sem quebrar?
   [ ] Sim  [ ] Não

3. Afeta só um nicho?
   [ ] Sim  [ ] Não

4. Mexe no core?
   [ ] Sim  [ ] Não

5. Resolve problema validado?
   [ ] Sim  [ ] Não  [ ] Não sei ainda

6. Retorno esperado:
   [ ] Aumenta conversão
   [ ] Reduz CAC
   [ ] Aumenta ticket médio
   [ ] Melhora retenção
   [ ] Outro: __________

Decisão:
[ ] Implementar agora
[ ] Validar primeiro
[ ] Adiar
[ ] Nunca
```

---

## Curadoria e Filtros

O produto adota um modelo de **curadoria editorial**, e não apenas filtragem técnica de dados.

Os filtros disponíveis no aplicativo podem assumir dois comportamentos distintos:
- **Filtros excludentes**, quando fazem sentido para segmentação clara (ex: Categoria).
- **Filtros de priorização**, quando o objetivo é realçar qualidade sem ocultar opções relevantes (ex: presença no Instagram, reputação).

A decisão sobre **quais filtros ficam visíveis no aplicativo** é feita no Dashboard, por projeto, permitindo testes e ajustes sem necessidade de alterações no código-base.

O objetivo principal dos filtros é:
- facilitar a decisão do usuário,
- evitar listas vazias ou experiências confusas,
- e reforçar a percepção de curadoria e qualidade.


## ✅ Declaração de Princípios

Este documento existe para garantir que o produto:
- Cresça de forma sustentável
- Mantenha foco no problema real
- Não se torne frágil por excesso de features
- Valide antes de escalar

**O sucesso não é fazer tudo.**  
**O sucesso é fazer o certo.**

### Diretriz de Curadoria e Ordenação

Filtros e ordenações no aplicativo são tratados como ferramentas de priorização,
e não como mecanismos de exclusão.

Diretrizes:
- O sistema evita cenários de lista vazia.
- A ordenação padrão é definida pelo projeto.
- O usuário pode alterar a ordenação, mas sempre visualiza o critério ativo.
- Destaque visual (VIP, nota alta) faz parte da experiência editorial do produto.

O Dashboard controla quais filtros e ordenações estão disponíveis,
preservando a simplicidade da experiência final.
