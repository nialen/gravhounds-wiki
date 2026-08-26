import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TableOfContents } from "./table-of-contents";

describe("TableOfContents", () => {
  it("renders MDX child links without requiring a serialized items prop", () => {
    render(
      <TableOfContents>
        <a href="#answer">Current answer</a>
        <a href="#evidence">Evidence</a>
      </TableOfContents>
    );

    expect(
      screen.getByRole("link", { name: "Current answer" }).getAttribute("href")
    ).toBe("#answer");
  });
});
