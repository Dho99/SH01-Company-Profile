import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Komponen Navbar (@/components/layout/navbar)
// Menguji visibilitas, navigasi anchor, dropdown, dan state aktif
// ============================================================

test.describe('Komponen Navbar', () => {
  // Set viewport sebelum page.goto agar layout Tailwind (min-[1180px]) & Framer Motion
  // ter-render dengan viewport yang tepat sejak awal di Firefox maupun Chromium.
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.title.includes('Responsif')) {
      await page.setViewportSize({ width: 375, height: 812 });
    } else {
      await page.setViewportSize({ width: 1400, height: 900 });
    }
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const header = page.locator('header');
    await expect(header).toBeVisible({ timeout: 15000 });
  });

  test('Validasi Render Utama: Pastikan logo, semua menu utama, dan tombol CTA terlihat', async ({ page }) => {
    // Menemukan logo perusahaan di dalam header menggunakan semantic locator getByRole
    const logo = page.locator('header').getByRole('link', { name: 'LEXA Software House home' });
    // Memastikan logo perusahaan terlihat di layar
    await expect(logo).toBeVisible();

    // Menemukan navigasi utama desktop
    const desktopNav = page.locator('header nav').first();
    // Memastikan kontainer navigasi utama terpasang di dalam dokumen (DOM)
    await expect(desktopNav).toBeAttached();

    // Daftar semua menu utama yang wajib ada di navbar
    const menuItems = [
      'Home',
      'About Us',
      'Services',
      'Portfolio',
      'Technologies',
      'Blog',
      'Career',
      'Contact',
    ];

    // Memverifikasi visibilitas dari setiap menu navigasi utama
    for (const item of menuItems) {
      const menuLink = desktopNav.getByRole('link', { name: item, exact: true });
      // Memastikan menu navigasi tersebut terlihat di viewport desktop
      await expect(menuLink).toBeVisible();
    }

    // Menemukan tombol Call to Action (CTA) "Get in Touch"
    const ctaButton = page.locator('header').getByRole('link', { name: 'Get in Touch' });
    // Memastikan tombol CTA "Get in Touch" terlihat di viewport desktop
    await expect(ctaButton).toBeVisible();
  });

  test('Validasi Navigasi Anchor (Internal Links): Klik masing-masing menu internal dan verifikasi section terlihat', async ({ page }) => {
    const desktopNav = page.locator('header nav').first();

    // Daftar menu internal yang mengarah ke anchor section tertentu
    const internalLinks = [
      { name: 'About Us', sectionId: '#about' },
      { name: 'Portfolio', sectionId: '#portfolio' },
      { name: 'Technologies', sectionId: '#technologies' },
      { name: 'Contact', sectionId: '#contact' },
    ];

    for (const linkInfo of internalLinks) {
      const link = desktopNav.getByRole('link', { name: linkInfo.name, exact: true });

      // Klik link navigasi internal (menggunakan force: true untuk kestabilan di Firefox sticky header)
      await link.click({ force: true });

      // Verifikasi section target ter-scroll ke dalam viewport
      const targetSection = page.locator(linkInfo.sectionId);
      await expect(targetSection).toBeInViewport({ timeout: 10000 });
    }
  });

  test('Validasi Navigasi Halaman Baru: Klik menu "Career" dan verifikasi navigasi rute baru', async ({ page }) => {
    const desktopNav = page.locator('header nav').first();
    const careerLink = desktopNav.getByRole('link', { name: 'Career', exact: true });

    // Klik Career dan tunggu navigasi URL /career
    await Promise.all([
      page.waitForURL('**/career', { timeout: 15000 }),
      careerLink.click(),
    ]);

    // Memverifikasi bahwa URL telah berubah mengarah ke halaman /career
    await expect(page).toHaveURL(/.*\/career/);
  });

  test('Validasi Interaksi Dropdown "Services": Buka dropdown dan verifikasi sub-menu terlihat', async ({ page }) => {
    // Menemukan elemen pembungkus (group) menu "Services" di dalam desktop navigation
    const servicesMenuParent = page.locator('header nav .group').filter({ hasText: 'Services' });
    // Menemukan elemen link utama "Services"
    const servicesLink = servicesMenuParent.getByRole('link', { name: 'Services', exact: true });

    // Hover ke link Services untuk memicu CSS group-hover state
    await servicesLink.hover();

    // Tunggu dropdown container menjadi visible setelah hover
    const dropdownContainer = servicesMenuParent.locator('div.absolute').first();
    await expect(dropdownContainer).toBeVisible({ timeout: 5000 });

    // Mencari sub-menu "Web Development" di dalam dropdown
    const subMenuLink = servicesMenuParent.getByRole('link', { name: 'Web Development', exact: true });
    // Memastikan sub-menu "Web Development" terlihat di layar
    await expect(subMenuLink).toBeVisible();

    // Melakukan klik pada sub-menu "Web Development"
    await subMenuLink.click();

    // Verifikasi section #services ter-scroll ke viewport
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport({ timeout: 10000 });
  });

  test('Validasi State Aktif & Desain Visual: Verifikasi penandaan garis bawah biru dan perubahan menu aktif', async ({ page }) => {
    const desktopNav = page.locator('header nav').first();
    const homeLink = desktopNav.getByRole('link', { name: 'Home', exact: true });
    const aboutLink = desktopNav.getByRole('link', { name: 'About Us', exact: true });

    // Memastikan menu "Home" aktif di awal dengan memiliki class text-slate-950
    await expect(homeLink).toHaveClass(/text-slate-950/, { timeout: 8000 });

    // Menemukan elemen garis bawah biru (span dengan class bg-brand) pada menu aktif "Home"
    const activeIndicator = homeLink.locator('span.bg-brand');
    await expect(activeIndicator).toBeVisible();

    // Melakukan klik pada menu "About Us"
    await aboutLink.click();

    // Tunggu sebentar untuk IntersectionObserver men-update active state
    await expect(aboutLink).toHaveClass(/text-slate-950/, { timeout: 8000 });

    // Menemukan elemen garis bawah biru pada menu "About Us"
    const aboutActiveIndicator = aboutLink.locator('span.bg-brand');
    await expect(aboutActiveIndicator).toBeVisible();
  });

  test('Validasi CTA Button: Klik tombol "Get in Touch" dan verifikasi section contact terlihat', async ({ page }) => {
    const ctaButton = page.locator('header').getByRole('link', { name: 'Get in Touch' });
    await expect(ctaButton).toBeVisible();

    // Melakukan klik pada tombol CTA "Get in Touch"
    await ctaButton.click();

    // Verifikasi section #contact ter-scroll ke viewport
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport({ timeout: 10000 });
  });

  test('Validasi Responsif: Hamburger menu dan navigasi di mobile view', async ({ page }) => {
    // Menemukan tombol hamburger menu berdasarkan aria-label di dalam header
    const menuButton = page.locator('header').getByLabel('Toggle menu');
    await expect(menuButton).toBeVisible({ timeout: 10000 });

    // Melakukan klik untuk membuka menu navigasi mobile
    await menuButton.click();

    // Tunggu menu mobile benar-benar terbuka dengan menunggu link Career muncul
    const mobileCareerLink = page.locator('header').getByRole('link', { name: 'Career', exact: true });
    await expect(mobileCareerLink).toBeVisible({ timeout: 5000 });

    // Klik Career dan tunggu navigasi
    await Promise.all([
      page.waitForURL('**/career', { timeout: 15000 }),
      mobileCareerLink.click(),
    ]);

    // Memverifikasi bahwa navigasi ke halaman /career berhasil di mobile
    await expect(page).toHaveURL(/.*\/career/);
  });
});
