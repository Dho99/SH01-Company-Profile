import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: About Section (@/components/sections/about)
// Menguji visibilitas dan konten section "About Us" perusahaan
// ============================================================

test.describe('About Section', () => {
  // Navigasi ke halaman utama sebelum setiap test dijalankan
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/');
  });

  test('section about harus terlihat dengan heading yang benar', async ({ page }) => {
    // Mencari section about berdasarkan id="about"
    const aboutSection = page.locator('#about');

    // Memastikan section about terlihat di halaman
    await expect(aboutSection).toBeVisible();

    // Mencari eyebrow label "Company Profile" di dalam section about
    const eyebrow = aboutSection.getByText('Company Profile', { exact: true });
    // Memastikan eyebrow label terlihat di layar
    await expect(eyebrow).toBeVisible();

    // Mencari heading utama "About LEXA Software House" menggunakan getByRole
    const heading = aboutSection.getByRole('heading', { name: /About LEXA/i });
    // Memastikan heading utama section about terlihat di layar
    await expect(heading).toBeVisible();
  });

  test('deskripsi perusahaan dan poin-poin keunggulan harus ditampilkan', async ({ page }) => {
    const aboutSection = page.locator('#about');

    // Memastikan paragraf deskripsi perusahaan terlihat di halaman
    const description = aboutSection.getByText(/LEXA Software House is a technology company/i);
    await expect(description).toBeVisible();

    // Memastikan poin keunggulan "Innovative and proven solutions" terlihat di layar
    const point1 = aboutSection.getByText('Innovative and proven solutions');
    await expect(point1).toBeVisible();

    // Memastikan poin keunggulan "Experienced and professional team" terlihat di layar
    const point2 = aboutSection.getByText('Experienced and professional team');
    await expect(point2).toBeVisible();

    // Memastikan poin keunggulan "Client-focused approach" terlihat di layar
    const point3 = aboutSection.getByText('Client-focused approach');
    await expect(point3).toBeVisible();

    // Memastikan poin keunggulan "Commitment to continuous support" terlihat di layar
    const point4 = aboutSection.getByText('Commitment to continuous support');
    await expect(point4).toBeVisible();
  });

  test('gambar dan floating card "Our Commitment" harus terlihat', async ({ page }) => {
    const aboutSection = page.locator('#about');

    // Mencari gambar ilustrasi about menggunakan alt text
    const aboutImage = aboutSection.getByRole('img', { name: /LEXA Software House office/i });
    // Memastikan gambar ilustrasi about terlihat di layar
    await expect(aboutImage).toBeVisible();

    // Mencari teks "Our Commitment" pada floating card
    const commitmentTitle = aboutSection.getByText('Our Commitment');
    // Memastikan floating card "Our Commitment" terlihat di layar
    await expect(commitmentTitle).toBeVisible();
  });

  test('tombol CTA "Learn More About Us" harus tersedia', async ({ page }) => {
    const aboutSection = page.locator('#about');

    // Mencari link CTA "Learn More About Us" di dalam section about
    const ctaLink = aboutSection.getByRole('link', { name: /Learn More About Us/i });
    // Memastikan link CTA terlihat di layar
    await expect(ctaLink).toBeVisible();

    // Memastikan link CTA mengarah ke section contact
    await expect(ctaLink).toHaveAttribute('href', '#contact');
  });
});
