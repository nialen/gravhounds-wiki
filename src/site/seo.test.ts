import { afterEach, describe, expect, it, vi } from "vitest";

import { getPublicContent } from "@/content/loader";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl) {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  } else {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  }
  vi.resetModules();
});

describe("SEO content contract", () => {
  it("produces ten unique canonical URLs", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.test";
    vi.resetModules();
    const { canonicalFor } = await import("./structured-data");
    const pages = await getPublicContent();
    const canonicals = pages.map((page) => canonicalFor(page.frontmatter.slug));

    expect(pages).toHaveLength(10);
    expect(new Set(canonicals).size).toBe(10);
    expect(canonicals.every((url) => url.startsWith("https://example.test/en/"))).toBe(true);
  });

  it("keeps descriptions within useful search lengths", async () => {
    for (const page of await getPublicContent()) {
      expect(page.frontmatter.description.length).toBeGreaterThanOrEqual(120);
      expect(page.frontmatter.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("keeps JSON-LD to confirmed game facts", async () => {
    const { videoGameJsonLd } = await import("./structured-data");
    const data = videoGameJsonLd();

    expect(data.gamePlatform).toEqual(["Windows PC", "Xbox Series X|S"]);
    expect(JSON.stringify(data)).not.toMatch(/PlayStation|Nintendo|crossplay/i);
  });
});
