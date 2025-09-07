import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'results/test-results',
  reporter: [['html', { outputFolder: 'results/playwright-report', open: 'never' }]],
  use: {
    baseURL: 'https://demo.playwright.dev/todomvc',
    actionTimeout: 15000,
    navigationTimeout: 20000,
    headless: process.env.CI ? true : false,
    launchOptions: {
      slowMo: 500,
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',     
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],
 });
