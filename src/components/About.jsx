import { motion } from "framer-motion";
import { Timer, TrendingDown, ShieldCheck, CheckCircle2 } from "lucide-react";
import "../styles/about.css";

export default function About() {
  const kpis = [
    { value: "+8 años", label: "Experiencia", icon: <Timer className="ico" /> },
    {
      value: "20%",
      label: "Menos tiempos",
      icon: <TrendingDown className="ico" />,
    },
    {
      value: "0%",
      label: "Pérdidas en inventario",
      icon: <CheckCircle2 className="ico" />,
    },
    {
      value: "98%",
      label: "Recuperación de pagos",
      icon: <ShieldCheck className="ico" />,
    },
  ];

  // Animaciones
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };
  const card = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="about">
      <div className="about__grid">
        {/* Texto */}
        <motion.div
          className="about__text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="about__title">Sobre mí</h2>
          <p className="about__desc">
            Soy una profesional con más de 8 años de experiencia en gestión
            administrativa, contable y de inventarios. Experta en facturación,
            conciliaciones, manejo documental y soporte virtual. He optimizado
            procesos reduciendo tiempos de entrega hasta en un 20% y
            garantizando control de inventarios sin pérdidas. Me destaco por mi
            organización, proactividad y adaptabilidad en entornos remotos o
            híbridos.
          </p>
        </motion.div>

        {/* KPIs */}
        <motion.div
          className="about__kpis"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {kpis.map(({ value, label, icon }) => (
            <motion.div
              key={label}
              className="kpi kpi--glow"
              variants={card}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.995 }}
            >
              <span className="kpi__iconWrap">
                <span className="kpi__icon">{icon}</span>
              </span>

              <div className="kpi__meta">
                <div className="kpi__value">{value}</div>
                <div className="kpi__label">{label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
