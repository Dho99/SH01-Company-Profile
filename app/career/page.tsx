"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FileText,
  GraduationCap,
  Mail,
  Megaphone,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ScrollToTop } from "@/components/scroll-to-top";

const ease = [0.22, 1, 0.36, 1] as const;

const whyJoinItems = [
  {
    icon: BriefcaseBusiness,
    title: "Real Project Experience",
    description:
      "Work on real projects such as websites, business applications, information systems, and digital solutions.",
  },
  {
    icon: GraduationCap,
    title: "Learning by Doing",
    description:
      "Learn through hands-on practice, mentorship, and a culture of continuous improvement.",
  },
  {
    icon: TrendingUp,
    title: "Professional Growth",
    description:
      "Develop your skills, build your portfolio, and enhance your career readiness in the technology industry.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Open, supportive, and solution-oriented work environment that drives results.",
  },
];

const internshipPrograms = [
  "UI/UX Designer Intern",
  "Frontend Developer Intern",
  "Backend Developer Intern",
  "Fullstack Developer Intern",
  "QA / Software Tester Intern",
  "AI / LLM Engineer Intern",
  "Project Management Intern",
  "Technical Writer Intern",
  "Cyber Security Analyst Intern",
  "WordPress / CMS Developer Intern",
];

const professionalRoles = [
  "Project Manager",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "QA Engineer",
  "DevOps Engineer",
  "Digital Marketing Specialist",
  "Business Development Officer",
];

const workItems = [
  {
    icon: Code2,
    title: "Develop Applications",
    description:
      "Design and build web and mobile applications that solve real problems.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Create modern, user-friendly designs focused on great user experience.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Build AI-powered systems and automation to create smarter solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Testing & Quality",
    description:
      "Perform testing to ensure applications are reliable, secure, and high quality.",
  },
  {
    icon: FileText,
    title: "Documentation",
    description:
      "Create clear and structured technical documentation.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together across roles to achieve the best results.",
  },
];

const cultureItems = [
  {
    icon: Star,
    title: "Leading",
    description: "We lead change through technology.",
  },
  {
    icon: Sparkles,
    title: "eXcellence",
    description: "We maintain quality in every process.",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "We create efficient and impactful solutions.",
  },
];

const lookingForItems = [
  "Strong interest in digital technology",
  "Willingness to learn and open to feedback",
  "Able to work independently and in a team",
  "Sense of responsibility and ownership",
  "Motivated to build a professional portfolio",
  "Ready to contribute to real projects",
];

export default function CareerPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white pt-12 pb-10 lg:pt-14 lg:pb-12">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                Career at LEXA
              </p>

              <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[56px]">
                Build Your Future with{" "}
                <span className="text-brand">LEXA</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                LEXA Software House opens opportunities for passionate minds to
                grow together in the digital technology world. We believe the
                best innovation comes from collaboration, continuous learning,
                and the courage to create impactful solutions.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-lg bg-brand px-5 text-sm font-semibold"
                >
                  <Link href="#apply">
                    <BriefcaseBusiness className="size-4" />
                    Apply for Internship
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-lg border-brand/20 px-5 text-sm font-semibold text-brand hover:bg-blue-50 hover:text-brand"
                >
                  <Link href="#opportunities">
                    <ArrowRight className="size-4" />
                    Explore Opportunities
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
              className="relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.14)] ring-1 ring-slate-200">
                <Image
                  src="/About.png"
                  alt="Career at LEXA"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 620px, 100vw"
                />
              </div>

              <div className="pointer-events-none absolute -right-5 top-6 hidden grid-cols-3 gap-2 opacity-40 lg:grid">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className="size-1.5 rounded-full bg-brand/50"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="bg-slate-50 pt-10 pb-8 lg:pt-12 lg:pb-10">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              Why Join Us?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Grow Your Career with Real Experience
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              We provide real experience, continuous learning, and a positive
              environment to support your career growth.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyJoinItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease }}
                    className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
                  >
                    <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-brand">
                      <Icon className="size-7" />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Opportunities */}
        <section
          id="opportunities"
          className="bg-white pt-10 pb-8 lg:pt-12 lg:pb-10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                Opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Explore Career Paths at LEXA
              </h2>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <OpportunityCard
                title="Internship Program"
                description="Our internship program is designed for students, fresh graduates, or aspiring talents who want to gain real-world experience in technology."
                icon={GraduationCap}
                items={internshipPrograms}
                linkText="View all internship programs"
              />

              <OpportunityCard
                title="Professional Roles"
                description="We are also open for professional collaboration in the following positions."
                icon={Users}
                items={professionalRoles}
                linkText="View all positions"
              />
            </div>
          </div>
        </section>

        {/* What You Will Do */}
        <section className="bg-slate-50 pt-10 pb-8 lg:pt-12 lg:pb-10">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              What You Will Do
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Contribute to Real Digital Projects
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Join LEXA and contribute to various exciting and impactful
              projects.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {workItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: index * 0.06, ease }}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mx-auto inline-flex size-12 items-center justify-center rounded-xl bg-blue-50 text-brand">
                      <Icon className="size-6" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="bg-white pt-10 pb-8 lg:pt-12 lg:pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[28px] bg-[#061b49] shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#061b49] via-[#0a3c91]/90 to-transparent" />

              <Image
                src="/About.png"
                alt="LEXA work culture"
                fill
                className="object-cover object-right opacity-35"
                sizes="100vw"
              />

              <div className="relative z-10 grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">
                    Our Work Culture
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                    Built on Commitment, Learning, and Innovation
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/78">
                    We believe a great team is built on commitment,
                    communication, and a passion for learning.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:self-end">
                  {cultureItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur"
                      >
                        <div className="inline-flex size-12 items-center justify-center rounded-full bg-blue-500/30">
                          <Icon className="size-6" />
                        </div>

                        <h3 className="mt-4 text-base font-bold">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-white/72">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements and Apply */}
        <section
          id="apply"
          className="bg-slate-50 pt-10 pb-8 lg:pt-12 lg:pb-10"
        >
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                    Who We Are Looking For
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                    Talents Ready to Grow
                  </h2>
                </div>

                <div className="hidden size-16 items-center justify-center rounded-full bg-blue-50 text-brand sm:flex">
                  <Users className="size-8" />
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {lookingForItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                How to Apply
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                Send Your CV and Portfolio
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Send your CV, portfolio, or brief profile via email:
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-4 text-brand">
                <Mail className="size-5 shrink-0" />
                <span className="font-bold">internship@lexatech.id</span>
              </div>

              <div className="mt-5 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">
                    Email Subject:
                  </span>{" "}
                  Career Application – [Position] – [Full Name]
                </p>

                <p>
                  <span className="font-semibold text-slate-900">
                    Example:
                  </span>{" "}
                  Career Application – Frontend Developer Intern – Randi Rizal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white pt-10 pb-12 lg:pt-12 lg:pb-14">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white p-8 shadow-sm">
              <Megaphone className="absolute left-8 top-1/2 hidden size-24 -translate-y-1/2 text-blue-100 lg:block" />
              <Send className="absolute right-8 top-1/2 hidden size-24 -translate-y-1/2 text-blue-100 lg:block" />

              <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Ready to Build Digital Innovation with Us?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Be part of LEXA Software House and help us create innovative,
                professional, and impactful digital solutions.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-lg px-5">
                  <Link href="mailto:internship@lexatech.id">
                    <Send className="size-4" />
                    Send Your CV
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-lg px-5 text-brand hover:bg-blue-50 hover:text-brand"
                >
                  <Link href="#opportunities">
                    <BriefcaseBusiness className="size-4" />
                    Explore Opportunities
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

function OpportunityCard({
  title,
  description,
  icon: Icon,
  items,
  linkText,
}: {
  title: string;
  description: string;
  icon: typeof GraduationCap;
  items: string[];
  linkText: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
    >
      <div className="absolute right-6 top-6 hidden size-20 items-center justify-center rounded-full bg-blue-50 text-brand sm:flex">
        <Icon className="size-10" />
      </div>

      <div className="max-w-xl pr-0 sm:pr-24">
        <h3 className="text-xl font-bold text-brand">{title}</h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="size-4 shrink-0 text-brand" />
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      <Link
        href="#apply"
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand transition-all hover:gap-3"
      >
        {linkText} <ArrowRight className="size-4" />
      </Link>
    </motion.div>
  );
}