import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Navbar (@/components/layout/navbar)
// Menguji visibilitas dan fungsionalitas komponen navigasi utama
// ============================================================

test.describe('Navbar', () => {
  // Navigasi ke halaman utama sebelum setiap test dijalankan
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('elemen header harus terlihat di halaman', async ({ page }) => {
    // Mencari elemen <header> yang merupakan root dari komponen Navbar
    const header = page.locator('header');

    // Memastikan elemen header terlihat (visible) di viewport
    await expect(header).toBeVisible();

    // Memastikan header memiliki class sticky agar tetap menempel di atas
    await expect(header).toHaveClass(/sticky/);
  });

  test('logo harus terlihat di dalam navbar', async ({ page }) => {
    // Mencari elemen logo di dalam header
    const logo = page.locator('header').getByRole('link').first();

    // Memastikan logo terlihat di halaman
    await expect(logo).toBeVisible();

    // Memastikan logo memiliki atribut href yang mengarah ke halaman utama
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('link navigasi harus tersedia di desktop view', async ({ page }) => {
    // Mencari elemen <nav> yang tersembunyi di mobile (hidden) tapi terlihat di desktop (lg:flex)
    const desktopNav = page.locator('header nav').first();

    // Memastikan elemen navigasi ada di DOM (meskipun bisa hidden di mobile)
    await expect(desktopNav).toBeAttached();

    // Memastikan link "Home" tersedia di dalam navigasi
    const homeLink = desktopNav.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeAttached();

    // Memastikan link "About Us" tersedia di dalam navigasi
    const aboutLink = desktopNav.getByRole('link', { name: 'About Us' });
    await expect(aboutLink).toBeAttached();
  });

  test('tombol "Get in Touch" harus tersedia', async ({ page }) => {
    // Mencari tombol CTA "Get in Touch" di dalam header
    const ctaButton = page.locator('header').getByRole('link', { name: 'Get in Touch' });

    // Memastikan tombol CTA ada di DOM
    await expect(ctaButton).toBeAttached();

    // Memastikan tombol mengarah ke section contact
    await expect(ctaButton).toHaveAttribute('href', '/#contact');
  });

  test('tombol hamburger menu harus terlihat di mobile view', async ({ page }) => {
    // Mengubah ukuran viewport menjadi ukuran mobile (375px)
    await page.setViewportSize({ width: 375, height: 812 });

    // Mencari tombol toggle menu (hamburger) berdasarkan aria-label
    const menuButton = page.getByLabel('Toggle menu');

    // Memastikan tombol hamburger terlihat di tampilan mobile
    await expect(menuButton).toBeVisible();

    // Klik tombol hamburger untuk membuka menu mobile
    await menuButton.click();

    // Memastikan menu mobile terbuka dengan memeriksa link navigasi yang muncul
    const mobileHomeLink = page.locator('header nav').nth(1).getByRole('link', { name: 'Home' });
    await expect(mobileHomeLink).toBeVisible();
  });
});
