import { Page } from "@playwright/test";

// ============================================================
// Shared Admin Auth Helper
// Digunakan oleh semua test admin yang membutuhkan sesi login.
// ============================================================

export const ADMIN_EMAIL = "admin@lexatech.id";
export const ADMIN_PASSWORD = "admin123";

/**
 * Performs full login flow then navigates to the target admin page.
 * Works with both Chromium and Firefox.
 *
 * Strategy:
 *  1. Navigate to /login directly (not /admin, which redirects)
 *  2. Wait for the form to be ready (via heading "Welcome back")
 *  3. Fill credentials and submit
 *  4. Wait for URL to reach /admin (deterministic, no waitForTimeout)
 *  5. Navigate to the target page
 */
export async function loginAndNavigateTo(page: Page, targetPath: string): Promise<void> {
  // Step 1 & 2: go to login page and wait for it to be ready
  await page.goto("/login", { waitUntil: "domcontentloaded" });

  // Wait for the h2 heading as a reliable indicator the form is hydrated
  await page
    .getByRole("heading", { name: "Welcome back" })
    .waitFor({ state: "visible", timeout: 15000 });

  // Step 3: fill and submit (brief wait for React hydration to settle)
  await page.waitForTimeout(300);
  await page.getByLabel("Email", { exact: true }).fill(ADMIN_EMAIL);
  await page.getByLabel("Password", { exact: true }).fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign In" }).click();

  // Step 4: wait until we land on /admin (router.push in onSubmit)
  await page.waitForURL(/\/admin/, { timeout: 20000 });

  // Step 5: navigate to target
  if (targetPath !== "/admin") {
    await page.goto(targetPath, { waitUntil: "domcontentloaded" });
  }
}
