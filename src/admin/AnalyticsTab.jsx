import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "../utils/siteAnalytics";

function timeAgo(ts) {
  if (!ts) return "just now";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return date.toLocaleDateString();
}

export default function AnalyticsTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsSummary()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-400 text-sm">Loading analytics…</p>;
  if (!data) return <p className="text-slate-400 text-sm">Analytics unavailable.</p>;

  const totalClicks = data.projectTotals.reduce((sum, p) => sum + p.clicks, 0);

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total Visits" value={data.totalVisits} />
        <StatCard label="Project Interactions" value={totalClicks} />
        <StatCard label="Tracked Projects" value={data.projectTotals.length} />
      </div>

      <div>
        <h3 className="font-heading font-bold text-lg mb-3">Most Engaged Projects</h3>
        {data.projectTotals.length === 0 ? (
          <p className="text-slate-400 text-sm">No project clicks yet — they'll show up here as visitors interact with your project cards.</p>
        ) : (
          <div className="space-y-2">
            {data.projectTotals.map((p) => {
              const pct = totalClicks ? Math.round((p.clicks / totalClicks) * 100) : 0;
              return (
                <div key={p.projectId} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold">{p.projectTitle}</span>
                    <span className="text-slate-400">{p.clicks} clicks</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-heading font-bold text-lg mb-3">Recent Visitors</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {data.recentVisits.length === 0 && <p className="text-slate-400 text-sm">No visits logged yet.</p>}
            {data.recentVisits.map((v) => (
              <div key={v.id} className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-xs">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>{timeAgo(v.createdAt)}</span>
                  <span>{v.language}</span>
                </div>
                <p className="truncate text-slate-300">{v.referrer || "Direct visit"}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-lg mb-3">Recent Project Interactions</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {data.recentClicks.length === 0 && <p className="text-slate-400 text-sm">No interactions logged yet.</p>}
            {data.recentClicks.map((c) => (
              <div key={c.id} className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-xs flex justify-between">
                <span className="text-slate-300">{c.projectTitle} · {c.destination}</span>
                <span className="text-slate-500">{timeAgo(c.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="font-heading font-bold text-3xl">{value}</p>
    </div>
  );
}
