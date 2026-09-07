import { FaBriefcase } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import Timeline from "./Timeline";
import { EXPERIENCE } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-slate-50 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Experience" title="Where I've grown" />

        <div className="max-w-3xl mx-auto">
          <Timeline
            items={EXPERIENCE}
            renderItem={(item) => (
              <div className="glass rounded-[1.4rem] p-6">
                <div className="flex items-start gap-5 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 grid place-items-center shrink-0">
                    <FaBriefcase className="text-xl text-primary" />
                  </div>
                  <div>
                    <span className="inline-block font-heading text-[0.7rem] font-bold tracking-wide text-accent mb-1">
                      {item.period}
                    </span>
                    <h3 className="font-heading font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{item.place}</p>
                  </div>
                </div>
                <ul className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed list-disc list-inside space-y-1 pl-1">
                  {item.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
