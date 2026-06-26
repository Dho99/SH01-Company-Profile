import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    /* ───── SiteSetting (singleton) ───── */
    await prisma.siteSetting.upsert({
        where: { id: "singleton" },
        update: {},
        create: {
            id: "singleton",
            name: "LEXA Software House",
            tagline: "Building digital solutions for a better future.",
            email: "info@lexatech.id",
            phone: "+62 853 2013 2014",
            location: "Tasikmalaya - Indonesia",
            linkedin: "#",
            instagram: "#",
            facebook: "#",
            youtube: "#",
            heroEyebrow: "Leading, Excellence & Automation",
            heroHeading: "Building Digital Solutions For ",
            heroHighlight: "A Better Future",
            heroDescription:
                "LEXA Software House delivers innovative, reliable, and scalable software solutions that empower businesses and create meaningful impact.",
            heroPrimaryLabel: "Our Services",
            heroPrimaryHref: "#services",
            heroSecondaryLabel: "View Our Portfolio",
            heroSecondaryHref: "#portfolio",
            aboutEyebrow: "Company Profile",
            aboutHeading: "About LEXA Software House",
            aboutDescription:
                "LEXA Software House is a technology company that provides innovative digital solutions to help businesses grow and transform through technology.",
            aboutCommitmentTitle: "Our Commitment",
            aboutCommitmentText:
                "Delivering high-quality software solutions with integrity, collaboration, and dedication to exceed client expectations.",
            aboutCtaLabel: "Learn More About Us",
            aboutCtaHref: "#contact",
            footerTagline:
                "Building digital solutions for a better future through innovation, excellence and automation.",
            footerNewsletterTitle: "Newsletter",
            footerNewsletterText:
                "Subscribe to get the latest updates and insights.",
        },
    });

    /* ───── SectionHeadings ───── */
    const headings = [
        {
            key: "services",
            eyebrow: "Our Services",
            title: "Solutions We Provide",
        },
        {
            key: "portfolio",
            eyebrow: "Our Portfolio",
            title: "Featured Projects",
        },
        {
            key: "technologies",
            eyebrow: "Technologies We Use",
            title: "Built On a Modern Stack",
        },
        { key: "whyChoose", eyebrow: "Why Choose", title: "LEXA?" },
        {
            key: "testimonials",
            eyebrow: "What Clients Say",
            title: "Trusted By Great Companies",
        },
    ];
    for (const h of headings) {
        await prisma.sectionHeading.upsert({
            where: { key: h.key },
            update: h,
            create: h,
        });
    }

    /* ───── Clear list entities (idempotent) ───── */
    await prisma.navLink.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.reason.deleteMany();
    await prisma.technology.deleteMany();
    await prisma.project.deleteMany();
    await prisma.service.deleteMany();
    await prisma.aboutPoint.deleteMany();
    await prisma.stat.deleteMany();

    /* ───── Stats ───── */
    const stats = [
        {
            icon: "rocket",
            value: "30+",
            label: "Projects Completed",
            sortOrder: 0,
        },
        { icon: "clients", value: "20+", label: "Happy Clients", sortOrder: 1 },
        { icon: "team", value: "10+", label: "Expert Team", sortOrder: 2 },
        {
            icon: "calendar",
            value: "2+",
            label: "Years Experience",
            sortOrder: 3,
        },
    ];
    for (const s of stats) {
        await prisma.stat.create({ data: s });
    }

    /* ───── AboutPoints ───── */
    const aboutPoints = [
        { text: "Innovative and proven solutions", sortOrder: 0 },
        { text: "Experienced and professional team", sortOrder: 1 },
        { text: "Client-focused approach", sortOrder: 2 },
        { text: "Commitment to continuous support", sortOrder: 3 },
    ];
    for (const p of aboutPoints) {
        await prisma.aboutPoint.create({ data: p });
    }

    /* ───── Services ───── */
    const services = [
        {
            icon: "code",
            title: "Web Development",
            description:
                "Custom websites and web applications built with modern technologies.",
            sortOrder: 0,
        },
        {
            icon: "mobile",
            title: "Mobile Development",
            description:
                "Native and cross-platform mobile apps for iOS and Android.",
            sortOrder: 1,
        },
        {
            icon: "system",
            title: "System Development",
            description:
                "Enterprise systems and business applications tailored to your needs.",
            sortOrder: 2,
        },
        {
            icon: "design",
            title: "UI/UX Design",
            description:
                "User-centered design that creates meaningful and engaging experiences.",
            sortOrder: 3,
        },
        {
            icon: "consulting",
            title: "IT Consulting",
            description:
                "Strategic technology consulting to help your business grow.",
            sortOrder: 4,
        },
        {
            icon: "support",
            title: "Maintenance & Support",
            description:
                "Reliable support and maintenance for optimal performance.",
            sortOrder: 5,
        },
    ];
    for (const svc of services) {
        await prisma.service.create({ data: svc });
    }

    /* ───── Projects ───── */
    const projects = [
        {
            category: "Corporate",
            title: "Company Profile Website",
            description: "Modern website for corporate profile",
            sortOrder: 0,
        },
        {
            category: "E-Commerce",
            title: "E-Commerce Mobile App",
            description: "Shopping app with seamless experience",
            sortOrder: 1,
        },
        {
            category: "Logistics",
            title: "Inventory Management System",
            description: "Inventory and stock management solution",
            sortOrder: 2,
        },
        {
            category: "Education",
            title: "Learning Management System",
            description: "E-learning platform for online education",
            sortOrder: 3,
        },
    ];
    for (const proj of projects) {
        await prisma.project.create({ data: proj });
    }

    /* ───── Technologies ───── */
    const technologies = [
        { icon: "laravel", label: "Laravel", color: "#FF2D20", sortOrder: 0 },
        { icon: "react", label: "React", color: "#61DAFB", sortOrder: 1 },
        { icon: "nextjs", label: "Next.js", color: "#000000", sortOrder: 2 },
        { icon: "vue", label: "Vue.js", color: "#41B883", sortOrder: 3 },
        { icon: "flutter", label: "Flutter", color: "#02569B", sortOrder: 4 },
        { icon: "node", label: "Node.js", color: "#5FA04E", sortOrder: 5 },
        { icon: "php", label: "PHP", color: "#777BB4", sortOrder: 6 },
        { icon: "python", label: "Python", color: "#3776AB", sortOrder: 7 },
        { icon: "mysql", label: "MySQL", color: "#4479A1", sortOrder: 8 },
        { icon: "aws", label: "AWS", color: "#FF9900", sortOrder: 9 },
        { icon: "docker", label: "Docker", color: "#2496ED", sortOrder: 10 },
        { icon: "git", label: "Git", color: "#F05032", sortOrder: 11 },
    ];
    for (const tech of technologies) {
        await prisma.technology.create({ data: tech });
    }

    /* ───── Reasons ───── */
    const reasons = [
        {
            icon: "quality",
            title: "Quality Solutions",
            description:
                "We deliver high-quality solutions that drive results.",
            sortOrder: 0,
        },
        {
            icon: "team",
            title: "Experienced Team",
            description: "Our team has expertise in diverse technologies.",
            sortOrder: 1,
        },
        {
            icon: "delivery",
            title: "On-Time Delivery",
            description: "We value time and always deliver on deadlines.",
            sortOrder: 2,
        },
        {
            icon: "satisfaction",
            title: "Client Satisfaction",
            description: "Client satisfaction is our top priority.",
            sortOrder: 3,
        },
        {
            icon: "support",
            title: "Long-Term Support",
            description: "We provide ongoing support and maintenance.",
            sortOrder: 4,
        },
    ];
    for (const r of reasons) {
        await prisma.reason.create({ data: r });
    }

    /* ───── Testimonials ───── */
    const testimonials = [
        {
            quote: "LEXA Software House delivered an outstanding website that exceeded our expectations. Their team was professional and responsive.",
            name: "Ardi Pratama",
            role: "CEO, Maju Bersama Indonesia",
            sortOrder: 0,
        },
        {
            quote: "The mobile app developed by LEXA has significantly improved our business performance. Highly recommended!",
            name: "Dewi Lestari",
            role: "Marketing Director, TokoKita",
            sortOrder: 1,
        },
        {
            quote: "Great experience working with LEXA. They understand our needs and provide the best solutions.",
            name: "Budi Santoso",
            role: "CTO, CV. Sumber Abadi",
            sortOrder: 2,
        },
        {
            quote: "LEXA provides reliable digital solutions with a professional workflow and responsive support throughout the project.",
            name: "Rangga Pratama",
            role: "Project Manager, Digital Nusantara",
            sortOrder: 3,
        },
    ];
    for (const t of testimonials) {
        await prisma.testimonial.create({ data: t });
    }

    /* ───── NavLinks ───── */
    const navLinks = [
        {
            label: "Home",
            href: "/",
            hasDropdown: false,
            group: "HEADER" as const,
            sortOrder: 0,
        },
        {
            label: "About Us",
            href: "#about",
            hasDropdown: false,
            group: "HEADER" as const,
            sortOrder: 1,
        },
        {
            label: "Services",
            href: "#services",
            hasDropdown: true,
            group: "HEADER" as const,
            sortOrder: 2,
        },
        {
            label: "Portfolio",
            href: "#portfolio",
            hasDropdown: false,
            group: "HEADER" as const,
            sortOrder: 3,
        },
        {
            label: "Technologies",
            href: "#technologies",
            hasDropdown: false,
            group: "HEADER" as const,
            sortOrder: 4,
        },
        {
            label: "Blog",
            href: "#blog",
            hasDropdown: false,
            group: "HEADER" as const,
            sortOrder: 5,
        },
        {
            label: "Career",
            href: "/career",
            hasDropdown: false,
            group: "HEADER" as const,
            sortOrder: 6,
        },
        {
            label: "Contact",
            href: "#contact",
            hasDropdown: false,
            group: "HEADER" as const,
            sortOrder: 7,
        },
        {
            label: "Home",
            href: "/",
            hasDropdown: false,
            group: "FOOTER_NAV" as const,
            sortOrder: 0,
        },
        {
            label: "About Us",
            href: "#about",
            hasDropdown: false,
            group: "FOOTER_NAV" as const,
            sortOrder: 1,
        },
        {
            label: "Services",
            href: "#services",
            hasDropdown: false,
            group: "FOOTER_NAV" as const,
            sortOrder: 2,
        },
        {
            label: "Portfolio",
            href: "#portfolio",
            hasDropdown: false,
            group: "FOOTER_NAV" as const,
            sortOrder: 3,
        },
        {
            label: "Technologies",
            href: "#technologies",
            hasDropdown: false,
            group: "FOOTER_NAV" as const,
            sortOrder: 4,
        },
        {
            label: "Blog",
            href: "#blog",
            hasDropdown: false,
            group: "FOOTER_NAV" as const,
            sortOrder: 5,
        },
        {
            label: "Career",
            href: "/career",
            hasDropdown: false,
            group: "FOOTER_NAV" as const,
            sortOrder: 6,
        },
        {
            label: "Contact",
            href: "#contact",
            hasDropdown: false,
            group: "FOOTER_NAV" as const,
            sortOrder: 7,
        },
        {
            label: "Web Development",
            href: "#services",
            hasDropdown: false,
            group: "FOOTER_SERVICE" as const,
            sortOrder: 0,
        },
        {
            label: "Mobile Development",
            href: "#services",
            hasDropdown: false,
            group: "FOOTER_SERVICE" as const,
            sortOrder: 1,
        },
        {
            label: "System Development",
            href: "#services",
            hasDropdown: false,
            group: "FOOTER_SERVICE" as const,
            sortOrder: 2,
        },
        {
            label: "UI/UX Design",
            href: "#services",
            hasDropdown: false,
            group: "FOOTER_SERVICE" as const,
            sortOrder: 3,
        },
        {
            label: "IT Consulting",
            href: "#services",
            hasDropdown: false,
            group: "FOOTER_SERVICE" as const,
            sortOrder: 4,
        },
        {
            label: "Maintenance & Support",
            href: "#services",
            hasDropdown: false,
            group: "FOOTER_SERVICE" as const,
            sortOrder: 5,
        },
    ];
    for (const link of navLinks) {
        await prisma.navLink.create({ data: link });
    }

    /* ───── Admin user ───── */
    const email = process.env.ADMIN_EMAIL ?? "admin@lexatech.id";
    const password = process.env.ADMIN_PASSWORD ?? "admin123";
    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.upsert({
        where: { email },
        update: { passwordHash },
        create: { email, passwordHash, role: "ADMIN", name: "Admin" },
    });

    console.log("✅ Seed complete");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
