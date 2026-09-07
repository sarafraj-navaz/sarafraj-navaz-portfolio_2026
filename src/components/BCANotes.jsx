import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaBookOpen,
  FaCircleCheck,
  FaClock,
  FaDownload,
  FaFilePdf,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import AnimatedCard from "./AnimatedCard";
import { getBcaNotes, getBcaSyllabus } from "../data/bcaNotes";

const FILTERS = [
  { value: "all", label: "All Units" },
  { value: "available", label: "Available" },
  { value: "soon", label: "Coming Soon" },
];

function UnitRow({ unit, index }) {
  if (!unit.available) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className="bca-unit bca-unit--soon"
        aria-label={`Unit ${unit.unitNumber}, coming soon`}
      >
        <div className="bca-unit__identity">
          <div className="bca-unit__icon bca-unit__icon--muted" aria-hidden="true">
            <FaClock />
          </div>
          <div>
            <p className="bca-unit__title">Unit {unit.unitNumber}</p>
            <p className="bca-unit__meta">Study material will be added soon</p>
          </div>
        </div>
        <span className="bca-status bca-status--soon">
          <FaClock aria-hidden="true" />
          Coming Soon
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="bca-unit bca-unit--available"
    >
      <div className="bca-unit__identity">
        <div className="bca-unit__icon" aria-hidden="true">
          <FaFilePdf />
        </div>
        <div>
          <p className="bca-unit__title">Unit {unit.unitNumber}</p>
          <p className="bca-unit__meta bca-unit__meta--available">
            <FaCircleCheck aria-hidden="true" /> Notes Available
          </p>
        </div>
      </div>

      <div className="bca-unit__actions">
        <a
          href={unit.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View PDF for Unit ${unit.unitNumber}`}
          className="bca-action bca-action--outline"
        >
          <FaArrowUpRightFromSquare aria-hidden="true" />
          <span>View PDF</span>
        </a>
        <a
          href={unit.downloadUrl}
          download={unit.downloadName}
          aria-label={`Download PDF for Unit ${unit.unitNumber}`}
          className="bca-action bca-action--primary"
        >
          <FaDownload aria-hidden="true" />
          <span>Download</span>
        </a>
      </div>
    </motion.div>
  );
}

function SubjectCard({ subject, delay, search, filter }) {
  const availableCount = subject.units.filter((u) => u.available).length;
  const subjectMatches = subject.title.toLowerCase().includes(search.toLowerCase());
  const filteredUnits = subject.units.filter((unit) => {
    const matchesSearch = !search || subjectMatches || `unit ${unit.unitNumber}`.includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "available" && unit.available) ||
      (filter === "soon" && !unit.available);
    return matchesSearch && matchesFilter;
  });

  if (!subjectMatches && filteredUnits.length === 0) return null;

  return (
    <AnimatedCard delay={delay} hover={false} className="bca-subject-card">
      <div className="bca-subject-card__header">
        <div className="bca-subject-card__title-wrap">
          <div className="bca-subject-card__icon" aria-hidden="true">
            <FaBookOpen />
          </div>
          <div className="min-w-0">
            <p className="bca-subject-card__eyebrow">BCA Subject</p>
            <h3>{subject.title}</h3>
          </div>
        </div>
        <div className="bca-progress-badge" aria-label={`${availableCount} of ${subject.units.length} units available`}>
          <strong>{availableCount}</strong>
          <span>/{subject.units.length}</span>
        </div>
      </div>

      <div className="bca-progress-track" aria-hidden="true">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${(availableCount / subject.units.length) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: delay + 0.15 }}
        />
      </div>

      <div className="bca-unit-list">
        {filteredUnits.length > 0 ? (
          filteredUnits.map((unit, index) => <UnitRow key={unit.unitNumber} unit={unit} index={index} />)
        ) : (
          <div className="bca-empty-mini">No units match your current filter.</div>
        )}
      </div>
    </AnimatedCard>
  );
}

function SyllabusCard({ syllabus }) {
  return (
    <motion.div
      className={`bca-syllabus ${syllabus.available ? "bca-syllabus--available" : "bca-syllabus--soon"}`}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <div className="bca-syllabus__icon" aria-hidden="true"><FaBookOpen /></div>
      <div className="bca-syllabus__copy">
        <span className="bca-syllabus__eyebrow">Academic roadmap</span>
        <h3>Complete BCA Syllabus</h3>
        <p>
          {syllabus.available
            ? "View or download the complete syllabus before starting your unit-wise preparation."
            : "Add public/pdf/bca/syllabus.pdf later and this section will activate automatically."}
        </p>
      </div>
      {syllabus.available ? (
        <div className="bca-syllabus__actions">
          <a href={syllabus.viewUrl} target="_blank" rel="noopener noreferrer" className="bca-action bca-action--outline">
            <FaArrowUpRightFromSquare aria-hidden="true" /> View Syllabus
          </a>
          <a href={syllabus.downloadUrl} download={syllabus.downloadName} className="bca-action bca-action--primary">
            <FaDownload aria-hidden="true" /> Download
          </a>
        </div>
      ) : (
        <span className="bca-status bca-status--soon"><FaClock aria-hidden="true" /> Coming Soon</span>
      )}
    </motion.div>
  );
}

export default function BCANotes() {
  const subjects = useMemo(() => getBcaNotes(), []);
  const syllabus = useMemo(() => getBcaSyllabus(), []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const availableUnits = subjects.reduce((sum, subject) => sum + subject.units.filter((u) => u.available).length, 0);
  const totalUnits = subjects.reduce((sum, subject) => sum + subject.units.length, 0);
  const percent = Math.round((availableUnits / totalUnits) * 100);

  return (
    <section id="bca" className="bca-section">
      <div className="bca-orb bca-orb--one" aria-hidden="true" />
      <div className="bca-orb bca-orb--two" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <SectionHeading
          eyebrow="BCA Study Hub"
          title="BCA Notes"
          subtitle="Unit-wise study material, syllabus and quick access resources for BCA students."
        />

        <motion.div
          className="bca-hero-panel"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div className="bca-hero-copy">
            <span className="bca-live-badge"><span /> Study Hub</span>
            <h3>Learn smarter. Prepare better.</h3>
            <p>Find your subject, check available notes, and open PDFs without leaving the study flow.</p>
          </div>
          <div className="bca-overall-progress">
            <div className="bca-progress-ring" style={{ "--bca-progress": `${percent}%` }}>
              <div><strong>{availableUnits}</strong><span>/ {totalUnits}</span></div>
            </div>
            <div>
              <p>Notes available</p>
              <span>{percent}% of the study library is ready</span>
            </div>
          </div>
        </motion.div>

        <SyllabusCard syllabus={syllabus} />

        <div className="bca-toolbar" aria-label="BCA notes filters">
          <div className="bca-search">
            <FaMagnifyingGlass aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search a subject or unit..."
              aria-label="Search BCA subjects or units"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
                <FaXmark aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="bca-filters" role="group" aria-label="Filter units">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={filter === item.value ? "is-active" : ""}
                aria-pressed={filter === item.value}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bca-subject-grid">
          <AnimatePresence mode="popLayout">
            {subjects.map((subject, i) => (
              <SubjectCard key={subject.slug} subject={subject} delay={i * 0.08} search={search} filter={filter} />
            ))}
          </AnimatePresence>
        </div>

        <p className="bca-footer-note">Notes designed by Sarafraj Navaz • Study Smart Not Hard</p>
      </div>
    </section>
  );
}
