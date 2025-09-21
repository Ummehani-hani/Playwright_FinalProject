import { Page, expect } from "@playwright/test";

export class BookingPage {
  constructor(private page: Page) {}

  async bookHotel(firstName: string, lastName: string, address: string, ccNum: string) {
    await this.page.fill("#first_name", firstName);
    await this.page.fill("#last_name", lastName);
    await this.page.fill("#address", address);
    await this.page.fill("#cc_num", ccNum);

    await this.page.selectOption("#cc_type", "VISA");
    await this.page.selectOption("#cc_exp_month", "1");
    await this.page.selectOption("#cc_exp_year", "2026");
    await this.page.fill("#cc_cvv", "123");

    await this.page.click("#book_now");
  }

  async verifyBooking() {
    await this.page.waitForSelector("#order_no");
    const orderId = await this.page.inputValue("#order_no");
    expect(orderId).not.toBe("");
    return orderId;
  }
}
