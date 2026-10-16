import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`revealed text stays stable at the top boundary at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const line = page.locator(".reveal-line").first();
    await expect(line).toBeAttached();
    await line.evaluate(el => el.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(line).toHaveCSS("opacity", "1");
    const boundary = await line.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return scrollY + rect.bottom - 74;
    });
    for (const offset of [0, 3, -2, 10, -5]) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), boundary + offset);
      await page.waitForTimeout(250);
      expect(await line.evaluate(el => Number(getComputedStyle(el).opacity))).toBe(1);
    }
    // Sitting still at the old reversal boundary must not restart the animation.
    await page.waitForTimeout(1200);
    await expect(line).toHaveCSS("opacity", "1");
    expect(await line.evaluate(el => el.getAnimations()[0].playbackRate)).toBe(1);
    // Returning above the section still resets its entrance for another visit.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(line).toHaveCSS("opacity", "0");
    await line.evaluate(el => el.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(line).toHaveCSS("opacity", "1");
  });
}
