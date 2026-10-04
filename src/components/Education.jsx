import { FaGraduationCap } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import Timeline from "./Timeline";
import { EDUCATION } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Education" title="Academic foundation" />

        <div className="max-w-3xl mx-auto">
          <Timeline
            items={EDUCATION}
            renderItem={(item) => (
              <div className="glass rounded-[1.4rem] p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 grid place-items-center shrink-0">
                  <FaGraduationCap className="text-xl text-primary" />
                </div>
                <div>
                  <span className="inline-block font-heading text-[0.7rem] font-bold tracking-wide text-accent mb-1">
                    {item.period}
                  </span>
                  <h3 className="font-heading font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{item.place}</p>
                  <p className="text-primary text-sm font-medium">{item.meta}</p>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
