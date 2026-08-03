import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const entry = (file) => fileURLToPath(new URL(file, import.meta.url));

/**
 * Dev-only: make `npm run dev` behave like Vercel's `cleanUrls`, so the page
 * is reachable at /logistics-automation locally exactly as it is in
 * production. Has no effect on the build output.
 */
const devCleanUrls = {
  name: "artx-dev-clean-urls",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === "/logistics-automation" || req.url?.startsWith("/logistics-automation?")) {
        req.url = req.url.replace("/logistics-automation", "/logistics-automation.html");
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), devCleanUrls],
  base: "./", // relative asset paths so dist/index.html opens directly from disk
  server: { port: 5173, host: true },
  build: {
    outDir: "dist",
    sourcemap: false,
    // Multi-page build. Each entry ships its own <head>, so titles, canonicals,
    // Open Graph tags and JSON-LD are present in the served HTML without JS.
    // Vercel's `cleanUrls` maps dist/logistics-automation.html
    // to /logistics-automation.
    rollupOptions: {
      input: {
        main: entry("index.html"),
        logistics: entry("logistics-automation.html"),
      },
    },
  },
});
