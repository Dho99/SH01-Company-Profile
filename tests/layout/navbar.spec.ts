import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Komponen Navbar (@/components/layout/navbar)
// Menguji visibilitas, navigasi anchor, dropdown, dan state aktif
// ============================================================

test.describe('Komponen Navbar', () => {
  // Navigasi ke URL target sebelum setiap pengujian dijalankan
  test.beforeEach(async ({ page }) => {
    // Menavigasi ke halaman utama aplikasi yang berjalan di port 3001
    await page.goto('http://localhost:3001/');
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

  test('Validasi Navigasi Anchor (Internal Links): Klik masing-masing menu internal dan verifikasi URL hash', async ({ page }) => {
    const desktopNav = page.locator('header nav').first();
    
    // Daftar menu internal yang mengarah ke anchor section tertentu
    const internalLinks = [
      { name: 'About Us', hash: '#about' },
      { name: 'Portfolio', hash: '#portfolio' },
      { name: 'Technologies', hash: '#technologies' },
      { name: 'Blog', hash: '#blog' },
      { name: 'Contact', hash: '#contact' }
    ];

    for (const linkInfo of internalLinks) {
      const link = desktopNav.getByRole('link', { name: linkInfo.name, exact: true });
      
      // Melakukan klik pada menu navigasi internal
      await link.click();

      // Memverifikasi bahwa URL telah berubah memiliki hash anchor yang sesuai
      await expect(page).toHaveURL(new RegExp('.*' + linkInfo.hash));
    }
  });

  test('Validasi Navigasi Halaman Baru: Klik menu "Career" dan verifikasi navigasi rute baru', async ({ page }) => {
    const desktopNav = page.locator('header nav').first();
    const careerLink = desktopNav.getByRole('link', { name: 'Career', exact: true });

    // Melakukan klik pada menu navigasi "Career"
    await careerLink.click();

    // Memverifikasi bahwa URL telah berubah mengarah ke halaman /career
    await expect(page).toHaveURL(/.*\/career/);
  });

  test('Validasi Interaksi Dropdown "Services": Buka dropdown dan klik salah satu sub-menu', async ({ page }) => {
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

    // Memastikan dropdown container benar-benar muncul dan statusnya berubah menjadi visible
    await expect(dropdownContainer).toBeVisible();

    // Mencari sub-menu "Web Development" di dalam dropdown
    const subMenuLink = servicesMenuParent.getByRole('link', { name: 'Web Development', exact: true });
    // Memastikan sub-menu "Web Development" terlihat di layar
    await expect(subMenuLink).toBeVisible();

    // Melakukan klik pada sub-menu "Web Development"
    await subMenuLink.click();

    // Memverifikasi bahwa URL berubah menjadi memiliki hash #services
    await expect(page).toHaveURL(/.*#services/);
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
    await aboutLink.click();

    // Memastikan menu "About Us" kini mendapatkan class text-slate-950 sebagai menu aktif yang baru
    await expect(aboutLink).toHaveClass(/text-slate-950/);

    // Menemukan elemen garis bawah biru pada menu "About Us"
    const aboutActiveIndicator = aboutLink.locator('span.bg-brand');
    // Memastikan elemen garis bawah biru terlihat di bawah menu "About Us"
    await expect(aboutActiveIndicator).toBeVisible();

    // Memastikan menu "Home" tidak lagi aktif (tidak memiliki class text-slate-950)
    await expect(homeLink).not.toHaveClass(/text-slate-950/);
  });

  test('Validasi CTA Button: Klik tombol "Get in Touch" dan verifikasi navigasi', async ({ page }) => {
    const ctaButton = page.locator('header').getByRole('link', { name: 'Get in Touch' });
    // Memastikan tombol CTA "Get in Touch" terlihat di layar
    await expect(ctaButton).toBeVisible();

    // Melakukan klik pada tombol CTA "Get in Touch"
    await ctaButton.click();

    // Memverifikasi bahwa URL telah berubah menjadi memiliki hash #contact
    await expect(page).toHaveURL(/.*#contact/);
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

    // Menemukan link navigasi "Career" di dalam menu mobile yang terbuka
    const mobileCareerLink = page.locator('header nav').nth(1).getByRole('link', { name: 'Career', exact: true });
    // Memastikan link navigasi "Career" terlihat di layar mobile
    await expect(mobileCareerLink).toBeVisible();

    // Melakukan klik pada menu "Career" di tampilan mobile
    await mobileCareerLink.click();

    // Memverifikasi bahwa navigasi ke halaman /career berhasil di mobile
    await expect(page).toHaveURL(/.*\/career/);
  });
});
