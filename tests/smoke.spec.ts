import { test, expect } from "@playwright/test";

test("menampilkan title aplikasi", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/LEXA Software House/);
});
