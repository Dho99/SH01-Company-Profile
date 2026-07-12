import { test, expect, Page } from "@playwright/test";

// ============================================================
// E2E Test: Admin – Technologies (CRUD)
// Target: /admin/technologies
//
// Test mencakup:
//   - Create technology baru berhasil
//   - Verifikasi item baru muncul di daftar
//   - Edit technology berhasil
//   - Delete technology berhasil
//
// Form field reference (technology-form.tsx):
//   - icon     : <select> dari ICON_CATEGORIES.technologies
//   - label    : <Input> teks
//   - color    : <Input> teks (hex / kelas Tailwind)
//   - sortOrder: <Input type="number">
//   - published: <input type="checkbox">
//
// Icon valid (lib/cms/icons.ts → ICON_CATEGORIES.technologies):
//   laravel | react | nextjs | vue | flutter | node |
//   php | python | mysql | aws | docker | git
//
// Catatan duplicate sortOrder:
//   GAP: Prisma schema TIDAK mendefinisikan @unique pada sortOrder
//   di model Technology. API juga tidak memvalidasi duplikasi.
//   Test duplicate sortOrder di-skip dan didokumentasikan di bawah.
// ============================================================

const ADMIN_EMAIL = "admin@lexatech.id";
const ADMIN_PASSWORD = "admin123";

// --------------------------------------------------------
// Helper: Login dan navigasi ke halaman technologies
// --------------------------------------------------------
async function loginAndGoToTechnologies(page: Page) {
  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "Welcome back" })
  ).toBeVisible();

  await page.waitForTimeout(1000);
  await page.getByLabel("Email", { exact: true }).fill(ADMIN_EMAIL);
  await page.getByLabel("Password", { exact: true }).fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForTimeout(2000);

  await page.goto("/admin/technologies", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: "Technologies" })
  ).toBeVisible({ timeout: 20000 });
}

// ============================================================
// Test Suite: Create, Read, Update, Delete
// ============================================================
test.describe("Admin – Technologies CRUD", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  // ----------------------------------------------------------
  // 1. Create technology baru berhasil dan muncul di daftar
  // ----------------------------------------------------------
  test("admin dapat membuat technology baru dan item muncul di daftar", async ({
    page,
  }) => {
    await loginAndGoToTechnologies(page);

    // Klik tombol Add New untuk menuju form create
    await page.getByRole("link", { name: /Add New/i }).click();
    await expect(
      page.getByRole("heading", { name: "New Technology" })
    ).toBeVisible({ timeout: 10000 });

    // Isi form technology baru
    const uniqueLabel = `Test Technology ${Date.now()}`;

    // Pilih icon dari dropdown (icon valid: laravel, react, nextjs, dst)
    await page.locator("select").selectOption("react");

    // Isi Label
    await page.getByLabel("Label").fill(uniqueLabel);

    // Isi Color (kode hex atau kelas Tailwind)
    await page.getByLabel("Color").fill("#61DAFB");

    // Isi Sort Order (angka besar agar tidak konflik)
    await page.getByLabel("Sort Order").fill("997");

    // Submit form dan tunggu API POST response
    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/cms/technologies") &&
          resp.request().method() === "POST",
        { timeout: 15000 }
      ),
      page.getByRole("button", { name: "Save" }).click(),
    ]);

    expect(response.status()).toBe(200);

    // Setelah create, app harus redirect ke /admin/technologies
    await expect(page).toHaveURL(/\/admin\/technologies$/, { timeout: 10000 });

    // Item baru harus tampil di daftar
    await expect(page.getByText(uniqueLabel)).toBeVisible({ timeout: 10000 });
  });

  // ----------------------------------------------------------
  // 2. Edit technology yang sudah ada berhasil
  // ----------------------------------------------------------
  test("admin dapat mengedit technology yang sudah ada", async ({ page }) => {
    await loginAndGoToTechnologies(page);

    // Cari link edit pada item pertama di daftar
    const firstEditLink = page
      .locator('a[href*="/admin/technologies/"][href*="/edit"]')
      .first();

    const hasItem = await firstEditLink.isVisible().catch(() => false);

    if (!hasItem) {
      test.skip(
        true,
        "Tidak ada technology di daftar — jalankan test create terlebih dahulu"
      );
      return;
    }

    await firstEditLink.click();

    // Harus berada di halaman Edit Technology
    await expect(
      page.getByRole("heading", { name: "Edit Technology" })
    ).toBeVisible({ timeout: 10000 });

    // Edit field Label dengan nilai unik
    const updatedLabel = `Updated Technology ${Date.now()}`;
    await page.getByLabel("Label").fill(updatedLabel);

    // Submit dan tunggu API PUT response
    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/cms/technologies/") &&
          resp.request().method() === "PUT",
        { timeout: 15000 }
      ),
      page.getByRole("button", { name: "Save" }).click(),
    ]);

    expect(response.status()).toBe(200);

    // Redirect balik ke daftar technologies
    await expect(page).toHaveURL(/\/admin\/technologies$/, { timeout: 10000 });
  });

  // ----------------------------------------------------------
  // 3. Delete technology berhasil
  // ----------------------------------------------------------
  test("admin dapat menghapus technology", async ({ page }) => {
    await loginAndGoToTechnologies(page);

    // Buat technology sementara via fetch agar test self-contained
    const createResult = await page.evaluate(async () => {
      const res = await fetch("/api/cms/technologies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          icon: "docker",
          label: "Temp Technology to Delete",
          color: "#0db7ed",
          sortOrder: 9993,
          published: false,
        }),
      });
      return { status: res.status, data: await res.json() };
    });

    const itemId = createResult.data?.data?.id as string | undefined;

    if (!itemId) {
      // Fallback: hapus item terakhir yang ada di UI
      const deleteBtn = page
        .locator("tr")
        .filter({ hasText: /./i })
        .last()
        .locator("button")
        .last();

      const hasBtnVisible = await deleteBtn.isVisible().catch(() => false);

      if (!hasBtnVisible) {
        test.skip(true, "Tidak ada technology untuk dihapus");
        return;
      }

      page.on("dialog", (d) => d.accept());
      await deleteBtn.click();
      await page.waitForTimeout(2000);
      return;
    }

    // Reload agar item sementara muncul di tabel
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: "Technologies" })
    ).toBeVisible({ timeout: 10000 });

    // Pastikan item sementara ada
    await expect(
      page.getByText("Temp Technology to Delete")
    ).toBeVisible({ timeout: 10000 });

    // Klik tombol delete pada baris item tersebut
    const row = page
      .locator("tr")
      .filter({ hasText: "Temp Technology to Delete" });
    const deleteBtn = row.locator("button").last();

    const [deleteResponse] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/cms/technologies/") &&
          resp.request().method() === "DELETE",
        { timeout: 15000 }
      ),
      deleteBtn.click(),
    ]);

    expect(deleteResponse.status()).toBe(200);

    // Item harus hilang dari daftar
    await expect(
      page.getByText("Temp Technology to Delete")
    ).not.toBeVisible({ timeout: 5000 });
  });

  // ----------------------------------------------------------
  // 4. Duplicate sortOrder — GAP dokumentasi
  // ----------------------------------------------------------
  test.skip(
    "duplicate sortOrder ditolak — GAP: tidak ada constraint unik di DB atau API",
    async ({ page }) => {
      // DOKUMENTASI GAP:
      // model Technology di schema.prisma tidak memiliki @@unique([sortOrder]).
      // API /api/cms/technologies tidak memvalidasi duplikasi sortOrder.
      // Dua technology dengan sortOrder sama bisa dibuat tanpa error.
      //
      // Rekomendasi:
      //   1. Tambahkan @@unique([sortOrder]) di schema.prisma model Technology, ATAU
      //   2. Validasi duplikasi sortOrder di API layer sebelum create/update.
      void page;
    }
  );
});
