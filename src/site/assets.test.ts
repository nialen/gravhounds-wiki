import { describe, expect, it } from "vitest";

import { siteAssets } from "./assets";

describe("site assets", () => {
  it("uses optimized public files with provenance and useful alt text", () => {
    for (const asset of Object.values(siteAssets)) {
      expect(asset.src).toMatch(/^\/images\/.+\.(webp|avif)$/);
      expect(asset.alt.length).toBeGreaterThan(15);
      expect(asset.sourceUrl).toBe(
        "https://store.steampowered.com/app/2440760/"
      );
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
    }
  });
});
