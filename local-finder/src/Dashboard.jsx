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
     SEÇÃO 2 — FILTROS ATIVOS NA PETLIST (checklist que controla UI do App)
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
    console.log("Ordenação padrão:", ordenacaoPadrao);
    console.log("Filtros ativos:", filtros);
    alert("Configurações salvas (mock).");
  };

  /* ======================================================
     SEÇÃO 3 — CRUD REAL (SUPABASE: tabela locais)
  ====================================================== */
  const STATUS_VISIBLE = "ativo";
  const STATUS_HIDDEN = "oculto";

  const [locais, setLocais] = useState([]);
  const [loadingLocais, setLoadingLocais] = useState(true);
  const [errorLocais, setErrorLocais] = useState("");

  const [query, setQuery] = useState("");
  const [onlyHidden, setOnlyHidden] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);

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
      ...form,
      id: null,
      nome: "",
      telefone: "",
      endereco: "",
      site: "",
      niche: "",
      origem: "",
      instagram_url: "",
      image_url: "",
      google_maps_url: "",
      horario_fechamento: "",
      nota: null,
      avaliacoes: null
    });
  };

  const isHiddenStatus = (s) =>
    ["oculto", "hidden", "inativo", "offline"].includes(
      (s || "").toString().toLowerCase()
    );

  const fetchAllLocais = async () => {
    setLoadingLocais(true);
    setErrorLocais("");

    try {
      const { data, error } = await supabase
        .from("locais")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLocais(data || []);
    } catch (err) {
      setErrorLocais(err.message);
    } finally {
      setLoadingLocais(false);
    }
  };

  useEffect(() => {
    fetchAllLocais();
  }, []);

  const locaisFiltrados = useMemo(() => {
    let list = [...locais];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((l) =>
        [l.nome, l.endereco, l.niche, l.site, l.telefone]
          .filter(Boolean)
          .some((x) => x.toLowerCase().includes(q))
      );
    }

    if (onlyHidden) list = list.filter((l) => isHiddenStatus(l.status));
    if (onlyFeatured) list = list.filter((l) => l.destaque);

    return list;
  }, [locais, query, onlyHidden, onlyFeatured]);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onEdit = (row) => {
    setForm({
      id: row.id,
      nome: row.nome || "",
      telefone: row.telefone || "",
      endereco: row.endereco || "",
      site: row.site || "",
      niche: row.niche || "",
      status: row.status || STATUS_VISIBLE,
      origem: row.origem || "",
      is_whatsapp: Boolean(row.is_whatsapp),
      instagram_url: row.instagram_url || "",
      destaque: Boolean(row.destaque),
      image_url: row.image_url || "",
      google_maps_url: row.google_maps_url || "",
      horario_fechamento: row.horario_fechamento || "",
      aberto_agora: Boolean(row.aberto_agora),
      estacionamento: Boolean(row.estacionamento),
      nota: row.nota ?? null,
      avaliacoes: row.avaliacoes ?? null
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este local?")) return;

    try {
      const { error } = await supabase.from("locais").delete().eq("id", id);
      if (error) throw error;
      await fetchAllLocais();
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nome: form.nome,
      telefone: form.telefone,
      endereco: form.endereco,
      site: form.site,
      niche: form.niche,
      status: form.status,
      origem: form.origem,
      is_whatsapp: form.is_whatsapp,
      instagram_url: form.instagram_url,
      destaque: form.destaque,
      image_url: form.image_url,
      google_maps_url: form.google_maps_url,
      horario_fechamento: form.horario_fechamento,
      aberto_agora: form.aberto_agora,
      estacionamento: form.estacionamento,
      nota: form.nota === "" ? null : form.nota,
      avaliacoes: form.avaliacoes === "" ? null : form.avaliacoes
    };

    try {
      if (form.id) {
        const { error } = await supabase
          .from("locais")
          .update(payload)
          .eq("id", form.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("locais").insert([payload]);
        if (error) throw error;
      }

      resetForm();
      await fetchAllLocais();
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }
  };


  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

useEffect(() => {
  const onResize = () => setIsMobile(window.innerWidth < 900);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);


  return (
    <div className="p-lg">
      <header className="mb-lg">
        <h1 style={{ marginBottom: 6 }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
          Painel de administração do Pet Finder
        </p>
      </header>

      {/* ======================================================
          SEÇÃO 1 — ORDENAÇÃO PADRÃO
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 1 — Ordenação Padrão</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "padrao"}
              onChange={() => setOrdenacaoPadrao("padrao")}
            />
            <span style={{ marginLeft: 8 }}>Padrão (created_at)</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "melhor_nota"}
              onChange={() => setOrdenacaoPadrao("melhor_nota")}
            />
            <span style={{ marginLeft: 8 }}>Melhor nota</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "mais_avaliados"}
              onChange={() => setOrdenacaoPadrao("mais_avaliados")}
            />
            <span style={{ marginLeft: 8 }}>Mais avaliados</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              name="ordenacao"
              checked={ordenacaoPadrao === "destaques"}
              onChange={() => setOrdenacaoPadrao("destaques")}
            />
            <span style={{ marginLeft: 8 }}>Destaques</span>
          </label>
        </div>
      </div>

      {/* ======================================================
          SEÇÃO 2 — FILTROS ATIVOS
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 2 — Filtros Ativos na PetList</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.categoria}
              onChange={() => toggleFiltro("categoria")}
            />
            <span style={{ marginLeft: 8 }}>Filtro categoria</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.bemAvaliados}
              onChange={() => toggleFiltro("bemAvaliados")}
            />
            <span style={{ marginLeft: 8 }}>Bem avaliados</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.instagram}
              onChange={() => toggleFiltro("instagram")}
            />
            <span style={{ marginLeft: 8 }}>Com Instagram</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.whatsapp}
              onChange={() => toggleFiltro("whatsapp")}
            />
            <span style={{ marginLeft: 8 }}>Com WhatsApp</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={filtros.destaque}
              onChange={() => toggleFiltro("destaque")}
            />
            <span style={{ marginLeft: 8 }}>Somente destaques</span>
          </label>
        </div>

        <div style={{ marginTop: 14 }}>
          <button style={primaryBtn} onClick={salvarConfiguracoes}>
            Salvar configurações (mock)
          </button>
        </div>
      </div>

      {/* ======================================================
          SEÇÃO 3 — CRUD LOCAIS (SUPABASE)
      ====================================================== */}
      <div style={box}>
        <h2 style={h2}>Seção 3 — CRUD Locais (Supabase)</h2>

        {/* Busca / filtros */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <input
            style={{ ...input, minWidth: 260 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome/endereço/nicho/site/telefone..."
          />

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={onlyHidden}
              onChange={() => setOnlyHidden((v) => !v)}
            />
            <span style={{ marginLeft: 8 }}>Somente ocultos</span>
          </label>

          <label style={checkLabel}>
            <input
              type="checkbox"
              checked={onlyFeatured}
              onChange={() => setOnlyFeatured((v) => !v)}
            />
            <span style={{ marginLeft: 8 }}>Somente destaques</span>
          </label>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input
              style={input}
              value={form.nome}
              onChange={(e) => onChange("nome", e.target.value)}
              placeholder="Nome"
              required
            />

            <input
              style={input}
              value={form.telefone}
              onChange={(e) => onChange("telefone", e.target.value)}
              placeholder="Telefone"
            />

            <input
              style={input}
              value={form.endereco}
              onChange={(e) => onChange("endereco", e.target.value)}
              placeholder="Endereço"
            />

            <input
              style={input}
              value={form.site}
              onChange={(e) => onChange("site", e.target.value)}
              placeholder="Site"
            />

            <input
              style={input}
              value={form.niche}
              onChange={(e) => onChange("niche", e.target.value)}
              placeholder="Nicho (banho/vet/loja/hotel...)"
            />

            <input
              style={input}
              value={form.origem}
              onChange={(e) => onChange("origem", e.target.value)}
              placeholder="Origem"
            />

            <input
              style={input}
              value={form.instagram_url}
              onChange={(e) => onChange("instagram_url", e.target.value)}
              placeholder="Instagram URL"
            />

            <input
              style={input}
              value={form.image_url}
              onChange={(e) => onChange("image_url", e.target.value)}
              placeholder="Image URL"
            />

            <input
              style={input}
              value={form.google_maps_url}
              onChange={(e) => onChange("google_maps_url", e.target.value)}
              placeholder="Google Maps URL"
            />

            <input
              style={input}
              value={form.horario_fechamento}
              onChange={(e) => onChange("horario_fechamento", e.target.value)}
              placeholder="Horário fechamento (ex: 19:30)"
            />

            <input
              style={input}
              value={form.nota ?? ""}
              onChange={(e) => onChange("nota", e.target.value)}
              placeholder="Nota (ex: 4.7)"
            />

            <input
              style={input}
              value={form.avaliacoes ?? ""}
              onChange={(e) => onChange("avaliacoes", e.target.value)}
              placeholder="Avaliações (ex: 120)"
            />
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.is_whatsapp}
                onChange={() => onChange("is_whatsapp", !form.is_whatsapp)}
              />
              <span style={{ marginLeft: 8 }}>WhatsApp</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.destaque}
                onChange={() => onChange("destaque", !form.destaque)}
              />
              <span style={{ marginLeft: 8 }}>Destaque</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.aberto_agora}
                onChange={() => onChange("aberto_agora", !form.aberto_agora)}
              />
              <span style={{ marginLeft: 8 }}>Aberto agora</span>
            </label>

            <label style={checkLabel}>
              <input
                type="checkbox"
                checked={form.estacionamento}
                onChange={() => onChange("estacionamento", !form.estacionamento)}
              />
              <span style={{ marginLeft: 8 }}>Estacionamento</span>
            </label>

            <select
              style={{ ...input, width: 200 }}
              value={form.status}
              onChange={(e) => onChange("status", e.target.value)}
            >
              <option value={STATUS_VISIBLE}>Visível</option>
              <option value={STATUS_HIDDEN}>Oculto</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button style={primaryBtn} type="submit">
              {form.id ? "Atualizar" : "Criar"}
            </button>
            <button style={secondaryBtn} type="button" onClick={resetForm}>
              Limpar
            </button>
          </div>
        </form>

        {/* Lista/Tabela */}
        <div style={{ marginTop: 18 }}>
          {loadingLocais && <div style={{ color: "#64748b" }}>Carregando locais...</div>}
          {errorLocais && <div style={{ color: "#b91c1c" }}>Erro: {errorLocais}</div>}

{!loadingLocais && !errorLocais && (
  <>
    {isMobile ? (
      <div style={{ display: "grid", gap: 12 }}>
        {locaisFiltrados.map((l) => (
          <div key={l.id} style={box}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{l.nome}</div>
            <div style={{ color: "#475569", fontSize: 13, marginBottom: 6 }}>
              <strong>Nicho:</strong> {l.niche || "-"} &nbsp; | &nbsp;
              <strong>Status:</strong> {l.status || "-"} &nbsp; | &nbsp;
              <strong>Destaque:</strong> {l.destaque ? "⭐" : "-"}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={miniBtn} onClick={() => onEdit(l)}>Editar</button>
              <button style={miniBtn} onClick={() => onDelete(l.id)}>Deletar</button>
            </div>
          </div>
        ))}

        {locaisFiltrados.length === 0 && (
          <div style={{ color: "#475569" }}>Nenhum local encontrado.</div>
        )}
      </div>
    ) : (
      <div style={{ width: "100%" }}>
        <table style={{ ...table, minWidth: "unset" }}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>Nicho</th>
              <th style={th}>Status</th>
              <th style={th}>Destaque</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {locaisFiltrados.map((l) => (
              <tr key={l.id}>
                <td style={td}>{l.nome}</td>
                <td style={td}>{l.niche}</td>
                <td style={td}>{l.status}</td>
                <td style={td}>{l.destaque ? "⭐" : ""}</td>
                <td style={td}>
                  <button style={miniBtn} onClick={() => onEdit(l)}>Editar</button>
                  <button style={{ ...miniBtn, marginLeft: 8 }} onClick={() => onDelete(l.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
            {locaisFiltrados.length === 0 && (
              <tr>
                <td style={td} colSpan={5}>
                  Nenhum local encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </>
)}

        </div>
      </div>
    </div>
  );
}

/* ======================================================
   ESTILOS LOCAIS (mantidos — admin/backoffice)
====================================================== */

const box = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 18,
  marginBottom: 18,
  boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
};

const h2 = {
  fontSize: 16,
  margin: "0 0 12px 0"
};

const radioLabel = {
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  color: "#334155"
};

const checkLabel = {
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  color: "#334155"
};

const input = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: 14
};

const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #1d4ed8",
  background: "#1d4ed8",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  background: "#fff",
  color: "#0f172a",
  fontWeight: 700,
  cursor: "pointer"
};

const miniBtn = {
  padding: "6px 10px",
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600
};

const table = {
  width: "100%",
  minWidth: "760px",      // <-- força scroll quando a tela é estreita
  borderCollapse: "collapse"
};

const th = {
  textAlign: "left",
  padding: 10,
  fontSize: 13,
  borderBottom: "1px solid #e2e8f0",
  color: "#475569",
  whiteSpace: "nowrap"
};

const td = {
  padding: 10,
  fontSize: 13,
  borderBottom: "1px solid #f1f5f9",
  color: "#0f172a",
  whiteSpace: "nowrap"
};
