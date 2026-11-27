import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  envDir: "..", // single .env at project root
  server: { proxy: { "/api": "http://localhost:5000" } }
});
