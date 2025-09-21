import { Page } from "@playwright/test";

export class SelectPage {
  constructor(private page: Page) {}

  async selectHotel() {
    await this.page.check("input[name='radiobutton_0']");
    await this.page.click("#continue");
  }
}
