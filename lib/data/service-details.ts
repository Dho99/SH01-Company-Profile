export type ServiceDetail = {
    hero: string;
    intro: string;
    features: { title: string; desc: string }[];
    process: { step: string; title: string; desc: string }[];
    tech: string[];
    cta: string;
};

const details: Record<string, ServiceDetail> = {
    "web-development": {
        hero: "Custom websites and web applications that scale with your business.",
        intro: "We build fast, secure, SEO-ready websites with Next.js, Laravel, and modern headless stacks. From company profiles to complex web apps — pixel-perfect and maintainable.",
        features: [
            { title: "SSR & Performance", desc: "Core Web Vitals green, image optimization, edge caching." },
            { title: "CMS Ready", desc: "Admin panel for content, media, and SEO without code." },
            { title: "Secure & Scalable", desc: "Auth, RBAC, rate-limit, and hardened deployment." },
        ],
        process: [
            { step: "01", title: "Discovery", desc: "Scope, sitemap, and UX flow." },
            { step: "02", title: "Build", desc: "Design system, components, API integration." },
            { step: "03", title: "Launch", desc: "QA, SEO, analytics, and handover." },
        ],
        tech: ["Next.js", "React", "Laravel", "Tailwind", "Prisma"],
        cta: "Need a website that converts? Let's map your sitemap this week.",
    },
    "mobile-development": {
        hero: "Native-feel iOS & Android apps from a single codebase.",
        intro: "Flutter and React Native apps with offline support, push, and store-ready CI. We handle design, API, and submission.",
        features: [
            { title: "Cross-Platform", desc: "One codebase, two stores, native plugins." },
            { title: "Offline First", desc: "Local cache, sync, and background tasks." },
            { title: "Store Ready", desc: "Icons, screenshots, and release pipeline." },
        ],
        process: [
            { step: "01", title: "Prototype", desc: "Clickable prototype and API contract." },
            { step: "02", title: "Develop", desc: "Features, analytics, and testing." },
            { step: "03", title: "Release", desc: "Beta, store review, and monitoring." },
        ],
        tech: ["Flutter", "React Native", "Firebase", "Node.js"],
        cta: "Have an app idea? Get a prototype in 2 weeks.",
    },
    "system-development": {
        hero: "Enterprise systems tailored to your operations.",
        intro: "ERP, inventory, and internal tools that replace spreadsheets. Role-based, auditable, and integrated with your existing stack.",
        features: [
            { title: "Workflow Engine", desc: "Approvals, states, and audit logs." },
            { title: "Integrations", desc: "ERP, payment, and third-party APIs." },
            { title: "Reports", desc: "Dashboards, exports, and scheduled reports." },
        ],
        process: [
            { step: "01", title: "Map", desc: "Process mapping and data model." },
            { step: "02", title: "Ship", desc: "Iterative releases with UAT." },
            { step: "03", title: "Scale", desc: "Training, SLA, and extensions." },
        ],
        tech: ["Laravel", "Node.js", "MySQL", "Docker"],
        cta: "Still on spreadsheets? Let's systematize it.",
    },
    "ui-ux-design": {
        hero: "Interfaces that feel effortless and convert.",
        intro: "Research → wireframe → design system → prototype. Accessible, consistent, and developer-ready in Figma.",
        features: [
            { title: "Design System", desc: "Tokens, components, and variants." },
            { title: "Prototyping", desc: "Interactive flows for validation." },
            { title: "Handoff", desc: "Specs, assets, and motion guidelines." },
        ],
        process: [
            { step: "01", title: "Research", desc: "Interviews, audit, and benchmarks." },
            { step: "02", title: "Design", desc: "Wireframes, visuals, and system." },
            { step: "03", title: "Validate", desc: "Usability testing and iteration." },
        ],
        tech: ["Figma", "Framer", "Tailwind"],
        cta: "Want a design your devs love to build? Start with an audit.",
    },
    "it-consulting": {
        hero: "Strategy that turns tech into advantage.",
        intro: "We audit, roadmap, and guide execution — stack choice, cost, hiring, and risk. Vendor-agnostic and outcome-focused.",
        features: [
            { title: "Audit", desc: "Code, infra, and process review." },
            { title: "Roadmap", desc: "Prioritized plan with estimates." },
            { title: "Governance", desc: "Standards, reviews, and mentoring." },
        ],
        process: [
            { step: "01", title: "Assess", desc: "Interviews and artifact review." },
            { step: "02", title: "Plan", desc: "Roadmap, stack, and budget." },
            { step: "03", title: "Guide", desc: "Sprints, reviews, and KT." },
        ],
        tech: ["AWS", "Docker", "Git", "Next.js"],
        cta: "Facing build-vs-buy? Get a second opinion first.",
    },
    "maintenance-support": {
        hero: "Your product stays fast long after launch.",
        intro: "SLA-backed maintenance: monitoring, bug fixes, updates, and small enhancements. We keep uptime high and tech debt low.",
        features: [
            { title: "Monitoring", desc: "Uptime, logs, and alerts." },
            { title: "Fix & Patch", desc: "Bugs, security, and dependencies." },
            { title: "Enhance", desc: "Monthly capacity for improvements." },
        ],
        process: [
            { step: "01", title: "Onboard", desc: "Access, runbook, and baseline." },
            { step: "02", title: "Operate", desc: "Tickets, releases, and reports." },
            { step: "03", title: "Improve", desc: "Perf, cost, and roadmap." },
        ],
        tech: ["Sentry", "Cloudinary", "Vercel", "Neon"],
        cta: "Need a team on call? We cover nights and releases.",
    },
};

const fallback: ServiceDetail = {
    hero: "Solutions built around your goals, not templates.",
    intro: "We scope, design, and ship software that fits your workflow — reliable, measurable, and easy to evolve.",
    features: [
        { title: "Discovery", desc: "Clear scope and success metrics." },
        { title: "Delivery", desc: "Iterative, tested, documented." },
        { title: "Support", desc: "Handover, training, and SLA." },
    ],
    process: [
        { step: "01", title: "Align", desc: "Goals and constraints." },
        { step: "02", title: "Build", desc: "Design to deployment." },
        { step: "03", title: "Grow", desc: "Measure and iterate." },
    ],
    tech: ["Next.js", "Laravel", "MySQL"],
    cta: "Have a brief? Let's turn it into a plan.",
};

export function getServiceDetail(slug: string): ServiceDetail {
    if (details[slug]) return details[slug];
    const base = slug.replace(/-[a-z0-9]{4,8}$/, "");
    return details[base] ?? fallback;
}

export function getServiceDetailByTitle(title: string): ServiceDetail {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return details[slug] ?? fallback;
}
