import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    holdUntilCrawlEnd: false,
  },
  server: {
    host: "127.0.0.1",
    port: 4174,
    strictPort: true,
    watch: {
      ignored: ["**/dist/**", "**/vite.config.js.timestamp-*.mjs"],
    },
  },
});
