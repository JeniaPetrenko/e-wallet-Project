import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/e-wallet-Project/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
