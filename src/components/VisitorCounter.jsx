import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase";

export default function VisitorCounter({ compact = false }) {
  const [visits, setVisits] = useState(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setUnavailable(true);
      return undefined;
    }

    // Live subscription keeps the public count in sync without refreshing.
    const unsubscribe = onSnapshot(
      doc(db, "counters", "site"),
      (snap) => {
        setVisits(snap.exists() ? Number(snap.data().totalVisits || 0) : 0);
        setUnavailable(false);
      },
      (error) => {
        console.error("[VisitorCounter] live count unavailable:", error);
        setUnavailable(true);
      }
    );

    return unsubscribe;
  }, []);

  const count = visits === null ? "—" : visits.toLocaleString();

  if (compact) {
    return (
      <div className="visitor-counter visitor-counter--compact glass-surface" aria-label={`Portfolio visitors: ${count}`}>
        <span className="visitor-counter__dot" />
        <FaUsers aria-hidden="true" />
        <span>{count}</span>
        <small>{unavailable ? "Count offline" : "Visitors"}</small>
      </div>
    );
  }

  return (
    <div className="visitor-counter glass-surface" aria-label={`Portfolio visitors: ${count}`}>
      <div className="visitor-counter__icon"><FaUsers aria-hidden="true" /></div>
      <div>
        <span className="visitor-counter__label">Portfolio Visitors</span>
        <strong>{count}</strong>
        <span className="visitor-counter__sub">
          {unavailable ? "Connect Firebase to enable live count" : "Thanks for stopping by"}
        </span>
      </div>
    </div>
  );
}
