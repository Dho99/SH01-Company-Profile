import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    cacheComponents: true,
    serverExternalPackages: ["@prisma/client", "cloudinary"],
    transpilePackages: ["pg", "@prisma/adapter-pg"],
    images: {
        qualities: [25, 50, 75, 100],
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com" },
        ],
    },
};

export default nextConfig;
