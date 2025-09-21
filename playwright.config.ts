import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 0,
  timeout: 36000,
  reporter: [
    ['list'],
    ['html'], 
    ['allure-playwright', {
      detail: false,
      outputFolder: 'allure-results',
      suiteTitle: false,
      category: true,
      step: true,
      severity: true,
      description: true,
      link: true
    }],
  ],
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    acceptDownloads: true,
  },
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
