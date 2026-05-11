import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // relative asset paths so dist/index.html opens directly from disk
  server: { port: 5173, host: true },
  build: { outDir: "dist", sourcemap: false },
});
