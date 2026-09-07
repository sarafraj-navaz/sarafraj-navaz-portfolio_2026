import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Education from "../components/Education";
import Experience from "../components/Experience";
import { Suspense, lazy } from "react";
import Certificates from "../components/Certificates";
import Achievements from "../components/Achievements";
import BCANotes from "../components/BCANotes";
import Contact from "../components/Contact";

const Booking = lazy(() => import("../components/Booking"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Education />
      <Experience />
      <Certificates />
      <Achievements />
      <Suspense fallback={<div className="py-28" />}>
        <Booking />
      </Suspense>
      <BCANotes />
      <Contact />
    </>
  );
}
