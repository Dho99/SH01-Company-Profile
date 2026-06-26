import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Portfolio Section (@/components/sections/portfolio)
// Menguji visibilitas, navigasi carousel, dan interaksi kartu proyek
// ============================================================

test.describe('Portfolio Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigasi ke URL target sebelum setiap pengujian dijalankan
    await page.goto('http://localhost:3001/');
  });

  // ----------------------------------------------------------
  // Test 1: Validasi Header & Link Global
  // ----------------------------------------------------------
  test('Validasi Header & Link Global', async ({ page }) => {
    // Membatasi pencarian di dalam elemen section dengan id="portfolio"
    const portfolioSection = page.locator('#portfolio');

    // Memastikan elemen teks eyebrow "Our Portfolio" terlihat di layar
    await expect(portfolioSection.getByText(/Our Portfolio/i)).toBeVisible();

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

    // Mencari tombol navigasi "Previous projects" menggunakan aria-label semantik
    const prevButton = portfolioSection.getByRole('button', { name: 'Previous projects' });

    // Mencari tombol navigasi "Next projects" menggunakan aria-label semantik
    const nextButton = portfolioSection.getByRole('button', { name: 'Next projects' });

    // Memastikan tombol "Previous projects" terlihat di layar
    await expect(prevButton).toBeVisible();

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

    // Memastikan data CMS proyek sudah ter-render dengan menunggu artikel pertama muncul
    await expect(portfolioSection.locator('article').first()).toBeVisible();

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
    await targetCard.getByRole('link', { name: /View Case Study/i }).click();

    // Memastikan URL halaman berubah dan mengandung hash '#contact'
    await expect(page).toHaveURL(/.*#contact/);
  });
});
