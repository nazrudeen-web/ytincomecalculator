export const topChannelsList = [
  { handle: "@mrbeast", slug: "mrbeast-net-worth" },
  { handle: "@tseries", slug: "tseries-net-worth" },
  { handle: "@cocomelon", slug: "cocomelon-net-worth" },
  { handle: "@setindia", slug: "setindia-net-worth" },
  { handle: "@kidsdianashow", slug: "kidsdianashow-net-worth" },
  { handle: "@likenastyaofficial", slug: "likenastyaofficial-net-worth" },
  { handle: "@pewdiepie", slug: "pewdiepie-net-worth" },
  { handle: "@vladandniki", slug: "vladandniki-net-worth" },
  { handle: "@zeemusiccompany", slug: "zeemusiccompany-net-worth" },
  { handle: "@blackpink", slug: "blackpink-net-worth" },
];

export async function fetchTopChannels() {
  const results = await Promise.all(
    topChannelsList.map(async (ch) => {
      try {
        const res = await fetch(
          `https://channelincome-backend.ytincome.workers.dev/kv?handle=${ch.handle}`
        );

        if (!res.ok) {
          return {
            name: ch.handle,
            slug: ch.slug,
          };
        }

        const json = await res.json();
        return {
          name: json.title || ch.handle,
          slug: ch.slug,
          ...json, // include full data
        };
      } catch (e) {
        return {
          name: ch.handle,
          slug: ch.slug,
        };
      }
    })
  );

  return results;
}
