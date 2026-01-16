# HISTÓRICO UX / UI — LOCAL FINDER / FÁBRICA DE APPS

## CONTROLE DO DOCUMENTO

Este arquivo registra **as decisões de UX e UI** do projeto ao longo do tempo.

Objetivo:
- Preservar a lógica original da experiência
- Explicar *por que* as decisões foram tomadas
- Permitir evolução sem perda de identidade
- Ajudar IAs a não “reinventarem” a interface

⚠️ Este documento contém **trechos controladores imutáveis**.
Eles representam a visão original da experiência do usuário.

---

## 🔒 PRINCÍPIOS ORIGINAIS DE UX (NÚCLEO IMUTÁVEL)

> **Este trecho define a essência da experiência.  
> NÃO deve ser alterado.**

### Visão Central
O app deve funcionar como:
- Um **guia local simples**
- Com uso intuitivo
- Sem exigir aprendizado
- Com foco em ação rápida

O usuário deve:
- Entrar
- Entender
- Escolher
- Contatar

Tudo em poucos segundos.

---

### Princípios Obrigatórios

1. **Mobile First**
   - A experiência principal é no celular
   - Desktop é suporte, não prioridade

2. **Zero Fricção**
   - Poucos cliques
   - Poucos textos
   - Nenhuma tela desnecessária

3. **Ação > Informação**
   - O objetivo é contato
   - Não é navegação longa
   - Não é comparação técnica

4. **Interface Invisível**
   - UX não deve “chamar atenção”
   - O serviço local é o protagonista

---

## 🎯 OBJETIVO DA EXPERIÊNCIA

- Gerar confiança
- Facilitar escolha
- Incentivar contato
- Converter em lead

UX não é estética.
UX é **resultado**.

---

## 🧱 ESTRUTURA BASE DA EXPERIÊNCIA

### Tela Principal
- Lista de serviços
- Destaques visuais claros
- Categorias simples
- Scroll natural

### Cartão de Serviço
- Nome
- Endereço
- Tags simples
- Destaque (VIP)
- Botão de ação único

### Regra
> Um serviço = uma ação clara.

---

## 💬 FUNIL DE CONVERSÃO (DECISÃO DE UX)

O contato com o serviço:
- NÃO é direto
- PASSA por um pedágio leve

Motivo:
- Qualificar o lead
- Valorizar o contato
- Evitar spam

Esse funil é **parte da experiência**, não apenas regra de negócio.

---

## 🎨 UI — DECISÕES VISUAIS

### Estilo Geral
- Visual limpo
- Poucas cores
- Alto contraste
- Legibilidade máxima

### Customização Permitida
- Cores da marca
- Tema claro / escuro
- Bordas (quadrado / arredondado)

### Não Permitido
- Poluição visual
- Animações excessivas
- Elementos decorativos sem função

---

## 🌙 DARK MODE

Dark mode não é estética.
É conforto.

Regra:
- Deve manter legibilidade
- Deve preservar hierarquia
- Não pode esconder ações

---

## ⭐ DESTAQUES (VIP)

Destaque é:
- Visualmente claro
- Não agressivo
- Sutilmente valorizado

Motivo:
> O destaque deve parecer **merecido**, não imposto.

---

## 🧠 RELAÇÃO COM IA (IMPORTANTE)

A IA deve ler este documento para:
- Entender a lógica da experiência
- Não sugerir fluxos complexos
- Não criar telas desnecessárias
- Respeitar decisões anteriores

A IA NÃO deve:
- Transformar o app em marketplace
- Criar múltiplos funis
- Aumentar etapas sem justificativa

---

## 🔄 COMO ESTE HISTÓRICO EVOLUI

Este documento pode crescer com:
- Novas decisões de UX
- Testes realizados
- Ajustes baseados em uso real

Forma correta:
- Adicionar seções
- Registrar o contexto da decisão
- Manter o núcleo intacto

---

## 🧭 RELAÇÃO COM OUTROS DOCUMENTOS

- **MANUAL_FRANQUIA.md**  
  → Explica o modelo de negócio

- **MANUAL_TECNICO.md**  
  → Explica a implementação

- **PROMPT_RESGATE.md**  
  → Garante continuidade com IA

Este histórico garante que o projeto **evolua sem perder simplicidade**.


---

## 🔄 Refatoração de Código (Janeiro 2026)

### Data: 11/01/2026

### Tipo de Mudança: **Refatoração Técnica (Sem Impacto Visual)**

#### Contexto
O Dashboard passou por uma refatoração completa da arquitetura de código, migrando de um arquivo monolítico para uma estrutura modular baseada em componentes e hooks customizados.

#### O Que Mudou (Código)
- Dashboard.jsx dividido em 5 componentes menores
- Lógica extraída para hooks customizados
- Constantes centralizadas em arquivo único
- Estrutura de pastas organizada (`utils/`, `hooks/`, `components/`)

#### O Que NÃO Mudou (UX/UI)
✅ **Nenhuma alteração visual ou de experiência do usuário foi feita.**

Especificamente:
- Layout permanece idêntico
- Cores e estilos inalterados
- Fluxo de uso exatamente igual
- Performance mantida (ou melhorada)
- Todos os filtros funcionam da mesma forma
- Edição de lojas funciona igual
- Estados vazios exibidos da mesma forma

#### Motivação da Refatoração
Esta mudança foi puramente técnica, visando:
1. **Facilitar manutenção** - Isolar bugs em arquivos específicos
2. **Permitir evolução** - Adicionar features sem quebrar código existente
3. **Melhorar testabilidade** - Testar componentes isoladamente
4. **Profissionalizar o código** - Seguir padrões de mercado

#### Confirmação de Continuidade
Esta refatoração **NÃO** altera nenhum dos princípios originais de UX definidos neste documento:
- ✅ Mobile First - Mantido
- ✅ Zero Fricção - Mantido
- ✅ Ação > Informação - Mantido
- ✅ Interface Invisível - Mantido

#### Relação com Outros Documentos
- **MANUAL_TECNICO.md** foi atualizado com a nova arquitetura
- **MANUAL_FRANQUIA.md** permanece inalterado (modelo de negócio igual)
- **PROMPT_RESGATE.md** permanece válido

#### Aprendizado
Refatoração de código pode (e deve) ser feita **sem alterar a experiência do usuário**. A separação clara entre "código interno" e "interface externa" permite evolução técnica sem impacto no produto.

---

## 📌 Nota Importante sobre Futuras Mudanças

**Regra estabelecida:**

Quando houver mudanças futuras, identificar claramente:

- 🔧 **Refatoração Técnica** → Atualiza MANUAL_TECNICO.md (sem tocar em UX)
- 🎨 **Mudança de Interface** → Atualiza HISTORICO_UX_UI.md + justifica decisão
- 💼 **Mudança de Negócio** → Atualiza MANUAL_FRANQUIA.md + explica impacto

Esta separação garante que o histórico permaneça claro e rastreável.
