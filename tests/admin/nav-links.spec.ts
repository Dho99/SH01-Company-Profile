import { test, expect, Page } from "@playwright/test";

// ============================================================
// E2E Test: Admin – Nav Links (CRUD)
// Target: /admin/nav-links
//
// Test mencakup:
//   - Create nav link baru berhasil
//   - Verifikasi item baru muncul di daftar
//   - Edit nav link berhasil
//   - Delete nav link berhasil
//   - Verifikasi toggle hasDropdown (checkbox)
//
// Form field reference (nav-link-form.tsx):
//   - label      : <Input> teks label menu navigasi
//   - href       : <Input> URL tujuan
//   - hasDropdown: <input type="checkbox"> boolean
//   - group      : <select> enum (HEADER | FOOTER_NAV | FOOTER_SERVICE)
//   - sortOrder  : <Input type="number">
//   - published  : <input type="checkbox">
//
// Group enum values (schema.prisma & nav-link-form.tsx):
//   HEADER | FOOTER_NAV | FOOTER_SERVICE
//
// Catatan duplicate sortOrder:
//   GAP: Prisma schema TIDAK mendefinisikan @unique pada sortOrder
//   di model NavLink. API juga tidak memvalidasi duplikasi.
//   Test duplicate sortOrder di-skip dan didokumentasikan di bawah.
// ============================================================

const ADMIN_EMAIL = "admin@lexatech.id";
const ADMIN_PASSWORD = "admin123";

// --------------------------------------------------------
// Helper: Login dan navigasi ke halaman nav-links
// --------------------------------------------------------
async function loginAndGoToNavLinks(page: Page) {
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

    // Navigasi ke halaman Nav Links
    await page.goto("http://localhost:3000/admin/nav-links");
    await page.waitForURL(/\/admin\/nav-links$/);
    await page.waitForLoadState('domcontentloaded');
}