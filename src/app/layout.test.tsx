import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("geist/font/sans", () => ({ GeistSans: { variable: "font-sans" } }));
vi.mock("geist/font/mono", () => ({ GeistMono: { variable: "font-mono" } }));

import RootLayout from "./layout";

describe("RootLayout analytics", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  });

  it("loads the Google tag for a valid GA4 measurement ID", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST1234";

    const html = renderToStaticMarkup(
      <RootLayout>
        <main>Analytics test</main>
      </RootLayout>
    );

    expect(html).toContain("https://www.googletagmanager.com/gtag/js?id=G-TEST1234");
    expect(html).toContain("gtag('config', 'G-TEST1234')");
  });

  it("does not load the Google tag for a malformed measurement ID", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "not-a-ga4-id";

    const html = renderToStaticMarkup(
      <RootLayout>
        <main>Analytics test</main>
      </RootLayout>
    );

    expect(html).not.toContain("googletagmanager.com");
    expect(html).not.toContain("google-analytics");
  });
});
