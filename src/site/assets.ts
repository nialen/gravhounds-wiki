export interface SiteAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  sourceUrl: string;
  sourceLabel: string;
}

const steamSource = "https://store.steampowered.com/app/2440760/";

export const siteAssets = {
  hero: {
    src: "/images/gravhounds-hero.webp",
    alt: "Three armored canine workers crossing an alien battlefield",
    width: 1920,
    height: 1080,
    sourceUrl: steamSource,
    sourceLabel: "Official GRAVHOUNDS Steam artwork"
  },
  planetOperation: {
    src: "/images/gameplay-operation.webp",
    alt: "A GRAVHOUNDS crew overlooking an industrial operation on an alien planet",
    width: 1280,
    height: 720,
    sourceUrl: steamSource,
    sourceLabel: "Official GRAVHOUNDS Steam screenshot"
  },
  baseDefense: {
    src: "/images/gameplay-defense.webp",
    alt: "GRAVHOUNDS workers and automated turrets defending an alien landscape",
    width: 1280,
    height: 720,
    sourceUrl: steamSource,
    sourceLabel: "Official GRAVHOUNDS Steam screenshot"
  }
} satisfies Record<string, SiteAsset>;
