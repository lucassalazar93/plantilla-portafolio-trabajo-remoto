Plantilla Portafolio · Trabajo Remoto
Portafolio minimalista y enfocado en resultados para roles administrativos / contables / asistencia virtual.
Incluye microinteracciones, métricas animadas, carruseles accesibles y versión móvil cuidada.

<!-- opcional: reemplaza o elimina -->

✨ Características
Secciones listas: Servicios, Experiencia destacada, Casos cortos, Herramientas & tecnologías, Testimonios, Contacto, Footer.

Animaciones suaves con [Framer Motion].

Iconos nítidos con [lucide-react].

Carrusel accesible (drag/swipe, autoplay opcional) con [embla-carousel-react].

Mobile-first: en móvil, grids se transforman en carruseles con scroll-snap.

CSS Modules + variables (tokens) para una identidad coherente.

Accesibilidad: etiquetas ARIA, foco visible y buen contraste.

🧰 Stack
Vite + React (JSX)

CSS Modules

Framer Motion, lucide-react, embla-carousel-react

Recomendado: Node.js ≥ 18

🚀 Empezar
bash
Copiar
Editar
# 1) Instalar dependencias
npm install    # o pnpm i / yarn

# 2) Desarrollo
npm run dev

# 3) Build de producción
npm run build

# 4) Vista previa del build
npm run preview
🗂️ Estructura (resumen)
ruby
Copiar
Editar
src/
  components/
    ExperienciaSection.jsx
    ServiciosSection.jsx
    CasosCortosSection.jsx
    HerramientasSection.jsx
    TestimonioSection.jsx
    ContactoSection.jsx
    Footer.jsx
  styles/
    ExperienciaSection.module.css
    ServiciosSection.module.css
    CasosCortosSection.css
    HerramientasSection.css
    TestimonioSection.css
    ContactoSection.css
    Footer.css
public/
  avatars/        # fotos de testimonios o logos
  logos/          # logos de herramientas si usas imágenes
  preview.jpg     # captura del sitio (opcional)
Imágenes: coloca assets públicos en public/ (p. ej. public/avatars/nombre.jpg) y referencia con rutas absolutas: /avatars/nombre.jpg.

⚙️ Personalización rápida
1) Datos de Servicios
Edita el arreglo en src/components/ServiciosSection.jsx:

js
Copiar
Editar
const services = [
  { icon: ClipboardList, title: "Facturación y CxC", desc: "..." },
  // ...
];
2) Experiencia destacada
Datos en src/components/ExperienciaSection.jsx (data).

En móvil funciona como carrusel (scroll horizontal con snap).

Métricas animadas con el componente CountUp.

3) Casos cortos
Datos en src/components/CasosCortosSection.jsx (casos).

“Ribbon” del resultado se genera desde resultadoLabel (ej: "-30% tiempos").

4) Herramientas & tecnologías
Logos/íconos en HerramientasSection.jsx y estilos en HerramientasSection.css.

Puedes usar tooltips y “tilt/scale” al hover (ya incluidos).

5) Testimonios
Lista en src/components/TestimonioSection.jsx (testimonials).

Para agregar uno nuevo:

js
Copiar
Editar
{
  quote: "Texto del testimonio (1–2 líneas).",
  author: "Nombre y Apellido",
  role: "Cargo, Empresa",
  avatar: "/avatars/archivo.jpg" // opcional
}
Si no hay avatar, se muestran iniciales automáticamente.

6) Contacto
Edita datos o endpoint (si conectas backend/email) en src/components/ContactoSection.jsx.

Validación en vivo y estados de envío incluidos.

7) Footer
Enlaces de Nore y del diseñador en src/components/Footer.jsx:

js
Copiar
Editar
const nore = {
  email: "nore12345qu@gmail.com",
  linkedin: "https://www.linkedin.com/in/norella-quintero/",
  whatsapp: "https://wa.me/573000000000?text=Hola..."
};

const designer = {
  name: "Lucas Salazar - lukbyte",
  site: "https://lucas-salazar-portfolio.vercel.app/",
  linkedin: "https://www.linkedin.com/in/lucas-salazar-722b79319/",
  email: "lucassalazar.work93@gmail.com",
  whatsapp: "https://wa.me/573150399322?text=Hola%20Lucas..."
};
🖌️ Estilos & Tokens
Variables de color (ejemplo) definidas en cada CSS:

css
Copiar
Editar
:root {
  --turq: #39bfb0;
  --ink: #222;
  --muted: #555;
  --line: #e8f0ef;
}
Mantén tipografías y tamaños en los styles de cada sección.

CSS Modules para aislar estilos por componente.

♿ Accesibilidad
Botones con aria-label.

Roles correctos (role="list", role="tablist", etc).

Foco visible en controles.

Contraste de textos ≥ 4.5:1.

📦 Despliegue
Vercel (recomendado)
Haz Import Project desde tu repo en Vercel.

Framework: Vite.

Build Command: npm run build

Output: dist

Deploy.

GitHub Pages
En vite.config.*, si usas Pages bajo /<repo>/, define:

js
Copiar
Editar
export default defineConfig({
  base: "/plantilla-portafolio-trabajo-remoto/",
  // ...
});
Build npm run build.

Sube dist/ a la rama gh-pages o usa una acción (workflow).

🔧 Solución de problemas
Error al importar Embla:
Asegúrate de instalarlo:

bash
Copiar
Editar
npm i embla-carousel-react
Íconos no cargan:

bash
Copiar
Editar
npm i lucide-react
Animaciones:

bash
Copiar
Editar
npm i framer-motion
📝 License
MIT — úsalo, modifícalo y compártelo.
Agradece manteniendo el crédito del diseñador. 💚

👤 Autor del diseño
Lucas Salazar – lukbyte
Sitio: https://lucas-salazar-portfolio.vercel.app/
LinkedIn: https://www.linkedin.com/in/lucas-salazar-722b79319/
Email: lucassalazar.work93@gmail.com
