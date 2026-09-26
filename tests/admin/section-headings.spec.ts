import { test, expect, Page } from "@playwright/test";

const ADMIN_EMAIL = "admin@lexatech.id";
const ADMIN_PASSWORD = "admin123";

// ============================================================
// Helper: Login dan navigasi ke Section Headings
// ============================================================

async function loginAndGoToSectionHeadings(page: Page) {
    await page.goto("/login", { waitUntil: "domcontentloaded" });

    await expect(
        page.getByRole("heading", { name: "Welcome back" })
    ).toBeVisible();

    await page.getByLabel("Email", { exact: true }).fill(ADMIN_EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(ADMIN_PASSWORD);

    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForTimeout(3000);

console.log("URL setelah login:", page.url());

    await page.goto("/admin/section-headings", {
      waitUntil: "domcontentloaded",
});

    await expect(
      page.getByRole("heading", { name: "Section Headings" })
    ).toBeVisible({
    timeout: 20_000,
  });
}

// ============================================================
// Test Suite
// ============================================================

test.describe("Admin – Section Headings", () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies();
    });

    // ----------------------------------------------------------
    // 1. Page rendering / DOM
    // ----------------------------------------------------------

    test("menampilkan halaman Section Headings dengan card section", async ({
        page,
    }) => {
        await loginAndGoToSectionHeadings(page);

        // Heading utama
        await expect(
            page.getByRole("heading", { name: "Section Headings" })
        ).toBeVisible();

        // Deskripsi halaman
        await expect(
            page.getByText(
                "Edit eyebrow text and titles for each section."
            )
        ).toBeVisible();

        // Harus ada minimal satu form section
        const cards = page.locator("form");
        await expect(cards.first()).toBeVisible();

        // Form pertama harus memiliki field Eyebrow dan Title
        const firstCard = cards.first();

        await expect(
            firstCard.getByLabel("Eyebrow", { exact: true })
        ).toBeVisible();

        await expect(
            firstCard.getByLabel("Title", { exact: true })
        ).toBeVisible();

        // Tombol Save harus tampil
        await expect(
            firstCard.getByRole("button", { name: "Save" })
        ).toBeVisible();
    });

    // ----------------------------------------------------------
    // 2. Setiap card memiliki field dan tombol Save
    // ----------------------------------------------------------

    test("setiap section heading card memiliki Eyebrow, Title, dan Save", async ({
        page,
    }) => {
        await loginAndGoToSectionHeadings(page);

        const cards = page.locator("form");
        const cardCount = await cards.count();

        // Pastikan memang terdapat section
        expect(cardCount).toBeGreaterThan(0);

        for (let i = 0; i < cardCount; i++) {
            const card = cards.nth(i);

            await expect(
                card.getByLabel("Eyebrow", { exact: true })
            ).toBeVisible();

            await expect(
                card.getByLabel("Title", { exact: true })
            ).toBeVisible();

            await expect(
                card.getByRole("button", { name: "Save" })
            ).toBeVisible();
        }
    });

    // ----------------------------------------------------------
    // 3. Edit Eyebrow
    // ----------------------------------------------------------

    test("admin dapat mengedit Eyebrow dan menyimpan perubahan", async ({
        page,
    }) => {
        await loginAndGoToSectionHeadings(page);

        const firstCard = page.locator("form").first();

        const eyebrowInput = firstCard.getByLabel("Eyebrow", {
            exact: true,
        });

        const originalValue = await eyebrowInput.inputValue();
        const newEyebrow = `Updated Eyebrow ${Date.now()}`;

        await eyebrowInput.fill(newEyebrow);

        const responsePromise = page.waitForResponse(
            (response) =>
                response.url().includes("/api/cms/section-headings") &&
                response.request().method() === "PUT",
            { timeout: 15_000 }
        );

        await firstCard.getByRole("button", { name: "Save" }).click();

        // Loading state harus muncul
        await expect(
            firstCard.getByRole("button", { name: "Saving..." })
        ).toBeVisible();

        const response = await responsePromise;

        expect(response.status()).toBe(200);

        // Setelah berhasil, tombol kembali menjadi Save
        await expect(
            firstCard.getByRole("button", { name: "Save" })
        ).toBeVisible();

        // Indikator sukses harus muncul
        await expect(firstCard.getByText("Saved.")).toBeVisible();

        // Nilai input tetap sesuai dengan data yang baru diisi
        await expect(eyebrowInput).toHaveValue(newEyebrow);

        // Pastikan test memang melakukan perubahan dari nilai sebelumnya
        expect(newEyebrow).not.toBe(originalValue);
    });

    // ----------------------------------------------------------
    // 4. Edit Title
    // ----------------------------------------------------------

    test("admin dapat mengedit Title dan menyimpan perubahan", async ({
        page,
    }) => {
        await loginAndGoToSectionHeadings(page);

        const firstCard = page.locator("form").first();

        const titleInput = firstCard.getByLabel("Title", {
            exact: true,
        });

        const originalValue = await titleInput.inputValue();
        const newTitle = `Updated Title ${Date.now()}`;

        await titleInput.fill(newTitle);

        const responsePromise = page.waitForResponse(
            (response) =>
                response.url().includes("/api/cms/section-headings") &&
                response.request().method() === "PUT",
            { timeout: 15_000 }
        );

        await firstCard.getByRole("button", { name: "Save" }).click();

        // Loading state
        await expect(
            firstCard.getByRole("button", { name: "Saving..." })
        ).toBeVisible();

        const response = await responsePromise;

        expect(response.status()).toBe(200);

        // Tombol kembali normal
        await expect(
            firstCard.getByRole("button", { name: "Save" })
        ).toBeVisible();

        // Konfirmasi sukses
        await expect(firstCard.getByText("Saved.")).toBeVisible();

        // Input masih berisi nilai yang baru
        await expect(titleInput).toHaveValue(newTitle);

        expect(newTitle).not.toBe(originalValue);
    });

    // ----------------------------------------------------------
    // 5. Save confirmation
    // ----------------------------------------------------------

    test("menampilkan pesan Saved setelah penyimpanan berhasil", async ({
        page,
    }) => {
        await loginAndGoToSectionHeadings(page);

        const firstCard = page.locator("form").first();

        const saveButton = firstCard.getByRole("button", {
            name: "Save",
        });

        const responsePromise = page.waitForResponse(
            (response) =>
                response.url().includes("/api/cms/section-headings") &&
                response.request().method() === "PUT",
            { timeout: 15_000 }
        );

        await saveButton.click();

        const response = await responsePromise;

        expect(response.status()).toBe(200);

        await expect(
            firstCard.getByText("Saved.", { exact: true })
        ).toBeVisible({
            timeout: 5_000,
        });
    });
});