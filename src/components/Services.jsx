import { FaJava, FaLeaf, FaLaptopCode, FaShop, FaIdCard, FaSchool, FaMobileScreen, FaGears } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import AnimatedCard from "./AnimatedCard";

const SERVICES = [
  { icon: FaJava, title: "Java Application Development", desc: "Robust, well-architected Java applications built on clean OOP and MVC principles." },
  { icon: FaLeaf, title: "Spring Boot REST APIs", desc: "Secure, scalable REST services with Spring Boot, Hibernate and JPA." },
  { icon: FaLaptopCode, title: "React Frontend Development", desc: "Responsive, animated interfaces that feel fast and intuitive to use." },
  { icon: FaShop, title: "Business Websites", desc: "Professional websites for businesses that need to look credible online." },
  { icon: FaIdCard, title: "Portfolio Websites", desc: "Personal portfolios that help you stand out to recruiters and clients." },
  { icon: FaSchool, title: "School Websites", desc: "Informative, easy-to-navigate websites for schools and institutes." },
  { icon: FaMobileScreen, title: "Responsive Websites", desc: "Pixel-perfect experiences across mobile, tablet and desktop." },
  { icon: FaGears, title: "Deployment & Maintenance", desc: "End-to-end deployment pipelines, DNS/SSL setup, and ongoing upkeep." },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-slate-50 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Services" title="How I can help" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <AnimatedCard
              key={s.title}
              delay={(i % 4) * 0.06}
              className="p-7 rounded-[1.4rem] bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.08] shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-16px_rgba(37,99,235,0.25)] hover:border-primary/25 transition-shadow"
            >
              <s.icon className="text-2xl text-primary mb-4" />
              <h3 className="font-heading font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{s.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
