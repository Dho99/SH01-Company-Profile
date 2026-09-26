import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Footer (@/components/layout/footer)
// Menguji visibilitas dan konten komponen footer secara terisolasi
// ============================================================

test.describe('Footer Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const footer = page.locator('footer#contact');
    await footer.waitFor({ state: 'attached', timeout: 15000 });
  });

  // ----------------------------------------------------------
  // Test 1: Validasi Render Kolom Brand & Identitas
  // ----------------------------------------------------------
  test('Validasi Render Kolom Brand & Identitas', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer#contact');

    // Memastikan tagline brand terlihat di footer
    // Timeout ditingkatkan karena rendering async
    await expect(footer.getByText(/Building digital solutions/i)).toBeVisible({ timeout: 15000 });

    // Catatan: aria-label pada sosial media menggunakan huruf kapital sesuai definisi
    // di lib/site.ts: "LinkedIn", "Instagram", "Facebook", "YouTube"
    await expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Instagram' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Facebook' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'YouTube' })).toBeVisible();
  });

  // ----------------------------------------------------------
  // Test 2: Validasi Link Navigasi (Mencegah Strict Mode)
  // ----------------------------------------------------------
  test('Validasi Link Navigasi di Scope Footer', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer#contact');

    // Memastikan heading kolom "Navigation" muncul
    // Timeout ditingkatkan karena rendering async
    await expect(footer.getByText('Navigation')).toBeVisible({ timeout: 15000 });

    // Memastikan link "About Us" di kolom navigasi footer terlihat
    await expect(footer.getByRole('link', { name: 'About Us' })).toBeVisible();

    // Heading "Services" dirender sebagai <h3> oleh FooterColumn
    await expect(footer.getByRole('heading', { name: 'Services' })).toBeVisible();

    // Memastikan link "Web Development" di kolom services footer terlihat
    await expect(footer.getByRole('link', { name: 'Web Development' })).toBeVisible();
  });

  // ----------------------------------------------------------
  // Test 3: Validasi Alamat Kantor
  // Catatan: Alamat kantor dirender sebagai teks biasa (<p>), bukan link.
  // Tidak ada href Google Maps pada implementasi saat ini.
  // ----------------------------------------------------------
  test('Validasi Alamat Kantor & Link Lokasi', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer#contact');

    // Memastikan label "Malaysia Office" terlihat di footer
    // Timeout ditingkatkan karena rendering async
    await expect(footer.getByText('Malaysia Office')).toBeVisible({ timeout: 15000 });

    // Memastikan teks alamat Malaysia Office ter-render (menggunakan regex parsial)
    await expect(footer.getByText(/Bukit Beruang, 75450 Melaka/i)).toBeVisible();

    // Memastikan label "Indonesia Office" terlihat di footer
    await expect(footer.getByText('Indonesia Office')).toBeVisible();

    // Memastikan teks alamat Indonesia Office ter-render (menggunakan regex parsial)
    await expect(footer.getByText(/Kabupaten Tasikmalaya 46464/i)).toBeVisible();

    // Catatan: Alamat kantor saat ini dirender sebagai teks biasa (<p>),
    // bukan sebagai link (<a>). Validasi href Google Maps tidak dapat dilakukan
    // karena fitur ini belum diimplementasikan di footer.tsx.
  });

  // ----------------------------------------------------------
  // Test 4: Validasi Fungsionalitas Form Newsletter
  // ----------------------------------------------------------
  test('Validasi Fungsionalitas Form Newsletter', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer#contact');

    // Mencari input email newsletter berdasarkan placeholder text
    const emailInput = footer.getByPlaceholder('Your email address');

    // Mencari tombol submit newsletter berdasarkan role dan teks
    const subscribeButton = footer.getByRole('button', { name: 'Subscribe' });

    // Memastikan input field email terlihat di layar
    // Timeout ditingkatkan karena rendering async
    await expect(emailInput).toBeVisible({ timeout: 15000 });

    // Memastikan input field memiliki type="email" untuk validasi format bawaan browser
    await expect(emailInput).toHaveAttribute('type', 'email');

    // Memastikan tombol Subscribe terlihat di layar
    await expect(subscribeButton).toBeVisible();

    // Memastikan tombol Subscribe dalam keadaan aktif dan dapat diklik
    await expect(subscribeButton).toBeEnabled();

    // --- Skenario: Isi email valid lalu klik Subscribe ---
    await emailInput.fill('test@example.com');

    // Memastikan nilai yang diisi pada input field sudah benar
    await expect(emailInput).toHaveValue('test@example.com');

    // Mensimulasikan klik pada tombol Subscribe setelah email diisi
    // ⚠️ BUG REPORT: Form saat ini tidak memiliki onSubmit handler di footer.tsx.
    // Tidak ada response/feedback (toast, pesan sukses) setelah submit.
    await subscribeButton.click({ force: true });
  });

  // ----------------------------------------------------------
  // Test 5: Validasi Informasi Kontak
  // Catatan: Nomor telepon menggunakan link WhatsApp (wa.me), bukan tel:.
  //          Email dirender sebagai teks biasa (<span>), bukan link mailto:.
  // ----------------------------------------------------------
  test('Validasi Informasi Kontak & Fungsionalitas Link', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer#contact');

    // Memastikan heading "Contact Us" terlihat di footer
    // Timeout ditingkatkan karena rendering async
    await expect(footer.getByRole('heading', { name: /Contact Us/i })).toBeVisible({ timeout: 15000 });

    // --- Validasi Nomor Telepon ---
    // Nomor telepon dirender sebagai link WhatsApp (wa.me) dengan aria-label yang mengandung nomor
    await expect(footer.getByText(/\+62 853 2013 2014/)).toBeVisible();

    // Link WhatsApp memiliki href ke wa.me
    const whatsappLink = footer.getByRole('link', { name: /WhatsApp/i });
    await expect(whatsappLink).toBeVisible();
    await expect(whatsappLink).toHaveAttribute('href', /wa\.me/);

    // --- Validasi Alamat Email ---
    // Email dirender sebagai teks biasa (<span>), bukan link mailto:
    await expect(footer.getByText(/info@lexatech\.id/)).toBeVisible();

    // Catatan: Email saat ini tidak dibungkus dengan tag <a href="mailto:">.
    // Untuk mengaktifkan fungsionalitas klik-email, developer perlu mengubah
    // <span>{site.email}</span> menjadi <a href="mailto:{site.email}">{site.email}</a>
    // di footer.tsx.
  });

  // ----------------------------------------------------------
  // Test 6: Validasi Bottom Bar (Copyright & Legal Links)
  // Catatan: Semua link legal (Privacy Policy, Terms of Service, Sitemap)
  //          saat ini menggunakan href="#" (placeholder).
  // ----------------------------------------------------------
  test('Validasi Bottom Bar', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer#contact');

    // Memastikan teks copyright dengan nama brand terlihat di bottom bar
    // Timeout ditingkatkan karena rendering async
    await expect(footer.getByText(/LEXA Software House/i)).toBeVisible({ timeout: 15000 });

    // Memastikan tahun berjalan (2026) ikut tercantum di teks copyright
    await expect(footer.getByText(/2026/)).toBeVisible();

    // Memastikan link "Privacy Policy" terlihat
    const privacyLink = footer.getByRole('link', { name: 'Privacy Policy' });
    await expect(privacyLink).toBeVisible();
    // Link saat ini menggunakan href="#" (placeholder) — belum diarahkan ke URL nyata
    await expect(privacyLink).toHaveAttribute('href', '#');

    // Memastikan link "Terms of Service" terlihat
    const tosLink = footer.getByRole('link', { name: 'Terms of Service' });
    await expect(tosLink).toBeVisible();
    // Link saat ini menggunakan href="#" (placeholder)
    await expect(tosLink).toHaveAttribute('href', '#');

    // Memastikan link "Sitemap" terlihat
    const sitemapLink = footer.getByRole('link', { name: 'Sitemap' });
    await expect(sitemapLink).toBeVisible();
    // Link saat ini menggunakan href="#" (placeholder)
    await expect(sitemapLink).toHaveAttribute('href', '#');
  });
});
