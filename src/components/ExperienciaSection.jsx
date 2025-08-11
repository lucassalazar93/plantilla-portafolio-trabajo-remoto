// src/components/ExperienciaSection.jsx
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Truck, Building2, Store } from "lucide-react";
import styles from "../styles/ExperienciaSection.module.css";

/* ===== Datos ===== */
const data = [
  {
    company: "Lukas Express",
    period: "2020 – Actual",
    role: "Coordinación administrativa y contable",
    summary:
      "Optimización de procesos administrativos/contables, seguimiento a facturación y control de inventarios.",
    logo: Truck,
    bullets: [
      {
        label: "Tiempos de conciliación",
        value: 30,
        suffix: "%",
        kind: "reduction",
      },
      {
        label: "Pérdidas en inventario (3 años)",
        value: 0,
        suffix: "%",
        kind: "zero",
      },
      {
        label: "Aceleración de cobros",
        value: 15,
        suffix: "%",
        kind: "increase",
      },
      {
        label:
          "Mejoras de facturación y seguimiento a CxC (procedimientos y SLA)",
      },
    ],
  },
  {
    company: "HP Colombia",
    period: "2017 – 2020",
    role: "Gestión de cartera y pedidos",
    summary:
      "Análisis y conciliación de pagos, control de órdenes y soporte a equipos comerciales.",
    logo: Building2,
    bullets: [
      {
        label: "recuperación de pagos",
        value: 98,
        suffix: "%",
        kind: "increase",
      },
      {
        label: "reducción de errores en pedidos",
        value: 25,
        suffix: "%",
        kind: "reduction",
      },
      { label: "Implementación de controles de validación previo a despacho" },
    ],
  },
  {
    company: "Almacenes Hogar y Moda",
    period: "2014 – 2017",
    role: "Administración de tienda y equipo",
    summary:
      "Responsable de caja, bodega y piso de venta; coordinación de personal y abastecimiento.",
    logo: Store,
    bullets: [
      {
        label: "equipo a cargo (caja, piso de venta y bodega)",
        value: 8,
        suffix: " pers.",
      },
      {
        label: "apertura/cierre, arqueos y manejo de caja diarios",
        value: 100,
        suffix: "%",
      },
      {
        label: "control de inventarios y pedidos a proveedores",
        value: 0,
        suffix: "% mermas",
      },
      {
        label:
          "Nuevos protocolos de apertura/cierre que mejoraron la seguridad operativa",
      },
    ],
  },
];

/* ===== Count-up ===== */
function CountUp({ to = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0,
      start = 0;
    const dur = 1100;
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
    <span ref={ref} className={styles.kpiNumber}>
      {val}
      {suffix}
    </span>
  );
}

/* ===== Check animado ===== */
function AnimatedCheck() {
  return (
    <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="rgba(57,191,176,.25)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M7 12.5l3.2 3.2L17 9"
        fill="none"
        stroke="#39BFB0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ===== Animaciones ===== */
const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ExperienciaSection() {
  // Carrusel móvil con “autopan” suave que se pausa en interacción
  const scrollerRef = useRef(null);
  const [autopanOn, setAutopanOn] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (prefersReduced || !isMobile) return;

    let raf = 0;
    let dir = 1; // 1 → derecha, -1 → izquierda
    const speed = 0.35; // px/frame (muy sutil)

    const tick = () => {
      const max = el.scrollWidth - el.clientWidth;
      // invertir dirección al llegar a bordes
      if (el.scrollLeft >= max - 2) dir = -1;
      if (el.scrollLeft <= 2) dir = 1;

      el.scrollLeft += dir * speed;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) {
        setAutopanOn(true);
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        setAutopanOn(false);
      }
    };

    // iniciar
    start();

    // pausar en interacción del usuario
    const pauseEvents = ["pointerdown", "wheel", "touchstart", "keydown"];
    pauseEvents.forEach((ev) =>
      el.addEventListener(ev, stop, { passive: true })
    );

    // reanudar tras 2.5s de inactividad
    let resumeTO;
    const scheduleResume = () => {
      clearTimeout(resumeTO);
      resumeTO = setTimeout(() => start(), 2500);
    };
    const resumeEvents = ["pointerup", "touchend", "mouseleave"];
    resumeEvents.forEach((ev) =>
      el.addEventListener(ev, scheduleResume, { passive: true })
    );

    // cleanup
    return () => {
      stop();
      pauseEvents.forEach((ev) => el.removeEventListener(ev, stop));
      resumeEvents.forEach((ev) => el.removeEventListener(ev, scheduleResume));
      clearTimeout(resumeTO);
    };
  }, []);

  return (
    <section aria-labelledby="exp-title" className={styles.wrapper}>
      <div className={styles.head}>
        <h2 id="exp-title" className={styles.title}>
          Experiencia destacada
        </h2>
        <p className={styles.subtitle}>Prueba social basada en resultados</p>
      </div>

      {/* Desktop: grid. Móvil: carrusel con scroll-snap + hint */}
      <div
        ref={scrollerRef}
        className={[
          styles.grid,
          styles.hint, // flecha sutil en móvil
          autopanOn ? styles.autopanOn : "",
        ].join(" ")}
        role="region"
        aria-label="Experiencia — carrusel horizontal en móvil"
      >
        {data.map(({ company, period, role, summary, logo: Logo, bullets }) => (
          <motion.article
            key={company}
            className={styles.card}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{ y: -4 }}
            tabIndex={0} // accesible para foco/teclado
          >
            <header className={styles.cardHead}>
              <div className={styles.companyRow}>
                <span className={styles.logoWrap} aria-hidden="true">
                  <Logo className={styles.logo} />
                </span>
                <div>
                  <h3 className={styles.company}>{company}</h3>
                  <p className={styles.role}>{role}</p>
                </div>
              </div>
              <span className={styles.badge}>{period}</span>
            </header>

            {summary && <p className={styles.summary}>{summary}</p>}

            <motion.ul
              className={styles.list}
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  className={styles.item}
                  variants={itemVariants}
                >
                  <AnimatedCheck />
                  <p className={styles.itemText}>
                    {typeof b.value === "number" ? (
                      <>
                        <b className={styles.itemValue}>
                          <CountUp to={b.value} suffix={b.suffix || ""} />
                        </b>{" "}
                        {b.label}
                      </>
                    ) : (
                      b.label
                    )}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
