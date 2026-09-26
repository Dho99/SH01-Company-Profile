import { test, expect } from "@playwright/test";

// ============================================================
// E2E Test: Testimonials Section (@/components/sections/testimonials.tsx)
//
// Menguji visibilitas dan konten section "Testimonials" di halaman
// utama, termasuk:
//   - Heading & eyebrow label section
//   - Ketersediaan card testimoni (figure elements)
//   - Konten card: kutipan (quote), nama klien, dan jabatan
//   - Elemen visual ikon Quote pada setiap card
//   - Avatar (UserRound icon atau gambar) pada figcaption
//
// Strategi:
//   - Tidak menggunakan id="#testimonials" karena komponen
//     Testimonials tidak menyertakan atribut id pada <section>-nya.
//     Gunakan data-testid implisit atau role/text untuk isolasi.
//   - Data sesuai seed.ts aktual (4 testimoni dari DB).
//   - Scroll ke section sebelum assertion agar elemen masuk viewport.
// ============================================================

// ── Data aktual dari DB (sesuai seed.ts) ────────────────────
// [0] Ardi Pratama    – CEO, Maju Bersama Indonesia  – "LEXA Software House delivered an outstanding website..."
// [1] Dewi Lestari    – Marketing Director, TokoKita – "The mobile app developed by LEXA..."
// [2] Budi Santoso    – CTO, CV. Sumber Abadi        – "Great experience working with LEXA..."
// [3] Rangga Pratama  – Project Manager, Digital Nusantara – "LEXA provides reliable digital solutions..."

test.describe("Testimonials Section", () => {
  test.beforeEach(async ({ page }) => {
    // Navigasi ke halaman utama (waitUntil: "load" kompatibel Chromium & Firefox)
    await page.goto("/", { waitUntil: "load" });

    // Tunggu section testimonials (identifikasi via eyebrow text) terpasang di DOM
    await page
      .getByText("What Clients Say")
      .waitFor({ state: "attached", timeout: 15000 });
  });

  // ──────────────────────────────────────────────────────────
  // 1. Validasi heading & eyebrow label section Testimonials
  // ──────────────────────────────────────────────────────────
  test("section testimonials harus terlihat dengan heading yang benar", async ({
    page,
  }) => {
    // Scroll ke section testimonials via teks eyebrow-nya
    const eyebrowEl = page.getByText("What Clients Say", { exact: true });
    await eyebrowEl.scrollIntoViewIfNeeded();

    // Memastikan eyebrow label "What Clients Say" terlihat di layar
    await expect(eyebrowEl).toBeVisible();

    // Memastikan heading utama "Trusted By Great Companies" terlihat di halaman
    const heading = page.getByRole("heading", {
      name: /Trusted By Great Companies/i,
    });
    await expect(heading).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 2. Validasi ketersediaan card testimoni (figure elements)
  // ──────────────────────────────────────────────────────────
  test("harus menampilkan card testimoni sesuai jumlah data mock", async ({
    page,
  }) => {
    // Scroll ke section testimonials
    await page.getByText("What Clients Say").scrollIntoViewIfNeeded();

    // Mencari semua elemen <figure> yang merupakan card testimoni
    const testimonialCards = page.locator("figure");

    // DB seed memiliki 4 testimoni — pastikan minimal 4 card dirender
    await expect(testimonialCards).toHaveCount(4);
  });

  // ──────────────────────────────────────────────────────────
  // 3. Validasi konten card pertama (kutipan, nama, jabatan)
  // ──────────────────────────────────────────────────────────
  test("card testimoni pertama harus menampilkan kutipan, nama, dan jabatan", async ({
    page,
  }) => {
    await page.getByText("What Clients Say").scrollIntoViewIfNeeded();

    // Mencari card pertama berdasarkan elemen <figure>
    const firstCard = page.locator("figure").first();
    await firstCard.scrollIntoViewIfNeeded();

    // Card [0]: Ardi Pratama – "LEXA Software House delivered an outstanding website..."
    const quote = firstCard.getByText(
      /LEXA Software House delivered an outstanding website/i
    );
    await expect(quote).toBeVisible({ timeout: 10000 });

    // Memastikan nama klien pada figcaption terlihat di layar
    const clientName = firstCard.getByText("Ardi Pratama");
    await expect(clientName).toBeVisible();

    // Memastikan jabatan klien pada figcaption terlihat di layar
    const clientRole = firstCard.getByText("CEO, Maju Bersama Indonesia");
    await expect(clientRole).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 4. Validasi konten card kedua dan ketiga
  // ──────────────────────────────────────────────────────────
  test("card testimoni kedua dan ketiga harus menampilkan data yang benar", async ({
    page,
  }) => {
    await page.getByText("What Clients Say").scrollIntoViewIfNeeded();

    const cards = page.locator("figure");

    // ── Card kedua ──────────────────────────────────────────
    // Card [1]: Dewi Lestari – "The mobile app developed by LEXA..."
    const secondCard = cards.nth(1);
    await secondCard.scrollIntoViewIfNeeded();

    const secondQuote = secondCard.getByText(
      /The mobile app developed by LEXA has significantly improved/i
    );
    await expect(secondQuote).toBeVisible({ timeout: 10000 });

    await expect(secondCard.getByText("Dewi Lestari")).toBeVisible();
    await expect(secondCard.getByText("Marketing Director, TokoKita")).toBeVisible();

    // ── Card ketiga ──────────────────────────────────────────
    // Card [2]: Budi Santoso – "Great experience working with LEXA..."
    const thirdCard = cards.nth(2);
    await thirdCard.scrollIntoViewIfNeeded();

    const thirdQuote = thirdCard.getByText(
      /Great experience working with LEXA/i
    );
    await expect(thirdQuote).toBeVisible({ timeout: 10000 });

    await expect(thirdCard.getByText("Budi Santoso")).toBeVisible();
    await expect(thirdCard.getByText("CTO, CV. Sumber Abadi")).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 5. Validasi avatar placeholder (UserRound icon) saat tanpa avatarUrl
  // ──────────────────────────────────────────────────────────
  test("card tanpa avatarUrl harus menampilkan placeholder avatar (UserRound SVG)", async ({
    page,
  }) => {
    await page.getByText("What Clients Say").scrollIntoViewIfNeeded();

    // Mencari card pertama
    const firstCard = page.locator("figure").first();
    await firstCard.scrollIntoViewIfNeeded();

    // Karena avatarUrl = null, komponen merender ikon UserRound (SVG) di figcaption
    // UserRound dirender sebagai elemen SVG di dalam figcaption
    const figcaption = firstCard.locator("figcaption");

    // Memastikan figcaption terlihat (mengandung avatar dan teks nama/jabatan)
    await expect(figcaption).toBeVisible();

    // Memastikan ada elemen SVG di dalam figcaption sebagai avatar placeholder
    const avatarSvg = figcaption.locator("svg").first();
    await expect(avatarSvg).toBeVisible();
  });
});
