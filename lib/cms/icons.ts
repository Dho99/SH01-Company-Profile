export const ICON_CATEGORIES = {
  stats: ["rocket", "clients", "team", "calendar"] as const,
  services: ["code", "mobile", "system", "design", "consulting", "support"] as const,
  reasons: ["quality", "team", "delivery", "satisfaction", "support"] as const,
  technologies: [
    "laravel",
    "react",
    "nextjs",
    "vue",
    "flutter",
    "node",
    "php",
    "python",
    "mysql",
    "aws",
    "docker",
    "git",
  ] as const,
} as const;

export const ALL_ICONS = [
  ...ICON_CATEGORIES.stats,
  ...ICON_CATEGORIES.services,
  ...ICON_CATEGORIES.reasons,
  ...ICON_CATEGORIES.technologies,
] as const;

export type IconId = (typeof ALL_ICONS)[number];

export const PROJECT_CATEGORIES = [
  "Corporate",
  "E-Commerce",
  "Logistics",
  "Education",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
