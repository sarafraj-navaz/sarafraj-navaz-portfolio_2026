import {
  collection,
  addDoc,
  doc,
  runTransaction,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase";

const SESSION_KEY = "sv_session_id";

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Logs one page visit per browser tab session, and bumps the running total counter. */
export async function logVisit() {
  if (!isFirebaseConfigured) return;
  const sessionId = getSessionId();
  const alreadyLogged = sessionStorage.getItem("sv_visit_logged");
  if (alreadyLogged) return;
  sessionStorage.setItem("sv_visit_logged", "1");

  try {
    await addDoc(collection(db, "visits"), {
      sessionId,
      path: window.location.pathname,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screen: `${window.screen.width}x${window.screen.height}`,
      createdAt: serverTimestamp(),
    });

    const counterRef = doc(db, "counters", "site");
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(counterRef);
      const current = snap.exists() ? snap.data().totalVisits || 0 : 0;
      tx.set(counterRef, { totalVisits: current + 1 }, { merge: true });
    });
  } catch (err) {
    console.error("[siteAnalytics] logVisit failed:", err);
  }
}

/** Logs a project interaction (github / live_demo click) and bumps that project's counter. */
export async function logProjectClick(projectId, projectTitle, destination) {
  if (!isFirebaseConfigured) return;
  try {
    await addDoc(collection(db, "projectEvents"), {
      sessionId: getSessionId(),
      projectId,
      projectTitle,
      destination,
      createdAt: serverTimestamp(),
    });

    const counterRef = doc(db, "counters", `project_${projectId}`);
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(counterRef);
      const current = snap.exists() ? snap.data().clicks || 0 : 0;
      tx.set(counterRef, { clicks: current + 1, projectTitle }, { merge: true });
    });
  } catch (err) {
    console.error("[siteAnalytics] logProjectClick failed:", err);
  }
}

/** Reads everything the admin analytics tab needs in one go. */
export async function getAnalyticsSummary() {
  if (!isFirebaseConfigured) return null;

  const siteCounterSnap = await getDoc(doc(db, "counters", "site"));
  const totalVisits = siteCounterSnap.exists() ? siteCounterSnap.data().totalVisits || 0 : 0;

  const recentVisitsQ = query(collection(db, "visits"), orderBy("createdAt", "desc"), limit(25));
  const recentVisitsSnap = await getDocs(recentVisitsQ);
  const recentVisits = recentVisitsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  const recentClicksQ = query(collection(db, "projectEvents"), orderBy("createdAt", "desc"), limit(50));
  const recentClicksSnap = await getDocs(recentClicksQ);
  const recentClicks = recentClicksSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Aggregate per-project totals from the counters collection.
  const countersSnap = await getDocs(collection(db, "counters"));
  const projectTotals = countersSnap.docs
    .filter((d) => d.id.startsWith("project_"))
    .map((d) => ({
      projectId: d.id.replace("project_", ""),
      projectTitle: d.data().projectTitle || d.id,
      clicks: d.data().clicks || 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);

  return { totalVisits, recentVisits, recentClicks, projectTotals };
}
