import { test, expect } from "@playwright/test";

test("product index stays pinned and tracks all six cards in both directions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const cards = page.locator(".product-story-card");
  const links = page.locator(".product-story-nav a");
  await expect(cards).toHaveCount(6);
  for (const index of [0, 1, 2, 3, 4, 5, 2, 0]) {
    await cards.nth(index).evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "instant" }));
    await expect(links.nth(index)).toHaveAttribute("aria-current", "location");
    const sidebar = await page.locator(".product-story-sidebar").boundingBox();
    expect(sidebar!.y).toBeGreaterThanOrEqual(48);
    expect(sidebar!.y).toBeLessThan(130);
  }
  await links.nth(3).click();
  await expect(links.nth(3)).toHaveAttribute("aria-current", "location");
  await expect(page).toHaveURL(/#product-card-3$/);
  await expect(links.nth(3)).toHaveCSS("color", "rgb(145, 169, 201)");
  await page.screenshot({ path: "/tmp/accretion-product-scroll-desktop.png" });
});

test("mobile product cards fit and keep working anchor navigation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(".product-story-sidebar")).toHaveCSS("position", "static");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.product-story-nav a').last().click();
  await expect(page.locator('.product-story-nav a').last()).toHaveAttribute("aria-current", "location");
  await expect(page.locator('#product-card-5')).toBeInViewport();
  await expect.poll(() => page.locator('#product-card-5 img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: "/tmp/accretion-product-scroll-mobile.png" });
});
