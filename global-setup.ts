// global-setup.ts
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🌍 Global Setup: runs before the entire test suite');
  // Example: Save authentication state
  // const { chromium } = require('@playwright/test');
  // const browser = await chromium.launch();
  // const page = await browser.newPage();
  // await page.goto('https://your-app.com/login');
  // await page.fill('#username', 'user');
  // await page.fill('#password', 'pass');
  // await page.click('button[type=submit]');
  // await page.context().storageState({ path: 'auth.json' });
  // await browser.close();
}

export default globalSetup;
