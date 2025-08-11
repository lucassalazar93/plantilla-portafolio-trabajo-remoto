import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Linkedin,
  Phone,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import "../styles/ContactoSection.css";

export default function ContactoSection() {
  // ---- enlaces (ajusta a tus datos) ----
  const email = "nore12345qu@gmail.com";
  const linkedin = "https://www.linkedin.com/in/norella-quintero/";
  const whatsapp =
    "https://wa.me/573000000000?text=Hola%20Nore%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar.";

  // ---- estado del formulario ----
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null); // "ok" | "error" | null

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = "Ingresa tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.email))
      e.email = "Correo no válido.";
    if (values.message.trim().length < 10)
      e.message = "Cuéntame brevemente tu necesidad (mín. 10 caracteres).";
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }
  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    try {
      setSending(true);
      setResult(null);
      // Aquí integrarías tu backend/Email API (Formspree, Resend, etc.)
      await new Promise((r) => setTimeout(r, 1100)); // simulación
      setResult("ok");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setResult("error");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    if (!result) return;
    const t = setTimeout(() => setResult(null), 4000);
    return () => clearTimeout(t);
  }, [result]);

  const variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section id="contacto" className="contact">
      <div className="contact__head">
        <h2 className="contact__title">Contacto</h2>
        <p className="contact__subtitle">Listo para accionar</p>
      </div>

      <motion.div
        className="contact__grid"
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        {/* ===== Columna info / CTAs rápidas ===== */}
        <aside className="contact__info">
          <p className="contact__lead">
            ¿Coordinamos por WhatsApp o prefieres dejarme un mensaje? Trabajo
            desde
            <strong> Medellín</strong> en modalidad <strong>remota</strong>.
          </p>

          <ul className="contact__list" aria-label="Información de contacto">
            <li>
              <Mail className="ico" />
              <a href={`mailto:${email}`} className="link-w">
                {email}
              </a>
            </li>
            <li>
              <MapPin className="ico" />
              Medellín · Disponible remoto
            </li>
            <li>
              <Linkedin className="ico" />
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-w"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <MessageCircle className="ico" />
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="link-w"
              >
                WhatsApp directo
              </a>
            </li>
          </ul>

          <div className="contact__ctaWrap">
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              aria-label="Escríbeme por WhatsApp"
            >
              <MessageCircle className="ico" /> Escríbeme por WhatsApp
            </a>
            <a
              href="tel:+573000000000"
              className="btn btn--ghost"
              aria-label="Llamar por teléfono"
            >
              <Phone className="ico" /> Llamar
            </a>
          </div>
        </aside>

        {/* ===== Formulario ===== */}
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.name && !!errors.name}
              aria-describedby="err-name"
            />
            <small
              id="err-name"
              className={`error ${
                touched.name && errors.name ? "is-visible" : ""
              }`}
            >
              {touched.name && errors.name}
            </small>
          </div>

          <div className="field">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tucorreo@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby="err-email"
            />
            <small
              id="err-email"
              className={`error ${
                touched.email && errors.email ? "is-visible" : ""
              }`}
            >
              {touched.email && errors.email}
            </small>
          </div>

          <div className="field">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Cuéntame qué necesitas…"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.message && !!errors.message}
              aria-describedby="err-message"
            />
            <small
              id="err-message"
              className={`error ${
                touched.message && errors.message ? "is-visible" : ""
              }`}
            >
              {touched.message && errors.message}
            </small>
          </div>

          <div className="form__actions">
            <button
              type="submit"
              className="btn btn--white"
              disabled={sending || !isValid}
            >
              {sending ? "Enviando…" : "Enviar mensaje"}
            </button>

            <div className="form__status" aria-live="polite" role="status">
              {result === "ok" && (
                <span className="ok">
                  <CheckCircle2 className="ico" /> ¡Gracias! Te responderé en 24
                  horas.
                </span>
              )}
              {result === "error" && (
                <span className="err">
                  Hubo un problema al enviar. Intenta de nuevo.
                </span>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
