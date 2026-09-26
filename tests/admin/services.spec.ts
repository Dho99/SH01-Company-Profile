import { test, expect, Page } from "@playwright/test";

// ============================================================
// E2E Test: Admin – Services (CRUD)
// Target: /admin/services
//
// Test mencakup:
//   - Create service baru berhasil
//   - Verifikasi item baru muncul di daftar
//   - Edit service berhasil
//   - Delete service berhasil
//   - Upload image service (komponen ImageUpload tersedia di form)
//
// Catatan tentang duplicate sortOrder:
//   GAP: Prisma schema (schema.prisma) TIDAK mendefinisikan
//   constraint @unique pada field sortOrder di model Service.
//   API /api/cms/[entity]/route.ts tidak memvalidasi duplikasi sortOrder.
//   Duplicate sortOrder DIIZINKAN oleh implementasi saat ini.
//
// Catatan upload gambar service:
//   Upload gambar di service-form.tsx menggunakan komponen ImageUpload
//   yang memanggil /api/upload (Cloudinary). Di environment test,
//   upload ke Cloudinary memerlukan kredensial nyata. Test upload image
//   dilakukan via unit test dengan mock (tests/unit/cms-schemas.test.ts).
//   Test E2E hanya memverifikasi ketersediaan area upload di UI.
// ============================================================

const ADMIN_EMAIL = "admin@lexatech.id";
const ADMIN_PASSWORD = "admin123";

// --------------------------------------------------------
// Helper: Login dan navigasi ke halaman services
// --------------------------------------------------------
async function loginAndGoToServices(page: Page) {
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

    // Navigasi ke halaman Services
    await page.goto("http://localhost:3000/admin/services");
    await page.waitForURL(/\/admin\/services$/);
    await page.waitForLoadState('domcontentloaded');
}