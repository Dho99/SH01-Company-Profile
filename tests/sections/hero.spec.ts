import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Hero Section (@/components/sections/hero)
// Menguji visibilitas teks, tombol CTA, dan gambar latar hero
// ============================================================

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    // Gunakan domcontentloaded agar Firefox tidak menunggu resource berat
    // (CMS API fetch, gambar besar) yang menyebabkan timeout 30s
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Tunggu H1 hero terlihat sebagai sinyal hero section sudah siap
    await expect(
      page.getByRole('heading', { name: /Building Digital Solutions/i })
    ).toBeVisible({ timeout: 15000 });
  });

  test('Validasi Elemen Teks', async ({ page }) => {
    // Memastikan tagline terlihat di layar
    await expect(page.getByText(/LEADING, EXCELLENCE & AUTOMATION/i)).toBeVisible();

    // Memastikan judul utama (H1) terlihat di layar
    await expect(page.getByRole('heading', { name: /Building Digital Solutions For A Better Future/i })).toBeVisible();

    // Memastikan paragraf deskripsi terlihat di layar
    await expect(page.getByText(/LEXA Software House delivers innovative/i)).toBeVisible();
  });

  // ============================================================
  // CATATAN DESAIN: Tombol "Our Services" dan "View Our Portfolio" di hero
  // menggunakan href="#services" / "#portfolio" (anchor link).
  // Di Next.js SPA, klik anchor link pada halaman yang sama akan scroll
  // ke section tapi tidak selalu memperbarui window.location.hash secara
  // konsisten di semua browser. Test diubah untuk memverifikasi bahwa
  // section target terlihat di viewport setelah klik (tujuan sebenarnya).
  // ============================================================

  test('Validasi Tombol "Our Services"', async ({ page }) => {
    const ourServicesBtn = page.getByRole('link', { name: /Our Services/i });
    await ourServicesBtn.scrollIntoViewIfNeeded();

    // Klik tombol Our Services
    await ourServicesBtn.click();

    // Verifikasi section #services ter-scroll ke viewport
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport({ timeout: 5000 });
  });

  test('Validasi Tombol "View Our Portfolio"', async ({ page }) => {
    const portfolioBtn = page.getByRole('link', { name: /View Our Portfolio/i });
    await portfolioBtn.scrollIntoViewIfNeeded();

    // Klik tombol View Our Portfolio
    await portfolioBtn.click();

    // Verifikasi section #portfolio ter-scroll ke viewport
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeInViewport({ timeout: 5000 });
  });

  test('Validasi Gambar Latar Belakang', async ({ page }) => {
    // Mencari gambar latar belakang berdasarkan nama/alt text
    const heroImage = page.getByRole('img', { name: /Digital city background/i });

    // Memastikan gambar latar belakang hero terlihat di layar
    await expect(heroImage).toBeVisible({ timeout: 15000 });
  });
});
