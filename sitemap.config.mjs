// sitemap.config.mjs

const topChannels = [
  "tseries-net-worth",
  "mrbeast-net-worth",
  "cocomelon-net-worth",
  "setindia-net-worth",
  "kidsdianashow-net-worth",
  "likenastyaofficial-net-worth",
  "pewdiepie-net-worth",
  "vladandniki-net-worth",
  "zeemusiccompany-net-worth",
  "blackpink-net-worth",
];

export default async function () {
  // Get all blog markdown files from /src/pages/blog/*.md
  const blogFiles = import.meta.glob("/src/pages/blog/*.md");

  const blogUrls = Object.keys(blogFiles).map((path) => {
    // path: "/src/pages/blog/example.md"
    const slug = path
      .replace("/src/pages/blog/", "")
      .replace(".md", "");

    return {
      url: `/blog/${slug}`,
      changefreq: "monthly",
      priority: 0.7,
    };
  });

  return [
    // Channels
    ...topChannels.map((slug) => ({
      url: `/${slug}`,
      changefreq: "weekly",
      priority: 0.8,
    })),
    // Blog pages
    ...blogUrls,
  ];
}
