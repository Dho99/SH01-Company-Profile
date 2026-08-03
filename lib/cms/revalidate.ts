import { revalidateTag } from "next/cache";

const ENTITY_TO_TAG: Record<string, string> = {
    stat: "cms:stats",
    "about-points": "cms:about-points",
    services: "cms:services",
    projects: "cms:projects",
    technologies: "cms:technologies",
    reasons: "cms:reasons",
    testimonials: "cms:testimonials",
    "nav-links": "cms:nav-links",
    "blog-posts": "cms:blog-posts",
    "section-headings": "cms:section-headings",
    "site-setting": "cms:site-setting",
};

export function revalidateCms(entity: string) {
    const tag = ENTITY_TO_TAG[entity];
    if (tag) {
        revalidateTag(tag, "max");
    }
}
