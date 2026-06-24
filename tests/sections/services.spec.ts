import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Services Section (@/components/sections/services)
// Menguji visibilitas dan konten section layanan perusahaan
// ============================================================

test.describe('Services Section', () => {
  // Navigasi ke halaman utama sebelum setiap test dijalankan
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/');
  });

  test('section services harus terlihat dengan heading yang benar', async ({ page }) => {
    // Mencari section services berdasarkan id="services"
    const servicesSection = page.locator('#services');

    // Memastikan section services terlihat di halaman
    await expect(servicesSection).toBeVisible();

    // Mencari eyebrow label "Our Services" di dalam section
    const eyebrow = servicesSection.getByText('Our Services', { exact: true });
    // Memastikan eyebrow label terlihat di layar
    await expect(eyebrow).toBeVisible();

    // Mencari heading utama "Solutions We Provide" menggunakan getByRole
    const heading = servicesSection.getByRole('heading', { name: /Solutions We Provide/i });
    // Memastikan heading utama section services terlihat di layar
    await expect(heading).toBeVisible();
  });

  test('harus menampilkan 6 kartu layanan dengan judul yang benar', async ({ page }) => {
    const servicesSection = page.locator('#services');

    // Daftar semua judul layanan yang wajib ditampilkan
    const serviceTitles = [
      'Web Development',
      'Mobile Development',
      'System Development',
      'UI/UX Design',
      'IT Consulting',
      'Maintenance & Support',
    ];

    // Memverifikasi setiap judul layanan terlihat di dalam section
    // Catatan: CardTitle merender <div> bukan <h*>, jadi menggunakan getByText
    for (const title of serviceTitles) {
      const serviceTitle = servicesSection.getByText(title, { exact: true });
      // Memastikan judul kartu layanan terlihat di layar
      await expect(serviceTitle).toBeVisible();
    }
  });

  test('setiap kartu layanan harus memiliki deskripsi dan link "Learn More"', async ({ page }) => {
    const servicesSection = page.locator('#services');

    // Memastikan deskripsi layanan "Web Development" terlihat di layar
    const webDevDesc = servicesSection.getByText(/Custom websites and web applications/i);
    await expect(webDevDesc).toBeVisible();

    // Memastikan deskripsi layanan "Mobile Development" terlihat di layar
    const mobileDevDesc = servicesSection.getByText(/Native and cross-platform mobile apps/i);
    await expect(mobileDevDesc).toBeVisible();

    // Mencari semua link "Learn More" di dalam section services
    const learnMoreLinks = servicesSection.getByRole('link', { name: /Learn More/i });
    // Memastikan terdapat 6 link "Learn More" (satu per kartu layanan)
    await expect(learnMoreLinks).toHaveCount(6);
  });

  test('grid layout harus memiliki 3 kolom di desktop', async ({ page }) => {
    const servicesSection = page.locator('#services');

    // Mencari elemen grid container utama yang langsung membungkus kartu-kartu layanan
    // Menggunakan selector yang lebih spesifik untuk menghindari ambiguitas dengan nested .grid
    const gridContainer = servicesSection.locator('div.mt-8.grid');
    // Memastikan grid memiliki class lg:grid-cols-3 untuk tampilan desktop 3 kolom
    await expect(gridContainer).toHaveClass(/lg:grid-cols-3/);
  });
});
