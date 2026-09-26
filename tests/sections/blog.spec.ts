import { test, expect } from "@playwright/test";

// ============================================================
// E2E Test: Blog Section (@/components/sections/blog.tsx)
//
// Menguji visibilitas dan interaksi pada section "Blog" di halaman
// utama, termasuk:
//   - Header "News & Information" dan badge "Latest News"
//   - Artikel utama (featured article) yang ditampilkan pertama
//   - Daftar berita terbaru di sidebar kanan (latest list)
//   - Link "Read More" pada artikel utama
//   - Tombol "View All" untuk navigasi ke section blog
//   - Interaksi klik item sidebar mengganti artikel utama
//
// Strategi:
//   - Semua locator diisolasi di dalam container #blog.
//   - Data sesuai seed.ts aktual dari database.
//   - waitFor digunakan untuk menunggu konten CMS muncul.
// ============================================================

// ── Data aktual dari DB (sesuai seed.ts) ─────────────────────
// Post 0 (sortOrder 0): "LEXA Software House Launches Project-Based Internship Program" — badge: Latest News
// Post 1 (sortOrder 1): "LEXA Develops Company Profile Website to Strengthen Digital Presence" — badge: Technology
// Post 2 (sortOrder 2): "LEXA Developer Team Starts Building Portfolio Management System" — badge: Project
// Post 3 (sortOrder 3): "Internship Opportunities at LEXA for Technology Students" — badge: Career

test.describe("Blog Section", () => {
  test.beforeEach(async ({ page }) => {
    // Navigasi ke halaman utama (waitUntil: "load" kompatibel Chromium & Firefox)
    await page.goto("/", { waitUntil: "load" });

    // Tunggu container #blog terpasang di DOM sebelum test berjalan
    await page
      .locator("#blog")
      .waitFor({ state: "attached", timeout: 20000 });
  });

  // ──────────────────────────────────────────────────────────
  // 1. Validasi header section Blog
  // ──────────────────────────────────────────────────────────
  test("section blog harus terlihat dengan header dan badge yang benar", async ({
    page,
  }) => {
    // Isolasi semua locator di dalam container section #blog
    const blogSection = page.locator("#blog");

    // Scroll agar section masuk viewport sebelum dilakukan assertion
    await blogSection.scrollIntoViewIfNeeded();

    // Memastikan section blog itu sendiri terlihat di layar
    await expect(blogSection).toBeVisible();

    // Badge "Latest News" ada di header section (div) DAN di badge featured article (span).
    // Gunakan locator spesifik ke elemen div header yang mengandung badge, bukan getByText generic.
    const badgeLatestNews = blogSection.locator("div").filter({ hasText: /^Latest News$/ }).first();
    await expect(badgeLatestNews).toBeVisible({ timeout: 10000 });

    // Memastikan heading utama "News & Information" terlihat di layar
    const heading = blogSection.getByRole("heading", {
      name: /News & Information/i,
    });
    await expect(heading).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 2. Validasi artikel utama (featured article)
  // ──────────────────────────────────────────────────────────
  test("artikel utama (featured) harus ditampilkan dengan judul dan excerpt", async ({
    page,
  }) => {
    const blogSection = page.locator("#blog");
    await blogSection.scrollIntoViewIfNeeded();

    // Post pertama dari seed (sortOrder=0): "LEXA Software House Launches Project-Based Internship Program"
    // Judul muncul di h3 (featured article) DAN sebagai h4 dalam button sidebar.
    // Scope ke article featured yang merupakan anak pertama blogSection.
    const featuredArticle = blogSection.locator("article").first();
    const featuredTitle = featuredArticle.locator("h3").filter({
      hasText: /LEXA Software House Launches Project-Based Internship Program/i,
    });
    await expect(featuredTitle).toBeVisible({ timeout: 10000 });

    // Memastikan excerpt artikel utama terlihat di layar
    const featuredExcerpt = featuredArticle.getByText(
      /designed to provide hands-on experience/i
    );
    await expect(featuredExcerpt).toBeVisible();

    // Badge artikel pertama: "Latest News"
    // Badge di featured article dirender dari post.badge, post[0].badge = "Latest News"
    // Note: badge "Latest News" juga ada di header. Cari yang spesifik di area featured (article)
    const featuredBadge = featuredArticle.getByText("Latest News");
    await expect(featuredBadge).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 3. Validasi daftar berita terbaru di sidebar
  // ──────────────────────────────────────────────────────────
  test('daftar berita terbaru "Latest at LEXA" harus ditampilkan', async ({
    page,
  }) => {
    const blogSection = page.locator("#blog");
    await blogSection.scrollIntoViewIfNeeded();

    // Memastikan sub-heading "Latest at LEXA" pada sidebar berita terlihat
    const latestHeading = blogSection.getByRole("heading", {
      name: /Latest at LEXA/i,
    });
    await expect(latestHeading).toBeVisible();

    // Semua 4 post dari seed muncul sebagai button di sidebar
    const secondPost = blogSection.getByText(
      /LEXA Develops Company Profile Website to Strengthen Digital Presence/i
    );
    await expect(secondPost).toBeVisible();

    const thirdPost = blogSection.getByText(
      /LEXA Developer Team Starts Building Portfolio Management System/i
    );
    await expect(thirdPost).toBeVisible();

    const fourthPost = blogSection.getByText(
      /Internship Opportunities at LEXA for Technology Students/i
    );
    await expect(fourthPost).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 4. Validasi link "Read More" pada artikel utama
  // ──────────────────────────────────────────────────────────
  test('link "Read More" pada artikel utama harus tersedia', async ({
    page,
  }) => {
    const blogSection = page.locator("#blog");
    await blogSection.scrollIntoViewIfNeeded();

    // Mencari link "Read More" di dalam article featured (elemen <article>)
    const featuredArticle = blogSection.locator("article").first();
    const readMoreLink = featuredArticle.getByRole("link", {
      name: /Read More/i,
    });

    // Memastikan link "Read More" terlihat di layar
    await expect(readMoreLink).toBeVisible({ timeout: 10000 });

    // Memastikan link "Read More" berstatus enabled (dapat diklik)
    await expect(readMoreLink).toBeEnabled();
  });

  // ──────────────────────────────────────────────────────────
  // 5. Validasi tombol "View All" untuk navigasi blog
  // ──────────────────────────────────────────────────────────
  test('tombol "View All" harus tersedia di header section blog', async ({
    page,
  }) => {
    const blogSection = page.locator("#blog");
    await blogSection.scrollIntoViewIfNeeded();

    // Mencari link "View All" di dalam section blog
    const viewAllLink = blogSection.getByRole("link", {
      name: /View All/i,
    });

    // Memastikan link "View All" terlihat di layar
    await expect(viewAllLink).toBeVisible();

    // Memastikan link "View All" berstatus enabled (dapat diklik)
    await expect(viewAllLink).toBeEnabled();
  });

  // ──────────────────────────────────────────────────────────
  // 6. Validasi interaksi: klik item sidebar mengganti artikel utama
  // ──────────────────────────────────────────────────────────
  test("klik item sidebar harus mengganti artikel utama yang ditampilkan", async ({
    page,
  }) => {
    const blogSection = page.locator("#blog");
    await blogSection.scrollIntoViewIfNeeded();

    // Pastikan judul artikel utama awal (artikel pertama dari seed) terlihat
    // Scope ke h3 dalam article featured untuk menghindari strict mode violation dengan h4 di sidebar.
    const initialFeaturedTitle = blogSection.locator("article").first().locator("h3").filter({
      hasText: /LEXA Software House Launches Project-Based Internship Program/i,
    });
    await expect(initialFeaturedTitle).toBeVisible({ timeout: 10000 });

    // Klik button sidebar artikel kedua (sortOrder=1)
    const secondPostButton = blogSection.getByRole("button", {
      name: /LEXA Develops Company Profile Website to Strengthen Digital Presence/i,
    });
    await expect(secondPostButton).toBeVisible();
    await secondPostButton.click();

    // Setelah diklik, artikel utama harus berganti menampilkan judul artikel kedua
    const newFeaturedTitle = blogSection.getByRole("heading", {
      name: /LEXA Develops Company Profile Website to Strengthen Digital Presence/i,
      level: 3,
    });
    await expect(newFeaturedTitle).toBeVisible({ timeout: 5000 });
  });
});
