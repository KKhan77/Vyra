import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { eq, like } from 'drizzle-orm';
import { db, pool } from '@/db';
import { projectBriefs } from '@/db/schema';

test.afterAll(async () => {
  await db.delete(projectBriefs).where(like(projectBriefs.email, 'vyra-e2e-%@example.test'));
  await pool.end();
});

test('homepage visual slides and locally hosted reel work', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.hero h1')).toContainText('Big ideas.');
  await page.getByRole('button', { name: 'Next visual study' }).click();
  await expect(page.locator('.hero-film-label')).toContainText('FORM / FASHION EXPLORATION');
  await page.getByRole('button', { name: 'Previous visual study' }).click();
  await expect(page.locator('.hero-film-label')).toContainText('NOMAD / AUTOMOTIVE EXPLORATION');
  await page.getByRole('button', { name: /Play showreel/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect.poll(async () => page.locator('video').evaluate(video => (video as HTMLVideoElement).readyState)).toBeGreaterThan(1);
  const duration = await page.locator('video').evaluate(video => (video as HTMLVideoElement).duration);
  expect(duration).toBeGreaterThanOrEqual(17);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('service accordion expands and links to service detail', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /Commercial production/ });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const panel = page.locator('#service-panel-commercial-production');
  await expect(panel).toBeVisible();
  await panel.getByRole('link', { name: /Explore the service/ }).click();
  await expect(page).toHaveURL(/\/services\/commercial-production$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Commercial production');
});

test('portfolio filters and sort show the correct projects', async ({ page }) => {
  await page.goto('/work');
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Beauty', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card h3')).toHaveText('The nature of radiance.');
  await page.getByRole('button', { name: 'Technology', exact: true }).click();
  await expect(page.locator('.project-card h3')).toHaveText('Feel every frequency.');
  await page.getByRole('button', { name: /All work/ }).click();
  await page.getByLabel('Sort projects').selectOption('title');
  await expect(page.locator('.project-card h3').first()).toHaveText('A taste of more.');
});

test('case-study comparison can be controlled with a keyboard', async ({ page }) => {
  await page.goto('/work/beyond-the-ordinary');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Beyond the ordinary.');
  const slider = page.getByRole('slider');
  await slider.focus();
  await slider.press('ArrowRight');
  await expect(slider).toHaveValue('51');
  await expect(slider).toHaveAttribute('aria-valuetext', '51% final color direction');
  await expect(page.locator('.case-disclosure')).toContainText('No client commission');
});

test('insight categories have useful filtered and empty states', async ({ page }) => {
  await page.goto('/insights');
  await page.getByRole('button', { name: 'AI Filmmaking', exact: true }).click();
  await expect(page.locator('.journal-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Advertising', exact: true }).click();
  await expect(page.locator('.journal-card h3')).toHaveText('Attention is only the beginning.');
  await page.getByRole('searchbox', { name: 'Search insights' }).fill('a topic not in this journal');
  await expect(page.getByRole('status')).toContainText('Nothing in this frame. Yet.');
  await page.getByRole('button', { name: /Explore all insights/ }).click();
  await expect(page.locator('.journal-card')).toHaveCount(6);
  await page.locator('.journal-featured').click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Not creativity.');
  await expect(page.locator('.article-image-credit')).toContainText('Illustrative placeholder image.');
});

test('every sitemap page resolves and unknown URLs return 404', async ({ request }) => {
  test.setTimeout(120_000);
  const xml = await (await request.get('/sitemap.xml')).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  expect(urls.length).toBeGreaterThan(45);
  for (const path of urls) {
    const response = await request.get(path);
    expect(response.status(), `${path} should resolve`).toBe(200);
  }
  expect((await request.get('/this-frame-does-not-exist')).status()).toBe(404);
});

test('a project brief and attachment are saved to PostgreSQL', async ({ page }) => {
  const email = `vyra-e2e-${Date.now()}@example.test`;
  await page.goto('/start-a-project');
  await page.locator('[name="name"]').fill('Creative Test');
  await page.locator('[name="company"]').fill('VYRA QA Studio');
  await page.locator('[name="email"]').fill(email);
  await page.locator('[name="phone"]').fill('+971 50 000 0000');
  await page.locator('[name="website"]').fill('example.test');
  await page.locator('[name="industry"]').selectOption({ label: 'Automotive' });
  await page.locator('[name="projectType"]').selectOption({ label: 'Commercial production' });
  await page.locator('[name="objective"]').fill('Create a cinematic concept for an electric vehicle launch.');
  await page.getByRole('checkbox', { name: 'Hero film', exact: true }).check();
  await page.getByRole('checkbox', { name: 'English', exact: true }).check();
  await page.locator('[name="markets"]').fill('UAE and UK');
  await page.locator('[name="budget"]').selectOption({ label: 'Let’s discuss' });
  await page.locator('[name="timeline"]').selectOption({ label: 'Flexible' });
  await page.locator('[name="attachment"]').setInputFiles({ name: 'creative-brief.txt', mimeType: 'text/plain', buffer: Buffer.from('VYRA browser test brief: ambitious ideas, carefully produced.') });
  await page.locator('[name="consent"]').check();
  const responsePromise = page.waitForResponse(response => response.url().endsWith('/api/briefs') && response.request().method() === 'POST');
  await page.getByRole('button', { name: 'Submit your brief', exact: true }).click();
  const response = await responsePromise;
  expect(response.status(), await response.text()).toBe(201);
  await expect(page.locator('.form-success h2')).toHaveText('Your big idea is in.');
  const reference = await page.locator('.submission-reference strong').innerText();
  const [saved] = await db.select().from(projectBriefs).where(eq(projectBriefs.reference, reference));
  expect(saved.email).toBe(email);
  expect(saved.deliverables).toEqual(['Hero film']);
  expect(saved.languages).toEqual(['English']);
  expect(saved.attachmentName).toBe('creative-brief.txt');
  expect(Buffer.from(saved.attachmentData!, 'base64').toString()).toContain('VYRA browser test brief');
  expect(saved.consent).toBe(true);
});

test('contact topics persist and contact messages are saved', async ({ page }) => {
  const email = `vyra-e2e-contact-${Date.now()}@example.test`;
  await page.goto('/contact?subject=careers');
  await expect(page.locator('[name="projectType"]')).toHaveValue('Careers');
  await page.locator('[name="name"]').fill('Curious Creative');
  await page.locator('[name="email"]').fill(email);
  await page.locator('[name="message"]').fill('I would like to share my editing portfolio and discuss creative collaboration.');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button', { name: 'Send your message', exact: true }).click();
  await expect(page.locator('.form-success h2')).toHaveText('Your message is in.');
  const [saved] = await db.select().from(projectBriefs).where(eq(projectBriefs.email, email));
  expect(saved.kind).toBe('contact');
  expect(saved.projectType).toBe('Careers');
});

test('consultation and agency forms use the correct enquiry type', async ({ page }) => {
  await page.goto('/start-a-project?type=consultation');
  await expect(page.locator('[name="kind"]')).toHaveValue('consultation');
  await expect(page.locator('[name="projectType"]')).toHaveValue('Creative consultation');
  await expect(page.getByRole('button', { name: 'Request a creative consultation', exact: true })).toBeVisible();
  await page.goto('/agencies/partner');
  await expect(page.locator('[name="kind"]')).toHaveValue('agency');
  await expect(page.locator('[name="projectType"]')).toHaveValue('Agency partnership');
});

test('mobile navigation works and key pages do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(menu).toBeVisible();
  await menu.getByRole('link', { name: 'For Agencies' }).click();
  await expect(page).toHaveURL(/\/agencies$/);
  await expect(menu).toHaveCount(0);
  for (const path of ['/', '/work', '/services', '/start-a-project', '/contact', '/work/beyond-the-ordinary', '/process']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    expect(overflow, `No horizontal overflow on ${path}`).toBe(false);
  }
});

test('invalid briefs and disallowed attachments are rejected', async ({ request }) => {
  const missing = await request.post('/api/briefs', { multipart: { name: 'A', email: 'invalid', projectType: 'Commercial production', consent: 'on' } });
  expect(missing.status()).toBe(400);
  const invalidAttachment = await request.post('/api/briefs', { multipart: { kind: 'project', name: 'Test Submitter', company: 'Test Studio', email: 'vyra-e2e-invalid@example.test', projectType: 'Commercial production', budget: 'Let’s discuss', timeline: 'Flexible', consent: 'on', attachment: { name: 'not-a-real-pdf.pdf', mimeType: 'application/pdf', buffer: Buffer.from('Not PDF data') } } });
  expect(invalidAttachment.status()).toBe(400);
  expect((await invalidAttachment.json()).error).toContain('does not match');
});
