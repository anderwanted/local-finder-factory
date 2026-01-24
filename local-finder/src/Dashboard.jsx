import React, { useEffect, useMemo, useState } from "react";
import { supabase } from './supabaseClient';

/* ======================================================
   DASHBOARD — PET FINDER
   3 seções (1 e 2 config; 3 CRUD real em 'locais')
====================================================== */

export default function Dashboard() {
  /* ======================================================
     SEÇÃO 1 — ORDENAÇÃO PADRÃO DA PETLIST
  ====================================================== */
  const [ordenacaoPadrao, setOrdenacaoPadrao] = useState("padrao");

  /* ======================================================
     SEÇÃO 2 — FILTROS DISPONÍVEIS NA PETLIST
  ====================================================== */
  const [filtros, setFiltros] = useState({
    categoria: true,
    bemAvaliados: true,
    instagram: true,
    whatsapp: true,
    destaque: true
  });

  const toggleFiltro = (key) => {
    setFiltros((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const salvarConfiguracoes = async () => {
    // MVP: por enquanto só log (depois persistimos em "projetos.filtros_ativos" etc)
    console.log("Ordenação padrão:", ordenacaoPadrao);
    console.log("Filtros ativos:", filtros);
    alert("Configurações salvas (por enquanto local / mock).");
  };

  /* ======================================================
     SEÇÃO 3 — GERENCIAR 'locais' (CRUD REAL)
  ====================================================== */

  // ⚠️ Ajuste estas strings quando você souber o ENUM real de `status`
  const STATUS_VISIBLE = "ativo";  // <- ajuste se o enum for "publicado", "visivel", etc
  const STATUS_HIDDEN  = "oculto"; // <- ajuste se o enum for "inativo", "hidden", etc
  

  const [locais, setLocais] = useState([]);
  const [loadingLocais, setLoadingLocais] = useState(true);
  const [errorLocais, setErrorLocais] = useState("");

  const [query, setQuery] = useState(""); // busca simples no admin
  const [onlyHidden, setOnlyHidden] = useState(false); // opcional: ver só ocultos
  const [onlyFeatured, setOnlyFeatured] = useState(false); // opcional: ver só destaques

  const [form, setForm] = useState({
    id: null,
    nome: "",
    telefone: "",
    endereco: "",
    site: "",
    niche: "",
    status: STATUS_VISIBLE,
    origem: "",
    is_whatsapp: false,
    instagram_url: "",
    destaque: false,
    image_url: "",
    google_maps_url: "",
    horario_fechamento: "",
    aberto_agora: false,
    estacionamento: false,
    nota: null,
    avaliacoes: null
  });

  const resetForm = () => {
    setForm({
      id: null,
      nome: "",
      telefone: "",
      endereco: "",
      site: "",
      niche: "",
      status: STATUS_VISIBLE,
      origem: "",
      is_whatsapp: false,
      instagram_url: "",
      destaque: false,
      image_url: "",
      google_maps_url: "",
      horario_fechamento: "",
      aberto_agora: false,
      estacionamento: false,
      nota: null,
      avaliacoes: null
    });
  };

  // Helpers de status (robusto p/ enum desconhecido)
  const isVisibleStatus = (s) => {
    const v = (s || "").toString().toLowerCase().trim();
    if (!v) return true; // se estiver null/vazio, consideramos visível por padrão
    return ["ativo", "active", "publicado", "visivel", "online"].includes(v);
  };

  const isHiddenStatus = (s) => {
    const v = (s || "").toString().toLowerCase().trim();
    return ["oculto", "hidden", "inativo", "offline"].includes(v);
  };

  // Busca TOTAL (com paginação) — garante "puxar todos"
  const fetchAllLocais = async () => {
    setLoadingLocais(true);
    setErrorLocais("");

    try {
      const pageSize = 1000; // Supabase costuma limitar; usamos range para paginar
      let from = 0;
      let all = [];

      while (true) {
        const { data, error } = await supabase
          .from("locais")
          .select("*")
          .order("created_at", { ascending: false })
          .range(from, from + pageSize - 1);

        if (error) throw error;

        all = all.concat(data || []);
        if (!data || data.length < pageSize) break;
        from += pageSize;
      }

      setLocais(all);
    } catch (err) {
      console.error(err);
      setErrorLocais(
        err?.message ||
          "Não foi possível carregar locais. Verifique RLS/policies e a tabela 'locais'."
      );
    } finally {
      setLoadingLocais(false);
    }
  };

  useEffect(() => {
    fetchAllLocais();
  }, []);

  // Lista filtrada (somente no dashboard)
  const locaisFiltrados = useMemo(() => {
    let list = [...locais];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((l) =>
        [l.nome, l.endereco, l.niche, l.site, l.telefone]
          .filter(Boolean)
          .some((x) => x.toString().toLowerCase().includes(q))
      );
    }

    if (onlyHidden) {
      list = list.filter((l) => isHiddenStatus(l.status));
    }

    if (onlyFeatured) {
      list = list.filter((l) => Boolean(l.destaque));
    }

    return list;
  }, [locais, query, onlyHidden, onlyFeatured]);

const onEdit = (row) => {
  console.log("EDITANDO:", row);

  setForm({
    id: row.id,
    nome: row.nome || "",
    telefone: row.telefone || "",
    endereco: row.endereco || "",
    site: row.site || "",
    niche: row.niche || "",
    status: row.status || "",
    origem: row.origem || "",
    is_whatsapp: Boolean(row.is_whatsapp),
    instagram_url: row.instagram_url || "",
    destaque: Boolean(row.destaque),
    image_url: row.image_url || "",
    google_maps_url: row.google_maps_url || "",
    horario_fechamento: row.horario_fechamento || "",
    aberto_agora: Boolean(row.aberto_agora),
    estacionamento: Boolean(row.estacionamento),
    nota: row.nota ?? "",
    avaliacoes: row.avaliacoes ?? ""
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};



  const onDelete = async (id) => {
    if (!confirm("Excluir DEFINITIVAMENTE este local?")) return;
    setErrorLocais("");

    const { error } = await supabase.from("locais").delete().eq("id", id);
    if (error) {
      setErrorLocais(error.message);
      return;
    }

    await fetchAllLocais();
  };

const onToggleVisibility = async (row) => {
  const novoStatus =
    row.status === "PUBLICAR_APP" ? "RASCUNHO" : "PUBLICAR_APP";

  const { error } = await supabase
    .from("locais")
    .update({ status: novoStatus })
    .eq("id", row.id);

  if (error) {
    console.error(error);
    alert("Erro ao atualizar status");
    return;
  }

  await fetchAllLocais();
};




  const onSave = async () => {
    setErrorLocais("");

    if (!form.nome.trim()) {
      alert("Informe o nome do local.");
      return;
    }

    const payload = {
      nome: form.nome.trim(),
      telefone: form.telefone || null,
      endereco: form.endereco || null,
      site: form.site || null,
      niche: form.niche || null,
      status: form.status || null,
      origem: form.origem || null,
      is_whatsapp: Boolean(form.is_whatsapp),
      instagram_url: form.instagram_url || null,
      destaque: Boolean(form.destaque),
      image_url: form.image_url || null,
      google_maps_url: form.google_maps_url || null,
      horario_fechamento: form.horario_fechamento || null,
      aberto_agora: Boolean(form.aberto_agora),
      estacionamento: Boolean(form.estacionamento),
      nota: form.nota === "" ? null : form.nota,
      avaliacoes: form.avaliacoes === "" ? null : form.avaliacoes
    };

    if (form.id) {
      const { error } = await supabase.from("locais").update(payload).eq("id", form.id);
      if (error) {
        setErrorLocais(error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("locais").insert(payload);
      if (error) {
        setErrorLocais(error.message);
        return;
      }
    }

    resetForm();
    await fetchAllLocais();
  };

  /* ======================================================
     RENDER
  ====================================================== */
  console.log("FORM ATUAL:", form);
  return (
    <div style={{ padding: "24px", maxWidth: "1100px" }}>
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ marginBottom: 6 }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
          Painel de administração do Pet Finder
        </p>
      </header>

      {/* ======================================================
          SEÇÃO 1 — ORDENAÇÃO
      ====================================================== */}
      <section style={box}>
        <h2 style={h2}>Ordenação padrão da PetList</h2>
        <p style={desc}>Define como os locais aparecem ao abrir o app.</p>

        {[
          ["padrao", "Padrão (sem priorização)"],
          ["melhorNota", "Melhor nota primeiro ⭐"],
          ["maisAvaliados", "Mais avaliados primeiro 📈"],
          ["destaques", "Destaques (VIP) primeiro 🏆"]
        ].map(([key, label]) => (
          <label key={key} style={line}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === key}
              onChange={() => setOrdenacaoPadrao(key)}
            />{" "}
            {label}
          </label>
        ))}
      </section>

      {/* ======================================================
          SEÇÃO 2 — FILTROS
      ====================================================== */}
      <section style={box}>
        <h2 style={h2}>Filtros disponíveis na PetList</h2>
        <p style={desc}>Define quais filtros o usuário pode ativar no app.</p>

        {[
          ["categoria", "Categoria (Banho, Vet, Loja, Hotel)"],
          ["bemAvaliados", "Apenas bem avaliados ⭐"],
          ["instagram", "Com Instagram 📸"],
          ["whatsapp", "WhatsApp disponível 💬"],
          ["destaque", "Destaque (VIP) 🏷️"]
        ].map(([key, label]) => (
          <label key={key} style={line}>
            <input
              type="checkbox"
              checked={filtros[key]}
              onChange={() => toggleFiltro(key)}
            />{" "}
            {label}
          </label>
        ))}

        <button style={primaryBtn} onClick={salvarConfiguracoes}>
          Salvar configurações
        </button>
      </section>

      {/* ======================================================
          SEÇÃO 3 — GERENCIAR LOCAIS (SUPABASE REAL)
      ====================================================== */}
      <section style={box}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h2 style={h2}>Gerenciar Locais</h2>
            <p style={desc}>
              Lista toda a base (Supabase), com mostrar/ocultar, adicionar, editar e excluir definitivo.
            </p>
          </div>

          <button style={secondaryBtn} onClick={fetchAllLocais}>
            Recarregar base
          </button>
        </div>

        {errorLocais && (
          <div style={{ padding: 12, border: "1px solid #fecaca", background: "#fff1f2", borderRadius: 10, marginBottom: 12 }}>
            <strong>Erro:</strong> {errorLocais}
            <div style={{ fontSize: 12, color: "#7f1d1d", marginTop: 6 }}>
              Dica: se estiver vindo vazio, verifique RLS/policies de SELECT na tabela <code>locais</code>.
            </div>
          </div>
        )}

        {/* FORM (Adicionar/Editar) */}


        <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 16 }}>
                  <h3 style={{ marginTop: 0 }}>
        {form.id ? "✏️ Editando local" : "➕ Adicionar novo local"}
      </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              style={input}
              placeholder="Nome *"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
            <input
              style={input}
              placeholder="Telefone"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            />
            <input
              style={input}
              placeholder="Endereço"
              value={form.endereco}
              onChange={(e) => setForm({ ...form, endereco: e.target.value })}
            />
            <input
              style={input}
              placeholder="Site"
              value={form.site}
              onChange={(e) => setForm({ ...form, site: e.target.value })}
            />
            <input
              style={input}
              placeholder="Nicho/Categoria (niche)"
              value={form.niche}
              onChange={(e) => setForm({ ...form, niche: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
            <label style={smallLabel}>
              <input
                type="checkbox"
                checked={form.is_whatsapp}
                onChange={(e) => setForm({ ...form, is_whatsapp: e.target.checked })}
              />{" "}
              WhatsApp
            </label>

            <label style={smallLabel}>
              <input
                type="checkbox"
                checked={form.destaque}
                onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
              />{" "}
              Destaque (VIP)
            </label>

            <label style={smallLabel}>
              <input
                type="checkbox"
                checked={form.estacionamento}
                onChange={(e) => setForm({ ...form, estacionamento: e.target.checked })}
              />{" "}
              Estacionamento
            </label>

            <label style={smallLabel}>
              <input
                type="checkbox"
                checked={form.aberto_agora}
                onChange={(e) => setForm({ ...form, aberto_agora: e.target.checked })}
              />{" "}
              Aberto agora
            </label>

            <input
              style={{ ...input, width: 180 }}
              placeholder="Status (enum)"
              value={form.status || ""}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              title="Se der erro ao salvar, o enum de status não aceita esse valor."
            />
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <button style={primaryBtn} onClick={onSave}>
              {form.id ? "Atualizar local" : "Adicionar local"}
            </button>
            {form.id && (
              <button style={secondaryBtn} onClick={resetForm}>
                Cancelar edição
              </button>
            )}
          </div>
        </div>

        {/* Ferramentas da lista */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
          <input
            style={{ ...input, minWidth: 260 }}
            placeholder="Buscar por nome, endereço, niche, site, telefone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label style={smallLabel}>
            <input type="checkbox" checked={onlyHidden} onChange={(e) => setOnlyHidden(e.target.checked)} />{" "}
            Mostrar só ocultos
          </label>
          <label style={smallLabel}>
            <input type="checkbox" checked={onlyFeatured} onChange={(e) => setOnlyFeatured(e.target.checked)} />{" "}
            Mostrar só destaques
          </label>
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Total carregado: <strong>{locais.length}</strong> | Exibindo: <strong>{locaisFiltrados.length}</strong>
          </span>
        </div>

        {/* LISTA */}
        {loadingLocais ? (
          <p>Carregando locais do Supabase…</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                  <th>Nome</th>
                  <th>Niche</th>
                  <th>Status</th>
                  <th>WhatsApp</th>
                  <th>Destaque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {locaisFiltrados.map((l) => (
                  <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ minWidth: 220 }}>
                      <div style={{ fontWeight: 700 }}>{l.nome}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{l.endereco || "-"}</div>
                    </td>
                    <td>{l.niche || "-"}</td>
                    <td>
                      {isHiddenStatus(l.status) ? (
                        <span style={{ color: "#b45309", fontWeight: 700 }}>Oculto</span>
                      ) : (
                        <span style={{ color: "#16a34a", fontWeight: 700 }}>Visível</span>
                      )}
                      <div style={{ fontSize: 12, color: "#64748b" }}>{l.status || "(sem status)"}</div>
                    </td>
                    <td>{l.is_whatsapp ? "Sim" : "Não"}</td>
                    <td>{l.destaque ? "⭐" : "-"}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button style={miniBtn} onClick={() => onEdit(l)}>Editar</button>{" "}
                      <button style={miniBtn} onClick={() => onToggleVisibility(l)}>
                        {isHiddenStatus(l.status) ? "Mostrar" : "Ocultar"}
                      </button>{" "}
                      <button style={{ ...miniBtn, borderColor: "#fecaca", color: "#b91c1c" }} onClick={() => onDelete(l.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}

                {locaisFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: 14, color: "#64748b" }}>
                      Nenhum registro encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

/* ======================================================
   ESTILOS BASE (neutros, prontos p/ polish depois)
====================================================== */

const box = {
  padding: "20px",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  marginBottom: "24px",
  background: "#fff"
};

const h2 = { margin: "0 0 6px 0" };

const desc = {
  fontSize: "13px",
  color: "#64748b",
  marginBottom: "12px"
};

const line = {
  display: "block",
  marginBottom: "8px"
};

const input = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  outline: "none",
  minWidth: 220
};

const primaryBtn = {
  padding: "10px 14px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 700
};

const secondaryBtn = {
  padding: "10px 14px",
  background: "#f1f5f9",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 700
};

const miniBtn = {
  padding: "8px 10px",
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 700
};

const smallLabel = { fontSize: "13px", color: "#334155" };
