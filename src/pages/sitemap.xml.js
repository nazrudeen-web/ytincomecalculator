export async function GET() {
  const base = 'https://channelincome.com'; // Change to your final domain

  const staticRoutes = ['/', '/blog', '/top-channels'];

  // Add your known dynamic slugs
  const dynamicSlugs = [
    'mrbeast-net-worth',
    'tseries-net-worth',
    'cocomelon-net-worth',
    'sonyentertainmentindia-net-worth',
    'zee-music-company-net-worth',
    'blackpink-net-worth',
    'goldmines-net-worth',
    'like-nastya-net-worth',
    'kids-diana-show-net-worth',
    'vlad-and-niki-net-worth',
  ];

  const urls = [
    ...staticRoutes.map((path) => `<url><loc>${base}${path}</loc></url>`),
    ...dynamicSlugs.map((slug) => `<url><loc>${base}/${slug}</loc></url>`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
