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

test("navigation distinguishes the current page from hover without underlines", async ({ page }) => {
  await page.goto("/en/gameplay/");

  const current = page.locator(".desktop-nav a", { hasText: "Gameplay" });
  const hovered = page.locator(".desktop-nav a", { hasText: "Release" });

  await expect(current).toHaveAttribute("aria-current", "page");
  const activeStyles = await current.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      backgroundColor: styles.backgroundColor,
      textDecorationLine: styles.textDecorationLine
    };
  });

  await hovered.hover();
  await expect
    .poll(() =>
      hovered.evaluate((element) => getComputedStyle(element).backgroundColor)
    )
    .not.toBe("rgba(0, 0, 0, 0)");
  const hoverStyles = await hovered.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      backgroundColor: styles.backgroundColor,
      textDecorationLine: styles.textDecorationLine
    };
  });

  expect(activeStyles.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(hoverStyles.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(hoverStyles.backgroundColor).not.toBe(activeStyles.backgroundColor);
  expect(activeStyles.textDecorationLine).toBe("none");
  expect(hoverStyles.textDecorationLine).toBe("none");
});
