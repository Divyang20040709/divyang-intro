import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    server: {
      port: 5173,
      // Dev-only proxy — in production, VITE_API_URL env var handles routing
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },

    build: {
      outDir: "dist",
      // Disable sourcemaps in production to avoid exposing source code
      sourcemap: false,
      // Warn on chunks > 500kb
      chunkSizeWarningLimit: 500,
    },
  };
});
