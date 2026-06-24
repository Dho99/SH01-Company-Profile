import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Technologies Section (@/components/sections/technologies)
// Menguji visibilitas dan konten section teknologi yang digunakan
// ============================================================

test.describe('Technologies Section', () => {
  // Navigasi ke halaman utama sebelum setiap test dijalankan
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/');
  });

  test('section technologies harus terlihat dengan heading yang benar', async ({ page }) => {
    // Mencari section technologies berdasarkan id="technologies"
    const techSection = page.locator('#technologies');

    // Memastikan section technologies terlihat di halaman
    await expect(techSection).toBeVisible();

    // Mencari eyebrow label "Technologies We Use" di dalam section
    const eyebrow = techSection.getByText('Technologies We Use', { exact: true });
    // Memastikan eyebrow label terlihat di layar
    await expect(eyebrow).toBeVisible();

    // Mencari heading utama "Built On a Modern Stack" menggunakan getByRole
    const heading = techSection.getByRole('heading', { name: /Built On a Modern Stack/i });
    // Memastikan heading utama section technologies terlihat di layar
    await expect(heading).toBeVisible();
  });

  test('harus menampilkan 12 item teknologi dengan label yang benar', async ({ page }) => {
    const techSection = page.locator('#technologies');

    // Daftar semua label teknologi yang wajib ditampilkan
    const techLabels = [
      'Laravel',
      'React',
      'Next.js',
      'Vue.js',
      'Flutter',
      'Node.js',
      'PHP',
      'Python',
      'MySQL',
      'AWS',
      'Docker',
      'Git',
    ];

    // Memverifikasi setiap label teknologi terlihat di dalam section
    for (const label of techLabels) {
      const techLabel = techSection.getByText(label, { exact: true });
      // Memastikan label teknologi terlihat di layar
      await expect(techLabel).toBeVisible();
    }

    // Mencari semua elemen <li> yang merupakan item teknologi di dalam grid
    const techItems = techSection.locator('ul > li');
    // Memastikan jumlah item teknologi yang dirender adalah 12
    await expect(techItems).toHaveCount(12);
  });

  test('grid layout harus memiliki 6 kolom di desktop', async ({ page }) => {
    const techSection = page.locator('#technologies');

    // Mencari elemen <ul> yang merupakan grid container teknologi
    const gridContainer = techSection.locator('ul');
    // Memastikan grid memiliki class lg:grid-cols-6 untuk tampilan desktop 6 kolom
    await expect(gridContainer).toHaveClass(/lg:grid-cols-6/);

    // Memastikan grid juga memiliki class grid-cols-3 untuk tampilan mobile 3 kolom
    await expect(gridContainer).toHaveClass(/grid-cols-3/);
  });

  test('tombol CTA "View All Technologies" harus tersedia', async ({ page }) => {
    const techSection = page.locator('#technologies');

    // Mencari link CTA "View All Technologies" di dalam section
    const ctaLink = techSection.getByRole('link', { name: /View All Technologies/i });
    // Memastikan link CTA terlihat di layar
    await expect(ctaLink).toBeVisible();

    // Memastikan link CTA mengarah ke section contact
    await expect(ctaLink).toHaveAttribute('href', '#contact');
  });
});
