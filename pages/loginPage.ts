import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://adactinhotelapp.com/");
  }

  async login(username: string, password: string) {
    await this.page.fill("#username", username);
    await this.page.fill("#password", password);
    await this.page.click("#login");
  }

  async assertWelcome(expected: string) {
    await expect(this.page.locator(".welcome_menu").first()).toHaveText(expected);
  }

  async assertError(expected: string) {
    await expect(this.page.locator("#username_show")).toContainText(expected);
  }
}
