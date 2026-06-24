import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Hero (@/components/sections/hero)
// Menguji visibilitas dan konten section hero (banner utama)
// ============================================================

test.describe('Hero Section', () => {
  // Navigasi ke halaman utama sebelum setiap test dijalankan
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('section hero harus terlihat di halaman', async ({ page }) => {
    // Mencari elemen <section> pertama di dalam <main> yang merupakan Hero section
    const heroSection = page.locator('main section').first();

    // Memastikan section hero terlihat di halaman
    await expect(heroSection).toBeVisible();

    // Memastikan section hero memiliki class overflow-hidden untuk efek visual
    await expect(heroSection).toHaveClass(/overflow-hidden/);
  });

  test('heading utama harus menampilkan teks yang benar', async ({ page }) => {
    // Mencari elemen <h1> yang merupakan heading utama di Hero section
    const heading = page.getByRole('heading', { level: 1 });

    // Memastikan heading utama terlihat di halaman
    await expect(heading).toBeVisible();

    // Memastikan heading mengandung teks "Better Future"
    await expect(heading).toContainText('Better Future');
  });

  test('sub-heading tagline harus terlihat', async ({ page }) => {
    // Mencari elemen tagline di atas heading utama
    const tagline = page.getByText('Leading, Excellence & Automation');

    // Memastikan tagline terlihat di halaman
    await expect(tagline).toBeVisible();

    // Mencari paragraf deskripsi di Hero section
    const description = page.getByText(/LEXA Software House delivers innovative/);

    // Memastikan deskripsi terlihat di halaman
    await expect(description).toBeVisible();
  });

  test('tombol CTA "Our Services" dan "View Our Portfolio" harus tersedia', async ({ page }) => {
    // Mencari tombol CTA "Our Services" di Hero section
    const servicesButton = page.getByRole('link', { name: /Our Services/ });

    // Memastikan tombol "Our Services" terlihat di halaman
    await expect(servicesButton).toBeVisible();

    // Memastikan tombol mengarah ke section services
    await expect(servicesButton).toHaveAttribute('href', '#services');

    // Mencari tombol CTA "View Our Portfolio"
    const portfolioButton = page.getByRole('link', { name: /View Our Portfolio/ });

    // Memastikan tombol "View Our Portfolio" terlihat di halaman
    await expect(portfolioButton).toBeVisible();

    // Memastikan tombol mengarah ke section portfolio
    await expect(portfolioButton).toHaveAttribute('href', '#portfolio');
  });

  test('gambar background hero harus dimuat', async ({ page }) => {
    // Mencari elemen gambar background Hero dengan alt text yang sesuai
    const heroImage = page.getByAltText('Digital city background');

    // Memastikan gambar background ada di DOM
    await expect(heroImage).toBeAttached();

    // Memastikan gambar memiliki atribut src yang mengacu ke file Hero.png
    await expect(heroImage).toHaveAttribute('src', /Hero/);
  });
});
