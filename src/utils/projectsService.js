import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase";
import { PROJECTS as FALLBACK_PROJECTS } from "../data/projects";

const COLLECTION = "projects";

/** Seed data used until you add real entries from /admin, or if Firebase isn't configured. */
export function getFallbackProjects() {
  return FALLBACK_PROJECTS.map((p) => ({ ...p, category: p.category || "Full Stack" }));
}

/** One-time fetch (used for the public Projects section on first paint / no-JS-listener contexts). */
export async function fetchProjects() {
  if (!isFirebaseConfigured) return getFallbackProjects();
  const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
  const snap = await getDocs(q);
  if (snap.empty) return getFallbackProjects();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Live subscription — public Projects section and the admin table both use this. */
export function subscribeToProjects(callback) {
  if (!isFirebaseConfigured) {
    callback(getFallbackProjects());
    return () => {};
  }
  const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      if (snap.empty) {
        callback(getFallbackProjects());
      } else {
        callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    },
    (err) => {
      console.error("[projectsService] subscription failed:", err);
      callback(getFallbackProjects());
    }
  );
}

export async function createProject(data) {
  return addDoc(collection(db, COLLECTION), { ...data, order: data.order ?? Date.now() });
}

export async function updateProject(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteProject(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}

/** One-click migration: pushes the static seed projects into Firestore so you can start editing them. */
export async function importFallbackProjectsToFirestore() {
  const seed = getFallbackProjects();
  await Promise.all(
    seed.map((p, i) =>
      addDoc(collection(db, COLLECTION), { ...p, order: i, createdAt: Date.now() })
    )
  );
}
