import { test, expect } from "@playwright/test";

test.describe("Icon selection flow in CMS", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    // Login with admin credentials from seed
    await page.getByLabel(/email/i).fill("admin@lexatech.id");
    await page.getByLabel(/password/i).fill("admin123");
    await page.getByRole("button", { name: /sign in|login|masuk/i }).click();

    // Wait for redirect to admin dashboard
    await page.waitForURL(/\/admin/);
  });

  test("icon picker can be opened in service form", async ({ page }) => {
    await page.goto("/admin/services/new");
    await page.waitForLoadState("networkidle");

    // Search for an icon
    const searchInput = page.getByPlaceholder(/search icon/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill("recycle");

    // Verify result shows up
    await expect(page.getByRole("option")).toHaveCount(1);
    await expect(page.getByTitle("recycle")).toBeVisible();
  });

  test("icon search filters results", async ({ page }) => {
    await page.goto("/admin/services/new");
    await page.waitForLoadState("networkidle");

    const searchInput = page.getByPlaceholder(/search icon/i);
    await searchInput.fill("zzzznonexistent");

    await expect(page.getByText(/no icons match/i)).toBeVisible();
  });

  test("icon can be selected and previewed", async ({ page }) => {
    await page.goto("/admin/services/new");
    await page.waitForLoadState("networkidle");

    // Search and select an icon
    const searchInput = page.getByPlaceholder(/search icon/i);
    await searchInput.fill("recycle");
    await page.getByTitle("recycle").click();

    // Verify preview shows selected icon
    await expect(page.getByText("recycle")).toBeVisible();
  });

  test("icon persists after save and reload - service entity", async ({ page }) => {
    await page.goto("/admin/services/new");
    await page.waitForLoadState("networkidle");

    // Select icon
    const searchInput = page.getByPlaceholder(/search icon/i);
    await searchInput.fill("recycle");
    await page.getByTitle("recycle").click();

    // Fill required fields
    await page.getByLabel(/title/i).fill("E2E Test Service");
    
    // Fill description in Trix editor
    const trixEditor = page.locator("trix-editor");
    await trixEditor.click();
    await page.keyboard.type("E2E test description");

    // Set sort order
    await page.getByLabel(/sort order/i).fill("1");

    // Submit
    await page.getByRole("button", { name: /save/i }).click();

    // Wait for redirect
    await page.waitForURL(/\/admin\/services/);

    // Open the item for editing
    const editLink = page.getByRole("link", { name: /edit/i }).last();
    await editLink.click();
    await page.waitForLoadState("networkidle");

    // Verify icon is still selected
    await expect(page.getByText("recycle")).toBeVisible();
  });
});
