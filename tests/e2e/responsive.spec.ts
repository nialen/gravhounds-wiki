import path from "node:path";

import { expect, test } from "@playwright/test";

const visualDirectory = path.resolve("artifacts/visual");

test("desktop homepage has no overflow or browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  await page.waitForLoadState("networkidle");

  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  ).toBe(true);
  await expect(page.locator(".hero-image")).toHaveJSProperty("complete", true);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: path.join(visualDirectory, "home-desktop.png"),
    fullPage: true
  });
});

test("mobile navigation and homepage remain keyboard accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/");

  const button = page.getByRole("button", { name: "Open navigation" });
  await button.focus();
  await expect(button).toBeFocused();
  await button.press("Enter");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  ).toBe(true);
  await page.screenshot({
    path: path.join(visualDirectory, "home-mobile.png"),
    fullPage: true
  });
});

test("article layouts and requirement tables fit their viewports", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/release-date/");
  await page.screenshot({
    path: path.join(visualDirectory, "release-desktop.png"),
    fullPage: true
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/system-requirements/");
  const tableWrapper = page.locator(".table-scroll");
  await expect(tableWrapper).toHaveCount(1);
  expect(
    await tableWrapper.evaluate((element) => element.clientWidth <= element.parentElement!.clientWidth)
  ).toBe(true);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  ).toBe(true);
  await page.screenshot({
    path: path.join(visualDirectory, "requirements-mobile.png"),
    fullPage: true
  });
});
