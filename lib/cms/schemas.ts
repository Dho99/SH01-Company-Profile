import { z } from "zod";
import { ALL_ICONS, PROJECT_CATEGORIES } from "./icons";

const iconSchema = z.enum(ALL_ICONS);

const projectCategorySchema = z.enum(PROJECT_CATEGORIES);

export const siteSettingSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  linkedin: z.string(),
  instagram: z.string(),
  facebook: z.string(),
  youtube: z.string(),
  heroEyebrow: z.string().min(1),
  heroHeading: z.string().min(1),
  heroHighlight: z.string().min(1),
  heroDescription: z.string().min(1),
  heroPrimaryLabel: z.string().min(1),
  heroPrimaryHref: z.string().min(1),
  heroSecondaryLabel: z.string().min(1),
  heroSecondaryHref: z.string().min(1),
  aboutEyebrow: z.string().min(1),
  aboutHeading: z.string().min(1),
  aboutDescription: z.string().min(1),
  aboutCommitmentTitle: z.string().min(1),
  aboutCommitmentText: z.string().min(1),
  aboutCtaLabel: z.string().min(1),
  aboutCtaHref: z.string().min(1),
  footerTagline: z.string().min(1),
  footerNewsletterTitle: z.string().min(1),
  footerNewsletterText: z.string().min(1),
});

export const sectionHeadingSchema = z.object({
  key: z.string().min(1),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
});

export const statSchema = z.object({
  icon: iconSchema,
  value: z.string().min(1),
  label: z.string().min(1),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export const aboutPointSchema = z.object({
  text: z.string().min(1),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export const serviceSchema = z.object({
  icon: iconSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export const projectSchema = z.object({
  category: projectCategorySchema,
  title: z.string().min(1),
  description: z.string().min(1),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export const technologySchema = z.object({
  icon: iconSchema,
  label: z.string().min(1),
  color: z.string().min(1),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export const reasonSchema = z.object({
  icon: iconSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  hasDropdown: z.boolean(),
  group: z.enum(["HEADER", "FOOTER_NAV", "FOOTER_SERVICE"]),
  sortOrder: z.number().int(),
  published: z.boolean(),
});
