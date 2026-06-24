import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Portfolio Section (@/components/sections/portfolio)
// Menguji visibilitas dan konten section portofolio perusahaan
// ============================================================

test.describe('Portfolio Section', () => {
  // Navigasi ke halaman utama sebelum setiap test dijalankan
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/');
  });

  test('section portfolio harus terlihat dengan heading yang benar', async ({ page }) => {
    // Mencari section portfolio berdasarkan id="portfolio"
    const portfolioSection = page.locator('#portfolio');

    // Memastikan section portfolio terlihat di halaman
    await expect(portfolioSection).toBeVisible();

    // Mencari eyebrow label "Our Portfolio" di dalam section
    const eyebrow = portfolioSection.getByText('Our Portfolio', { exact: true });
    // Memastikan eyebrow label terlihat di layar
    await expect(eyebrow).toBeVisible();

    // Mencari heading utama "Featured Projects" menggunakan getByRole
    const heading = portfolioSection.getByRole('heading', { name: /Featured Projects/i });
    // Memastikan heading utama section portfolio terlihat di layar
    await expect(heading).toBeVisible();
  });

  test('harus menampilkan 4 kartu proyek dengan judul yang benar', async ({ page }) => {
    const portfolioSection = page.locator('#portfolio');

    // Daftar semua judul proyek yang wajib ditampilkan
    const projectTitles = [
      'Company Profile Website',
      'E-Commerce Mobile App',
      'Inventory Management System',
      'Learning Management System',
    ];

    // Memverifikasi setiap judul proyek terlihat di dalam section
    for (const title of projectTitles) {
      const projectHeading = portfolioSection.getByRole('heading', { name: title, exact: true });
      // Memastikan heading kartu proyek terlihat di layar
      await expect(projectHeading).toBeVisible();
    }
  });

  test('setiap kartu proyek harus memiliki badge kategori dan gambar', async ({ page }) => {
    const portfolioSection = page.locator('#portfolio');

    // Mencari semua elemen <article> yang merupakan kartu proyek
    const projectCards = portfolioSection.locator('article');
    // Memastikan terdapat 4 kartu proyek yang dirender
    await expect(projectCards).toHaveCount(4);

    // Memastikan badge kategori "Corporate" terlihat pada kartu pertama
    const corporateBadge = portfolioSection.getByText('Corporate', { exact: true });
    await expect(corporateBadge).toBeVisible();

    // Memastikan badge kategori "E-Commerce" terlihat pada kartu kedua
    const ecommerceBadge = portfolioSection.getByText('E-Commerce', { exact: true });
    await expect(ecommerceBadge).toBeVisible();

    // Mencari gambar proyek "Company Profile Website" berdasarkan alt text
    const companyImage = portfolioSection.getByRole('img', { name: 'Company Profile Website' });
    // Memastikan gambar proyek terlihat di layar
    await expect(companyImage).toBeVisible();
  });

  test('link "View All Projects" dan tombol navigasi carousel harus tersedia', async ({ page }) => {
    const portfolioSection = page.locator('#portfolio');

    // Mencari link "View All Projects" di dalam section portfolio
    const viewAllLink = portfolioSection.getByRole('link', { name: /View All Projects/i });
    // Memastikan link "View All Projects" terlihat di layar
    await expect(viewAllLink).toBeVisible();

    // Mencari tombol navigasi carousel "Previous projects" berdasarkan aria-label
    const prevButton = portfolioSection.getByLabel('Previous projects');
    // Memastikan tombol navigasi carousel sebelumnya (kiri) terlihat
    await expect(prevButton).toBeVisible();

    // Mencari tombol navigasi carousel "Next projects" berdasarkan aria-label
    const nextButton = portfolioSection.getByLabel('Next projects');
    // Memastikan tombol navigasi carousel selanjutnya (kanan) terlihat
    await expect(nextButton).toBeVisible();
  });

  test('setiap kartu proyek harus memiliki link "View Case Study"', async ({ page }) => {
    const portfolioSection = page.locator('#portfolio');

    // Mencari semua link "View Case Study" di dalam section portfolio
    const caseStudyLinks = portfolioSection.getByRole('link', { name: /View Case Study/i });
    // Memastikan terdapat 4 link "View Case Study" (satu per kartu proyek)
    await expect(caseStudyLinks).toHaveCount(4);
  });
});
