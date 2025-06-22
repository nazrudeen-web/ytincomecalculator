export default {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get("channel");
    if (!input) {
      return jsonResponse({ error: "Missing url parameter" }, 400);
    }

    const kv = env.CHANNEL_KV;
    const apiKey = env.PUBLIC_YOUTUBE_API_KEY_2;

    const isId = isChannelId(input);
    const isHandle = input.trim().startsWith("@");
    const isUsername = !isId && !isHandle;

    const cleanedInput = input.trim();

    let baseData;

    let endpointParam = "";
    if (isId) {
      endpointParam = `id=${cleanedInput}`;
    } else if (isHandle) {
      endpointParam = `forHandle=${cleanedInput.replace(/^@/, "")}`;
    } else if (isUsername) {
      endpointParam = `forUsername=${cleanedInput}`;
    }

    const parts = [
      "snippet",
      "statistics",
      "brandingSettings",
      "topicDetails",
    ].join(",");

    const url = `https://www.googleapis.com/youtube/v3/channels?part=${parts}&${endpointParam}&key=${apiKey}`;
    console.log(url);
    const res = await fetch(url);
    const json = await res.json();
    const item = json.items?.[0];

    if (!item) {
      return jsonResponse({ error: "Channel not found" }, 404);
    }

    const minimalData = {
      id: item.id,
      title: item.snippet?.title || null,
      description: item.snippet?.description || null,
      customUrl: item.snippet?.customUrl
        ? ensureAtPrefix(item.snippet.customUrl)
        : null,
      publishedAt: item.snippet?.publishedAt || null,
      thumbnail: item.snippet?.thumbnails?.high?.url || null,
      country:
        item.snippet?.country ||
        item.brandingSettings?.channel?.country ||
        null,
      viewCount: item.statistics?.viewCount || "0",
      subscriberCount: item.statistics?.subscriberCount || "0",
      videoCount: item.statistics?.videoCount || "0",
      topicCategories: item.topicDetails?.topicCategories || [],
      bannerExternalUrl:
        item.brandingSettings?.image?.bannerExternalUrl || null,
    };

    // Store minimal info in KV
    ctx.waitUntil(
      storeToKV(kv, {
        id: minimalData.id,
        title: minimalData.title,
        handle: minimalData.customUrl,
        thumbnail: minimalData.thumbnail,
      })
    );

    const response = jsonResponse(minimalData);
    response.headers.set("Cache-Control", "public, max-age=86400");
    return response;
  },
};

function ensureAtPrefix(name) {
  return name.startsWith("@") ? name : "@" + name;
}

// async function getFromKV(kv, key) {
//   return await kv.get(key, { type: "json" });
// }

async function storeToKV(kv, data) {
  const { id, handle } = data;
  if (id) await kv.put(id, JSON.stringify(data));
  if (handle) await kv.put(handle, JSON.stringify(data));
}

function isChannelId(input) {
  return /^UC[a-zA-Z0-9_-]{22}$/.test(input);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
