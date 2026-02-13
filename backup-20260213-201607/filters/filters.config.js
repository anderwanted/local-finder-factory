/**
 * SISTEMA GLOBAL DE FILTROS
 * =========================
 *
 * Este arquivo define TODOS os filtros possíveis da plataforma.
 *
 * ➜ Filtros são infraestrutura.
 * ➜ Nunca são criados pelo dashboard.
 * ➜ Funcionam em qualquer nicho (multi-tenant).
 *
 * O dashboard apenas:
 * - ativa ou desativa filtros por projeto
 * - define prioridade entre filtros de ordenação
 *
 * Este arquivo deve ser legível como documentação viva.
 */

/**
 * Cada filtro segue um contrato fixo.
 * Se alguém não entender o filtro lendo apenas este arquivo,
 * o filtro está mal definido.
 */

export const FILTERS = {
  /**
   * ⭐ FILTRO: Bem avaliados
   * ----------------------
   * Intenção:
   * Priorizar locais com boa reputação.
   *
   * Impacto:
   * Reorganiza o ranking, não remove resultados.
   *
   * Limite:
   * Se o local não tiver avaliação, ele é ignorado pelo filtro.
   */
  bem_avaliados: {
    id: 'bem_avaliados',

    nome_humano: 'Bem avaliados',

    descricao:
      'Prioriza locais com avaliação igual ou superior a 4.0. Não remove resultados.',

    tipo: 'ordenacao',

    campo_afetado: 'nota',

    comportamento: 'ordenar',

    /**
     * Função de ordenação.
     * Retorna um número para comparação.
     * Quanto maior, mais acima no ranking.
     */
    ordenar: (local) => {
      if (typeof local.nota !== 'number') return 0;
      if (local.nota < 4) return 0;
      return local.nota;
    },

    /**
     * Fallback seguro:
     * Se algo falhar, o filtro não interfere na lista.
     */
    fallback: () => 0
  },

  /**
   * 💬 FILTRO: WhatsApp disponível
   * -----------------------------
   * Intenção:
   * Priorizar locais com contato rápido.
   *
   * Impacto:
   * Reorganiza o ranking.
   *
   * Limite:
   * Não remove locais sem WhatsApp.
   */
  whatsapp_disponivel: {
    id: 'whatsapp_disponivel',

    nome_humano: 'WhatsApp disponível',

    descricao:
      'Prioriza locais que possuem WhatsApp ativo para contato direto.',

    tipo: 'ordenacao',

    campo_afetado: 'is_whatsapp',

    comportamento: 'ordenar',

    ordenar: (local) => {
      if (local.is_whatsapp === true) return 1;
      return 0;
    },

    fallback: () => 0
  },

  /**
   * 💎 FILTRO: Destaque / VIP
   * ------------------------
   * Intenção:
   * Dar prioridade a locais destacados pelo projeto.
   *
   * Impacto:
   * Reorganiza o ranking.
   *
   * Limite:
   * Não remove locais comuns.
   */
  destaque: {
    id: 'destaque',

    nome_humano: 'Destaque',

    descricao:
      'Prioriza locais marcados como destaque (VIP). Não remove resultados.',

    tipo: 'ordenacao',

    campo_afetado: 'destaque',

    comportamento: 'ordenar',

    ordenar: (local) => {
      if (local.destaque === true) return 1;
      return 0;
    },

    fallback: () => 0
  }
};
