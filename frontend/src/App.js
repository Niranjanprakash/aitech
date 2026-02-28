import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import SplashScreen from "./components/SplashScreen";
import "./effects.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PricingPage from "./pages/PricingPage";
import ProjectsPage from "./pages/ProjectsPage";
import GetQuotePage from "./pages/GetQuotePage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [launched, setLaunched] = useState(false);

  return (
    <>
      {/* Splash shown until user clicks "Launch Your Ideas" */}
      {!launched && <SplashScreen onLaunch={() => setLaunched(true)} />}

      {/* Main site — mounted immediately but hidden under splash until launched */}
      <div
        className="app-shell"
        style={{
          visibility: launched ? "visible" : "hidden",
          pointerEvents: launched ? "auto" : "none",
        }}
      >
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/get-quote" element={<GetQuotePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}

export default App;
