import { defineConfig } from "vite";

export default defineConfig({
  base: "/A-test-assignment-for-Digital-Element/",
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
