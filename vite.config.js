import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/e-wallet-Project/", // Ваш базовий URL
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["@reduxjs/toolkit"], // Залиште лише те, що потрібно виключити
    },
  },
});
