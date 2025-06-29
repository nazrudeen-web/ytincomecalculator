import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import dynamicPages from "./sitemap.config.mjs";

export default defineConfig({
  output: "server",
  site: "https://ytincomecalculator.pages.dev/",
  integrations: [
      sitemap({
        customPages: await dynamicPages(),
      }),
    ],
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
