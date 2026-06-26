import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigasi ke URL target sebelum setiap pengujian
    await page.goto('http://localhost:3001/');
  });

  test('Validasi Elemen Teks', async ({ page }) => {
    // Memastikan tagline terlihat di layar
    await expect(page.getByText(/LEADING, EXCELLENCE & AUTOMATION/i)).toBeVisible();
    
    // Memastikan judul utama (H1) terlihat di layar
    await expect(page.getByRole('heading', { name: /Building Digital Solutions For A Better Future/i })).toBeVisible();
    
    // Memastikan paragraf deskripsi terlihat di layar
    await expect(page.getByText(/LEXA Software House delivers innovative/i)).toBeVisible();
  });

  test('Validasi Tombol "Our Services"', async ({ page }) => {
    // Klik tombol "Our Services"
    await page.getByRole('link', { name: /Our Services/i }).click();
    
    // Memastikan URL berubah dan mengandung hash '#services'
    await expect(page).toHaveURL(/.*#services/);
  });

  test('Validasi Tombol "View Our Portfolio"', async ({ page }) => {
    // Klik tombol "View Our Portfolio"
    await page.getByRole('link', { name: /View Our Portfolio/i }).click();
    
    // Memastikan URL berubah dan mengandung hash '#portfolio'
    await expect(page).toHaveURL(/.*#portfolio/);
  });

  test('Validasi Gambar Latar Belakang', async ({ page }) => {
    // Mencari gambar latar belakang berdasarkan nama/alt text
    const heroImage = page.getByRole('img', { name: /Digital city background/i });
    
    // Memastikan gambar latar belakang hero terlihat di layar
    await expect(heroImage).toBeVisible();
  });
});
