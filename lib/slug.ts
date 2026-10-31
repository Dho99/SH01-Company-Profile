export function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "item";
}

export function uniqueSlug(base: string, existing: Set<string>): string {
    let slug = slugify(base);
    if (!existing.has(slug)) return slug;
    let i = 2;
    while (existing.has(`${slug}-${i}`)) i++;
    return `${slug}-${i}`;
}
