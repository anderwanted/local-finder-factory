# CONTROLADORES — GOVERNANÇA DOS DOCUMENTOS DO PROJETO

## FINALIDADE DESTE ARQUIVO

Este documento define **como a IA e o gestor humano devem interpretar, usar e atualizar** os arquivos `.md` do projeto.

Ele existe para:
- Evitar perda de contexto
- Proteger a ideia original
- Permitir evolução controlada
- Impedir reescritas indevidas

Este arquivo **não descreve o projeto em si**, apenas **as regras de leitura e manutenção da documentação**.

---

## 📁 DOCUMENTOS CONTROLADOS (VISÃO GERAL)

O projeto utiliza os seguintes arquivos como **memória oficial**:

### 1. HISTORICO_UX_UI.md
**O que é:**
- Registro das decisões de experiência do usuário e interface

**Função:**
- Explicar *por que* a UX/UI é como é
- Evitar simplificação ou complexificação indevida
- Preservar a lógica da experiência

**Trechos de Controle:**
- IDEIA ORIGINAL
- PRINCÍPIOS
- NÚCLEO

Esses trechos:
- NÃO podem ser alterados
- NÃO podem ser reinterpretados
- NÃO podem ser resumidos

---

### 2. MANUAL_FRANQUIA.md
**O que é:**
- Documento de modelo de negócio
- Guia para expansão, nichos e operação

**Função:**
- Explicar como o projeto gera valor
- Definir regras comerciais
- Orientar replicação (multi-nicho / franquia)

**Trechos de Controle:**
- BASE DO MODELO
- PRINCÍPIOS DE NEGÓCIO
- IDEIA CENTRAL

Esses trechos:
- São estáveis
- Representam a estratégia original
- Só mudam com decisão explícita do dono do projeto

---

### 3. MANUAL_TECNICO.md
**O que é:**
- Documento técnico vivo
- Registro da arquitetura e decisões de código

**Função:**
- Orientar desenvolvimento
- Evitar regressões técnicas
- Ajudar novas IAs a entender o stack

**Trechos de Controle:**
- BASE TÉCNICA
- PRINCÍPIOS DE ARQUITETURA
- DECISÕES FUNDAMENTAIS

Esses trechos:
- NÃO devem ser alterados automaticamente
- Protegem a estabilidade do sistema

Obs:  
A partir deste manual, podem ser colados **outputs de scripts**, trechos de código e diagnósticos técnicos.

---

### 4. PROMPT_RESGATE.md
**O que é:**
- Prompt de reentrada de contexto para IA

**Função:**
- Reativar o entendimento completo do projeto
- Alinhar papel da IA
- Evitar que a IA trate o projeto como algo novo

**Trechos de Controle:**
- CONTEXTO ORIGINAL
- NÚCLEO IMUTÁVEL

Esse documento:
- NÃO evolui com features
- Só muda se a visão do produto mudar

---

## 🧭 INSTRUÇÃO DE CONTROLE — INÍCIO DE CONVERSA

> **Este trecho pode ser colado no início de qualquer conversa com IA**

Vou começar a falar sobre um projeto em andamento.

Existem arquivos `.md` que servem como referência principal:
- HISTORICO_UX_UI.md
- MANUAL_FRANQUIA.md
- MANUAL_TECNICO.md
- PROMPT_RESGATE.md

Regras importantes:
1. Esses arquivos contêm TRECHOS DE CONTROLE que explicam o papel de cada documento.
2. Alguns trechos são marcados como:
   **"IDEIA ORIGINAL", "BASE", "PRINCÍPIOS" ou "NÚCLEO"**.  
   Esses trechos são CONTROLADORES e NÃO devem ser reescritos ou reinterpretados.
3. Todo o restante pode evoluir conforme o projeto amadurece.
4. Se algo não estiver claro, pergunte antes de assumir.

Use os `.md` como memória do projeto.  
Use minha fala como estado mais recente.

---

## 🔄 INSTRUÇÃO DE CONTROLE — ATUALIZAÇÃO DE MD

> **Este trecho deve ser colado antes de enviar um `.md` para atualização**

Vou enviar agora um arquivo `.md`.

Instruções:
1. Leia o documento inteiro antes de propor qualquer alteração.
2. Identifique os TRECHOS DE CONTROLE e os TRECHOS IMUTÁVEIS  
   (ex: IDEIA ORIGINAL, BASE, PRINCÍPIOS).
3. Esses trechos NÃO podem ser alterados, resumidos ou reescritos.
4. Atualize APENAS as partes autorizadas, com base no que foi discutido.
5. Preserve o conteúdo anterior sempre que possível.
6. Retorne o arquivo COMPLETO já atualizado.

Se alguma mudança for necessária em um trecho imutável:
- NÃO altere
- Apenas sinalize no final como observação.

---

## 🛑 REGRA FINAL

- Os `.md` são a memória do projeto
- Este arquivo define como essa memória é protegida
- Evolução é permitida
- Reinterpretação da base não é
