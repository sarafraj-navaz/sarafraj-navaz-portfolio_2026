import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { doc, getDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase";

export default function VisitorCounter({ compact = false }) {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!isFirebaseConfigured) return;
      try {
        const snap = await getDoc(doc(db, "counters", "site"));
        if (active) setVisits(snap.exists() ? Number(snap.data().totalVisits || 0) : 0);
      } catch (error) {
        console.error("[VisitorCounter] failed:", error);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  if (compact) {
    return (
      <div className="visitor-counter visitor-counter--compact" aria-label="Portfolio visitor count">
        <span className="visitor-counter__dot" />
        <FaUsers aria-hidden="true" />
        <span>{visits === null ? "—" : visits.toLocaleString()}</span>
        <small>Visitors</small>
      </div>
    );
  }

  return (
    <div className="visitor-counter" aria-label="Portfolio visitor count">
      <div className="visitor-counter__icon"><FaUsers aria-hidden="true" /></div>
      <div>
        <span className="visitor-counter__label">Portfolio Visitors</span>
        <strong>{visits === null ? "—" : visits.toLocaleString()}</strong>
        <span className="visitor-counter__sub">Thank you for visiting</span>
      </div>
    </div>
  );
}
