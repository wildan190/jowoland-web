import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://jowolandborepile.co.id",
  output: "server",
  adapter: netlify(),
  image: {
    domains: ["images.unsplash.com"],
  },
  prefetch: true,
  compressHTML: true,
  integrations: [
    sitemap(),
  ],
  vite: {
    build: {
      minify: "esbuild",
    },
  },
});
