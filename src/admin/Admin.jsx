import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";
import AdminLogin from "./AdminLogin";
import AnalyticsTab from "./AnalyticsTab";
import ProjectsTab from "./ProjectsTab";

const TABS = [
  { id: "analytics", label: "Analytics" },
  { id: "projects", label: "Projects" },
];

export default function Admin() {
  const { user, loading, login, logout } = useAdminAuth();
  const [tab, setTab] = useState("analytics");

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-secondary text-white">Loading…</div>;
  }

  if (!user) {
    return <AdminLogin login={login} />;
  }

  return (
    <div className="min-h-screen bg-secondary text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-lg">Sarafraj Navaz Portfolio · Admin</h1>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs font-semibold text-slate-300 hover:text-white">
            ← Back to site
          </Link>
          <button onClick={logout} className="text-xs font-semibold px-4 py-2 rounded-lg border border-white/15 hover:border-primary">
            Sign Out
          </button>
        </div>
      </header>

      <nav className="px-6 pt-6 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              tab === t.id ? "bg-primary text-white" : "text-slate-300 hover:bg-white/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="p-6 max-w-6xl">
        {tab === "analytics" && <AnalyticsTab />}
        {tab === "projects" && <ProjectsTab />}
      </main>
    </div>
  );
}
