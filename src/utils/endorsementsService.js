import { doc, runTransaction, onSnapshot, collection } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase";

function skillKey(skillName) {
  return skillName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const ENDORSED_KEY = "sv_endorsed_skills";

function getEndorsedSet() {
  try {
    return new Set(JSON.parse(localStorage.getItem(ENDORSED_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveEndorsedSet(set) {
  localStorage.setItem(ENDORSED_KEY, JSON.stringify([...set]));
}

/** Has this browser already endorsed this skill? Used to disable the button after one click. */
export function hasEndorsed(skillName) {
  return getEndorsedSet().has(skillKey(skillName));
}

/** Live subscription to every skill's endorsement count, keyed by skill name. */
export function subscribeToEndorsements(callback) {
  if (!isFirebaseConfigured) {
    callback({});
    return () => {};
  }
  return onSnapshot(
    collection(db, "endorsements"),
    (snap) => {
      const counts = {};
      snap.docs.forEach((d) => {
        counts[d.data().skillName] = d.data().count || 0;
      });
      callback(counts);
    },
    (err) => {
      console.error("[endorsementsService] subscription failed:", err);
      callback({});
    }
  );
}

/** One endorsement per browser per skill (best-effort, enforced via localStorage — fine at portfolio scale). */
export async function endorseSkill(skillName) {
  if (!isFirebaseConfigured) return false;
  const key = skillKey(skillName);
  const endorsed = getEndorsedSet();
  if (endorsed.has(key)) return false;

  const ref = doc(db, "endorsements", key);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists() ? snap.data().count || 0 : 0;
    tx.set(ref, { skillName, count: current + 1 }, { merge: true });
  });

  endorsed.add(key);
  saveEndorsedSet(endorsed);
  return true;
}
