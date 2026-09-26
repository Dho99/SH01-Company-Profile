import { test, expect, Page } from "@playwright/test";

// ============================================================
// E2E Test: Admin – Testimonials (CRUD)
// Target: /admin/testimonials
//
// Test mencakup:
//   - Create testimonial baru berhasil
//   - Verifikasi item baru muncul di daftar
//   - Edit testimonial berhasil
//   - Delete testimonial berhasil
//   - Verifikasi komponen ImageUpload tersedia di form (avatar)
//
// Form field reference (testimonial-form.tsx):
//   - quote     : <textarea> isi kutipan testimoni
//   - name      : <Input> nama pemberi testimoni
//   - role      : <Input> jabatan/perusahaan
//   - avatarUrl : <ImageUpload> komponen upload gambar (opsional)
//   - sortOrder : <Input type="number">
//   - published : <input type="checkbox">
//
// Catatan avatarUrl:
//   avatarUrl bersifat opsional (String? di schema.prisma).
//   Test E2E hanya memverifikasi ketersediaan komponen ImageUpload.
//   Upload sesungguhnya ke Cloudinary memerlukan kredensial dan
//   dilakukan via unit test dengan mock (tests/unit/cms-schemas.test.ts).
//
// Catatan duplicate sortOrder:
//   GAP: Prisma schema TIDAK mendefinisikan @unique pada sortOrder
//   di model Testimonial. API juga tidak memvalidasi duplikasi.
// ============================================================

const ADMIN_EMAIL = "admin@lexatech.id";
const ADMIN_PASSWORD = "admin123";

// --------------------------------------------------------
// Helper: Login dan navigasi ke halaman testimonials
// --------------------------------------------------------
async function loginAndGoToTestimonials(page: Page) {
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

    // Navigasi ke halaman Testimonials
    await page.goto("http://localhost:3000/admin/testimonials");
    await page.waitForURL(/\/admin\/testimonials$/);
    await page.waitForLoadState('domcontentloaded');
}