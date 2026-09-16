import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

const pages = ['/', '/start-a-project', '/work', '/process/quality', '/insights', '/process', '/services', '/services/ai-production', '/work/beyond-the-ordinary', '/agencies', '/about', '/insights/ai-is-changing-production-not-creativity', '/contact', '/industries', '/legal/privacy'];
for (const path of pages) {
  test(`accessible page: ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });
    if (path === '/') await page.getByRole('button', { name: /Commercial production/ }).click();
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
  });
}

test('mobile navigation remains accessible when open', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
});

test('the silent concept reel has an accessible modal', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Play showreel/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
});
