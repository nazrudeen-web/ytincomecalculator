import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import dynamicPages from "./sitemap.config.mjs";

export default async function () {
  return defineConfig({
    site: "https://ytincomecalculator.pages.dev/",
    output: "server",

    integrations: [
      sitemap({
        customPages: await dynamicPages(), // ✅
      }),
    ],

    adapter: cloudflare({
      imageService: "cloudflare",
    }),

    vite: {
      plugins: [tailwindcss()],
    },
  });
}
