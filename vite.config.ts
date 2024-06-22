import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/aetherai-assignment/",
  plugins: [react()],
  resolve: {
    alias: [
      "Asset",
      "Component",
      "Container",
      "Scene",
      "Presentation",
      "Lib",
    ].map((key) => ({
      find: key,
      replacement: path.resolve(__dirname, `./src/${key}`),
    })),
  },
  optimizeDeps: {
    include: ["**/*.scss"], // Include all .scss files
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
  },
});
