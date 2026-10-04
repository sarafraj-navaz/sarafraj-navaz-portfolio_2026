import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import MouseGlow from "./components/MouseGlow";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import { useTheme } from "./hooks/useTheme";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { initAnalytics, analytics } from "./utils/analytics";
import { logVisit } from "./utils/siteAnalytics";

const Admin = lazy(() => import("./admin/Admin"));

const SECTION_IDS = [
  "home", "about", "skills", "projects", "services",
  "education", "experience", "certificates", "achievements", "booking", "bca", "contact",
];

function Layout() {
  const { theme, toggle } = useTheme();
  const { active, scrolled, progress } = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    initAnalytics();
    analytics.pageView(window.location.pathname);
    logVisit();
  }, []);

  return (
    <>
      <Loader />
      <ScrollProgress progress={progress} />
      <Cursor />
      <MouseGlow />
      <Navbar theme={theme} toggleTheme={toggle} active={active} scrolled={scrolled} />
      <main>
        <Home />
      </main>
      <Footer />
      <BackToTop visible={progress > 8} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="min-h-screen grid place-items-center bg-secondary text-white">Loading…</div>}>
              <Admin />
            </Suspense>
          }
        />
        <Route path="*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
