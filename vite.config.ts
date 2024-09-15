import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";




export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ["./vitest.setup.ts"],
  },
});
