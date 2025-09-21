import { Page } from "@playwright/test";

export class SearchPage {
  constructor(private page: Page) {}

  async searchHotel(location: string, hotel: string, roomType: string) {
    await this.page.selectOption("#location", location);
    await this.page.selectOption("#hotels", hotel);
    await this.page.selectOption("#room_type", roomType);
    await this.page.click("#Submit");
  }
}
