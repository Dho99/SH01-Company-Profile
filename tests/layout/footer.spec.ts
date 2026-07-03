import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Footer (@/components/layout/footer)
// Menguji visibilitas dan konten komponen footer secara terisolasi
// ============================================================

test.describe('Footer Section', () => {
  test.beforeEach(async ({ page }) => {
    // Gunakan domcontentloaded agar Firefox tidak menunggu semua resource berat
    // (CMS API fetch, gambar) yang menyebabkan timeout 30s di beforeEach
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Tunggu footer ada di DOM terlebih dahulu (bisa dalam skeleton state dulu)
    const footer = page.locator('footer');
    await footer.waitFor({ state: 'attached', timeout: 15000 });

    // Scroll ke footer agar masuk viewport dan CMS data mulai ter-fetch
    await footer.scrollIntoViewIfNeeded();
  });

  // ----------------------------------------------------------
  // Test 1: Validasi Render Kolom Brand & Identitas
  // ----------------------------------------------------------
  test('Validasi Render Kolom Brand & Identitas', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    // untuk mencegah Strict Mode Violation dengan elemen di Navbar atau Hero
    const footer = page.locator('footer');

    // Memastikan elemen footer selesai di-load (menunggu data CMS)
    // dengan cara memastikan teks tagline brand terlihat
    // Timeout ditingkatkan karena CMS data dimuat secara async
    await expect(footer.getByText(/Building digital solutions/i)).toBeVisible({ timeout: 15000 });

    // Memastikan ikon sosial media LinkedIn terlihat berdasarkan aria-label
    await expect(footer.getByRole('link', { name: 'linkedin' })).toBeVisible();

    // Memastikan ikon sosial media Instagram terlihat berdasarkan aria-label
    await expect(footer.getByRole('link', { name: 'instagram' })).toBeVisible();

    // Memastikan ikon sosial media Facebook terlihat berdasarkan aria-label
    await expect(footer.getByRole('link', { name: 'facebook' })).toBeVisible();

    // Memastikan ikon sosial media YouTube terlihat berdasarkan aria-label
    await expect(footer.getByRole('link', { name: 'youtube' })).toBeVisible();
  });

  // ----------------------------------------------------------
  // Test 2: Validasi Link Navigasi (Mencegah Strict Mode)
  // ----------------------------------------------------------
  test('Validasi Link Navigasi di Scope Footer', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer');

    // Memastikan data CMS nav-links sudah ter-render
    // dengan menunggu heading kolom "Navigation" muncul
    // Timeout ditingkatkan karena CMS data dimuat secara async
    await expect(footer.getByText('Navigation')).toBeVisible({ timeout: 15000 });

    // Memastikan link "About Us" di kolom navigasi footer terlihat
    await expect(footer.getByRole('link', { name: 'About Us' })).toBeVisible();
    
    await expect(footer.getByRole('heading', { name: 'Services' })).toBeVisible();

    // Memastikan link "Web Development" di kolom services footer terlihat
    await expect(footer.getByRole('link', { name: 'Web Development' })).toBeVisible();
  });

  // ----------------------------------------------------------
  // Test 3: Validasi Alamat Kantor & Link Lokasi Google Maps
  // ----------------------------------------------------------
  test('Validasi Alamat Kantor & Link Lokasi', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer');

    // Memastikan label "Malaysia Office" terlihat di footer
    // Timeout ditingkatkan karena CMS data dimuat secara async
    await expect(footer.getByText('Malaysia Office')).toBeVisible({ timeout: 15000 });

    // Memastikan teks alamat Malaysia Office ter-render (menggunakan regex parsial)
    await expect(footer.getByText(/Bukit Beruang, 75450 Melaka/i)).toBeVisible();

    // Memastikan alamat Malaysia Office berupa link yang mengarah ke Google Maps
    const malaysiaLink = footer.getByRole('link', { name: /Bukit Beruang/i });
    await expect(malaysiaLink).toBeVisible();
    // Memastikan link Malaysia Office mengarah ke Google Maps
    await expect(malaysiaLink).toHaveAttribute('href', /maps\.google\.com|goo\.gl\/maps/i);

    // Memastikan label "Indonesia Office" terlihat di footer
    await expect(footer.getByText('Indonesia Office')).toBeVisible();

    // Memastikan teks alamat Indonesia Office ter-render (menggunakan regex parsial)
    await expect(footer.getByText(/Kabupaten Tasikmalaya 46464/i)).toBeVisible();

    // Memastikan alamat Indonesia Office berupa link yang mengarah ke Google Maps
    const indonesiaLink = footer.getByRole('link', { name: /Tasikmalaya/i });
    await expect(indonesiaLink).toBeVisible();
    // Memastikan link Indonesia Office mengarah ke Google Maps
    await expect(indonesiaLink).toHaveAttribute('href', /maps\.google\.com|goo\.gl\/maps/i);
  });

  // ----------------------------------------------------------
  // Test 4: Validasi Fungsionalitas Form Newsletter
  // ----------------------------------------------------------
  test('Validasi Fungsionalitas Form Newsletter', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer');

    // Mencari input email newsletter berdasarkan placeholder text
    const emailInput = footer.getByPlaceholder('Your email address');

    // Mencari tombol submit newsletter berdasarkan role dan teks
    const subscribeButton = footer.getByRole('button', { name: 'Subscribe' });

    // Memastikan input field email terlihat di layar
    // Timeout ditingkatkan karena CMS data dimuat secara async
    await expect(emailInput).toBeVisible({ timeout: 15000 });

    // Memastikan input field memiliki type="email" untuk validasi format bawaan browser
    await expect(emailInput).toHaveAttribute('type', 'email');

    // Memastikan input field bersifat required (wajib diisi sebelum submit)
    await expect(emailInput).toHaveAttribute('required', '');

    // Memastikan tombol Subscribe terlihat di layar
    await expect(subscribeButton).toBeVisible();

    // Memastikan tombol Subscribe dalam keadaan aktif dan dapat diklik
    await expect(subscribeButton).toBeEnabled();

    // --- Skenario 1: Klik tombol Subscribe TANPA mengisi email ---
    // Memastikan klik tanpa email TIDAK menyebabkan navigasi / halaman tidak berpindah
    // (validasi HTML5 'required' seharusnya mencegah submit)
    await subscribeButton.click();
    // Memastikan URL tidak berubah setelah klik tanpa input (validasi browser aktif)
    await expect(page).toHaveURL('/');

    // --- Skenario 2: Isi email valid lalu klik Subscribe ---
    // Mensimulasikan pengisian input field email dengan alamat email yang valid
    await emailInput.fill('test@example.com');

    // Memastikan nilai yang diisi pada input field sudah benar
    await expect(emailInput).toHaveValue('test@example.com');

    // Mensimulasikan klik pada tombol Subscribe setelah email diisi
    // ⚠️ BUG REPORT: Form saat ini tidak memiliki onSubmit handler di footer.tsx.
    // Tidak ada response/feedback (toast, pesan sukses) setelah submit.
    // Developer perlu menambahkan handler API atau feedback UI pada form newsletter.
    await subscribeButton.click();
  });

  // ----------------------------------------------------------
  // Test 5: Validasi Informasi Kontak & Fungsionalitas Link
  // ----------------------------------------------------------
  test('Validasi Informasi Kontak & Fungsionalitas Link', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer');

    // Memastikan heading "Contact Us" terlihat di footer
    // Timeout ditingkatkan karena CMS data dimuat secara async
    await expect(footer.getByRole('heading', { name: /Contact Us/i })).toBeVisible({ timeout: 15000 });

    // --- Validasi Link Telepon ---
    // Memastikan nomor telepon terlihat di layar
    await expect(footer.getByText(/\+62 853 2013 2014/)).toBeVisible();

    // Memastikan nomor telepon berupa link <a href="tel:...">
    const phoneLink = footer.getByRole('link', { name: /\+62 853 2013 2014/ });
    await expect(phoneLink).toBeVisible();
    // Memastikan link telepon menggunakan protokol tel: agar bisa langsung menelepon
    await expect(phoneLink).toHaveAttribute('href', 'tel:+6285320132014');

    // --- Validasi Link Email ---
    // Memastikan alamat email terlihat di layar
    await expect(footer.getByText(/info@lexatech\.id/)).toBeVisible();

    // Memastikan alamat email berupa link <a href="mailto:...">
    const emailLink = footer.getByRole('link', { name: /info@lexatech\.id/ });
    await expect(emailLink).toBeVisible();
    // Memastikan link email menggunakan protokol mailto: agar bisa langsung membuka email client
    await expect(emailLink).toHaveAttribute('href', 'mailto:info@lexatech.id');
  });

  // ----------------------------------------------------------
  // Test 6: Validasi Bottom Bar (Copyright & Legal Links + href)
  // ----------------------------------------------------------
  test('Validasi Bottom Bar', async ({ page }) => {
    // Mengisolasi semua pencarian locator ke dalam elemen <footer> saja
    const footer = page.locator('footer');

    // Memastikan teks copyright dengan nama brand terlihat di bottom bar
    // Timeout ditingkatkan karena CMS data dimuat secara async
    await expect(footer.getByText(/LEXA Software House/i)).toBeVisible({ timeout: 15000 });

    // Memastikan tahun berjalan (2026) ikut tercantum di teks copyright
    await expect(footer.getByText(/2026/)).toBeVisible();

    // Memastikan link "Privacy Policy" terlihat dan memiliki atribut href yang valid
    const privacyLink = footer.getByRole('link', { name: 'Privacy Policy' });
    await expect(privacyLink).toBeVisible();
    // Catatan: href saat ini bernilai "#" (placeholder) — pastikan diperbarui ke URL nyata
    await expect(privacyLink).toHaveAttribute('href', '/privacy-policy');

    // Memastikan link "Terms of Service" terlihat dan memiliki atribut href yang valid
    const tosLink = footer.getByRole('link', { name: 'Terms of Service' });
    await expect(tosLink).toBeVisible();
    // Catatan: href saat ini bernilai "#" (placeholder) — pastikan diperbarui ke URL nyata
    await expect(tosLink).toHaveAttribute('href', '/terms-of-service');

    // Memastikan link "Sitemap" terlihat dan memiliki atribut href yang valid
    const sitemapLink = footer.getByRole('link', { name: 'Sitemap' });
    await expect(sitemapLink).toBeVisible();
    // Catatan: href saat ini bernilai "#" (placeholder) — pastikan diperbarui ke URL nyata
    await expect(sitemapLink).toHaveAttribute('href', '/sitemap.xml');
  });
});
