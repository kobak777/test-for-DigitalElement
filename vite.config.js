import { defineConfig } from "vite";

export default defineConfig({
  base: "/test-for-DigitalElement/",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  css: {
    devSourcemap: true,
  },
  server: {
    open: true,
  },
});
