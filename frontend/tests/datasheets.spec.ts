import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";
import path from "node:path";

test("datasheet library lists every uploaded PDF exactly once", async ({ page, request }) => {
  await page.goto("/datasheets");
  const rows = page.locator(".spec-table tbody tr:visible");
  await expect(rows).toHaveCount(12);
  const downloads = page.locator(".spec-table a[download]");
  await expect(downloads).toHaveCount(12);
  const names = await downloads.evaluateAll(links => links.map(link => link.getAttribute("download")!).sort());
  expect(names).toEqual(readdirSync(path.join(process.cwd(), "public/datasheets")).filter(name => name.endsWith(".pdf")).sort());
  for (const href of await downloads.evaluateAll(links => links.map(link => link.getAttribute("href")!))) {
    expect((await request.get(href)).ok()).toBe(true);
  }
});

test("model searches return their parent PDF and clear restores the library", async ({ page }) => {
  await page.goto("/datasheets");
  const search = page.getByRole("searchbox");
  for (const [model, series] of [["N-005-0115", "A20 Series Epoxy Insulators"], ["N-008-0158", "A30 Series Epoxy Insulators"]]) {
    await search.fill(model);
    await expect(page.locator(".spec-table tbody tr:visible")).toHaveCount(1);
    await expect(page.getByRole("link", { name: `Download PDF for ${series}`, exact: true })).toBeVisible();
    await expect(page.locator("details:visible")).toHaveAttribute("open", "");
  }
  await search.fill("N-002-0082-ASR-301");
  await expect(page.locator(".spec-table tbody tr:visible")).toHaveCount(1);
  await search.fill("no-such-datasheet");
  await expect(page.locator(".spec-table tbody tr:visible")).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("No datasheets matched");
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.locator(".spec-table tbody tr:visible")).toHaveCount(12);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
