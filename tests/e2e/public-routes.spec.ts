import { expect, test } from "@playwright/test";

const routes = [
  "/en/",
  "/en/release-date/",
  "/en/gameplay/",
  "/en/system-requirements/",
  "/en/platforms/",
  "/en/game-pass/",
  "/en/playtest/",
  "/en/early-access/",
  "/en/characters/",
  "/en/trailer/"
];

for (const route of routes) {
  test(`${route} is indexable`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${route.replaceAll("/", "\\/")}$`)
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /^.{120,160}$/
    );
  });
}

test("deferred routes are not public", async ({ request }) => {
  expect((await request.get("/en/beginner-guide/")).status()).toBe(404);
  expect((await request.get("/en/crossplay/")).status()).toBe(404);
});

test("external footer links disclose a safe browsing relationship", async ({ page }) => {
  await page.goto("/en/");
  const links = page.locator(".footer-links a");

  await expect(links).toHaveCount(4);
  for (let index = 0; index < (await links.count()); index += 1) {
    await expect(links.nth(index)).toHaveAttribute("rel", /noreferrer/);
  }
});
