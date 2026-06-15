import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("framer-motion")) {
            return "motion";
          }

          if (
            id.includes("react-hook-form") ||
            id.includes("zod") ||
            id.includes("@hookform/resolvers")
          ) {
            return "forms";
          }

          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("axios")
          ) {
            return "vendor";
          }
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
    exclude: ["tests/e2e/**", "node_modules/**", "dist/**"],
  },
});
