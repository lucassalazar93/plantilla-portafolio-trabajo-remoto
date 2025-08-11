// src/components/ServiciosSection.jsx
import { motion } from "framer-motion";
import styles from "../styles/ServiciosSection.module.css";
import {
  ClipboardList,
  Calculator,
  FileBarChart,
  Boxes,
  Headset,
  FileSpreadsheet,
  CalendarDays,
  KanbanSquare,
} from "lucide-react";

const services = [
  {
    icon: ClipboardList,
    title: "Facturación y CxC",
    desc: "Emisión, seguimiento, notas crédito.",
  },
  {
    icon: Calculator,
    title: "Conciliaciones",
    desc: "Bancarias y de cartera.",
  },
  {
    icon: FileSpreadsheet,
    title: "Reportes en Excel",
    desc: "Tablas dinámicas y dashboards.",
  },
  {
    icon: Boxes,
    title: "Control de inventarios",
    desc: "Kardex, entradas/salidas, 0% pérdidas.",
  },
  {
    icon: Headset,
    title: "Asistencia virtual",
    desc: "Correo, atención a clientes, agendas.",
  },
  {
    icon: KanbanSquare,
    title: "Trello / Asana",
    desc: "Flujos de trabajo y seguimiento.",
  },
  {
    icon: CalendarDays,
    title: "Agenda & coordinación",
    desc: "Citas, logística y reuniones.",
  },
  {
    icon: FileBarChart,
    title: "CRM (HubSpot/Zoho)",
    desc: "Registros y seguimiento comercial.",
  },
];

export default function ServiciosSection() {
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.06,
        delayChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section id="services" className={styles.services}>
      <div className={styles.header}>
        <h2 className={styles.title}>Servicios</h2>
        <p className={styles.subtitle}>
          Identifica rápidamente lo que necesitas.
        </p>
      </div>

      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {services.map(({ icon: Icon, title, desc }) => (
          <motion.article
            key={title}
            className={styles.card}
            variants={item}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className={styles.iconWrap}>
              <Icon className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{desc}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
