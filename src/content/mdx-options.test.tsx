import { compileMDX } from "next-mdx-remote/rsc";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { mdxOptions } from "./mdx-options";

describe("MDX options", () => {
  it("renders source tables as semantic HTML tables", async () => {
    const result = await compileMDX({
      source: "| Field | Value |\n| --- | --- |\n| Players | 1 to 4 |",
      options: { mdxOptions }
    });

    expect(renderToStaticMarkup(result.content)).toContain("<table>");
  });
});
