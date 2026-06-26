import { test, expect } from '@playwright/test';

test.describe('Services Section', () => {
  test.beforeEach(async ({ page }) => {
    // Menavigasi ke URL target sebelum setiap pengujian
    await page.goto('http://localhost:3001/');
  });

  // test('Validasi Render Header & Card', async ({ page }) => {
  //   // 1. Memastikan SectionHeading pembungkus Services Section terlihat di layar
  //   // Kita isolasi pencariannya di dalam #services agar tidak bentrok dengan tombol Hero Section
  //   const servicesSection = page.locator('#services');
  //   await expect(servicesSection.getByText('Our Services')).toBeVisible();
  //   await expect(servicesSection.getByRole('heading', { name: 'Solutions We Provide', level: 2 })).toBeVisible();

  //   // 2. Mendefinisikan array daftar judul layanan sesuai data database/seed
  //   const services = [
  //     'Web Development',
  //     'Mobile Development',
  //     'System Development',
  //     'UI/UX Design',
  //     'IT Consulting',
  //     'Maintenance & Support'
  //   ];

  //   // 3. Menggunakan perulangan untuk memastikan CardTitle pada ke-6 card layanan sukses ter-render
  //   for (const serviceTitle of services) {
  //     // Mengisolasi pencarian spesifik di dalam komponen Card terkait menggunakan class '.group'
  //     const targetCard = servicesSection.locator('.group').filter({ hasText: serviceTitle });
      
  //     // Memastikan CardTitle (Heading level 3) di dalam kartu tersebut terlihat jelas
  //     await expect(targetCard.getByRole('heading', { name: serviceTitle, level: 3 })).toBeVisible();
  //   }
  // });

  test('Validasi Interaksi Modular "Learn More" (Looping Test)', async ({ page }) => {
    // Mencari semua elemen link "Learn More" di dalam halaman (bisa ada banyak)
    const learnMoreLinks = page.getByRole('link', { name: /Learn More/i });

    // Memastikan data CMS/card sudah ter-render dengan menunggu link pertama muncul
    await expect(learnMoreLinks.first()).toBeVisible();

    // Mendapatkan total jumlah tombol "Learn More" yang tampil
    const count = await learnMoreLinks.count();
    
    // Memastikan ada lebih dari 0 link yang ter-render
    expect(count).toBeGreaterThan(0);

    // Menggunakan perulangan untuk memvalidasi setiap link
    for (let i = 0; i < count; i++) {
      const link = learnMoreLinks.nth(i);
      
      // Memastikan setiap link "Learn More" berstatus terlihat (visible)
      await expect(link).toBeVisible();
      
      // Memastikan setiap link "Learn More" dapat diinteraksi (enabled)
      await expect(link).toBeEnabled();
    }

    // Mensimulasikan klik pada link "Learn More" yang pertama
    await learnMoreLinks.first().click();

    // Memastikan URL berubah atau mengandung hash '#contact'
    await expect(page).toHaveURL(/.*#contact/);
  });

  test('Validasi Hover State pada Card Layanan', async ({ page }) => {
    // Menargetkan parent card spesifik yang mengandung teks "Web Development"
    const webDevCard = page.locator('.group').filter({ hasText: 'Web Development' });

    // Memastikan card terlihat secara normal sebelum dilakukan hover
    await expect(webDevCard).toBeVisible();

    // Mensimulasikan aksi hover kursor di atas card layanan "Web Development"
    await webDevCard.hover();

    // Memastikan card tetap terlihat (visible) tanpa error/rusaknya layout akibat hover
    await expect(webDevCard).toBeVisible();
  });
});
