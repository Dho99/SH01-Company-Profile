import { test, expect } from '@playwright/test';

// ============================================================
// E2E Test: Stats (@/components/sections/stats)
// Menguji visibilitas dan konten section statistik perusahaan
// ============================================================

test.describe('Stats Section', () => {
  // Navigasi ke halaman utama sebelum setiap test dijalankan
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('section stats harus terlihat di halaman', async ({ page }) => {
    // Mencari section stats yang memiliki z-20 (overlap dengan hero)
    const statsSection = page.locator('main section').nth(1);

    // Memastikan section stats terlihat di halaman
    await expect(statsSection).toBeVisible();

    // Memastikan section memiliki definisi list (<dl>) untuk data statistik
    const definitionList = statsSection.locator('dl');
    await expect(definitionList).toBeVisible();
  });

  test('harus menampilkan 4 item statistik', async ({ page }) => {
    // Mencari section stats
    const statsSection = page.locator('main section').nth(1);

    // Mencari semua elemen <dd> (definition description) yang berisi angka statistik
    const statValues = statsSection.locator('dd');

    // Memastikan jumlah item statistik ada 4 (Projects, Clients, Team, Years)
    await expect(statValues).toHaveCount(4);

    // Mencari semua elemen <dt> (definition term) yang berisi label statistik
    const statLabels = statsSection.locator('dt');

    // Memastikan jumlah label statistik juga ada 4
    await expect(statLabels).toHaveCount(4);
  });

  test('label statistik harus menampilkan teks yang benar', async ({ page }) => {
    // Mencari section stats
    const statsSection = page.locator('main section').nth(1);

    // Memastikan label "Projects Completed" terlihat
    const projectsLabel = statsSection.getByText('Projects Completed');
    await expect(projectsLabel).toBeVisible();

    // Memastikan label "Happy Clients" terlihat
    const clientsLabel = statsSection.getByText('Happy Clients');
    await expect(clientsLabel).toBeVisible();

    // Memastikan label "Expert Team" terlihat
    const teamLabel = statsSection.getByText('Expert Team');
    await expect(teamLabel).toBeVisible();

    // Memastikan label "Years Experience" terlihat
    const yearsLabel = statsSection.getByText('Years Experience');
    await expect(yearsLabel).toBeVisible();
  });

  test('grid layout harus memiliki 2 kolom di mobile dan 4 di desktop', async ({ page }) => {
    // Mencari elemen <dl> yang merupakan grid container statistik
    const statsGrid = page.locator('main section').nth(1).locator('dl');

    // Memastikan grid memiliki class grid-cols-2 untuk tampilan mobile
    await expect(statsGrid).toHaveClass(/grid-cols-2/);

    // Memastikan grid memiliki class md:grid-cols-4 untuk tampilan desktop
    await expect(statsGrid).toHaveClass(/md:grid-cols-4/);
  });
});
