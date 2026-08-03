import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");

const targets = [
    { file: "Hero.png", out: "Hero.webp", width: 1920, quality: 80 },
    { file: "About.png", out: "About.webp", width: 900, quality: 80 },
    { file: "Company.png", out: "Company.webp", width: 900, quality: 80 },
    { file: "E-Commerce.png", out: "E-Commerce.webp", width: 900, quality: 80 },
    { file: "Inventory.png", out: "Inventory.webp", width: 900, quality: 80 },
    { file: "Learning.png", out: "Learning.webp", width: 900, quality: 80 },
    { file: "logo.png", out: "logo.webp", width: 500, quality: 85 },
    { file: "footerLEXA.png", out: "footerLEXA.webp", width: 560, quality: 85 },
];

for (const target of targets) {
    const src = join(PUBLIC, target.file);
    if (!existsSync(src)) {
        console.log(`skip (missing): ${target.file}`);
        continue;
    }

    const before = (await sharp(src).metadata()).size ?? 0;

    await sharp(src)
        .resize({ width: target.width, withoutEnlargement: true })
        .webp({ quality: target.quality })
        .toFile(join(PUBLIC, target.out));

    const after = (await sharp(join(PUBLIC, target.out)).metadata()).size ?? 0;
    const saved = (((before - after) / before) * 100).toFixed(1);
    console.log(
        `${target.file} -> ${target.out}  ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB  (-${saved}%)`,
    );
}

console.log("done");
