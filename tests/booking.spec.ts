import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SearchPage } from "../pages/SearchPage";
import { SelectPage } from "../pages/SelectPage";
import { BookingPage } from "../pages/BookingPage";
import bookingData from "../data/bookingData.json";

for (const data of bookingData) {
  test(`Hotel Booking Test - ${data.username} - ${data.location}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const searchPage = new SearchPage(page);
    const selectPage = new SelectPage(page);
    const bookingPage = new BookingPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(data.username, data.password);

    // Step 2: Search hotel
    await searchPage.searchHotel(data.location, data.hotel, data.roomType);

    // Step 3: Select hotel
    await selectPage.selectHotel();

    // Step 4: Book hotel
    await bookingPage.bookHotel(
      data.firstName,
      data.lastName,
      data.address,
      data.ccNum
    );

    // Step 5: Verify booking
    const orderId = await bookingPage.verifyBooking();
    console.log(
      `✅ Booking Successful for ${data.username} at ${data.location}. Order ID: ${orderId}`
    );
  });
}
