export const topChannels = [
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

export async function getStaticPaths() {
  return topChannels.map((slug) => ({
    params: { name: slug },
  }));
}
