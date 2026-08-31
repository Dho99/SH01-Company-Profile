import { test, expect, Page } from "@playwright/test";

// ============================================================
// E2E Test: Admin – Reasons (CRUD)
// Target: /admin/reasons
//
// Test mencakup:
//   - Create reason baru berhasil
//   - Verifikasi item baru muncul di daftar
//   - Edit reason berhasil
//   - Delete reason berhasil
//
// Form field reference (reason-form.tsx):
//   - icon        : <select> dari ICON_CATEGORIES.reasons
//   - title       : <Input> teks
//   - description : <textarea> teks multi-baris
//   - sortOrder   : <Input type="number">
//   - published   : <input type="checkbox">
//
// Icon valid (lib/cms/icons.ts → ICON_CATEGORIES.reasons):
//   quality | team | delivery | satisfaction | support
//
// Catatan duplicate sortOrder:
//   GAP: Prisma schema TIDAK mendefinisikan @unique pada sortOrder
//   di model Reason. API juga tidak memvalidasi duplikasi.
//   Test duplicate sortOrder di-skip dan didokumentasikan di bawah.
// ============================================================

const ADMIN_EMAIL = "admin@lexatech.id";
const ADMIN_PASSWORD = "admin123";

// --------------------------------------------------------
// Helper: Login dan navigasi ke halaman reasons
// --------------------------------------------------------
async function loginAndGoToReasons(page: Page) {
    await page.goto("http://localhost:3000/admin");

    // Tunggu formulir login muncul
    await page.waitForURL(/\/login$/);
    await page.waitForSelector('form[data-testid="login-form"]');

    // Isi form login dengan kredensial admin
    await page.getByLabel("Email", { exact: true }).fill(ADMIN_EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(ADMIN_PASSWORD);

    // Klik tombol login
    await page.click('button[type="submit"]');

    // Tunggu redirect ke dashboard setelah login sukses
    await page.waitForURL(/\/admin\/?$/, { timeout: 15000 });

    // Tunggu halaman dashboard selesai render
    await page.waitForSelector('h1:has-text("Dashboard")');
    await page.waitForLoadState('domcontentloaded');

    // Navigasi ke halaman Reasons
    await page.goto("http://localhost:3000/admin/reasons");
    await page.waitForURL(/\/admin\/reasons$/);
    await page.waitForLoadState('domcontentloaded');
}