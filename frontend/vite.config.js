import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://insightsengine.onrender.com", // Your FastAPI backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
