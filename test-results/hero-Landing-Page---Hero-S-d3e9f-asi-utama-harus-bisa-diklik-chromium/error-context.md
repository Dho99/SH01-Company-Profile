# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hero.spec.ts >> Landing Page - Hero Section >> tombol navigasi utama harus bisa diklik
- Location: tests/hero.spec.ts:69:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/", waiting until "networkidle"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | import type { Page } from "@playwright/test";
  4  | 
  5  | const MOCK_SITE_SETTING = {
  6  |   id: "singleton",
  7  |   name: "LEXA Software House",
  8  |   tagline: "Building digital solutions for a better future.",
  9  |   email: "info@lexatech.id",
  10 |   phone: "+62 853 2013 2014",
  11 |   location: "Tasikmalaya - Indonesia",
  12 |   linkedin: "#",
  13 |   instagram: "#",
  14 |   facebook: "#",
  15 |   youtube: "#",
  16 |   heroEyebrow: "Leading, Excellence & Automation",
  17 |   heroHeading: "Building Digital Solutions For ",
  18 |   heroHighlight: "A Better Future",
  19 |   heroDescription:
  20 |     "LEXA Software House delivers innovative, reliable, and scalable software solutions that empower businesses and create meaningful impact.",
  21 |   heroPrimaryLabel: "Our Services",
  22 |   heroPrimaryHref: "#services",
  23 |   heroSecondaryLabel: "View Our Portfolio",
  24 |   heroSecondaryHref: "#portfolio",
  25 | };
  26 | 
  27 | const MOCK_SECTION_HEADINGS = [
  28 |   { key: "services", eyebrow: "Our Services", title: "Solutions We Provide" },
  29 |   { key: "portfolio", eyebrow: "Our Portfolio", title: "Featured Projects" },
  30 |   { key: "technologies", eyebrow: "Technologies We Use", title: "Built On a Modern Stack" },
  31 |   { key: "whyChoose", eyebrow: "Why Choose", title: "LEXA?" },
  32 |   { key: "testimonials", eyebrow: "What Clients Say", title: "Trusted By Great Companies" },
  33 | ];
  34 | 
  35 | test.describe("Landing Page - Hero Section", () => {
  36 |   test.beforeEach(async ({ page }) => {
  37 |     // Mock API responses so components render immediately without a database
  38 |     await page.route(/\/api\/cms\/site-setting/, async (route) => {
  39 |       await route.fulfill({ contentType: "application/json", body: JSON.stringify(MOCK_SITE_SETTING) });
  40 |     });
  41 |     await page.route(/\/api\/cms\/section-headings/, async (route) => {
  42 |       await route.fulfill({ contentType: "application/json", body: JSON.stringify(MOCK_SECTION_HEADINGS) });
  43 |     });
  44 |     await page.route(/\/api\/cms\/services/, async (route) => {
  45 |       await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
  46 |     });
  47 |     await page.route(/\/api\/cms\/reasons/, async (route) => {
  48 |       await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
  49 |     });
  50 |     await page.route(/\/api\/cms\/technologies/, async (route) => {
  51 |       await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
  52 |     });
  53 |     await page.route(/\/api\/cms\/stat($|\/)/, async (route) => {
  54 |       await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
  55 |     });
  56 |     await page.route(/\/api\/cms\/about-points/, async (route) => {
  57 |       await route.fulfill({ contentType: "application/json", body: JSON.stringify([]) });
  58 |     });
  59 | 
> 60 |     await page.goto("/", { waitUntil: "networkidle" });
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  61 |   });
  62 | 
  63 |   test("judul hero terlihat", async ({ page }) => {
  64 |     await expect(
  65 |       page.getByRole("heading", { level: 1 }),
  66 |     ).toBeVisible();
  67 |   });
  68 | 
  69 |   test("tombol navigasi utama harus bisa diklik", async ({ page }) => {
  70 |     const primaryButton = page.getByRole("link", {
  71 |       name: /our services/i,
  72 |     });
  73 |     await expect(primaryButton).toBeVisible();
  74 |     await expect(primaryButton).toBeEnabled();
  75 | 
  76 |     await primaryButton.click();
  77 | 
  78 |     await expect(page).toHaveURL(/#services/);
  79 |     await expect(page.locator("#services")).toBeVisible();
  80 |   });
  81 | 
  82 |   test("tombol sekunder harus bisa diklik", async ({ page }) => {
  83 |     const secondaryButton = page.getByRole("link", {
  84 |       name: /view our portfolio/i,
  85 |     });
  86 |     await expect(secondaryButton).toBeVisible();
  87 |     await expect(secondaryButton).toBeEnabled();
  88 | 
  89 |     await secondaryButton.click();
  90 | 
  91 |     await expect(page).toHaveURL(/#portfolio/);
  92 |     await expect(page.locator("#portfolio")).toBeVisible();
  93 |   });
  94 | });
  95 | 
```