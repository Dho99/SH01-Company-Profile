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
//   - API /api/cms/blog-posts di-mock dengan 4 artikel contoh.
//   - waitFor digunakan untuk menunggu konten CMS muncul.
// ============================================================

// ── Data mock artikel blog ───────────────────────────────────
const MOCK_BLOG_POSTS = [
  {
    id: "1",
    badge: "Featured",
    tag: "Web Development",
    publishedAt: "2025-01-15T00:00:00.000Z",
    title: "Building Scalable Web Apps with Next.js",
    excerpt: "Discover how Next.js empowers developers to build fast and scalable web applications.",
    imageUrl: null,
    sortOrder: 1,
    published: true,
  },
  {
    id: "2",
    badge: "Tech",
    tag: "Mobile",
    publishedAt: "2025-01-10T00:00:00.000Z",
    title: "Cross-Platform Mobile Development with Flutter",
    excerpt: "Flutter makes it easy to build beautiful native mobile apps from a single codebase.",
    imageUrl: null,
    sortOrder: 2,
    published: true,
  },
  {
    id: "3",
    badge: "Tutorial",
    tag: "Backend",
    publishedAt: "2025-01-05T00:00:00.000Z",
    title: "REST API Best Practices with Laravel",
    excerpt: "Learn the best practices for building robust REST APIs using the Laravel framework.",
    imageUrl: null,
    sortOrder: 3,
    published: true,
  },
  {
    id: "4",
    badge: "News",
    tag: "Cloud",
    publishedAt: "2024-12-30T00:00:00.000Z",
    title: "Deploying Applications to AWS in 2025",
    excerpt: "A step-by-step guide to deploying your applications efficiently on AWS infrastructure.",
    imageUrl: null,
    sortOrder: 4,
    published: true,
  },
];

test.describe("Blog Section", () => {
  test.beforeEach(async ({ page }) => {
    // Mock API blog-posts dengan 4 artikel contoh
    await page.route(/\/api\/cms\/blog-posts/, async (route) => {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(MOCK_BLOG_POSTS),
      });
    });

    // Mock API lainnya dengan respon kosong agar tidak blocking render
    await page.route(/\/api\/cms\/site-setting/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: "{}" });
    });
    await page.route(/\/api\/cms\/section-headings/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: "[]" });
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

    // Tunggu container #blog terpasang di DOM sebelum test berjalan
    await page
      .locator("#blog")
      .waitFor({ state: "attached", timeout: 15000 });
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

    // Memastikan badge "Latest News" terlihat di dalam section blog
    const badgeLatestNews = blogSection.getByText("Latest News");
    await expect(badgeLatestNews).toBeVisible();

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

    // Memastikan judul artikel utama (artikel pertama dari mock) terlihat
    const featuredTitle = blogSection.getByRole("heading", {
      name: /Building Scalable Web Apps with Next\.js/i,
    });
    await expect(featuredTitle).toBeVisible({ timeout: 10000 });

    // Memastikan excerpt/ringkasan artikel utama terlihat di layar
    const featuredExcerpt = blogSection.getByText(
      /empowers developers to build fast and scalable/i
    );
    await expect(featuredExcerpt).toBeVisible();

    // Memastikan badge kategori "Featured" tampil pada artikel utama
    const featuredBadge = blogSection.getByText("Featured", { exact: true });
    await expect(featuredBadge).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 3. Validasi daftar berita terbaru di sidebar
  // ──────────────────────────────────────────────────────────
  test("daftar berita terbaru \"Latest at LEXA\" harus ditampilkan", async ({
    page,
  }) => {
    const blogSection = page.locator("#blog");
    await blogSection.scrollIntoViewIfNeeded();

    // Memastikan sub-heading "Latest at LEXA" pada sidebar berita terlihat
    const latestHeading = blogSection.getByRole("heading", {
      name: /Latest at LEXA/i,
    });
    await expect(latestHeading).toBeVisible();

    // Memastikan artikel kedua, ketiga, dan keempat tampil sebagai item sidebar
    const secondPost = blogSection.getByText(
      /Cross-Platform Mobile Development with Flutter/i
    );
    await expect(secondPost).toBeVisible();

    const thirdPost = blogSection.getByText(
      /REST API Best Practices with Laravel/i
    );
    await expect(thirdPost).toBeVisible();

    const fourthPost = blogSection.getByText(
      /Deploying Applications to AWS in 2025/i
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

    // Pastikan judul artikel utama awal (artikel pertama) terlihat
    const initialFeaturedTitle = blogSection.getByRole("heading", {
      name: /Building Scalable Web Apps with Next\.js/i,
    });
    await expect(initialFeaturedTitle).toBeVisible({ timeout: 10000 });

    // Klik tombol/item sidebar yang berisi judul artikel kedua
    const secondPostButton = blogSection.getByRole("button", {
      name: /Cross-Platform Mobile Development with Flutter/i,
    });
    await expect(secondPostButton).toBeVisible();
    await secondPostButton.click();

    // Setelah diklik, artikel utama harus berganti menampilkan judul artikel kedua
    const newFeaturedTitle = blogSection.getByRole("heading", {
      name: /Cross-Platform Mobile Development with Flutter/i,
      level: 3,
    });
    await expect(newFeaturedTitle).toBeVisible({ timeout: 5000 });
  });
});
