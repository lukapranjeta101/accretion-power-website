import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "no-preference", viewport: { width: 1440, height: 900 } });

for (const width of [390, 1440]) {
  test(`native scrolling crosses products without locking at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
    await page.evaluate(() => document.getElementById("products")!.scrollIntoView({ behavior: "instant" }));
    await page.waitForTimeout(500);
    await page.mouse.move(width / 2, 450);
    const before = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, 200);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
    await page.waitForTimeout(250);
    const settled = await page.evaluate(() => scrollY);
    await page.waitForTimeout(700);
    expect(await page.evaluate(() => scrollY)).toBe(settled);
    await page.mouse.wheel(0, -120);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(settled);
    await page.mouse.wheel(0, 1800);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(settled + 1000);
    await expect(page.getByRole("tab", { name: "Epoxy components", exact: true })).toHaveAttribute("aria-selected", "true");
    await expect.poll(() => page.locator(".hero-media video").evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await page.getByRole("tab", { name: "Copper", exact: true }).click();
    await expect(page.getByRole("tabpanel")).toHaveCount(1);
    await expect(page.getByRole("tabpanel")).toHaveAttribute("id", "product-panel-3");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("anchors, keyboard focus, reduced motion, and datasheet navigation work", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.getByRole("link", { name: "Let’s talk", exact: true }).click();
  await page.waitForTimeout(1200);
  expect(await page.locator("#contact").evaluate(n => n.getBoundingClientRect().top)).toBeCloseTo(49, 0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  expect(await page.locator("[data-reveal]").evaluateAll(nodes => nodes.every(n => n.getAnimations().length === 0))).toBe(true);
  await page.getByRole("link", { name: "Datasheets", exact: true }).click();
  await expect(page.locator(".spec-table tbody tr:visible")).toHaveCount(12);
});
