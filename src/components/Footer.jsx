// src/components/Footer.jsx
import { Mail, MapPin, Linkedin, MessageCircle } from "lucide-react";
import "../styles/Footer.css";

export default function Footer() {
  // Navegación interna
  const LINKS = [
    { href: "#hero", label: "Inicio" },
    { href: "#services", label: "Servicios" },
    { href: "#experiencia", label: "Experiencia" },
    { href: "#casos", label: "Casos cortos" },
    { href: "#herramientas", label: "Herramientas" },
    { href: "#testimonial", label: "Testimonios" },
    { href: "#contacto", label: "Contacto" },
  ];

  // Enlaces de Nore (columna CTA)
  const nore = {
    email: "nore12345qu@gmail.com",
    linkedin: "https://www.linkedin.com/in/norella-quintero/",
    whatsapp:
      "https://wa.me/573000000000?text=Hola%20Nore%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar.",
  };

  // Enlaces del diseñador (franja inferior)
  const designer = {
    name: "Lucas Salazar - lukbyte",
    site: "https://lucas-salazar-portfolio.vercel.app/",
    linkedin: "https://www.linkedin.com/in/lucas-salazar-722b79319/",
    email: "lucassalazar.work93@gmail.com",
    whatsapp:
      "https://wa.me/573150399322?text=Hola%20Lucas%2C%20te%20contacto%20desde%20el%20portafolio",
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Columna brand */}
        <div className="footer__brand">
          <a href="#hero" className="brand">
            <span className="brand__dot" aria-hidden="true" />
            <span className="brand__name">Nore Quintero</span>
          </a>
          <p className="brand__tag">
            Administración · Aux. Contable · Asistencia Virtual
          </p>

          <ul className="contactMini" aria-label="Datos de contacto">
            <li>
              <MapPin className="ico" />
              Medellín · Remoto
            </li>
            <li>
              <Mail className="ico" />
              <a className="link" href={`mailto:${nore.email}`}>
                {nore.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Columna navegación */}
        <nav className="footer__nav" aria-label="Enlaces del sitio">
          <h3 className="colTitle">Navegación</h3>
          <ul className="navList">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a className="link" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna CTA / redes (Nore) */}
        <div className="footer__cta">
          <h3 className="colTitle">¿Listo para conversar?</h3>
          <div className="cta__actions">
            <a
              href={nore.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn--white"
              aria-label="Escríbeme por WhatsApp"
            >
              <MessageCircle className="ico" /> WhatsApp
            </a>
            <a
              href={nore.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
              aria-label="Ver perfil en LinkedIn"
            >
              <Linkedin className="ico" /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Línea legal / crédito / sociales (diseñador) */}
      <div className="footer__bottom">
        <div className="bottom__inner">
          <span className="copy">
            © {new Date().getFullYear()} Nore Quintero — Todos los derechos
            reservados.
          </span>

          <span className="credit">
            Diseño por{" "}
            <a
              href={designer.site}
              className="credit__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ir al sitio del diseñador: ${designer.name}`}
              title={designer.name}
            >
              {designer.name}
            </a>
          </span>

          <div className="social">
            <a
              href={designer.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn del diseñador"
              className="social__a"
            >
              <Linkedin className="ico" />
            </a>
            <a
              href={`mailto:${designer.email}`}
              aria-label="Correo del diseñador"
              className="social__a"
            >
              <Mail className="ico" />
            </a>
            <a
              href={designer.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp del diseñador"
              className="social__a"
            >
              <MessageCircle className="ico" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
