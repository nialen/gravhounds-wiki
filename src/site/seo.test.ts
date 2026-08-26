import { describe, expect, it } from "vitest";

import { getPublicContent } from "@/content/loader";

import { canonicalFor, videoGameJsonLd } from "./structured-data";

describe("SEO content contract", () => {
  it("produces ten unique canonical URLs", async () => {
    const pages = await getPublicContent();
    const canonicals = pages.map((page) => canonicalFor(page.frontmatter.slug));

    expect(pages).toHaveLength(10);
    expect(new Set(canonicals).size).toBe(10);
    expect(canonicals.every((url) => url.startsWith("http://localhost:3000/en/"))).toBe(true);
  });

  it("keeps descriptions within useful search lengths", async () => {
    for (const page of await getPublicContent()) {
      expect(page.frontmatter.description.length).toBeGreaterThanOrEqual(120);
      expect(page.frontmatter.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("keeps JSON-LD to confirmed game facts", () => {
    const data = videoGameJsonLd();

    expect(data.gamePlatform).toEqual(["Windows PC", "Xbox Series X|S"]);
    expect(JSON.stringify(data)).not.toMatch(/PlayStation|Nintendo|crossplay/i);
  });
});
