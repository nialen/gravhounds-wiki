import { describe, expect, it } from "vitest";

import { generateStaticParams } from "./page";

describe("English content route", () => {
  it("generates parameters for the homepage and nine public inner pages", async () => {
    const params = await generateStaticParams();

    expect(params).toHaveLength(10);
    expect(params).toContainEqual({ slug: [] });
    expect(params).toContainEqual({ slug: ["gameplay"] });
    expect(params).not.toContainEqual({ slug: ["beginner-guide"] });
    expect(params).not.toContainEqual({ slug: ["crossplay"] });
  });
});
