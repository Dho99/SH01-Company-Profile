import { ToasterProvider } from "@/components/toaster-provider";

export default function AdminRouteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <ToasterProvider />
        </>
    );
}
