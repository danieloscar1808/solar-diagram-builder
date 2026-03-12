import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({

  base: mode === "production" ? "/solar-diagram-builder/" : "/",

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [

    react(),

    mode === "development" && componentTagger(),

    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Prompt",
        short_name: "Prompt",
        start_url: "/NOMBRE-REPOSITORIO/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",

        icons: [
          {
            src: "/NOMBRE-REPOSITORIO/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/NOMBRE-REPOSITORIO/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })

  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "docs",
    emptyOutDir: true
  }

}));
