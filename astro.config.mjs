import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  image: {
    domains: ['yt3.ggpht.com'],
  },
  // You can add other config here if needed
  vite: {
    plugins: [tailwindcss()],
    // server: {
    //   hmr: false, // 🔥 turn off hot reload
    // },
  },
});
