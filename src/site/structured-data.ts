import { siteConfig } from "./site-config";

export function canonicalFor(slug: string) {
  return new URL(slug ? `/en/${slug}/` : "/en/", siteConfig.baseUrl).toString();
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: canonicalFor(""),
    description: siteConfig.description,
    inLanguage: "en"
  };
}

export function videoGameJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "GRAVHOUNDS",
    url: siteConfig.officialLinks.website,
    description:
      "A 1 to 4 player cooperative action builder about gathering resources, constructing defenses and extracting from hostile alien worlds.",
    gamePlatform: ["Windows PC", "Xbox Series X|S"],
    applicationCategory: "Game",
    genre: ["Action", "Indie", "Strategy"],
    numberOfPlayers: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4 },
    author: { "@type": "Organization", name: "Octopus Panic, Inc." },
    publisher: { "@type": "Organization", name: "Octopus Panic, Inc." }
  };
}
