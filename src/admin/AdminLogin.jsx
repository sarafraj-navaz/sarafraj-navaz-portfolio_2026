import { useState } from "react";
import { isFirebaseConfigured } from "../firebase";

export default function AdminLogin({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen grid place-items-center bg-secondary text-white px-6">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-heading font-bold text-2xl">Admin dashboard is not configured yet</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Add your Firebase project credentials to <code className="text-accent">.env</code> as{" "}
            <code className="text-accent">VITE_FIREBASE_*</code> variables, then create yourself an
            Authentication user (email + password) in the Firebase console. See{" "}
            <code className="text-accent">README.md</code> for the full walkthrough.
          </p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-secondary px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white/[0.04] border border-white/10 rounded-2xl p-8 space-y-4">
        <h1 className="font-heading font-bold text-xl text-white text-center mb-2">Admin Login</h1>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-white text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-white text-sm outline-none focus:border-primary"
          />
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button type="submit" disabled={busy} className="btn-gradient w-full py-3 text-sm disabled:opacity-60">
          {busy ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
