import { test, expect } from "@playwright/test";

// ============================================================
// E2E Test: Technologies Section (@/components/sections/technologies.tsx)
//
// Menguji visibilitas dan konten section "Technologies" di halaman
// utama, termasuk:
//   - Heading & eyebrow label
//   - List ikon/nama teknologi yang ditampilkan
//   - Layout grid container
//   - Tombol CTA "View All Technologies"
//
// Strategi:
//   - Semua locator diisolasi dalam container #technologies.
//   - API /api/cms/technologies di-mock dengan 12 item standar LEXA.
//   - Scroll ke section sebelum assert agar elemen masuk viewport.
// ============================================================

// ── Data mock 12 teknologi standar LEXA ─────────────────────
const MOCK_TECHNOLOGIES = [
  { id: "1",  icon: "laravel", label: "Laravel",  color: "#FF2D20", sortOrder: 1,  published: true },
  { id: "2",  icon: "react",   label: "React",    color: "#61DAFB", sortOrder: 2,  published: true },
  { id: "3",  icon: "nextjs",  label: "Next.js",  color: "#000000", sortOrder: 3,  published: true },
  { id: "4",  icon: "vue",     label: "Vue.js",   color: "#42B883", sortOrder: 4,  published: true },
  { id: "5",  icon: "flutter", label: "Flutter",  color: "#54C5F8", sortOrder: 5,  published: true },
  { id: "6",  icon: "node",    label: "Node.js",  color: "#339933", sortOrder: 6,  published: true },
  { id: "7",  icon: "php",     label: "PHP",      color: "#8892BF", sortOrder: 7,  published: true },
  { id: "8",  icon: "python",  label: "Python",   color: "#3776AB", sortOrder: 8,  published: true },
  { id: "9",  icon: "mysql",   label: "MySQL",    color: "#4479A1", sortOrder: 9,  published: true },
  { id: "10", icon: "aws",     label: "AWS",      color: "#FF9900", sortOrder: 10, published: true },
  { id: "11", icon: "docker",  label: "Docker",   color: "#0db7ed", sortOrder: 11, published: true },
  { id: "12", icon: "git",     label: "Git",      color: "#F05032", sortOrder: 12, published: true },
];

// ── Data mock section heading untuk technologies ─────────────
const MOCK_SECTION_HEADINGS = [
  { key: "technologies", eyebrow: "Technologies We Use", title: "Built On a Modern Stack" },
];

test.describe("Technologies Section", () => {
  test.beforeEach(async ({ page }) => {
    // Mock API technologies dengan 12 item standar LEXA
    

    // Mock API section-headings untuk heading "Built On a Modern Stack"
    

    // Mock API lainnya dengan array/object kosong agar tidak blocking render
    
    
    
    
    

    // Navigasi ke halaman utama
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Tunggu container #technologies terpasang di DOM sebelum test berjalan
    await page
      .locator("#technologies")
      .waitFor({ state: "attached", timeout: 15000 });
  });

  // ──────────────────────────────────────────────────────────
  // 1. Validasi heading & eyebrow label section Technologies
  // ──────────────────────────────────────────────────────────
  test("section technologies harus terlihat dengan heading yang benar", async ({
    page,
  }) => {
    // Isolasi semua locator di dalam container section #technologies
    const techSection = page.locator("#technologies");

    // Scroll agar section masuk viewport sebelum dilakukan assertion
    await techSection.scrollIntoViewIfNeeded();

    // Memastikan section technologies itu sendiri terlihat di layar
    await expect(techSection).toBeVisible();

    // Memastikan eyebrow label "Technologies We Use" tampil sesuai mock data
    const eyebrow = techSection.getByText("Technologies We Use", { exact: true });
    await expect(eyebrow).toBeVisible();

    // Memastikan heading utama "Built On a Modern Stack" terlihat di halaman
    const heading = techSection.getByRole("heading", {
      name: /Built On a Modern Stack/i,
    });
    await expect(heading).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 2. Validasi daftar label nama teknologi yang ditampilkan
  // ──────────────────────────────────────────────────────────
  test("harus menampilkan label nama teknologi sesuai data mock", async ({
    page,
  }) => {
    const techSection = page.locator("#technologies");
    await techSection.scrollIntoViewIfNeeded();

    // Daftar label teknologi yang wajib tampil berdasarkan data mock
    const expectedLabels = [
      "Laravel",
      "React",
      "Next.js",
      "Vue.js",
      "Flutter",
      "Node.js",
      "PHP",
      "Python",
      "MySQL",
      "AWS",
      "Docker",
      "Git",
    ];

    // Memverifikasi setiap label teknologi terlihat di dalam section #technologies
    for (const label of expectedLabels) {
      const techLabel = techSection.getByText(label, { exact: true });
      // Setiap label harus terlihat di layar
      await expect(techLabel).toBeVisible({ timeout: 10000 });
    }
  });

  // ──────────────────────────────────────────────────────────
  // 3. Validasi jumlah item teknologi dalam grid
  // ──────────────────────────────────────────────────────────
  test("grid harus merender tepat 12 item teknologi", async ({ page }) => {
    const techSection = page.locator("#technologies");
    await techSection.scrollIntoViewIfNeeded();

    // Mencari semua elemen <li> yang merupakan item teknologi dalam grid <ul>
    const techItems = techSection.locator("ul > li");

    // Memastikan jumlah item yang dirender sesuai dengan jumlah data mock (12 item)
    await expect(techItems).toHaveCount(12);
  });

  // ──────────────────────────────────────────────────────────
  // 4. Validasi grid layout container teknologi
  // ──────────────────────────────────────────────────────────
  test("grid layout harus memiliki kelas responsif yang benar", async ({
    page,
  }) => {
    const techSection = page.locator("#technologies");
    await techSection.scrollIntoViewIfNeeded();

    // Mencari elemen <ul> yang merupakan grid container teknologi
    const gridContainer = techSection.locator("ul");

    // Memastikan grid memiliki kelas lg:grid-cols-6 untuk tampilan desktop 6 kolom
    await expect(gridContainer).toHaveClass(/lg:grid-cols-6/);

    // Memastikan grid memiliki kelas grid-cols-3 untuk tampilan mobile 3 kolom
    await expect(gridContainer).toHaveClass(/grid-cols-3/);
  });

  // ──────────────────────────────────────────────────────────
  // 5. Validasi tombol CTA "View All Technologies"
  // ──────────────────────────────────────────────────────────
  test('tombol CTA "View All Technologies" harus tersedia dan mengarah ke #contact', async ({
    page,
  }) => {
    const techSection = page.locator("#technologies");
    await techSection.scrollIntoViewIfNeeded();

    // Mencari link CTA di dalam section technologies menggunakan semantic locator
    const ctaLink = techSection.getByRole("link", {
      name: /View All Technologies/i,
    });

    // Memastikan link CTA terlihat di layar
    await expect(ctaLink).toBeVisible();

    // Memastikan link CTA berstatus enabled (dapat diklik)
    await expect(ctaLink).toBeEnabled();

    // Memastikan atribut href link CTA mengandung fragment #contact (sesuai komponen)
    await expect(ctaLink).toHaveAttribute("href", "/#contact");
  });
});
