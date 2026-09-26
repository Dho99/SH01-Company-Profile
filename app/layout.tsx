import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "LEXA Software House — Building Digital Solutions For A Better Future",
    description:
        "LEXA Software House delivers innovative, reliable, and scalable software solutions that empower businesses and create meaningful impact.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} h-full antialiased`}>
            <body className="flex min-h-full flex-col bg-white font-sans">
                <NextTopLoader
                    color="#2563eb"
                    height={3}
                    crawl
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2563eb,0 0 5px #2563eb"
                    zIndex={9999}
                />
                {children}
            </body>
        </html>
    );
}
