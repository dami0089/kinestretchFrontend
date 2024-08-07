import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      http: false, // Ignora el módulo 'http'
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
