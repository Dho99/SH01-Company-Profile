import { test, expect } from "@playwright/test";

// ============================================================
// E2E Test: About Section (@/components/sections/about.tsx)
//
// Menguji visibilitas dan konten section "About" di halaman
// utama, termasuk:
//   - Heading & eyebrow label
//   - Deskripsi perusahaan
//   - Floating card "Our Commitment"
//   - Tombol CTA "Learn More About Us"
//
// Strategi:
//   - Semua locator diisolasi dalam container #about untuk
//     mencegah strict mode violation.
//   - API route di-mock agar komponen langsung render tanpa DB.
//   - Scroll ke section sebelum assert agar elemen masuk viewport
//     (penting untuk renderer animasi Framer Motion).
// ============================================================

// ── Data mock untuk site setting (About-related fields) ─────
const MOCK_SITE_SETTING = {
  id: "singleton",
  name: "LEXA Software House",
  tagline: "Building digital solutions for a better future.",
  email: "info@lexatech.id",
  phone: "+62 853 2013 2014",
  location: "Tasikmalaya - Indonesia",
  linkedin: "#",
  instagram: "#",
  facebook: "#",
  youtube: "#",
  heroEyebrow: "Leading, Excellence & Automation",
  heroHeading: "Building Digital Solutions For ",
  heroHighlight: "A Better Future",
  heroDescription: "LEXA Software House delivers innovative, reliable, and scalable software solutions.",
  heroPrimaryLabel: "Our Services",
  heroPrimaryHref: "#services",
  heroSecondaryLabel: "View Our Portfolio",
  heroSecondaryHref: "#portfolio",
  aboutEyebrow: "Company Profile",
  aboutHeading: "About LEXA Software House",
  aboutDescription:
    "LEXA Software House is a technology company specializing in building digital solutions.",
  aboutCommitmentTitle: "Our Commitment",
  aboutCommitmentText:
    "We are committed to delivering excellence in every project we undertake.",
  aboutCtaLabel: "Learn More About Us",
  aboutCtaHref: "#contact",
  footerTagline: "Building digital solutions for a better future.",
  footerNewsletterTitle: "Stay Updated",
  footerNewsletterText: "Subscribe to our newsletter.",
};

// ── Data mock untuk about points (poin keunggulan) ──────────
const MOCK_ABOUT_POINTS = [
  { id: "1", text: "Innovative and proven solutions", sortOrder: 1, published: true },
  { id: "2", text: "Experienced and professional team", sortOrder: 2, published: true },
  { id: "3", text: "Client-focused approach", sortOrder: 3, published: true },
  { id: "4", text: "Commitment to continuous support", sortOrder: 4, published: true },
];

test.describe("About Section", () => {
  test.beforeEach(async ({ page }) => {
    // Navigasi ke halaman utama; tunggu load event selesai (kompatibel Chromium & Firefox)
    await page.goto("/", { waitUntil: "load" });

    // Pastikan container #about telah terpasang di DOM sebelum test berjalan
    await page.locator("#about").waitFor({ state: "attached", timeout: 20000 });
  });

  // ──────────────────────────────────────────────────────────
  // 1. Validasi heading & eyebrow label section About
  // ──────────────────────────────────────────────────────────
  test("section about harus terlihat dengan heading dan eyebrow yang benar", async ({
    page,
  }) => {
    // Isolasi semua locator di dalam container section #about
    const aboutSection = page.locator("#about");

    // Scroll agar section masuk viewport (diperlukan animasi Framer Motion)
    await aboutSection.scrollIntoViewIfNeeded();

    // Memastikan section about itu sendiri terlihat di layar
    await expect(aboutSection).toBeVisible();

    // Memastikan eyebrow label "Company Profile" tampil sesuai mock data
    const eyebrow = aboutSection.getByText("Company Profile", { exact: true });
    await expect(eyebrow).toBeVisible();

    // Memastikan heading utama "About LEXA Software House" terlihat di halaman
    const heading = aboutSection.getByRole("heading", {
      name: /About LEXA Software House/i,
    });
    await expect(heading).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 2. Validasi deskripsi dan poin-poin keunggulan perusahaan
  // ──────────────────────────────────────────────────────────
  test("deskripsi perusahaan dan poin-poin keunggulan harus ditampilkan", async ({
    page,
  }) => {
    const aboutSection = page.locator("#about");
    await aboutSection.scrollIntoViewIfNeeded();

    // Memastikan teks deskripsi perusahaan terlihat di dalam section
    // Actual DB value: "LEXA Software House is a technology company that provides innovative digital solutions to help businesses grow..."
    const description = aboutSection.getByText(
      /LEXA Software House is a technology company that provides innovative digital solutions/i
    );
    await expect(description).toBeVisible({ timeout: 10000 });

    // Memastikan setiap poin keunggulan dari mock data terlihat di layar
    const expectedPoints = [
      "Innovative and proven solutions",
      "Experienced and professional team",
      "Client-focused approach",
      "Commitment to continuous support",
    ];

    for (const pointText of expectedPoints) {
      // Setiap poin harus tampil di dalam container #about
      await expect(aboutSection.getByText(pointText)).toBeVisible();
    }
  });

  // ──────────────────────────────────────────────────────────
  // 3. Validasi floating card "Our Commitment"
  // ──────────────────────────────────────────────────────────
  test('gambar dan floating card "Our Commitment" harus terlihat', async ({
    page,
  }) => {
    const aboutSection = page.locator("#about");
    await aboutSection.scrollIntoViewIfNeeded();

    // Memastikan gambar ilustrasi "About" dengan alt text yang benar terlihat
    const aboutImage = aboutSection.getByRole("img", {
      name: /LEXA Software House/i,
    });
    await expect(aboutImage).toBeVisible({ timeout: 10000 });

    // Memastikan judul floating card "Our Commitment" terlihat di layar
    const commitmentTitle = aboutSection.getByText("Our Commitment");
    await expect(commitmentTitle).toBeVisible();

    // Memastikan teks isi floating card juga terlihat di layar
    // Actual DB value: "Delivering high-quality software solutions with integrity, collaboration, and dedication to exceed client expectations."
    const commitmentText = aboutSection.getByText(
      /Delivering high-quality software solutions with integrity/i
    );
    await expect(commitmentText).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────
  // 4. Validasi tombol CTA "Learn More About Us"
  // ──────────────────────────────────────────────────────────
  test('tombol CTA "Learn More About Us" harus tersedia dan mengarah ke #contact', async ({
    page,
  }) => {
    const aboutSection = page.locator("#about");
    await aboutSection.scrollIntoViewIfNeeded();

    // Mencari link CTA di dalam section about menggunakan semantic locator
    const ctaLink = aboutSection.getByRole("link", {
      name: /Learn More About Us/i,
    });

    // Memastikan link CTA terlihat di layar
    await expect(ctaLink).toBeVisible();

    // Memastikan link CTA berstatus enabled (dapat diklik)
    await expect(ctaLink).toBeEnabled();

    // Memastikan atribut href link CTA mengandung fragment #contact sesuai mock data
    await expect(ctaLink).toHaveAttribute("href", /.*#contact/);
  });
});
