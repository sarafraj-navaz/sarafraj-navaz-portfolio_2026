import { FaBriefcase, FaLocationDot, FaGraduationCap } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import Timeline from "./Timeline";
import PremiumCard from "./PremiumCard";
import { EXPERIENCE } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-28 section-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Professional Experience"
          title="Developer by craft. Faculty by purpose."
          subtitle="My current work combines software development with practical BCA teaching and Computer Science education."
        />

        <div className="max-w-4xl mx-auto">
          <Timeline
            items={EXPERIENCE}
            renderItem={(item) => (
              <PremiumCard tilt={2} accent={item.current ? "green" : "blue"}>
                <div className="flex items-start gap-5 mb-4">
                  <div className="pc-icon">
                    {item.current ? <FaGraduationCap className="text-xl" /> : <FaBriefcase className="text-xl" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1.5 font-heading text-[0.68rem] font-bold tracking-wide ${item.current ? "text-emerald-500" : "text-accent"}`}>
                        {item.current && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                        {item.current ? "CURRENT · PRESENT" : item.period}
                      </span>
                      {item.current && <span className="experience-current-badge">Currently Teaching</span>}
                    </div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl mb-1">{item.title}</h3>
                    <p className="text-primary dark:text-accent font-semibold text-sm">{item.place}</p>
                    {item.affiliation && <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{item.affiliation}</p>}
                    {item.location && <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-2"><FaLocationDot aria-hidden="true" /> {item.location}</p>}
                  </div>
                </div>
                <ul className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed list-disc list-inside space-y-1.5 pl-1">
                  {item.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </PremiumCard>
            )}
          />
        </div>
      </div>
    </section>
  );
}
