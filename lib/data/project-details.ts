export type ProjectDetail = {
    challenge: string;
    solution: string;
    highlights: string[];
    stack: string[];
    outcome: string;
};

const details: Record<string, ProjectDetail> = {
    "company-profile-website": {
        challenge: "Need a fast, credible corporate presence that builds trust with enterprise clients.",
        solution: "Headless Next.js site with CMS, optimized images, and SEO foundations — deployed on edge.",
        highlights: ["SSR + ISR", "CMS for news & portfolio", "Lighthouse 95+"],
        stack: ["Next.js", "Tailwind", "Prisma", "Vercel"],
        outcome: "Higher inquiry rate and consistent brand across channels.",
    },
    "e-commerce-mobile-app": {
        challenge: "Shopping experience must be fast, personal, and reliable on low-end devices.",
        solution: "Flutter app with catalog, cart, checkout, and push — backed by scalable API.",
        highlights: ["Offline catalog", "Push campaigns", "Secure checkout"],
        stack: ["Flutter", "Node.js", "MySQL"],
        outcome: "Smoother checkout and repeat purchase growth.",
    },
    "inventory-management-system": {
        challenge: "Stock inaccuracies and manual spreadsheets slowed operations.",
        solution: "Inventory system with barcode, stock mutations, and reports — role-based and auditable.",
        highlights: ["Barcode scan", "Stock opname", "Low-stock alerts"],
        stack: ["Laravel", "MySQL", "Docker"],
        outcome: "Faster stock takes and fewer stockouts.",
    },
    "learning-management-system": {
        challenge: "Online learning needed structured courses, progress, and certification.",
        solution: "LMS with courses, video, quizzes, and progress tracking — multi-role (admin, teacher, student).",
        highlights: ["Course builder", "Quizzes & certs", "Progress dashboard"],
        stack: ["Next.js", "Laravel", "MySQL"],
        outcome: "Scalable delivery for cohorts without extra ops overhead.",
    },
};

const fallback: ProjectDetail = {
    challenge: "A custom need that required a tailored digital solution.",
    solution: "We scoped, built, and shipped an integrated solution with measurable outcomes.",
    highlights: ["Discovery & UX", "Iterative delivery", "Handover & SLA"],
    stack: ["Next.js", "Laravel", "MySQL"],
    outcome: "Launched on time with ongoing support and iteration.",
};

function keyOf(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getProjectDetail(slug: string, title?: string): ProjectDetail {
    if (details[slug]) return details[slug];
    const base = slug.replace(/-[a-z0-9]{4,8}$/, "");
    if (details[base]) return details[base];
    if (title) {
        const k = keyOf(title);
        if (details[k]) return details[k];
    }
    return fallback;
}
