import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Portfolio Section (@/components/sections/portfolio)
// Menguji visibilitas, navigasi carousel, dan interaksi kartu proyek
// ============================================================

test.describe('Portfolio Section', () => {
  test.beforeEach(async ({ page }) => {
    // Gunakan domcontentloaded agar Firefox tidak menunggu resource berat
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Tunggu section #portfolio ada di DOM sebelum test dimulai
    await page.locator('#portfolio').waitFor({ state: 'attached', timeout: 15000 });
  });

  // ----------------------------------------------------------
  // Test 1: Validasi Header & Link Global
  // ----------------------------------------------------------
  test('Validasi Header & Link Global', async ({ page }) => {
    // Membatasi pencarian di dalam elemen section dengan id="portfolio"
    const portfolioSection = page.locator('#portfolio');

    // Scroll ke portfolio section agar masuk viewport
    await portfolioSection.scrollIntoViewIfNeeded();

    // Memastikan elemen teks eyebrow "Our Portfolio" terlihat di layar
    await expect(portfolioSection.getByText(/Our Portfolio/i)).toBeVisible({ timeout: 10000 });

    // Memastikan heading H2 "Featured Projects" terlihat sebagai heading utama section
    await expect(
      portfolioSection.getByRole('heading', { name: /Featured Projects/i })
    ).toBeVisible();

    // Memastikan link "View All Projects" sukses ter-render dan terlihat di layar
    await expect(
      portfolioSection.getByRole('link', { name: /View All Projects/i })
    ).toBeVisible();
  });

  // ----------------------------------------------------------
  // Test 2: Validasi Tombol Navigasi Slider (Carousel)
  // ----------------------------------------------------------
  test('Validasi Tombol Navigasi Slider', async ({ page }) => {
    // Membatasi pencarian di dalam elemen section dengan id="portfolio"
    const portfolioSection = page.locator('#portfolio');

    // Scroll ke portfolio section agar masuk viewport
    await portfolioSection.scrollIntoViewIfNeeded();

    // Mencari tombol navigasi "Previous projects" menggunakan aria-label semantik
    const prevButton = portfolioSection.getByRole('button', { name: 'Previous projects' });

    // Mencari tombol navigasi "Next projects" menggunakan aria-label semantik
    const nextButton = portfolioSection.getByRole('button', { name: 'Next projects' });

    // Memastikan tombol "Previous projects" terlihat di layar
    await expect(prevButton).toBeVisible({ timeout: 10000 });

    // Memastikan tombol "Next projects" terlihat di layar
    await expect(nextButton).toBeVisible();

    // Mensimulasikan klik pada tombol "Next projects" untuk scroll carousel ke kanan
    await nextButton.click();

    // Memastikan tombol masih terlihat setelah diklik (layout tidak rusak)
    await expect(nextButton).toBeVisible();

    // Mensimulasikan klik pada tombol "Previous projects" untuk scroll carousel ke kiri
    await prevButton.click();

    // Memastikan tombol masih terlihat setelah diklik (layout tidak rusak)
    await expect(prevButton).toBeVisible();
  });

  // ----------------------------------------------------------
  // Test 3: Validasi Kartu Proyek & Interaksi Link
  // ----------------------------------------------------------
  test('Validasi Kartu Proyek & Interaksi Link "View Case Study"', async ({ page }) => {
    // Membatasi pencarian di dalam elemen section dengan id="portfolio"
    const portfolioSection = page.locator('#portfolio');

    // Scroll ke portfolio section agar masuk viewport
    await portfolioSection.scrollIntoViewIfNeeded();

    // Memastikan data CMS proyek sudah ter-render dengan menunggu artikel pertama muncul
    await expect(portfolioSection.locator('article').first()).toBeVisible({ timeout: 15000 });

    // Mengisolasi pencarian ke kartu artikel yang mengandung teks "Company Profile Website"
    const targetCard = portfolioSection.locator('article').filter({
      hasText: 'Company Profile Website',
    });

    // Memastikan kartu proyek "Company Profile Website" ditemukan dan terlihat
    await expect(targetCard).toBeVisible();

    // Memastikan gambar (img) di dalam kartu proyek tersebut terlihat
    // Gambar menggunakan alt text yang sama dengan judul proyek
    await expect(
      targetCard.getByRole('img', { name: 'Company Profile Website' })
    ).toBeVisible();

    // Memastikan judul H3 "Company Profile Website" terlihat di dalam kartu
    await expect(
      targetCard.getByRole('heading', { name: 'Company Profile Website' })
    ).toBeVisible();

    // Mensimulasikan klik pada link "View Case Study" di dalam kartu tersebut
    // CATATAN: "View Case Study" mengarah ke "#contact", verifikasi dengan toBeInViewport
    await targetCard.getByRole('link', { name: /View Case Study/i }).click();

    // Verifikasi section #contact ter-scroll ke viewport
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport({ timeout: 5000 });
  });
});
