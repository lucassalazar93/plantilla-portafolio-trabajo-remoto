import { motion } from "framer-motion";
import {
  FileSpreadsheet,
  FileText,
  Globe,
  KanbanSquare,
  Calculator,
  Users,
} from "lucide-react";
import "../styles/HerramientasSection.css";

const tools = [
  {
    name: "Excel",
    level: 95,
    desc: "Tablas dinámicas, fórmulas, dashboards (avanzado).",
    icon: FileSpreadsheet,
    img: null, // opcional: "/logos/excel.svg"
  },
  {
    name: "Word / PowerPoint",
    level: 100,
    desc: "Documentación clara, presentaciones ejecutivas.",
    icon: FileText,
    img: null, // "/logos/office.svg"
  },
  {
    name: "Google Workspace",
    level: 85,
    desc: "Sheets, Docs, Drive, Calendar, integraciones.",
    icon: Globe,
    img: null, // "/logos/google-workspace.svg"
  },
  {
    name: "Trello / Asana",
    level: 80,
    desc: "Flujos de trabajo, tableros kanban, seguimiento.",
    icon: KanbanSquare,
    img: null, // "/logos/trello-asana.svg"
  },
  {
    name: "Contaplus",
    level: 75,
    desc: "Registros contables, informes y conciliaciones.",
    icon: Calculator,
    img: null, // "/logos/contaplus.svg"
  },
  {
    name: "CRM (HubSpot/Zoho)",
    level: 78,
    desc: "Registro, funnels, seguimiento comercial.",
    icon: Users,
    img: null, // "/logos/crm.svg"
  },
];

const container = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function HerramientasSection() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="tools">
      <div className="tools__head">
        <h2 id="tools-title" className="tools__title">
          Herramientas & tecnologías
        </h2>
        <p className="tools__subtitle">Tranquilidad técnica y ramp-up veloz.</p>
      </div>

      <motion.div
        className="tools__grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        role="list"
      >
        {tools.map((t, i) => (
          <ToolCard key={t.name} tool={t} index={i} />
        ))}
      </motion.div>
    </section>
  );
}

function ToolCard({ tool, index }) {
  const { name, level, desc, icon: Icon, img } = tool;
  const tipId = `tool-tip-${index}`;

  return (
    <motion.button
      type="button"
      className="toolCard"
      variants={item}
      whileHover={{ y: -3, rotateZ: 0.3, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      aria-describedby={tipId}
    >
      <span className="toolCard__logo" aria-hidden="true">
        {img ? (
          <img src={img} alt="" loading="lazy" />
        ) : (
          <Icon className="toolCard__icon" />
        )}
      </span>

      <span className="toolCard__name">{name}</span>

      <div
        className="toolCard__level"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
        aria-label={`Nivel en ${name}: ${level}%`}
      >
        <span className="toolCard__bar" style={{ width: `${level}%` }} />
      </div>

      <span id={tipId} role="tooltip" className="toolCard__tip">
        {desc}
      </span>
    </motion.button>
  );
}
