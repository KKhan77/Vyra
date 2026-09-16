import 'dotenv/config';
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000', headless: true, viewport: { width: 1440, height: 1000 }, launchOptions: { args: ['--no-sandbox'] }, screenshot: 'only-on-failure' },
});
