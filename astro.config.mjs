import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
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

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
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
