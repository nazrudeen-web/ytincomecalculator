export async function GET() {
  const base = "https://ytincomecalculator.pages.dev";

  const staticRoutes = ["/", "/blog", "/top-channels"];

  const blogSlugs = [
    "How-Much-Money-Do-YouTubers-Make-Per-1,000-Views-in-2025",
    "How-to-Grow-a-YouTube-Channel-from-Scratch-2025-Guide",
  ];

  const fallbackDynamicSlugs = [
    "mrbeast-net-worth",
    "tseries-net-worth",
    "cocomelon-net-worth",
    "sonyentertainmentindia-net-worth",
    "zeemusiccompany-net-worth",
    "blackpink-net-worth",
    "goldmines-net-worth",
    "likenastyaofficial-net-worth",
    "kidsdianashow-net-worth",
    "vladandniki-net-worth",
  ];

  let dynamicFromKV: string[] = [];

  try {
    const res = await fetch(
      "https://channelincome-backend.ytincome.workers.dev/sitemap-keys"
    );
    if (res.ok) {
      const handles = await res.json();
      dynamicFromKV = handles
        .filter((h: string) => h.startsWith("@"))
        .map((h: string) => `${h.replace(/^@/, "")}-net-worth`);
    } else {
      dynamicFromKV = fallbackDynamicSlugs;
    }
  } catch (err) {
    console.error("Failed to fetch dynamic slugs from KV:", err);
    dynamicFromKV = fallbackDynamicSlugs;
  }

  const urls = [
    ...staticRoutes.map((path) => `<url><loc>${base}${path}</loc></url>`),
    ...blogSlugs.map((slug) => `<url><loc>${base}/blog/${slug}</loc></url>`),
    ...dynamicFromKV.map((slug) => `<url><loc>${base}/${slug}</loc></url>`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
