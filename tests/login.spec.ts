import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import loginData from "../data/loginData.json";

for (const data of loginData) {
  test(`Login Test - ${data.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(data.username, data.password);

    if (data.valid) {
      await loginPage.assertWelcome(data.expected);
    } else {
      await loginPage.assertError(data.expected);
    }
  });
}
