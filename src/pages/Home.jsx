import { Suspense, lazy } from "react";
import Hero from "../components/Hero";
import About from "../components/About";

// Below-the-fold sections load on demand so the first paint is fast.
const Skills = lazy(() => import("../components/Skills"));
const Projects = lazy(() => import("../components/Projects"));
const Services = lazy(() => import("../components/Services"));
const Education = lazy(() => import("../components/Education"));
const Experience = lazy(() => import("../components/Experience"));
const Certificates = lazy(() => import("../components/Certificates"));
const Achievements = lazy(() => import("../components/Achievements"));
const BCANotes = lazy(() => import("../components/BCANotes"));
const Contact = lazy(() => import("../components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<div style={{ minHeight: "100vh" }} aria-hidden="true" />}>
        <Skills />
        <Projects />
        <Services />
        <Education />
        <Experience />
        <Certificates />
        <Achievements />
        <BCANotes />
        <Contact />
      </Suspense>
    </>
  );
}
