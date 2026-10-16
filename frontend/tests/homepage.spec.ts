import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [375, 768, 1440, 1920]) {
  test(`landing page fits and is accessible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Powering progress.Part by part.");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.getAttribute('href')!.slice(1))).map(link => link.getAttribute('href')))).toEqual([]);
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
    expect(errors).toEqual([]);
    await expect.poll(() => page.locator(".product-image img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    await page.screenshot({ path: `/tmp/accretion-power-${width}.png`, fullPage: true });
  });
}
test("product tabs support selection, keyboard navigation, and complete images", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  for (let i = 0; i < await tabs.count(); i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute("aria-selected", "true");
    const panel = page.getByRole("tabpanel");
    await expect(panel).toBeVisible();
    await expect(panel.locator("img")).toBeVisible();
    await expect.poll(() => panel.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(panel.getByRole("link")).toHaveAttribute("href", /mailto:benjamin.vietmeier@accretionpower.com\?subject=/);
  }
  await tabs.last().press("ArrowRight");
  await expect(tabs.first()).toBeFocused();
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
});
test("mobile navigation supports skip link, Escape, and section navigation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const toggle = page.getByRole("button", { name: /navigation menu/ });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("navigation").getByRole("link", { name: "Products", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.getByRole("navigation").getByRole("link", { name: "Products", exact: true }).click();
  await expect(page).toHaveURL(/#products$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("scroll effects activate and reduced motion disables parallax", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator("#intro").scrollIntoViewIfNeeded();
  await expect(page.locator(".intro-main")).toHaveClass(/revealed/);
  await expect.poll(() => page.locator(".hero-photo").evaluate(el => getComputedStyle(el).transform)).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.locator(".hero-photo").evaluate(el => getComputedStyle(el).transform)).toBe("none");
});

for (const width of [375, 1440]) {
  test(`navbar compacts, stays pinned, and expands again at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const header = page.locator(".floating-header");
    const initial = (await header.boundingBox())!;
    expect(initial.y).toBeLessThanOrEqual(8);
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
    await expect.poll(async () => (await header.boundingBox())!.height).toBeLessThan(initial.height - 5);
    const compact = (await header.boundingBox())!;
    expect(compact.width).toBeLessThan(initial.width);
    expect(compact.y).toBeGreaterThanOrEqual(0);
    expect(compact.y).toBeLessThanOrEqual(4);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(header).toBeInViewport();
    if (width < 900) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await expect(page.getByRole("navigation")).toBeVisible();
      await page.getByRole("navigation").getByRole("link", { name: "Products", exact: true }).click();
      await expect(page).toHaveURL(/#products$/);
    }
    await page.screenshot({ path: `/tmp/accretion-navbar-${width}.png` });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect.poll(async () => Math.abs((await header.boundingBox())!.width - initial.width)).toBeLessThan(1);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
    await expect.poll(async () => (await header.boundingBox())!.height).toBeLessThan(initial.height - 5);
  });
}
