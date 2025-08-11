import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import "../styles/TestimonioSection.css";

/**
 * TIP para resaltar datos:
 * En el texto de cada testimonio puedes envolver cifras o palabras clave
 * con <span class="t-hl">…</span> para aplicar el resaltado.
 * (Se inyecta como HTML de forma controlada en este componente).
 */
const testimonials = [
  {
    // Ejemplo con resaltados: “3 meses”
    quote: `Norella es confiable, ordenada y efectiva. En 
            <span class="t-hl">3</span> meses optimizó cierres y mejoró la comunicación con clientes clave.`,
    author: "Lukas Salazar",
    role: "Gerente de Operaciones · Lukas Express",
    avatar: "/avatars/lukas-express.png",
  },
  {
    // “0% pérdidas” y “12 meses”
    quote: `Su enfoque en procesos y control de inventarios fue clave:
            <span class="t-hl">0%</span> pérdidas sostenidas durante 
            <span class="t-hl">12</span> meses.`,
    author: "Marcela Torres",
    role: "Directora Administrativa · HP Colombia",
    avatar: "/avatars/hp-logo.png",
  },
  {
    // “98% pagos”
    quote: `Ordenó la facturación, implementó checklists y estabilizó el flujo de caja:
            <span class="t-hl">98%</span> de recuperación de pagos.`,
    author: "Julián Restrepo",
    role: "CEO · Hogar y Moda",
    avatar: "/avatars/logo-hogar y moda.jpg",
  },
];

function initialsFrom(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export default function TestimonioSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    inViewThreshold: 0.75,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay (pausa en hover, focus o interacción táctil)
  useEffect(() => {
    if (!emblaApi) return;
    let timer;
    const INTERVAL = 5500;

    const play = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isPaused) emblaApi.scrollNext();
        play();
      }, INTERVAL);
    };

    const onPointerDown = () => setIsPaused(true);
    const onPointerUp = () => setIsPaused(false);
    const onFocusIn = () => setIsPaused(true);
    const onFocusOut = () => setIsPaused(false);

    play();
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    emblaApi.rootNode().addEventListener("focusin", onFocusIn);
    emblaApi.rootNode().addEventListener("focusout", onFocusOut);

    return () => {
      clearTimeout(timer);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
      emblaApi.rootNode().removeEventListener("focusin", onFocusIn);
      emblaApi.rootNode().removeEventListener("focusout", onFocusOut);
    };
  }, [emblaApi, isPaused]);

  // Dots + estado seleccionado
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    []
  );

  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-title"
      className="testimonial"
    >
      <div className="testimonial__head">
        <h2 id="testimonial-title" className="testimonial__title">
          Testimonios
        </h2>
      </div>

      <div
        className="t-slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Viewport Embla */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container" role="list">
            {testimonials.map((t, idx) => (
              <div
                className="embla__slide"
                role="listitem"
                key={t.author + idx}
              >
                <motion.figure
                  className="t-card"
                  variants={variants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.45 }}
                >
                  {/* Cita con comillas decorativas y resaltados */}
                  <div className="t-quoteWrap">
                    <span
                      className="t-quoteMark t-quoteMark--left"
                      aria-hidden="true"
                    >
                      “
                    </span>
                    <blockquote className="t-quote">
                      <p
                        // Permitimos HTML controlado para <span class="t-hl">…</span>
                        dangerouslySetInnerHTML={{ __html: t.quote }}
                      />
                    </blockquote>
                    <span
                      className="t-quoteMark t-quoteMark--right"
                      aria-hidden="true"
                    >
                      ”
                    </span>
                  </div>

                  {/* Autor */}
                  <figcaption className="t-author">
                    <span className="t-avatar" aria-hidden="true">
                      {t.avatar ? (
                        <img src={t.avatar} alt="" loading="lazy" />
                      ) : (
                        <span className="t-initials">
                          {initialsFrom(t.author)}
                        </span>
                      )}
                    </span>
                    <span className="t-meta">
                      <span className="t-name">{t.author}</span>
                      <span className="t-role">{t.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </div>
            ))}
          </div>
        </div>

        {/* Dots / Paginación */}
        <div
          className="t-dots"
          role="tablist"
          aria-label="Paginación de testimonios"
        >
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === selectedIndex ? "is-active" : ""}`}
              aria-label={`Ir al testimonio ${i + 1}`}
              aria-selected={i === selectedIndex}
              role="tab"
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
