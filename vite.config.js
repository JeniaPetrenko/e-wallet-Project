import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-redux"], // Додайте це, щоб Vite міг розпізнати залежність
    },
  },
});
