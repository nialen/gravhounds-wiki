export type BuildStatus = "ready" | "draft" | "deferred" | "blocked";

export type SourceStatus =
  | "official"
  | "multi-source"
  | "single-source"
  | "unverified";

export interface PageDefinition {
  slug: string;
  locale: "en";
  keyword: string;
  title: string;
  description: string;
  category: "overview" | "release" | "guide" | "platform" | "media";
  sourceStatus: SourceStatus;
  status: BuildStatus;
  navLabel?: string;
}

export const pageManifest: PageDefinition[] = [
  {
    slug: "",
    locale: "en",
    keyword: "GRAVHOUNDS",
    title: "GRAVHOUNDS Wiki: Release Status, Gameplay and Guides",
    description:
      "Track GRAVHOUNDS release news, verified gameplay details, PC requirements, platforms, playtest access and Early Access information.",
    category: "overview",
    sourceStatus: "multi-source",
    status: "ready",
    navLabel: "Home"
  },
  {
    slug: "release-date",
    locale: "en",
    keyword: "gravhounds release date",
    title: "GRAVHOUNDS Release Date and Current Launch Status",
    description:
      "See the current GRAVHOUNDS release status, why Steam still says Coming soon, and which Early Access date has been reported by games media.",
    category: "release",
    sourceStatus: "multi-source",
    status: "ready",
    navLabel: "Release"
  },
  {
    slug: "gameplay",
    locale: "en",
    keyword: "gravhounds gameplay",
    title: "GRAVHOUNDS Gameplay: Building, Gravity and Extraction",
    description:
      "Learn the verified GRAVHOUNDS gameplay loop, from hostile planet jobs and resource gathering to base defense, gravity tools and extraction.",
    category: "guide",
    sourceStatus: "multi-source",
    status: "ready",
    navLabel: "Gameplay"
  },
  {
    slug: "system-requirements",
    locale: "en",
    keyword: "gravhounds system requirements",
    title: "GRAVHOUNDS PC System Requirements",
    description:
      "Check the official GRAVHOUNDS minimum and recommended PC requirements for Windows, including CPU, memory, graphics, DirectX and storage.",
    category: "guide",
    sourceStatus: "official",
    status: "ready",
    navLabel: "PC Specs"
  },
  {
    slug: "platforms",
    locale: "en",
    keyword: "gravhounds platforms",
    title: "GRAVHOUNDS Platforms: PC and Xbox Details",
    description:
      "Find the confirmed GRAVHOUNDS platforms and current Steam, Microsoft Store, Xbox Series X|S and Xbox Play Anywhere feature information.",
    category: "platform",
    sourceStatus: "multi-source",
    status: "ready",
    navLabel: "Platforms"
  },
  {
    slug: "game-pass",
    locale: "en",
    keyword: "gravhounds game pass",
    title: "Is GRAVHOUNDS Coming to Xbox Game Pass?",
    description:
      "Review the reported GRAVHOUNDS Game Pass launch information, what current media reports support, and which subscription details remain unconfirmed.",
    category: "platform",
    sourceStatus: "multi-source",
    status: "ready"
  },
  {
    slug: "playtest",
    locale: "en",
    keyword: "gravhounds playtest",
    title: "How to Join the GRAVHOUNDS Steam Playtest",
    description:
      "Follow the official Steam Request Access process for the GRAVHOUNDS playtest and understand what applying does and does not guarantee.",
    category: "release",
    sourceStatus: "official",
    status: "ready",
    navLabel: "Playtest"
  },
  {
    slug: "early-access",
    locale: "en",
    keyword: "gravhounds early access",
    title: "GRAVHOUNDS Early Access Plans and Current Scope",
    description:
      "Read the developer's current GRAVHOUNDS Early Access expectations, including the playable core loop, planned expansion and estimated duration.",
    category: "release",
    sourceStatus: "official",
    status: "ready"
  },
  {
    slug: "characters",
    locale: "en",
    keyword: "gravhounds characters",
    title: "GRAVHOUNDS Characters and Reported Roster",
    description:
      "See what official sources confirm about the bio-engineered canine crew and which five GRAVHOUNDS character names currently rely on one media source.",
    category: "guide",
    sourceStatus: "single-source",
    status: "ready"
  },
  {
    slug: "trailer",
    locale: "en",
    keyword: "gravhounds trailer",
    title: "GRAVHOUNDS Trailers and Official Video Links",
    description:
      "Watch the known GRAVHOUNDS reveal and announcement video links, with source context from the official game site, Steam and games media.",
    category: "media",
    sourceStatus: "multi-source",
    status: "ready",
    navLabel: "Trailer"
  },
  {
    slug: "beginner-guide",
    locale: "en",
    keyword: "gravhounds beginner guide",
    title: "GRAVHOUNDS Beginner Guide",
    description:
      "Reserved for verified hands-on GRAVHOUNDS beginner guidance after public play access provides enough evidence for reliable tactics.",
    category: "guide",
    sourceStatus: "unverified",
    status: "deferred"
  },
  {
    slug: "crossplay",
    locale: "en",
    keyword: "gravhounds crossplay",
    title: "GRAVHOUNDS Crossplay Status",
    description:
      "Reserved until official sources clarify whether Steam and Xbox players can join the same GRAVHOUNDS sessions across platforms.",
    category: "platform",
    sourceStatus: "unverified",
    status: "deferred"
  }
];

export const publicPages = pageManifest.filter(
  (page) => page.status === "ready"
);

export const deferredPages = pageManifest.filter(
  (page) => page.status === "deferred"
);
