import { z } from "zod";
import {
  siteSettingSchema,
  sectionHeadingSchema,
  statSchema,
  aboutPointSchema,
  serviceSchema,
  projectSchema,
  technologySchema,
  reasonSchema,
  testimonialSchema,
  navLinkSchema,
  blogPostSchema,
} from "./schemas";

export type CreateSiteSettingInput = z.infer<typeof siteSettingSchema>;
export type UpdateSiteSettingInput = Partial<CreateSiteSettingInput>;

export type CreateSectionHeadingInput = z.infer<typeof sectionHeadingSchema>;
export type UpdateSectionHeadingInput = Partial<CreateSectionHeadingInput>;

export type CreateStatInput = z.infer<typeof statSchema>;
export type UpdateStatInput = Partial<CreateStatInput>;

export type CreateAboutPointInput = z.infer<typeof aboutPointSchema>;
export type UpdateAboutPointInput = Partial<CreateAboutPointInput>;

export type CreateServiceInput = z.infer<typeof serviceSchema>;
export type UpdateServiceInput = Partial<CreateServiceInput>;

export type CreateProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = Partial<CreateProjectInput>;

export type CreateTechnologyInput = z.infer<typeof technologySchema>;
export type UpdateTechnologyInput = Partial<CreateTechnologyInput>;

export type CreateReasonInput = z.infer<typeof reasonSchema>;
export type UpdateReasonInput = Partial<CreateReasonInput>;

export type CreateTestimonialInput = z.infer<typeof testimonialSchema>;
export type UpdateTestimonialInput = Partial<CreateTestimonialInput>;

export type CreateNavLinkInput = z.infer<typeof navLinkSchema>;
export type UpdateNavLinkInput = Partial<CreateNavLinkInput>;

export type CreateBlogPostInput = z.infer<typeof blogPostSchema>;
export type UpdateBlogPostInput = Partial<CreateBlogPostInput>;
