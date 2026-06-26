import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    serverExternalPackages: ["@prisma/client", "cloudinary"],
    images: {
        qualities: [25, 50, 75, 100],
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com" },
        ],
    },
};

export default nextConfig;
