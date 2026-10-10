import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import PremiumCard from "./PremiumCard";
import { subscribeToProjects } from "../utils/projectsService";
import { analytics } from "../utils/analytics";
import { logProjectClick } from "../utils/siteAnalytics";

const TABS = ["Overview", "Architecture", "Features"];

function ProjectCard({ project, index }) {
  const [tab, setTab] = useState(0);
  const accent = ["blue", "violet", "gold"][index % 3];

  return (
    <PremiumCard as="article" delay={(index % 2) * 0.1} tilt={4} accent={accent} innerClassName="pc-project">
      <div className="pc-project__media">
        <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
        <span className="pc-project__num">{String(index + 1).padStart(2, "0")}</span>
        {project.category && <span className="pc-project__badge">{project.category}</span>}
      </div>

      <div className="p-7">
        <h3 className="font-heading font-bold text-xl tracking-tight mb-4">{project.title}</h3>

        <div className="pc-tabs" role="tablist" aria-label={`${project.title} details`}>
          {TABS.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`pc-tab ${tab === i ? "is-active" : ""}`}
            >
              {tab === i && <motion.span layoutId={`tab-${project.id}`} className="pc-tab__pill" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>

        <div className="pc-tabpanel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              {tab === 0 && (
                <>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-3">{project.summary}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{project.technicalSummary}</p>
                </>
              )}
              {tab === 1 && (
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{project.architecture}</p>
              )}
              {tab === 2 && (
                <ul className="pc-checklist">
                  {project.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-2 mt-5 mb-6">
          {project.stack.map((t) => <span key={t} className="pc-chip">{t}</span>)}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              analytics.projectClick(project.title, "github");
              logProjectClick(project.id, project.title, "github");
            }}
            className="pc-btn pc-btn--ghost"
          >
            <FaGithub /> Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              analytics.projectClick(project.title, "live_demo");
              logProjectClick(project.id, project.title, "live_demo");
            }}
            className="pc-btn pc-btn--solid"
          >
            <FaArrowUpRightFromSquare /> Live Demo
          </a>
        </div>
      </div>
    </PremiumCard>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsub = subscribeToProjects(setProjects);
    return unsub;
  }, []);

  return (
    <section id="projects" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've shipped"
          subtitle="Switch between Overview, Architecture and Features on every project."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
