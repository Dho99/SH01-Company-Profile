import { Suspense } from "react";

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
import { ChatBotLazy } from "@/components/chatbot/chatbot-lazy";

import { StatsSkeleton } from "@/components/skeletons/stats-skeleton";
import { AboutSkeleton } from "@/components/skeletons/about-skeleton";
import { ServicesSkeleton } from "@/components/skeletons/services-skeleton";
import { PortfolioSkeleton } from "@/components/skeletons/portfolio-skeleton";
import { TechnologiesSkeleton } from "@/components/skeletons/technologies-skeleton";
import { WhyChooseSkeleton } from "@/components/skeletons/why-choose-skeleton";
import { BlogSkeleton } from "@/components/skeletons/blog-skeleton";
import { TestimonialsSkeleton } from "@/components/skeletons/testimonials-skeleton";

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

type Heading = { eyebrow: string; title: string } | undefined;

export default async function Home() {
    const [siteSetting, sectionHeadings, navLinks, services] = await Promise.all([
        getSiteSetting(),
        getSectionHeadings(),
        getNavLinks(),
        getServices(),
    ]);

    const headingByKey = new Map(
        sectionHeadings.map((h) => [
            h.key,
            { eyebrow: h.eyebrow, title: h.title },
        ]),
    );
    const headingFor = (key: string): Heading => headingByKey.get(key);

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="flex-1">
                <Hero data={siteSetting} />

                <Suspense fallback={<StatsSkeleton />}>
                    <StatsSection />
                </Suspense>

                <Suspense fallback={<AboutSkeleton />}>
                    <AboutSection site={siteSetting} />
                </Suspense>

                <Suspense fallback={<ServicesSkeleton />}>
                    <ServicesSection heading={headingFor("services")} />
                </Suspense>

                <Suspense fallback={<PortfolioSkeleton />}>
                    <PortfolioSection heading={headingFor("portfolio")} />
                </Suspense>

                <Suspense fallback={<TechnologiesSkeleton />}>
                    <TechnologiesSection heading={headingFor("technologies")} />
                </Suspense>

                <Suspense fallback={<WhyChooseSkeleton />}>
                    <WhyChooseSection heading={headingFor("whyChoose")} />
                </Suspense>

                <Suspense fallback={<BlogSkeleton />}>
                    <BlogSection />
                </Suspense>

                <Suspense fallback={<TestimonialsSkeleton />}>
                    <TestimonialsSection heading={headingFor("testimonials")} />
                </Suspense>
            </main>
            <Footer />
            <ScrollToTop />
            <ChatBotLazy />
        </>
    );
}

async function StatsSection() {
    const stats = await getStats();
    return <Stats items={stats} />;
}

async function AboutSection({
    site,
}: {
    site: Awaited<ReturnType<typeof getSiteSetting>>;
}) {
    const aboutPoints = await getAboutPoints();
    return <About site={site} points={aboutPoints} />;
}

async function ServicesSection({ heading }: { heading: Heading }) {
    const services = await getServices();
    return <Services items={services} heading={heading} />;
}

async function PortfolioSection({ heading }: { heading: Heading }) {
    const projects = await getProjects();
    return <Portfolio items={projects} heading={heading} />;
}

async function TechnologiesSection({ heading }: { heading: Heading }) {
    const technologies = await getTechnologies();
    return <Technologies items={technologies} heading={heading} />;
}

async function WhyChooseSection({ heading }: { heading: Heading }) {
    const reasons = await getReasons();
    return <WhyChoose items={reasons} heading={heading} />;
}

async function BlogSection() {
    const blogPosts = await getBlogPosts();
    return <Blog posts={blogPosts} />;
}

async function TestimonialsSection({ heading }: { heading: Heading }) {
    const testimonials = await getTestimonials();
    return <Testimonials items={testimonials} heading={heading} />;
}
