import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { validLocationSlugs } from "./src/data/seoLocations";

export default defineConfig(({ mode }) => {
  // Build the massive dynamic array of location paths for SSG
  const dynamicRoutes = validLocationSlugs.map((slug) => `/${slug}`);
  const staticRoutes = [
    "/", "/what-we-do", "/our-work", "/portfolio-gallery",
    "/pricing-comparison", "/contact", "/about-us", "/people", "/join-us", "/areas-we-serve"
  ];

  let blogRoutes: string[] = [];
  try {
    const raw = fs.readFileSync(path.resolve(__dirname, "./src/data/blogRoutes.json"), "utf-8");
    blogRoutes = JSON.parse(raw);
  } catch (e) {
    console.warn("Could not load blog routes for SSG, ensure generate_blog_sitemap.js is run first.", e);
  }

  return {
    base: "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      includedRoutes() {
        return [...staticRoutes, ...dynamicRoutes, ...blogRoutes];
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Optimize for 120fps performance
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: mode === "production",
          pure_funcs: mode === "production" ? ["console.log"] : [],
        },
      },
      rollupOptions: {
        output: {
          manualChunks: undefined
        },
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunk size
      chunkSizeWarningLimit: 2000,
    },
    optimizeDeps: {
      // Pre-bundle dependencies for faster dev server
      include: ["react", "react-dom", "react-router-dom", "lucide-react"],
    },
  };
});
