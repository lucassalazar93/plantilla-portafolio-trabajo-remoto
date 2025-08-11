// src/components/Hero.jsx
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import {
  Phone,
  Linkedin,
  CheckCircle2,
  Timer,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";
import "../styles/hero.css";

export default function Hero() {
  const whatsapp =
    "https://wa.me/573000000000?text=Hola%20Nore%2C%20me%20interesa%20tu%20perfil%20remoto.";
  const linkedin = "https://www.linkedin.com/in/norella-quintero/";

  // Partículas (init estable)
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Chips
  const chips = useMemo(
    () => [
      "Administradora",
      "Aux. Contable",
      "Asistente Virtual",
      "Trabajo remoto",
    ],
    []
  );

  // Responsive (reducimos partículas en móvil)
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  // Variants para animaciones con stagger
  const group = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section id="hero" className="hero">
      {/* Fondo partículas sutil */}
      <Particles
        className="hero__particles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          background: { color: { value: "transparent" } },
          fullScreen: { enable: false },
          particles: {
            number: {
              value: isMobile ? 12 : 22,
              density: { enable: true, area: 800 },
            },
            color: { value: "#39BFB0" },
            opacity: { value: isMobile ? 0.08 : 0.12 },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: isMobile ? 0.4 : 0.6,
              outModes: { default: "bounce" },
            },
          },
          interactivity: { events: { resize: true } },
          detectRetina: true,
        }}
      />

      <div className="hero__grid">
        {/* ===== Columna texto ===== */}
        <motion.div
          className="hero__content"
          variants={group}
          initial="hidden"
          animate="show"
        >
          <div
            className="hero__availability"
            aria-label="Disponible para trabajo remoto"
          >
            <span className="dot" /> Disponible remoto
          </div>

          {/* Branding */}
          <motion.h2 className="hero__brand" variants={item}>
            Nore Quintero
          </motion.h2>

          <motion.h1 className="hero__title" variants={item}>
            Administradora, Auxiliar Contable & Asistente Virtual
          </motion.h1>

          <motion.p className="hero__subtitle" variants={item}>
            Optimizo procesos administrativos y contables con eficiencia,
            organización y atención al detalle.
          </motion.p>

          <motion.div className="hero__tags" variants={group}>
            {chips.map((t) => (
              <motion.span key={t} className="chip" variants={item}>
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="hero__ctas" variants={group}>
            <motion.a
              className="btn btn--primary"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="Contactar por WhatsApp"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="ico" /> Contactar por WhatsApp
            </motion.a>

            <motion.a
              className="btn btn--secondary btn--linkedin"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Ver perfil de LinkedIn"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Linkedin className="ico" /> Ver LinkedIn
            </motion.a>
          </motion.div>

          <motion.div className="hero__stats" variants={group}>
            <Stat
              icon={<Timer className="ico" />}
              label="Experiencia"
              value="+8 años"
            />
            <Stat
              icon={<TrendingDown className="ico" />}
              label="Tiempos"
              value="-20%"
            />
            <Stat
              icon={<CheckCircle2 className="ico" />}
              label="Pérdidas"
              value="0%"
            />
            <Stat
              icon={<ShieldCheck className="ico" />}
              label="Control"
              value="98%"
            />
          </motion.div>
        </motion.div>

        {/* ===== Columna foto ===== */}
        <motion.div
          className="hero__photoWrap"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="hero__glass" />
          <div className="hero__photo">
            <img
              src="/nore-perfil2.jpg" /* ajusta al nombre real en /public */
              alt="Norella Quintero - Foto profesional"
              loading="eager"
            />
          </div>

          <div className="hero__name">
            <h2>Norella María Quintero Henao</h2>
            <p>Medellín · Disponible remoto</p>
          </div>
        </motion.div>
      </div>

      {/* CTA flotante móvil */}
      <a
        className="whatsapp-fab"
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp (flotante)"
      >
        <Phone className="ico" /> Contactar
      </a>
    </section>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="stat">
      <span className="stat__icon">{icon}</span>
      <div className="stat__txt">
        <div className="stat__label">{label}</div>
        <div className="stat__value">{value}</div>
      </div>
    </div>
  );
}
