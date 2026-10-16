import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`product dropdown works at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/products');
    if (width < 900) await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const toggle = page.getByRole('button', { name: 'Toggle product pages' });
    const list = page.locator('#product-pages');
    await expect(list).toBeHidden();
    await toggle.click();
    await expect(list.getByRole('link')).toHaveCount(6);
    await expect(list).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(list).toBeHidden();
    await expect(toggle).toBeFocused();
    await toggle.press('ArrowDown');
    await expect(list.getByRole('link').first()).toBeFocused();
    await list.getByRole('link', { name: 'Composite Insulators', exact: true }).click();
    await expect(page).toHaveURL(/\/products\/composite-insulators$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Composite Insulators');
    await expect(list).toBeHidden();
    if (width < 900) await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await toggle.click();
    await page.locator('main h1').click();
    await expect(list).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
