import { describe, expect, it } from "vitest";

import { deferredPages, publicPages } from "./page-manifest";

describe("page manifest", () => {
  it("publishes ten English routes and excludes deferred intents", () => {
    expect(publicPages).toHaveLength(10);
    expect(
      publicPages.every(
        (page) => page.locale === "en" && page.status === "ready"
      )
    ).toBe(true);
    expect(publicPages.map((page) => page.slug)).not.toContain(
      "beginner-guide"
    );
    expect(publicPages.map((page) => page.slug)).not.toContain("crossplay");
    expect(deferredPages.map((page) => page.slug)).toEqual([
      "beginner-guide",
      "crossplay"
    ]);
  });
});
