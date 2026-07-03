import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Komponen Navbar (@/components/layout/navbar)
// Menguji visibilitas, navigasi anchor, dropdown, dan state aktif
// ============================================================

test.describe('Komponen Navbar', () => {
  // Navigasi ke halaman utama sebelum setiap test.
  // domcontentloaded mencegah Firefox menunggu semua resource async (gambar, fetch CMS)
  // yang dapat menyebabkan timeout 30s.
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Tunggu header terrender sebagai sinyal navbar siap — ini lebih reliabel
    // dari menunggu load event penuh (yang bergantung CMS API dan gambar)
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
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
      'Contact'
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

  // ============================================================
  // CATATAN DESAIN: Link anchor navbar (#about, #services, dll) di Next.js SPA
  // tidak selalu memperbarui window.location.hash secara langsung karena
  // Next.js Link intercepts navigasi dan melakukan scroll programatik.
  // URL hash mungkin tidak update di semua browser. Test ini diubah untuk
  // memverifikasi bahwa section target benar-benar VISIBLE di viewport
  // (yang merupakan tujuan sebenarnya dari navigasi anchor),
  // bukan mengasumsikan URL hash pasti berubah.
  // ============================================================

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

      // Scroll elemen ke viewport sebelum klik untuk mencegah "outside viewport" error
      await link.scrollIntoViewIfNeeded();
      await link.click();

      // Verifikasi section target ter-scroll ke dalam viewport
      // ini lebih akurat dari URL hash assertion karena Next.js SPA behavior
      const targetSection = page.locator(linkInfo.sectionId);
      await expect(targetSection).toBeInViewport({ timeout: 5000 });
    }
  });

  test('Validasi Navigasi Halaman Baru: Klik menu "Career" dan verifikasi navigasi rute baru', async ({ page }) => {
    const desktopNav = page.locator('header nav').first();
    const careerLink = desktopNav.getByRole('link', { name: 'Career', exact: true });

    // Scroll elemen ke viewport sebelum klik
    await careerLink.scrollIntoViewIfNeeded();

    // Klik Career dan tunggu navigasi halaman baru selesai secara atomik
    await Promise.all([
      page.waitForURL(/\/career/, { timeout: 10000 }),
      careerLink.click(),
    ]);

    // Memverifikasi bahwa URL telah berubah mengarah ke halaman /career
    await expect(page).toHaveURL(/.*\/career/);
  });

  test('Validasi Interaksi Dropdown "Services": Buka dropdown dan verifikasi sub-menu terlihat', async ({ page }) => {
    // Menemukan elemen pembungkus (group) menu "Services" di dalam desktop navigation
    const servicesMenuParent = page.locator('header nav .group').filter({ hasText: 'Services' });
    // Menemukan elemen container dropdown (div absolute pertama di dalam group menu)
    const dropdownContainer = servicesMenuParent.locator('div.absolute').first();
    // Menemukan elemen link utama "Services"
    const servicesLink = servicesMenuParent.getByRole('link', { name: 'Services', exact: true });

    // Memastikan dropdown container pada awalnya tidak terlihat (invisible/hidden) di layar
    await expect(dropdownContainer).not.toBeVisible();

    // Melakukan aksi hover (mengarahkan mouse) ke teks menu "Services"
    await servicesLink.hover();

    // Tunggu dropdown benar-benar visible
    await expect(dropdownContainer).toBeVisible({ timeout: 3000 });

    // Mencari sub-menu "Web Development" di dalam dropdown
    const subMenuLink = servicesMenuParent.getByRole('link', { name: 'Web Development', exact: true });
    // Memastikan sub-menu "Web Development" terlihat di layar
    await expect(subMenuLink).toBeVisible();

    // Melakukan klik pada sub-menu "Web Development"
    // CATATAN: serviceDropdownItems menggunakan href "/#services" bukan "#services"
    // Setelah klik dari halaman /, Next.js router mungkin tidak update URL ke /#services
    // Test ini hanya memverifikasi bahwa section #services terlihat di viewport setelah klik
    await subMenuLink.click();

    // Verifikasi section #services ter-scroll ke viewport
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport({ timeout: 5000 });
  });

  test('Validasi State Aktif & Desain Visual: Verifikasi penandaan garis bawah biru dan perubahan menu aktif', async ({ page }) => {
    const desktopNav = page.locator('header nav').first();
    const homeLink = desktopNav.getByRole('link', { name: 'Home', exact: true });
    const aboutLink = desktopNav.getByRole('link', { name: 'About Us', exact: true });

    // Memastikan menu "Home" aktif di awal dengan memiliki class text-slate-950
    await expect(homeLink).toHaveClass(/text-slate-950/);

    // Menemukan elemen garis bawah biru (span dengan class bg-brand) pada menu aktif "Home"
    const activeIndicator = homeLink.locator('span.bg-brand');
    // Memastikan elemen garis bawah biru sebagai penanda aktif terlihat di bawah menu "Home"
    await expect(activeIndicator).toBeVisible();

    // Melakukan klik pada menu "About Us"
    await aboutLink.scrollIntoViewIfNeeded();
    await aboutLink.click();

    // Tunggu sebentar untuk IntersectionObserver men-update active state
    await expect(aboutLink).toHaveClass(/text-slate-950/, { timeout: 5000 });

    // Menemukan elemen garis bawah biru pada menu "About Us"
    const aboutActiveIndicator = aboutLink.locator('span.bg-brand');
    // Memastikan elemen garis bawah biru terlihat di bawah menu "About Us"
    await expect(aboutActiveIndicator).toBeVisible();
  });

  test('Validasi CTA Button: Klik tombol "Get in Touch" dan verifikasi section contact terlihat', async ({ page }) => {
    const ctaButton = page.locator('header').getByRole('link', { name: 'Get in Touch' });
    // Memastikan tombol CTA "Get in Touch" terlihat di layar
    await expect(ctaButton).toBeVisible();

    // Scroll ke viewport sebelum klik
    await ctaButton.scrollIntoViewIfNeeded();

    // Melakukan klik pada tombol CTA "Get in Touch"
    await ctaButton.click();

    // Verifikasi section #contact ter-scroll ke viewport
    // (lebih reliabel dari URL hash assertion di Next.js SPA)
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport({ timeout: 5000 });
  });

  test('Validasi Responsif: Hamburger menu dan navigasi di mobile view', async ({ page }) => {
    // Mengatur viewport ke ukuran perangkat mobile (lebar 375px)
    await page.setViewportSize({ width: 375, height: 812 });

    // Menemukan tombol hamburger menu berdasarkan aria-label di dalam header
    const menuButton = page.locator('header').getByLabel('Toggle menu');
    // Memastikan tombol hamburger menu terlihat di tampilan mobile
    await expect(menuButton).toBeVisible();

    // Melakukan klik untuk membuka menu navigasi mobile
    await menuButton.click();

    // Tunggu menu mobile benar-benar terbuka dengan menunggu link Career muncul
    const mobileCareerLink = page.locator('header').getByRole('link', { name: 'Career', exact: true });
    await expect(mobileCareerLink).toBeVisible({ timeout: 3000 });

    // Klik Career dan tunggu navigasi halaman baru selesai secara atomik
    await Promise.all([
      page.waitForURL(/\/career/, { timeout: 10000 }),
      mobileCareerLink.click(),
    ]);

    // Memverifikasi bahwa navigasi ke halaman /career berhasil di mobile
    await expect(page).toHaveURL(/.*\/career/);
  });
});
