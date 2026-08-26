import { describe, expect, it } from "vitest";

import type { ContentPage } from "./schema";
import { getStaticSlugs, validateContent } from "./loader";

function fixture(slug: string): ContentPage {
  return {
    frontmatter: {
      title: `${slug} title`,
      description:
        "A hand-checked fixture description long enough to represent a public search result without mirroring production logic.",
      slug,
      category: "guide",
      updatedAt: "2026-08-26",
      sourceStatus: "official",
      draft: false,
      locale: "en",
      sources: [
        {
          title: "Official source",
          url: "https://example.test/source",
          publisher: "Fixture publisher",
          type: "official",
          officialStatus: "official",
          checkedAt: "2026-08-26",
          note: "Supports this test fixture."
        }
      ]
    },
    body: "Fixture body"
  };
}

describe("content validation", () => {
  it("rejects duplicate locale and slug pairs", () => {
    expect(() => validateContent([fixture("gameplay"), fixture("gameplay")]))
      .toThrow(/duplicate locale and slug/i);
  });

  it("returns the validated pages when locale and slug pairs are unique", () => {
    expect(validateContent([fixture("gameplay"), fixture("platforms")]))
      .toHaveLength(2);
  });
});

describe("static route boundary", () => {
  it("excludes deferred routes from static generation", () => {
    const slugs = getStaticSlugs();

    expect(slugs).toHaveLength(9);
    expect(slugs).not.toContain("beginner-guide");
    expect(slugs).not.toContain("crossplay");
    expect(slugs).toContain("release-date");
  });
});
