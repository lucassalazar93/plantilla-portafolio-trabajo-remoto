// src/App.jsx
import Hero from "./components/Hero";
import About from "./components/About";
import ServiciosSection from "./components/ServiciosSection";
import ExperienciaSection from "./components/ExperienciaSection";
import CasosCortosSection from "./components/CasosCortosSection";
import HerramientasSection from "./components/HerramientasSection";
import TestimonioSection from "./components/TestimonioSection";
import ContactoSection from "./components/ContactoSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* Hero principal con foto, partículas y CTAs */}
      <Hero />
      <About />
      <ServiciosSection />
      <ExperienciaSection />
      <CasosCortosSection />
      <HerramientasSection />
      <TestimonioSection />
      <ContactoSection />
      <Footer />

      {/* Aquí irán las demás secciones: Sobre mí, Servicios, Experiencia, etc. */}
    </>
  );
}
