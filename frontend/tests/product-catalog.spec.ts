import { test, expect } from "@playwright/test";

test('six image-first families form two desktop rows above the connection footer', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/products');
  const tiles = page.locator('section[aria-label="Product families"] a:has(h2)');
  await expect(tiles).toHaveCount(6);
  const boxes = await tiles.evaluateAll(items => items.map(item => {
    const box = item.getBoundingClientRect();
    return { top: box.top, left: box.left };
  }));
  expect(boxes[0].top).toBe(boxes[2].top);
  expect(boxes[3].top).toBe(boxes[5].top);
  expect(boxes[3].top).toBeGreaterThan(boxes[0].top);
  await expect.poll(() => tiles.locator('img').evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await page.screenshot({ path: '/tmp/products-six-grid.png' });
  for (const tile of await tiles.all()) await expect(tile).toHaveAttribute('href', /^\/products\//);
  await expect(page.locator('#catalog')).toHaveCount(0);
  await expect(page.locator('.pc-hero-actions')).toHaveCount(0);
  await expect(page.locator('.closing-contact')).toHaveCount(1);
  await expect(page.locator('.closing-footer')).toHaveCount(1);
});

for (const width of [1440, 390]) {
  test(`individual product pages work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/products');
    const links = await page.locator('section[aria-label="Product families"] a:has(h2)').evaluateAll(items => items.map(item => ({ href: item.getAttribute('href')!, name: item.querySelector('h2')!.textContent! })));
    for (const product of links) {
      const response = await page.goto(product.href);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { name: product.name, exact: true, level: 1 })).toBeVisible();
      await expect(page.locator('main img')).toHaveJSProperty('complete', true);
      await expect(page.locator('main img')).not.toHaveJSProperty('naturalWidth', 0);
      await expect(page.locator('main a.button')).toHaveAttribute('href', /^mailto:/);
      await expect(page.getByRole('link', { name: 'All products', exact: true })).toHaveAttribute('href', '/products');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (product.name === 'Epoxy Components') await page.screenshot({ path: `/tmp/product-detail-${width}.png`, fullPage: true });
    }
    expect((await page.goto('/products/not-a-product'))?.status()).toBe(404);
    await page.goto('/products');
    await page.getByRole('link', { name: 'Explore Bus Boots', exact: true }).click();
    await expect(page).toHaveURL(/\/products\/bus-boots$/);
    await expect(page.getByRole('heading', { name: 'Bus Boots', exact: true, level: 1 })).toBeVisible();
  });
}
