import { test, expect, Page } from "@playwright/test";

// ============================================================
// E2E Test: Admin – Section Headings
// Target: /admin/section-headings
//
// Tidak ada test create/delete karena section headings adalah
// data konfigurasi tetap (per key, bukan list yang bisa ditambah/hapus).
// Test fokus pada:
//   - verifikasi form tampil dengan card per section
//   - edit eyebrow dan title, lalu simpan
//   - tombol Save per card berjalan benar
// ============================================================

const ADMIN_EMAIL = "admin@lexatech.id";
const ADMIN_PASSWORD = "admin123";

// --------------------------------------------------------
// Helper: Login dan navigasi ke halaman section headings
// --------------------------------------------------------
async function loginAndGoToSectionHeadings(page: Page) {
  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "Welcome back" })
  ).toBeVisible();

  await page.waitForTimeout(1000);
  await page.getByLabel("Email", { exact: true }).fill(ADMIN_EMAIL);
  await page.getByLabel("Password", { exact: true }).fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForTimeout(2000);

  await page.goto("/admin/section-headings", { waitUntil: "domcontentloaded" });

  // Tunggu halaman Section Headings termuat
  await expect(
    page.getByRole("heading", { name: "Section Headings" })
  ).toBeVisible({ timeout: 20000 });
}

// ============================================================
// Test Suite
// ============================================================
test.describe("Admin – Section Headings", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  // ----------------------------------------------------------
  // 1. Verifikasi halaman termuat dengan card per section
  // ----------------------------------------------------------
  test("halaman Section Headings menampilkan heading utama dan setidaknya satu card", async ({
    page,
  }) => {
    await loginAndGoToSectionHeadings(page);

    // Heading utama halaman
    await expect(
      page.getByRole("heading", { name: "Section Headings" })
    ).toBeVisible();

    // Harus ada minimal satu form card dengan label Eyebrow dan Title
    const eyebrowLabels = page.getByText("Eyebrow", { exact: true });
    await expect(eyebrowLabels.first()).toBeVisible();

    const titleLabels = page.getByText("Title", { exact: true });
    await expect(titleLabels.first()).toBeVisible();

    // Harus ada tombol Save untuk setiap card
    const saveBtns = page.getByRole("button", { name: "Save" });
    await expect(saveBtns.first()).toBeVisible();
  });

  // ----------------------------------------------------------
  // 2. Edit eyebrow pada card pertama dan simpan
  // ----------------------------------------------------------
  test("admin dapat mengedit eyebrow pada card Section Heading pertama dan menyimpan", async ({
    page,
  }) => {
    await loginAndGoToSectionHeadings(page);

    // Ambil form pertama (card pertama)
    const firstCard = page.locator("form").first();

    // Ambil input eyebrow di dalam card pertama
    const eyebrowInput = firstCard
      .getByLabel("Eyebrow", { exact: true })
      .or(firstCard.locator("input[name='eyebrow']"));

    // Isi nilai baru
    const newEyebrow = `Updated Eyebrow ${Date.now()}`;
    await eyebrowInput.fill(newEyebrow);

    // Klik Save dan tunggu API response
    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/cms/section-headings") &&
          resp.request().method() === "PUT",
        { timeout: 15000 }
      ),
      firstCard.getByRole("button", { name: "Save" }).click(),
    ]);

    expect(response.status()).toBe(200);
  });

  // ----------------------------------------------------------
  // 3. Edit title pada card pertama dan simpan
  // ----------------------------------------------------------
  test("admin dapat mengedit title pada card Section Heading pertama dan menyimpan", async ({
    page,
  }) => {
    await loginAndGoToSectionHeadings(page);

    const firstCard = page.locator("form").first();

    const titleInput = firstCard
      .getByLabel("Title", { exact: true })
      .or(firstCard.locator("input[name='title']"));

    const newTitle = `Updated Title ${Date.now()}`;
    await titleInput.fill(newTitle);

    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/cms/section-headings") &&
          resp.request().method() === "PUT",
        { timeout: 15000 }
      ),
      firstCard.getByRole("button", { name: "Save" }).click(),
    ]);

    expect(response.status()).toBe(200);
  });

  // ----------------------------------------------------------
  // 4. Setelah simpan, teks konfirmasi "Saved." muncul
  // ----------------------------------------------------------
  test("teks konfirmasi 'Saved.' muncul setelah berhasil menyimpan", async ({
    page,
  }) => {
    await loginAndGoToSectionHeadings(page);

    const firstCard = page.locator("form").first();

    // Klik Save
    await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/cms/section-headings") &&
          resp.request().method() === "PUT",
        { timeout: 15000 }
      ),
      firstCard.getByRole("button", { name: "Save" }).click(),
    ]);

    // Teks "Saved." harus muncul di dalam card setelah sukses
    await expect(firstCard.getByText("Saved.")).toBeVisible({
      timeout: 5000,
    });
  });
});
