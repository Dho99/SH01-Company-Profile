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
//   - API di-mock dengan 3 testimoni contoh tanpa avatar URL
//     agar elemen UserRound icon yang dirender dapat diverifikasi.
//   - Scroll ke section sebelum assertion agar elemen masuk viewport.
// ============================================================

// ── Data mock 3 testimoni klien LEXA ────────────────────────
const MOCK_TESTIMONIALS = [
  {
    id: "1",
    quote: "LEXA delivered an exceptional web platform that transformed our business operations completely.",
    name: "Ahmad Fauzi",
    role: "CEO, TechCorp Indonesia",
    avatarUrl: null,
    sortOrder: 1,
    published: true,
  },
  {
    id: "2",
    quote: "The mobile application built by LEXA exceeded all our expectations in terms of quality and performance.",
    name: "Siti Rahma",
    role: "Product Manager, StartupHub",
    avatarUrl: null,
    sortOrder: 2,
    published: true,
  },
  {
    id: "3",
    quote: "Professional team with deep technical expertise. Highly recommended for any software development project.",
    name: "Budi Santoso",
    role: "CTO, DigitalWave",
    avatarUrl: null,
    sortOrder: 3,
    published: true,
  },
];

// ── Data mock section heading untuk testimonials ─────────────
const MOCK_SECTION_HEADINGS = [
  { key: "testimonials", eyebrow: "What Clients Say", title: "Trusted By Great Companies" },
];

test.describe("Testimonials Section", () => {
  test.beforeEach(async ({ page }) => {
    // Mock API testimonials dengan 3 item contoh (tanpa avatar)
    await page.route(/\/api\/cms\/testimonials/, async (route) => {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(MOCK_TESTIMONIALS),
      });
    });

    // Mock API section-headings untuk heading "Trusted By Great Companies"
    await page.route(/\/api\/cms\/section-headings/, async (route) => {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(MOCK_SECTION_HEADINGS),
      });
    });

    // Mock API lainnya dengan respon kosong agar tidak blocking render
    await page.route(/\/api\/cms\/site-setting/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: "{}" });
    });
    await page.route(/\/api\/cms\/services/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: "[]" });
    });
    await page.route(/\/api\/cms\/technologies/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: "[]" });
    });
    await page.route(/\/api\/cms\/reasons/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: "[]" });
    });
    await page.route(/\/api\/cms\/stat($|\/)/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: "[]" });
    });
    await page.route(/\/api\/cms\/about-points/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: "[]" });
    });

    // Navigasi ke halaman utama
    await page.goto("/", { waitUntil: "domcontentloaded" });

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

    // Memastikan setidaknya 3 card testimoni dirender (sesuai mock data)
    await expect(testimonialCards).toHaveCount(3);
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

    // Memastikan teks kutipan (blockquote) dari testimoni pertama terlihat
    const quote = firstCard.getByText(
      /LEXA delivered an exceptional web platform/i
    );
    await expect(quote).toBeVisible({ timeout: 10000 });

    // Memastikan nama klien pada figcaption terlihat di layar
    const clientName = firstCard.getByText("Ahmad Fauzi");
    await expect(clientName).toBeVisible();

    // Memastikan jabatan klien pada figcaption terlihat di layar
    const clientRole = firstCard.getByText("CEO, TechCorp Indonesia");
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
    const secondCard = cards.nth(1);
    await secondCard.scrollIntoViewIfNeeded();

    // Memastikan kutipan testimoni kedua terlihat di card-nya
    const secondQuote = secondCard.getByText(
      /mobile application built by LEXA exceeded/i
    );
    await expect(secondQuote).toBeVisible({ timeout: 10000 });

    // Memastikan nama dan jabatan klien kedua terlihat
    await expect(secondCard.getByText("Siti Rahma")).toBeVisible();
    await expect(secondCard.getByText("Product Manager, StartupHub")).toBeVisible();

    // ── Card ketiga ──────────────────────────────────────────
    const thirdCard = cards.nth(2);
    await thirdCard.scrollIntoViewIfNeeded();

    // Memastikan kutipan testimoni ketiga terlihat di card-nya
    const thirdQuote = thirdCard.getByText(
      /Professional team with deep technical expertise/i
    );
    await expect(thirdQuote).toBeVisible({ timeout: 10000 });

    // Memastikan nama dan jabatan klien ketiga terlihat
    await expect(thirdCard.getByText("Budi Santoso")).toBeVisible();
    await expect(thirdCard.getByText("CTO, DigitalWave")).toBeVisible();
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
