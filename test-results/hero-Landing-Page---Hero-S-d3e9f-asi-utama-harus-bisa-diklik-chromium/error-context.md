# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hero.spec.ts >> Landing Page - Hero Section >> tombol navigasi utama harus bisa diklik
- Location: tests\hero.spec.ts:69:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [active]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - navigation [ref=e7]:
            - button "previous" [disabled] [ref=e8]:
              - img "previous" [ref=e9]
            - generic [ref=e11]:
              - generic [ref=e12]: 1/
              - text: "1"
            - button "next" [disabled] [ref=e13]:
              - img "next" [ref=e14]
          - img
        - generic [ref=e16]:
          - link "Next.js 16.2.9 (stale) Turbopack" [ref=e17] [cursor=pointer]:
            - /url: https://nextjs.org/docs/messages/version-staleness
            - img [ref=e18]
            - generic "There is a newer version (16.2.10) available, upgrade recommended!" [ref=e20]: Next.js 16.2.9 (stale)
            - generic [ref=e21]: Turbopack
          - img
      - generic [ref=e22]:
        - dialog "Runtime Error" [ref=e23]:
          - generic [ref=e26]:
            - generic [ref=e27]:
              - generic [ref=e28]:
                - generic [ref=e30]: Runtime Error
                - generic [ref=e31]:
                  - button "Copy Error Info" [ref=e32] [cursor=pointer]:
                    - img [ref=e33]
                  - button "No related documentation found" [disabled] [ref=e35]:
                    - img [ref=e36]
                  - button "Attach Node.js inspector" [ref=e38] [cursor=pointer]:
                    - img [ref=e39]
              - generic [ref=e48]: "Failed prop type: The prop `href` expects a `string` or `object` in `<Link>`, but got `undefined` instead. Open your browser's console to view the Component stack trace."
            - generic [ref=e49]:
              - generic [ref=e50]:
                - paragraph [ref=e52]:
                  - img [ref=e54]
                  - generic [ref=e57]: components/sections/about.tsx (112:29) @ About
                  - button "Open in editor" [ref=e58] [cursor=pointer]:
                    - img [ref=e60]
                - generic [ref=e63]:
                  - generic [ref=e64]: 110 | >
                  - generic [ref=e65]: 111 | <Button asChild className="mt-8 rounded-lg">
                  - generic [ref=e66]: "> 112 | <Link href={site.aboutCtaHref}>"
                  - generic [ref=e67]: "| ^"
                  - generic [ref=e68]: "113 | {site.aboutCtaLabel}{\" \"}"
                  - generic [ref=e69]: 114 | <ArrowRight className="size-4" />
                  - generic [ref=e70]: 115 | </Link>
              - generic [ref=e71]:
                - generic [ref=e72]:
                  - paragraph [ref=e73]:
                    - text: Call Stack
                    - generic [ref=e74]: "19"
                  - button "Show 15 ignore-listed frame(s)" [ref=e75] [cursor=pointer]:
                    - text: Show 15 ignore-listed frame(s)
                    - img [ref=e76]
                - generic [ref=e78]:
                  - generic [ref=e79]:
                    - text: About
                    - button "Open About in editor" [ref=e80] [cursor=pointer]:
                      - img [ref=e81]
                  - text: components/sections/about.tsx (112:29)
                - generic [ref=e83]:
                  - generic [ref=e84]:
                    - text: Button
                    - button "Open Button in editor" [ref=e85] [cursor=pointer]:
                      - img [ref=e86]
                  - text: components/ui/button.tsx (50:5)
                - generic [ref=e88]:
                  - generic [ref=e89]:
                    - text: About
                    - button "Open About in editor" [ref=e90] [cursor=pointer]:
                      - img [ref=e91]
                  - text: components/sections/about.tsx (111:25)
                - generic [ref=e93]:
                  - generic [ref=e94]:
                    - text: Home
                    - button "Open Home in editor" [ref=e95] [cursor=pointer]:
                      - img [ref=e96]
                  - text: app\page.tsx (21:9)
          - generic [ref=e98]: "1"
          - generic [ref=e99]: "2"
        - contentinfo [ref=e100]:
          - region "Error feedback" [ref=e101]:
            - paragraph [ref=e102]:
              - link "Was this helpful?" [ref=e103] [cursor=pointer]:
                - /url: https://nextjs.org/telemetry#error-feedback
            - button "Mark as helpful" [ref=e104] [cursor=pointer]:
              - img [ref=e105]
            - button "Mark as not helpful" [ref=e108] [cursor=pointer]:
              - img [ref=e109]
    - generic [ref=e115] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e116]:
        - img [ref=e117]
      - generic [ref=e120]:
        - button "Open issues overlay" [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]: "0"
            - generic [ref=e124]: "1"
          - generic [ref=e125]: Issue
        - button "Collapse issues badge" [ref=e126]:
          - img [ref=e127]
  - generic [ref=e130]:
    - img [ref=e131]
    - heading "This page couldn’t load" [level=1] [ref=e133]
    - paragraph [ref=e134]: Reload to try again, or go back.
    - generic [ref=e135]:
      - button "Reload" [ref=e137] [cursor=pointer]
      - button "Back" [ref=e138] [cursor=pointer]
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
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
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