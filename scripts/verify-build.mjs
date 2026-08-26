const baseUrl = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3107";
const routes = [
  "/en/",
  "/en/release-date/",
  "/en/gameplay/",
  "/en/system-requirements/",
  "/en/platforms/",
  "/en/game-pass/",
  "/en/playtest/",
  "/en/early-access/",
  "/en/characters/",
  "/en/trailer/"
];
const deferred = ["/en/beginner-guide/", "/en/crossplay/"];
const assets = [
  "/manifest.webmanifest",
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/icons/icon-16.png",
  "/icons/icon-32.png",
  "/icons/icon-512.png",
  "/images/gravhounds-hero.webp",
  "/images/gameplay-operation.webp",
  "/images/gameplay-defense.webp"
];

function matches(html, pattern, label, route) {
  if (!pattern.test(html)) throw new Error(`${route}: missing ${label}`);
}

const seenTitles = new Set();
const seenDescriptions = new Set();
const internalLinks = new Set();

for (const route of routes) {
  const response = await fetch(new URL(route, baseUrl));
  if (response.status !== 200) throw new Error(`${route}: expected 200, received ${response.status}`);
  const html = await response.text();
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;

  if (!title || seenTitles.has(title)) throw new Error(`${route}: missing or duplicate title`);
  if (!description || seenDescriptions.has(description)) throw new Error(`${route}: missing or duplicate description`);
  if (!canonical?.endsWith(route)) throw new Error(`${route}: invalid canonical ${canonical}`);
  if (h1Count !== 1) throw new Error(`${route}: expected one H1, received ${h1Count}`);
  matches(html, /property="og:title"/, "Open Graph title", route);
  matches(html, /application\/ld\+json/, "JSON-LD", route);
  if (/create next app|next\.svg|vercel\.svg|lorem ipsum/i.test(html)) {
    throw new Error(`${route}: starter or filler residue detected`);
  }

  seenTitles.add(title);
  seenDescriptions.add(description);
  for (const match of html.matchAll(/href="(\/en\/[^"]*)"/g)) {
    internalLinks.add(match[1]);
  }
}

for (const link of internalLinks) {
  const response = await fetch(new URL(link, baseUrl));
  if (response.status >= 400) throw new Error(`Internal link ${link} returned ${response.status}`);
}

for (const route of deferred) {
  const response = await fetch(new URL(route, baseUrl));
  if (response.status !== 404) throw new Error(`${route}: expected 404, received ${response.status}`);
}

for (const asset of assets) {
  const response = await fetch(new URL(asset, baseUrl));
  if (response.status !== 200) throw new Error(`${asset}: expected 200, received ${response.status}`);
}

const sitemap = await (await fetch(new URL("/sitemap.xml", baseUrl))).text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== 10 || new Set(sitemapUrls).size !== 10) {
  throw new Error(`Sitemap expected 10 unique URLs, received ${sitemapUrls.length}`);
}

console.log(`Build verified: ${routes.length} routes, ${internalLinks.size} internal links, ${assets.length} public assets, ${deferred.length} deferred 404s.`);
