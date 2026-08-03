import {
    BadgeCheck,
    CalendarDays,
    Clock,
    Cloud,
    Cog,
    Code2,
    LifeBuoy,
    Palette,
    Rocket,
    Smartphone,
    Smile,
    Sparkles,
    UserCheck,
    Users,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { getLegacyIconMap, normalizeIconName } from "@/lib/icon";

export type CmsIconProps = {
    name?: string | null;
    size?: number;
    className?: string;
    color?: string;
    strokeWidth?: number;
    decorative?: boolean;
    "aria-label"?: string;
};

const iconMap: Record<string, LucideIcon> = {
    rocket: Rocket,
    users: Users,
    "user-check": UserCheck,
    "calendar-days": CalendarDays,
    "code-2": Code2,
    smartphone: Smartphone,
    cog: Cog,
    palette: Palette,
    cloud: Cloud,
    "life-buoy": LifeBuoy,
    "badge-check": BadgeCheck,
    clock: Clock,
    smile: Smile,
};

const FallbackIcon = Sparkles;

export function CmsIcon({
    name,
    size = 24,
    className,
    color,
    strokeWidth,
    decorative = true,
    "aria-label": ariaLabel,
    ...rest
}: CmsIconProps & Omit<LucideProps, "ref" | "size" | "color" | "className" | "strokeWidth">) {
    let iconName = normalizeIconName(name);

    if (!iconName) {
        return null;
    }

    const legacyMap = getLegacyIconMap();
    if (legacyMap[iconName]) {
        iconName = legacyMap[iconName] as string;
    }

    const Icon = iconMap[iconName] ?? FallbackIcon;

    return (
        <Icon
            size={size}
            className={className}
            color={color}
            strokeWidth={strokeWidth}
            aria-hidden={decorative ? true : undefined}
            aria-label={!decorative ? ariaLabel : undefined}
            role={decorative ? "presentation" : "img"}
            {...rest}
        />
    );
}
