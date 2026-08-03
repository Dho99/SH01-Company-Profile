import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Technologies } from "@/components/sections/technologies";
import { WhyChoose } from "@/components/sections/why-choose";
import { Blog } from "@/components/sections/blog";
import { Testimonials } from "@/components/sections/testimonials";
import { ScrollToTop } from "@/components/scroll-to-top";
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

export default async function Home() {
    const [
        siteSetting,
        sectionHeadings,
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

    const headingByKey = new Map(
        sectionHeadings.map((h) => [
            h.key,
            { eyebrow: h.eyebrow, title: h.title },
        ]),
    );
    const headingFor = (key: string) => headingByKey.get(key);

    return (
        <>
            <Navbar navLinks={navLinks} />
            <main className="flex-1">
                <Hero data={siteSetting} />
                <Stats items={stats} />
                <About site={siteSetting} points={aboutPoints} />
                <Services
                    items={services}
                    heading={headingFor("services")}
                />
                <Portfolio
                    items={projects}
                    heading={headingFor("portfolio")}
                />
                <Technologies
                    items={technologies}
                    heading={headingFor("technologies")}
                />
                <WhyChoose
                    items={reasons}
                    heading={headingFor("whyChoose")}
                />
                <Blog posts={blogPosts} />
                <Testimonials
                    items={testimonials}
                    heading={headingFor("testimonials")}
                />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
