import { test, expect } from '@playwright/test';






// ============================================================
// E2E Test: Footer (@/components/layout/footer)
// Menguji visibilitas dan konten komponen footer
// ============================================================

test.describe('Footer', () => {
  // Navigasi ke halaman utama sebelum setiap test dijalankan
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('elemen footer harus terlihat di halaman', async ({ page }) => {
    // Mencari elemen <footer> yang merupakan root komponen Footer
    const footer = page.locator('footer');

    // Memastikan elemen footer terlihat di halaman
    await expect(footer).toBeVisible();

    // Memastikan footer memiliki id "contact" untuk anchor navigation
    await expect(footer).toHaveAttribute('id', 'contact');
  });

  test('informasi kontak harus ditampilkan', async ({ page }) => {
    // Mencari elemen footer sebagai scope pencarian
    const footer = page.locator('footer');

    // Memastikan heading "Contact Us" terlihat di footer
    const contactHeading = footer.getByText('Contact Us');
    await expect(contactHeading).toBeVisible();

    // Memastikan alamat lokasi "Tasikmalaya - Indonesia" terlihat
    const location = footer.getByText('Tasikmalaya - Indonesia');
    await expect(location).toBeVisible();

    // Memastikan nomor telepon ditampilkan
    const phone = footer.getByText('+62 853 2013 2014');
    await expect(phone).toBeVisible();

    // Memastikan alamat email ditampilkan
    const email = footer.getByText('info@lexatech.id');
    await expect(email).toBeVisible();
  });

  test('link sosial media harus tersedia', async ({ page }) => {
    // Mencari elemen footer sebagai scope pencarian
    const footer = page.locator('footer');

    // Memastikan link LinkedIn tersedia dengan aria-label yang benar
    const linkedinLink = footer.getByLabel('LinkedIn');
    await expect(linkedinLink).toBeVisible();

    // Memastikan link Instagram tersedia
    const instagramLink = footer.getByLabel('Instagram');
    await expect(instagramLink).toBeVisible();

    // Memastikan link Facebook tersedia
    const facebookLink = footer.getByLabel('Facebook');
    await expect(facebookLink).toBeVisible();

    // Memastikan link YouTube tersedia
    const youtubeLink = footer.getByLabel('YouTube');
    await expect(youtubeLink).toBeVisible();
  });

  test('kolom navigasi footer harus menampilkan link', async ({ page }) => {
    // Mencari elemen footer sebagai scope pencarian
    const footer = page.locator('footer');

    // Memastikan heading kolom "Navigation" terlihat
    const navHeading = footer.getByText('Navigation', { exact: true });
    await expect(navHeading).toBeVisible();

    // Memastikan heading kolom "Services" terlihat
    const servicesHeading = footer.getByText('Services', { exact: true });
    await expect(servicesHeading).toBeVisible();
  });

  test('form newsletter harus tersedia', async ({ page }) => {
    // Mencari elemen footer sebagai scope pencarian
    const footer = page.locator('footer');

    // Memastikan heading "Newsletter" terlihat di footer
    const newsletterHeading = footer.getByText('Newsletter');
    await expect(newsletterHeading).toBeVisible();

    // Memastikan input email untuk newsletter tersedia dengan placeholder yang benar
    const emailInput = footer.getByPlaceholder('Your email address');
    await expect(emailInput).toBeVisible();

    // Memastikan tombol "Subscribe" tersedia
    const subscribeButton = footer.getByRole('button', { name: 'Subscribe' });
    await expect(subscribeButton).toBeVisible();
  });

  test('copyright harus menampilkan tahun dan nama perusahaan', async ({ page }) => {
    // Mencari elemen footer sebagai scope pencarian
    const footer = page.locator('footer');

    // Mengambil tahun saat ini untuk validasi copyright
    const currentYear = new Date().getFullYear().toString();

    // Memastikan teks copyright mengandung tahun saat ini
    const copyright = footer.getByText(new RegExp(`© ${currentYear}`));
    await expect(copyright).toBeVisible();

    // Memastikan teks copyright mengandung nama perusahaan
    const companyName = footer.getByText(/LEXA Software House/);
    await expect(companyName).toBeVisible();
  });
});
