import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import loginData from '../data/loginData.json';


// Test data array
const loginTcData = [
  { username: 'HaniTester', password: 'HaniTester', expected: 'Welcome to Adactin Group of Hotels' },
  { username: 'WrongUser', password: 'WrongPass', expected: 'Invalid Login details or Your Password might have expired. Click here to reset your password' },
];



test.beforeAll(async () => {
  console.log("=== Before All: Test Suite Started ===");
});

test.afterAll(async () => {
  console.log("=== After All: Test Suite Finished ===");
});

test.beforeEach(async ({ page }) => {
  console.log(">>> Before Each: Starting a new test <<<");
});

test.afterEach(async () => {
  console.log("<<< After Each: Test Completed >>>");
});

test("Login Test", async ({ page }) => {
  await page.goto("https://adactinhotelapp.com/");
  await page.fill("#username", "HaniTester");
  await page.fill("#password", "HaniTester");
  await page.click("#login");
  await expect(page.locator(".welcome_menu").first()).toHaveText("Welcome to Adactin Group of Hotels");
});


test("Login Test2", async ({ page }) => {
  test.info().annotations.push({ type: 'Epic', description: 'Authentication' });
  test.info().annotations.push({ type: 'Feature', description: 'Login Page' });
  test.info().annotations.push({ type: 'Story', description: 'Valid Login' });

    test.step('Step 1: Go to login page', async () => {
        await page.goto("https://adactinhotelapp.com/");
    });

    test.step('Step 2: Enter credentials and submit', async () => {
        await page.fill("#username", "HaniTester");
        await page.fill("#password", "HaniTester");
        await page.click("#login");
    });

    test.step('Step 3: Verify successful login', async () => {  
        await expect(page.locator(".welcome_menu").first()).toHaveText("Welcome to Adactin Group of Hotels");
    });
});


test("Login Test3", async ({ page }) => {
  allure.epic('Authentication');
  allure.feature('Login Page');
  allure.story('Valid Login');
  allure.owner('QA Team');
  allure.severity('critical');   // optional

  await page.goto("https://adactinhotelapp.com/");
  await page.fill("#username", "HaniTester");
  await page.fill("#password", "HaniTester");
  await page.click("#login");
  await expect(page.locator(".welcome_menu").first()).toHaveText("Welcome to Adactin Group of Hotels");
});


for (const data of loginTcData) {
  test(`Login Test Data Driven - ${data.username}`, async ({ page }) => {
    
    // Steps
    await page.goto('https://adactinhotelapp.com/');
    await page.fill('#username', data.username);
    await page.fill('#password', data.password);
    await page.click('#login');

    // Validation
    if (data.username === 'HaniTester' && data.password === 'HaniTester') {
      await expect(page.locator('.welcome_menu').first()).toHaveText(data.expected);
    } else {
      await expect(page.locator('div#login_form span#username_span, div#login_form span#password_span, div#login_form span#login_message'))
        .toContainText(data.expected);
    }
  });
}

for (const data of loginData) {
  test(`Login Test Data Driven External Source - ${data.username}`, async ({ page }) => {

    // Steps
    await page.goto('https://adactinhotelapp.com/');
    await page.fill('#username', data.username);
    await page.fill('#password', data.password);
    await page.click('#login');

    // Validation
    if (data.username === 'HaniTester' && data.password === 'HaniTester') {
      await expect(page.locator('.welcome_menu').first()).toHaveText(data.expected);
    } else {
      await expect(
        page.locator('div#login_form span#username_span, div#login_form span#password_span, div#login_form span#login_message')
      ).toContainText(data.expected);
    }
  });
}