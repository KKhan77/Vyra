import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { insightCategories, insights } from '@/lib/insight-articles';

 test('the journal has a featured story and six image-led article cards', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/insights', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toContainText('the next frame');
  await expect(page.locator('.journal-featured')).toBeVisible();
  await expect(page.locator('.journal-card')).toHaveCount(6);
  await expect(page.locator('.journal-featured-image img')).toHaveAttribute('alt', /Illustrative placeholder/);
  await expect(page.locator('.desktop-nav a[href="/insights"]')).toHaveClass('active');
  const image = page.locator('.journal-featured-image img');
  expect(await image.evaluate(node => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
  expect(errors).toEqual([]);
});

test('every category has the expected linked articles', async ({ page }) => {
  await page.goto('/insights');
  for (const category of insightCategories.filter(item => item !== 'All insights')) {
    await page.getByRole('button', { name: category, exact: true }).click();
    await expect(page.locator('.journal-card')).toHaveCount(insights.filter(item => item.category === category).length);
    await expect(page.getByRole('button', { name: category, exact: true })).toHaveAttribute('aria-pressed', 'true');
  }
});

test('search, clear, and filters work together', async ({ page }) => {
  await page.goto('/insights');
  await page.getByRole('searchbox', { name: 'Search insights' }).fill('brand');
  await expect(page.locator('.journal-card')).toHaveCount(1);
  await expect(page.locator('.journal-card h3')).toHaveText('New possibilities. Still unmistakably your brand.');
  await page.getByRole('button', { name: 'Advertising', exact: true }).click();
  await expect(page.locator('.journal-empty')).toBeVisible();
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await expect(page.locator('.journal-card h3')).toHaveText('Attention is only the beginning.');
  await expect(page.getByRole('searchbox', { name: 'Search insights' })).toBeFocused();
});

test('more perspectives reveals the remaining cards and persists on refresh', async ({ page }) => {
  await page.goto('/insights');
  await page.getByRole('button', { name: 'More perspectives', exact: true }).click();
  await expect(page.locator('.journal-card')).toHaveCount(9);
  await expect(page.locator('.journal-caught-up')).toContainText('You’re all caught up.');
  await expect(page.locator('#journal-building-an-impossible-world')).toBeFocused();
  await expect(page).toHaveURL(/limit=12/);
  await page.reload();
  await expect(page.locator('.journal-card')).toHaveCount(9);
});

test('sort order can be changed without losing the current category', async ({ page }) => {
  await page.goto('/insights');
  await page.getByRole('combobox', { name: 'Sort insights' }).selectOption('oldest');
  await expect(page.locator('.journal-card h3').first()).toHaveText('The craft between the frames.');
  await page.getByRole('combobox', { name: 'Sort insights' }).selectOption('shortest');
  await expect(page.locator('.journal-card h3').first()).toHaveText('Attention is only the beginning.');
  await page.getByRole('button', { name: 'Creative Technology', exact: true }).click();
  await expect(page.locator('.journal-card')).toHaveCount(2);
  await expect(page.getByRole('combobox', { name: 'Sort insights' })).toHaveValue('shortest');
});

test('shared filter URLs and browser back restore the selection', async ({ page }) => {
  await page.goto('/insights?category=AI%20Filmmaking&q=creativity');
  await expect(page.getByRole('button', { name: 'AI Filmmaking', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('searchbox', { name: 'Search insights' })).toHaveValue('creativity');
  await expect(page.locator('.journal-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await page.getByRole('button', { name: 'Case Studies', exact: true }).click();
  await expect(page.locator('.journal-card h3')).toHaveText('Building a world beyond the ordinary.');
  await page.goBack();
  await expect(page.getByRole('button', { name: 'AI Filmmaking', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.journal-card h3')).toHaveText('AI is changing production. Not creativity.');
});

test('journal layouts fit mobile, tablet, and desktop screens', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/insights', { waitUntil: 'networkidle' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `No horizontal overflow at ${width}px`).toBe(true);
  }
});

test('mobile journal and search empty state pass automated accessibility checks', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/insights', { waitUntil: 'networkidle' });
  let scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
  await page.getByRole('searchbox', { name: 'Search insights' }).fill('no matching perspective');
  scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
});

test('invalid filter parameters fall back to the default journal', async ({ page }) => {
  await page.goto('/insights?category=invalid&sort=invalid&limit=-1');
  await expect(page.getByRole('button', { name: 'All insights', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.journal-card')).toHaveCount(6);
  await expect(page.getByRole('combobox', { name: 'Sort insights' })).toHaveValue('newest');
});
