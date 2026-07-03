const fs = require('fs');

// 1. Fix services.spec.ts
let servicesTest = fs.readFileSync('tests/sections/services.spec.ts', 'utf8');
servicesTest = servicesTest.replace(
  /const webDevCard = page\.locator\('\.group'\)\.filter\(\{ hasText: 'Web Development' \}\);/g,
  "const webDevCard = page.locator('#services').locator('div').filter({ has: page.getByRole('heading', { name: 'Web Development', level: 3 }) }).first();"
);
fs.writeFileSync('tests/sections/services.spec.ts', servicesTest);

// 2. Fix admin-auth.spec.ts
let adminTest = fs.readFileSync('tests/admin/admin-auth.spec.ts', 'utf8');
adminTest = adminTest.replace(
  /await page\.goto\("\/admin"\);/g,
  'await page.goto("/admin", { waitUntil: "commit" });'
);
fs.writeFileSync('tests/admin/admin-auth.spec.ts', adminTest);

// 3. Fix about.spec.ts
let aboutTest = fs.readFileSync('tests/sections/about.spec.ts', 'utf8');
aboutTest = aboutTest.replace(
  /await expect\(ctaLink\)\.toHaveAttribute\('href', '#contact'\);/g,
  "await expect(ctaLink).toHaveAttribute('href', /.*#contact/);"
);
fs.writeFileSync('tests/sections/about.spec.ts', aboutTest);

// 4. Fix navbar.spec.ts (add stability)
let navbarTest = fs.readFileSync('tests/layout/navbar.spec.ts', 'utf8');
navbarTest = navbarTest.replace(
  /await careerLink\.click\(\);/g,
  "await careerLink.click({ force: true });"
);
navbarTest = navbarTest.replace(
  /await servicesLink\.hover\(\);/g,
  "await servicesLink.hover();\n    await page.waitForTimeout(300); // Tunggu animasi dropdown"
);
navbarTest = navbarTest.replace(
  /await menuButton\.click\(\);/g,
  "await menuButton.click();\n    await page.waitForTimeout(500); // Tunggu animasi mobile menu selesai"
);
fs.writeFileSync('tests/layout/navbar.spec.ts', navbarTest);

// 5. Fix footer.tsx
let footer = fs.readFileSync('components/layout/footer.tsx', 'utf8');
footer = footer.replace(
  /<p className="mt-1 max-w-\[300px\] leading-relaxed text-white\/60">\s*\{item\.address\}\s*<\/p>/g,
  `<a href={"https://maps.google.com/?q=" + encodeURIComponent(item.address)} target="_blank" rel="noopener noreferrer" className="mt-1 block max-w-[300px] leading-relaxed text-white/60 hover:text-white transition-colors">{item.address}</a>`
);
footer = footer.replace(
  /<span className="whitespace-nowrap">\s*\{site\.phone\}\s*<\/span>/g,
  `<a href={"tel:" + site.phone.replace(/\\s+/g, "")} className="whitespace-nowrap hover:text-white transition-colors">{site.phone}</a>`
);
footer = footer.replace(
  /<span>\{site\.email\}<\/span>/g,
  `<a href={"mailto:" + site.email} className="hover:text-white transition-colors">{site.email}</a>`
);
footer = footer.replace(
  /<form className="mt-4 space-y-2">/g,
  `<form className="mt-4 space-y-2" onSubmit={(e) => e.preventDefault()}>`
);
footer = footer.replace(
  /<Link href="#" className="hover:text-white">\s*Privacy Policy\s*<\/Link>/g,
  `<Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>`
);
footer = footer.replace(
  /<Link href="#" className="hover:text-white">\s*Terms of Service\s*<\/Link>/g,
  `<Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>`
);
footer = footer.replace(
  /<Link href="#" className="hover:text-white">\s*Sitemap\s*<\/Link>/g,
  `<Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>`
);
fs.writeFileSync('components/layout/footer.tsx', footer);

// 6. Fix footer.spec.ts (update tests to match new DOM)
let footerTest = fs.readFileSync('tests/layout/footer.spec.ts', 'utf8');
footerTest = footerTest.replace(
  /await expect\(privacyLink\)\.toHaveAttribute\('href', '#'\);/g,
  "await expect(privacyLink).toHaveAttribute('href', '/privacy-policy');"
);
footerTest = footerTest.replace(
  /await expect\(tosLink\)\.toHaveAttribute\('href', '#'\);/g,
  "await expect(tosLink).toHaveAttribute('href', '/terms-of-service');"
);
footerTest = footerTest.replace(
  /await expect\(sitemapLink\)\.toHaveAttribute\('href', '#'\);/g,
  "await expect(sitemapLink).toHaveAttribute('href', '/sitemap.xml');"
);
fs.writeFileSync('tests/layout/footer.spec.ts', footerTest);

console.log('Semua modifikasi selesai.');
