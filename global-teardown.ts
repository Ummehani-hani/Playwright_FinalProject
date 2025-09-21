// global-teardown.ts
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🛑 Global Teardown: runs after the entire test suite');
  // Example: Clean up DB, close connections, etc.
}

export default globalTeardown;
