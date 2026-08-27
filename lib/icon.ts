const SAFE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isUnsafe(value: string): boolean {
  if (/[<>]/.test(value)) return true;
  if (/script/i.test(value)) return true;
  if (/eval|innerHTML|dangerouslySetInnerHTML/i.test(value)) return true;
  if (/^<[^>]+>$/.test(value.trim())) return true;
  return false;
}

export function normalizeIconName(value: string | null | undefined): string {
  if (value == null) return "";

  let result = String(value).trim();

  if (!result || isUnsafe(result)) return "";

  result = result
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .replace(/^-|-$/g, "");

  if (!SAFE_PATTERN.test(result)) return "";

  return result;
}

export function isValidIconName(name: string | null | undefined): boolean {
  const normalized = normalizeIconName(name);
  return normalized.length > 0 && SAFE_PATTERN.test(normalized);
}

export function getLegacyIconMap(): Record<string, string> {
  return {
    code: "code-2",
    mobile: "smartphone",
    system: "cog",
    design: "palette",
    consulting: "cloud",
    support: "life-buoy",
    quality: "badge-check",
    delivery: "clock",
    satisfaction: "smile",
    clients: "users",
    team: "user-check",
    calendar: "calendar-days",
    rocket: "rocket",
  };
}
