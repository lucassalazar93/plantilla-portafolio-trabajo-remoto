import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escucha en 0.0.0.0 para acceder desde la red
    port: 5173, // Puerto por defecto
    strictPort: true, // Si el puerto está ocupado, no cambia automáticamente
    open: false, // No abre el navegador automáticamente
    // Si quieres que HMR use tu IP en lugar de localhost, descomenta y cambia la IP:
    // hmr: { host: '192.168.1.20' }
  },
});
