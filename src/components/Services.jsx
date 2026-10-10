import { FaJava, FaLeaf, FaLaptopCode, FaShop, FaIdCard, FaSchool, FaMobileScreen, FaGears } from "react-icons/fa6";
import { Link as ScrollLink } from "react-scroll";
import SectionHeading from "./SectionHeading";
import PremiumCard from "./PremiumCard";

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
    <section id="services" className="py-28 section-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Services" title="How I can help" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <PremiumCard key={s.title} delay={(i % 4) * 0.07} accent={["blue","gold","violet","cyan"][i % 4]}>
              <span className="pc-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="pc-icon mb-5"><s.icon /></div>
              <h3 className="font-heading font-bold text-[1.02rem] mb-2 tracking-tight">{s.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              <ScrollLink to="contact" smooth offset={-70} className="pc-link">Discuss this <span aria-hidden="true">→</span></ScrollLink>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
}
