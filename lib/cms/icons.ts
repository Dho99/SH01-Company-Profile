export const PROJECT_CATEGORIES = [
  "Corporate",
  "E-Commerce",
  "Logistics",
  "Education",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const ICON_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
