import {
    getSiteSetting,
    getSectionHeadings,
    getStats,
    getAboutPoints,
    getServices,
    getProjects,
    getTechnologies,
    getReasons,
    getTestimonials,
    getNavLinks,
    getBlogPosts,
} from "@/lib/cms/queries";

function htmlToText(html: string): string {
    if (!html) return "";
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<\/(p|div|li|h[1-6]|tr|blockquote|pre)>/gi, "\n")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<li[^>]*>/gi, "- ")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

function headingFor(
    headings: { key: string; eyebrow: string; title: string }[],
    key: string,
): { eyebrow: string; title: string } | undefined {
    return headings.find((h) => h.key === key);
}

function list(items: string[]): string {
    if (items.length === 0) return "_No entries._";
    return items.map((item) => `- ${item}`).join("\n");
}

export async function buildKnowledgeBaseMarkdown(): Promise<string> {
    const [
        site,
        headings,
        stats,
        aboutPoints,
        services,
        projects,
        technologies,
        reasons,
        testimonials,
        navLinks,
        blogPosts,
    ] = await Promise.all([
        getSiteSetting(),
        getSectionHeadings(),
        getStats(),
        getAboutPoints(),
        getServices(),
        getProjects(),
        getTechnologies(),
        getReasons(),
        getTestimonials(),
        getNavLinks(),
        getBlogPosts(),
    ]);

    const lines: string[] = [];

    lines.push("---");
    lines.push(`title: "${site?.name ?? "Company"} — Knowledge Base"`);
    lines.push(`description: "Complete company information for AI assistants"`);
    lines.push(`generatedAt: "${new Date().toISOString()}"`);
    lines.push("---");
    lines.push("");

    lines.push(`# ${site?.name ?? "Company"}`);
    lines.push("");
    lines.push(`> ${site?.tagline ?? ""}`);
    lines.push("");

    lines.push("## Company Contact");
    lines.push("");
    lines.push(`- **Email:** ${site?.email ?? ""}`);
    lines.push(`- **Phone:** ${site?.phone ?? ""}`);
    lines.push(`- **Location:** ${site?.location ?? ""}`);
    if (site?.linkedin) lines.push(`- **LinkedIn:** ${site.linkedin}`);
    if (site?.instagram) lines.push(`- **Instagram:** ${site.instagram}`);
    if (site?.facebook) lines.push(`- **Facebook:** ${site.facebook}`);
    if (site?.youtube) lines.push(`- **YouTube:** ${site.youtube}`);
    lines.push("");

    lines.push("## Navigation");
    lines.push("");
    lines.push(
        list(
            navLinks.map(
                (link) =>
                    `${link.label} — ${link.href}${link.group ? ` (${link.group})` : ""}`,
            ),
        ),
    );
    lines.push("");

    const hero = headingFor(headings, "hero");
    if (site || hero) {
        lines.push("## Hero Section");
        lines.push("");
        lines.push(`- **Eyebrow:** ${site?.heroEyebrow ?? ""}`);
        lines.push(`- **Heading:** ${site?.heroHeading ?? ""}`);
        if (site?.heroHighlight) lines.push(`- **Highlight:** ${site.heroHighlight}`);
        if (site?.heroDescription) lines.push(`- **Description:** ${site.heroDescription}`);
        if (site?.heroPrimaryLabel) lines.push(`- **Primary CTA:** ${site.heroPrimaryLabel} → ${site.heroPrimaryHref}`);
        if (site?.heroSecondaryLabel) lines.push(`- **Secondary CTA:** ${site.heroSecondaryLabel} → ${site.heroSecondaryHref}`);
        if (hero) lines.push(`- **Section title:** ${hero.title}`);
        lines.push("");
    }

    if (site) {
        lines.push("## About Us");
        lines.push("");
        lines.push(`**${site.aboutHeading}**`);
        lines.push("");
        lines.push(site.aboutDescription);
        lines.push("");
        lines.push(`**${site.aboutCommitmentTitle}** — ${site.aboutCommitmentText}`);
        lines.push("");
        lines.push("### About Points");
        lines.push("");
        lines.push(list(aboutPoints.map((point) => point.text)));
        lines.push("");
    }

    if (stats.length > 0) {
        lines.push("## Key Statistics");
        lines.push("");
        lines.push(
            list(stats.map((stat) => `${stat.value} — ${stat.label}`)),
        );
        lines.push("");
    }

    if (services.length > 0) {
        lines.push("## Services");
        lines.push("");
        for (const service of services) {
            lines.push(`### ${service.title}`);
            lines.push("");
            lines.push(htmlToText(service.description));
            lines.push("");
        }
    }

    if (projects.length > 0) {
        lines.push("## Portfolio");
        lines.push("");
        for (const project of projects) {
            lines.push(`### ${project.title}`);
            lines.push("");
            lines.push(`- **Category:** ${project.category}`);
            lines.push(htmlToText(project.description));
            lines.push("");
        }
    }

    if (technologies.length > 0) {
        lines.push("## Technologies");
        lines.push("");
        lines.push(
            list(technologies.map((tech) => `${tech.label}${tech.color ? ` (${tech.color})` : ""}`)),
        );
        lines.push("");
    }

    if (reasons.length > 0) {
        lines.push("## Why Choose Us");
        lines.push("");
        for (const reason of reasons) {
            lines.push(`### ${reason.title}`);
            lines.push("");
            lines.push(htmlToText(reason.description));
            lines.push("");
        }
    }

    if (testimonials.length > 0) {
        lines.push("## Testimonials");
        lines.push("");
        for (const testimonial of testimonials) {
            lines.push(`> "${testimonial.quote}"`);
            lines.push("");
            lines.push(`— **${testimonial.name}**, ${testimonial.role}`);
            lines.push("");
        }
    }

    if (blogPosts.length > 0) {
        lines.push("## Blog Posts");
        lines.push("");
        for (const post of blogPosts) {
            lines.push(`### ${post.title}`);
            lines.push("");
            lines.push(
                `- **Published:** ${post.publishedAt.toISOString().slice(0, 10)}`,
            );
            if (post.badge) lines.push(`- **Badge:** ${post.badge}`);
            if (post.tag) lines.push(`- **Tag:** ${post.tag}`);
            lines.push("");
            lines.push(post.excerpt);
            lines.push("");
            if (post.content) {
                lines.push(htmlToText(post.content));
                lines.push("");
            }
        }
    }

    return lines.join("\n");
}
