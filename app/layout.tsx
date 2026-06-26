import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/components/toaster-provider";

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
                {children}
                <ToasterProvider />
            </body>
        </html>
    );
}
