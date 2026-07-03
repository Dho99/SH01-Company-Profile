const fs = require('fs');

// Fix about.spec.ts alt text
let aboutTest = fs.readFileSync('tests/sections/about.spec.ts', 'utf8');
aboutTest = aboutTest.replace(
  /name: \/LEXA Software House office\/i/g,
  'name: /LEXA Software House/i'
);
fs.writeFileSync('tests/sections/about.spec.ts', aboutTest);

// Fix services.spec.ts selector
let servicesTest = fs.readFileSync('tests/sections/services.spec.ts', 'utf8');
servicesTest = servicesTest.replace(
  /const webDevCard = page\.locator\('#services'\)\.locator\('div'\)\.filter\(\{ has: page\.getByRole\('heading', \{ name: 'Web Development', level: 3 \}\) \}\)\.first\(\);/g,
  "const webDevCard = page.locator('#services .group').filter({ hasText: 'Web Development' });"
);
fs.writeFileSync('tests/sections/services.spec.ts', servicesTest);
console.log('Fix 2 applied.');
