import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeading } from "@/components/section-heading";
import { CmsIcon } from "@/components/cms-icon";
import { getTechnologies, getSectionHeadings, getNavLinks, getServices } from "@/lib/cms/queries";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import { SiDocker, SiFlutter, SiGit, SiLaravel, SiMysql, SiNextdotjs, SiNodedotjs, SiPhp, SiPython, SiReact, SiVuedotjs } from "react-icons/si";

const brandIcons: Record<string, IconType> = {
    laravel: SiLaravel,
    react: SiReact,
    nextjs: SiNextdotjs,
    vue: SiVuedotjs,
    flutter: SiFlutter,
    node: SiNodedotjs,
    php: SiPhp,
    python: SiPython,
    mysql: SiMysql,
    aws: FaAws,
    docker: SiDocker,
    git: SiGit,
};

export default async function TechnologiesPage() {
    const [technologies, headings, navLinks, services] = await Promise.all([getTechnologies(), getSectionHeadings(), getNavLinks(), getServices()]);
    const heading = headings.find((h) => h.key === "technologies");

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="bg-slate-50">
                <section className="border-b bg-white py-12 lg:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading eyebrow={heading?.eyebrow ?? "Technologies We Use"} title={heading?.title ?? "Built On a Modern Stack"} />
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Complete stack we use across web, mobile, and system projects.</p>
                    </div>
                </section>
                <section className="py-10 lg:py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl border bg-white p-8 shadow-sm sm:p-10">
                            {technologies.length === 0 ? (
                                <p className="py-10 text-center text-sm text-slate-500">No technologies yet.</p>
                            ) : (
                                <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
                                    {technologies.map((tech) => {
                                        const BrandIcon = brandIcons[tech.icon];
                                        return (
                                            <li key={tech.id} className="flex flex-col items-center gap-2">
                                                {BrandIcon ? (
                                                    <BrandIcon className="size-9 text-slate-400" style={{ color: tech.color } as React.CSSProperties} />
                                                ) : (
                                                    <CmsIcon name={tech.icon} size={36} className="text-slate-400" style={{ color: tech.color } as React.CSSProperties} />
                                                )}
                                                <span className="text-xs font-medium text-slate-600">{tech.label}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
