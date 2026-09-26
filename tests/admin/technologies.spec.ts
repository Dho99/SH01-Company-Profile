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

    // Navigasi ke halaman Technologies
    await page.goto("http://localhost:3000/admin/technologies");
    await page.waitForURL(/\/admin\/technologies$/);
    await page.waitForLoadState('domcontentloaded');
}