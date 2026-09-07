import { useEffect, useState } from "react";
import {
  subscribeToProjects,
  createProject,
  updateProject,
  deleteProject,
  importFallbackProjectsToFirestore,
} from "../utils/projectsService";
import { isFirebaseConfigured } from "../firebase";

const EMPTY = {
  title: "",
  category: "Full Stack",
  image: "",
  summary: "",
  technicalSummary: "",
  architecture: "",
  features: "",
  stack: "",
  github: "",
  live: "",
};

const CATEGORIES = ["Full Stack", "Frontend", "Backend", "E-commerce", "Personal", "Client Work"];

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [filter, setFilter] = useState("All");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProjects(setProjects);
    return unsub;
  }, []);

  const usingFallback = projects.length > 0 && !projects[0]?.createdAt && !projects[0]?.order;

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      title: p.title || "",
      category: p.category || "Full Stack",
      image: p.image || "",
      summary: p.summary || "",
      technicalSummary: p.technicalSummary || "",
      architecture: p.architecture || "",
      features: (p.features || []).join("\n"),
      stack: (p.stack || []).join(", "),
      github: p.github || "",
      live: p.live || "",
    });
  }

  function startNew() {
    setEditingId("new");
    setForm(EMPTY);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      category: form.category,
      image: form.image,
      summary: form.summary,
      technicalSummary: form.technicalSummary,
      architecture: form.architecture,
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      github: form.github,
      live: form.live,
    };
    try {
      if (editingId === "new") {
        await createProject(payload);
      } else {
        await updateProject(editingId, payload);
      }
      cancelEdit();
    } catch (err) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    await deleteProject(id);
  }

  const categories = ["All", ...new Set(projects.map((p) => p.category || "Full Stack"))];
  const visible = filter === "All" ? projects : projects.filter((p) => (p.category || "Full Stack") === filter);

  if (!isFirebaseConfigured) {
    return <p className="text-slate-400 text-sm">Connect Firebase to manage projects here — see README.md.</p>;
  }

  return (
    <div className="space-y-6">
      {usingFallback && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <span>
            You're viewing the built-in sample projects — nothing has been saved to Firestore yet.
            Import them to start editing, or add fresh ones.
          </span>
          <button
            onClick={() => importFallbackProjectsToFirestore()}
            className="shrink-0 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-xs font-semibold"
          >
            Import sample projects
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                filter === c ? "bg-primary text-white border-primary" : "border-white/15 text-slate-300 hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button onClick={startNew} className="btn-gradient px-4 py-2.5 text-xs">
          + Add Project
        </button>
      </div>

      {editingId && (
        <form onSubmit={handleSave} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold">{editingId === "new" ? "New Project" : "Edit Project"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-300">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/15 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <Field label="Image path (e.g. /images/project-x.jpg)" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} />
          <Field label="Summary" value={form.summary} onChange={(v) => setForm((f) => ({ ...f, summary: v }))} textarea />
          <Field label="Technical Summary" value={form.technicalSummary} onChange={(v) => setForm((f) => ({ ...f, technicalSummary: v }))} textarea />
          <Field label="Architecture" value={form.architecture} onChange={(v) => setForm((f) => ({ ...f, architecture: v }))} textarea />
          <Field label="Features (one per line)" value={form.features} onChange={(v) => setForm((f) => ({ ...f, features: v }))} textarea />
          <Field label="Tech stack (comma separated)" value={form.stack} onChange={(v) => setForm((f) => ({ ...f, stack: v }))} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="GitHub URL" value={form.github} onChange={(v) => setForm((f) => ({ ...f, github: v }))} />
            <Field label="Live URL" value={form.live} onChange={(v) => setForm((f) => ({ ...f, live: v }))} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-gradient px-5 py-2.5 text-sm disabled:opacity-60">
              {saving ? "Saving..." : "Save Project"}
            </button>
            <button type="button" onClick={cancelEdit} className="px-5 py-2.5 text-sm rounded-lg border border-white/15">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {visible.map((p) => (
          <div key={p.id} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-start gap-2 mb-2">
              <h4 className="font-semibold text-sm">{p.title}</h4>
              <span className="shrink-0 text-[0.65rem] font-semibold px-2 py-1 rounded-md bg-white/10 text-accent">
                {p.category || "Full Stack"}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2 mb-3">{p.summary}</p>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-xs px-3 py-1.5 rounded-lg border border-white/15 hover:border-primary">
                Edit
              </button>
              {p.id && usingFallback === false && (
                <button onClick={() => handleDelete(p.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10">
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea, required }) {
  const props = {
    value,
    required,
    onChange: (e) => onChange(e.target.value),
    className: "w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/15 text-sm outline-none focus:border-primary",
  };
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 text-slate-300">{label}</label>
      {textarea ? <textarea rows={3} {...props} /> : <input type="text" {...props} />}
    </div>
  );
}
