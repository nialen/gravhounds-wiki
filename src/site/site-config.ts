export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  locale: "en";
  baseUrl: string;
  lastChecked: string;
  officialLinks: {
    website: string;
    steam: string;
    xbox: string;
    developer: string;
    discord: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "GRAVHOUNDS Field Manual",
  shortName: "GH Field Manual",
  description:
    "An independent, source-grounded guide to GRAVHOUNDS release information and verified gameplay details.",
  locale: "en",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  lastChecked: "2026-08-26",
  officialLinks: {
    website: "https://www.gravhounds.com/",
    steam: "https://store.steampowered.com/app/2440760/",
    xbox: "https://www.xbox.com/games/store/gravhounds/9pbg4mtm3jjc",
    developer: "https://www.octopuspanic.com/",
    discord: "https://discord.com/invite/gravhounds"
  }
};
