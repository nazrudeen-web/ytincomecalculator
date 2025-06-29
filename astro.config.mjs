import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
<<<<<<< HEAD
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const dynamicChannels = [
  'mrbeast-net-worth',
  'tseries-net-worth',
  'cocomelon-net-worth',
  'sonyentertainmentindia-net-worth',
  'kidsdianashow-net-worth',
  'pewdiepie-net-worth',
  'vladandniki-net-worth',
  'like-nastya-net-worth',
  'zachking-net-worth',
  'wwe-net-worth',
  'blackpink-net-worth',
  'goldmines-net-worth',
  'bangtan-net-worth',
  '5minutecrafts-net-worth',
  'fernanfloo-net-worth',
  'justinbieber-net-worth',
  'badabun-net-worth',
  'juegodetonos-net-worth',
  'elrubiusomg-net-worth',
  'ed-sheeran-net-worth',
];
=======
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import dynamicPages from "./sitemap.config.mjs";
>>>>>>> 0498ca7c1be66d301c862608b197ec5338bef390

export default defineConfig(async () => ({
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
<<<<<<< HEAD
  site: 'https://ytincomecalculator.pages.dev',
  integrations: [
    sitemap({
      customPages: dynamicChannels.map(
        (handle) => `https://ytincomecalculator.pages.dev/${handle}`
      ),
    }),
    tailwind(),
  ],
});
=======
  vite: {
    plugins: [tailwindcss()],
  },
}));
>>>>>>> 0498ca7c1be66d301c862608b197ec5338bef390
