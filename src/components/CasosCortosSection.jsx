// src/components/CasosCortosSection.jsx
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Banknote, Boxes, CircleDollarSign } from "lucide-react";
import "../styles/CasosCortosSection.css";

const casos = [
  {
    resultadoLabel: "-30% tiempos",
    titulo: "Conciliación bancaria",
    reto: "Procesos manuales y retrasos en cierres semanales.",
    accion: "Estandaricé plantillas y validaciones en Excel + checklists.",
    resultado: "Cierres 30% más rápidos y menor reproceso.",
  },
  {
    resultadoLabel: "0% pérdidas",
    titulo: "Control de inventarios",
    reto: "Diferencias entre kardex y conteos físicos.",
    accion:
      "Rutinas ABC, doble verificación y trazabilidad de entradas/salidas.",
    resultado: "Inventario con 0% pérdidas durante 12 meses.",
  },
  {
    resultadoLabel: "98% pagos",
    titulo: "Gestión de cartera",
    reto: "Cartera vencida y seguimiento disperso.",
    accion: "Segmenté por riesgo, definí secuencias de cobro y recordatorios.",
    resultado: "Recuperación del 98% y flujo de caja estable.",
  },
];

/* helpers */
function getIconForTitle(title) {
  const t = title.toLowerCase();
  if (t.includes("banc")) return Banknote;
  if (t.includes("invent")) return Boxes;
  if (t.includes("cartera") || t.includes("pago")) return CircleDollarSign;
  return CircleDollarSign;
}
function parseResult(label = "") {
  const m = label.match(/^([+\-]?)(\d+)(%?)(.*)$/);
  if (!m) return { sign: "", num: 0, suffix: "", caption: label };
  const [, sign, n, suffix, rest] = m;
  return { sign, num: Number(n), suffix, caption: (rest || "").trim() };
}

/* Count-up para el número del ribbon */
function CountUp({ to = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0,
      start = 0;
    const dur = 900;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(Math.round(to * ease(p)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} aria-hidden="true">
      {val}
    </span>
  );
}

/* Animaciones de aparición */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CasosCortosSection() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: false, amount: 0.4 });

  // Auto-pan móvil (muy suave, reversible, pausable)
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    // Solo en móvil y si no hay reduce-motion
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isMobile || reduce) return;

    let raf = 0;
    let running = false;
    let dir = 1; // 1 -> derecha, -1 -> izquierda
    let last = 0;

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
      el.classList.add("cases-autopan-on"); // para mostrar hint si quieres
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      el.classList.remove("cases-autopan-on");
    };

    const step = (now) => {
      if (!running) return;
      const dt = now - last;
      last = now;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return stop();

      const speed = 0.15; // píxeles por ms (súper sutil)
      el.scrollLeft += dir * speed * dt;

      if (el.scrollLeft <= 0) dir = 1;
      else if (el.scrollLeft >= max) dir = -1;

      raf = requestAnimationFrame(step);
    };

    // Arranca cuando esté en viewport
    if (gridInView) start();

    // Pausa mientras el usuario interactúa y reanuda luego
    let resumeTimer;
    const pauseThenResume = () => {
      stop();
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => gridInView && start(), 1600);
    };

    el.addEventListener("pointerdown", stop, { passive: true });
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("wheel", pauseThenResume, { passive: true });
    el.addEventListener("pointerup", pauseThenResume, { passive: true });
    el.addEventListener("mouseleave", pauseThenResume, { passive: true });

    return () => {
      stop();
      clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("wheel", pauseThenResume);
      el.removeEventListener("pointerup", pauseThenResume);
      el.removeEventListener("mouseleave", pauseThenResume);
    };
  }, [gridInView]);

  return (
    <section aria-labelledby="cases-title" className="cases-wrapper">
      <div className="cases-head">
        <h2 id="cases-title" className="cases-title">
          Casos cortos
        </h2>
        <p className="cases-subtitle">
          Antes → Acción → Resultado en 20 segundos
        </p>
      </div>

      <motion.div
        ref={gridRef}
        className="cases-grid cases-grid--carousel hint"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        role="list"
      >
        {casos.map((c) => {
          const { sign, num, suffix, caption } = parseResult(c.resultadoLabel);
          const Icon = getIconForTitle(c.titulo);
          return (
            <motion.article
              key={c.titulo}
              className="cases-card"
              variants={item}
              role="listitem"
              whileHover={{ y: -4 }}
            >
              <div
                className="cases-ribbon"
                aria-label={`Resultado: ${c.resultadoLabel}`}
              >
                <div className="cases-ribbonTop">
                  <span className="cases-ribbonNum">
                    {sign}
                    <CountUp to={Math.abs(num)} />
                    {suffix}
                  </span>
                </div>
                {caption && (
                  <div className="cases-ribbonCaption">{caption}</div>
                )}
              </div>

              <header className="cases-cardHead">
                <span className="cases-iconWrap" aria-hidden="true">
                  <Icon className="cases-icon" />
                </span>
                <h3 className="cases-cardTitle">{c.titulo}</h3>
              </header>

              <div className="cases-rows">
                <Row label="Reto" kind="reto" text={c.reto} />
                <Row label="Acción" kind="accion" text={c.accion} />
                <Row label="Resultado" kind="resultado" text={c.resultado} />
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function Row({ label, text, kind = "reto" }) {
  return (
    <p className="cases-row">
      <span className={`cases-badge cases-badge--${kind}`}>{label}</span>
      <span className="cases-text">{text}</span>
    </p>
  );
}
