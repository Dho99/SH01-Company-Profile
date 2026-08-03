import { test, expect } from "@playwright/test";

import type { Page } from "@playwright/test";

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
  heroDescription:
    "LEXA Software House delivers innovative, reliable, and scalable software solutions that empower businesses and create meaningful impact.",
  heroPrimaryLabel: "Our Services",
  heroPrimaryHref: "#services",
  heroSecondaryLabel: "View Our Portfolio",
  heroSecondaryHref: "#portfolio",
};

const MOCK_SECTION_HEADINGS = [
  { key: "services", eyebrow: "Our Services", title: "Solutions We Provide" },
  { key: "portfolio", eyebrow: "Our Portfolio", title: "Featured Projects" },
  { key: "technologies", eyebrow: "Technologies We Use", title: "Built On a Modern Stack" },
  { key: "whyChoose", eyebrow: "Why Choose", title: "LEXA?" },
  { key: "testimonials", eyebrow: "What Clients Say", title: "Trusted By Great Companies" },
];

test.describe("Landing Page - Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses so components render immediately without a database
    await page.route(/\/api\/cms\/site-setting/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: JSON.stringify(MOCK_SITE_SETTING) });
    });
    await page.route(/\/api\/cms\/section-headings/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: JSON.stringify(MOCK_SECTION_HEADINGS) });
    });
    await page.route(/\/api\/cms\/services/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
    });
    await page.route(/\/api\/cms\/reasons/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
    });
    await page.route(/\/api\/cms\/technologies/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
    });
    await page.route(/\/api\/cms\/stat($|\/)/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
    });
    await page.route(/\/api\/cms\/about-points/, async (route) => {
      await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
    });

    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("judul hero terlihat", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toBeVisible();
  });

  test("tombol navigasi utama harus bisa diklik", async ({ page }) => {
    const primaryButton = page.getByRole("link", {
      name: /our services/i,
    });
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toBeEnabled();

    await primaryButton.click();

    await expect(page).toHaveURL(/#services/);
    await expect(page.locator("#services")).toBeVisible();
  });

  test("tombol sekunder harus bisa diklik", async ({ page }) => {
    const secondaryButton = page.getByRole("link", {
      name: /view our portfolio/i,
    });
    await expect(secondaryButton).toBeVisible();
    await expect(secondaryButton).toBeEnabled();

    await secondaryButton.click();

    await expect(page).toHaveURL(/#portfolio/);
    await expect(page.locator("#portfolio")).toBeVisible();
  });
});
