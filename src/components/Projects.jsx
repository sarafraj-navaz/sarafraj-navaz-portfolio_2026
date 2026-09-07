import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import { useTilt } from "../hooks/useTilt";
import { subscribeToProjects } from "../utils/projectsService";
import { analytics } from "../utils/analytics";
import { logProjectClick } from "../utils/siteAnalytics";

function ProjectCard({ project }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      ref={ref}
      onMouseMove={(e) => {
        onMouseMove(e);
        setHovered(true);
      }}
      onMouseLeave={() => {
        onMouseLeave();
        setHovered(false);
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="group rounded-[1.6rem] overflow-hidden bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.08] shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] hover:shadow-[0_30px_60px_-18px_rgba(37,99,235,0.35)] transition-shadow will-change-transform"
    >
      {/* image + hover overlay */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-secondary/92 backdrop-blur-sm p-6 flex flex-col overflow-y-auto"
            >
              <h4 className="font-heading font-bold text-white text-base mb-2">Technical Summary</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">{project.technicalSummary}</p>

              <h4 className="font-heading font-bold text-white text-base mb-1">Architecture</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">{project.architecture}</p>

              <h4 className="font-heading font-bold text-white text-base mb-1">Key Features</h4>
              <ul className="text-slate-300 text-xs leading-relaxed mb-3 list-disc list-inside space-y-0.5">
                {project.features.map((f) => <li key={f}>{f}</li>)}
              </ul>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {project.stack.map((t) => (
                  <span key={t} className="text-[0.65rem] font-semibold px-2 py-1 rounded-md bg-white/10 text-accent">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-7">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading font-bold text-xl">{project.title}</h3>
          {project.category && (
            <span className="shrink-0 text-[0.65rem] font-semibold px-2.5 py-1 rounded-md bg-primary/10 text-primary">
              {project.category}
            </span>
          )}
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">{project.summary}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((t) => (
            <span key={t} className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-md bg-secondary/5 dark:bg-white/[0.07] text-secondary dark:text-slate-300">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              analytics.projectClick(project.title, "github");
              logProjectClick(project.id, project.title, "github");
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 hover:border-primary hover:text-primary transition-colors"
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
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-accent transition-colors"
          >
            <FaArrowUpRightFromSquare /> Live Demo
          </a>
        </div>
      </div>
    </motion.article>
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
          subtitle="Hover any project to see the technical summary, architecture and stack."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
