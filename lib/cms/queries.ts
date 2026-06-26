import "server-only";

import { cacheLife } from "next/cache";
import { cacheTag } from "next/cache";
import { prisma } from "@/lib/db";

/* ───────── Public (cached) readers ───────── */

export async function getSiteSetting() {
  "use cache";
  cacheTag("cms:site-setting");
  cacheLife("hours");
  return prisma.siteSetting.findUnique({ where: { id: "singleton" } });
}

export async function getSectionHeadings() {
  "use cache";
  cacheTag("cms:section-headings");
  cacheLife("hours");
  return prisma.sectionHeading.findMany();
}

export async function getStats() {
  "use cache";
  cacheTag("cms:stats");
  cacheLife("hours");
  return prisma.stat.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getAboutPoints() {
  "use cache";
  cacheTag("cms:about-points");
  cacheLife("hours");
  return prisma.aboutPoint.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getServices() {
  "use cache";
  cacheTag("cms:services");
  cacheLife("hours");
  return prisma.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getProjects() {
  "use cache";
  cacheTag("cms:projects");
  cacheLife("hours");
  return prisma.project.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getTechnologies() {
  "use cache";
  cacheTag("cms:technologies");
  cacheLife("hours");
  return prisma.technology.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getReasons() {
  "use cache";
  cacheTag("cms:reasons");
  cacheLife("hours");
  return prisma.reason.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getTestimonials() {
  "use cache";
  cacheTag("cms:testimonials");
  cacheLife("hours");
  return prisma.testimonial.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getNavLinks() {
  "use cache";
  cacheTag("cms:nav-links");
  cacheLife("hours");
  return prisma.navLink.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

/* ───────── Admin (uncached) readers ───────── */

export async function getAdminSiteSetting() {
  return prisma.siteSetting.findUnique({ where: { id: "singleton" } });
}

export async function getAdminSectionHeadings() {
  return prisma.sectionHeading.findMany({ orderBy: { key: "asc" } });
}

export async function getAdminStats() {
  return prisma.stat.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAdminAboutPoints() {
  return prisma.aboutPoint.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAdminServices() {
  return prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAdminProjects() {
  return prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAdminTechnologies() {
  return prisma.technology.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAdminReasons() {
  return prisma.reason.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAdminTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAdminNavLinks() {
  return prisma.navLink.findMany({ orderBy: [ { group: "asc" }, { sortOrder: "asc" } ] });
}
