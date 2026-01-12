import "./globals.css"
import type { Metadata } from "next";
import { NotificationProvider } from "@/lib/notificationContext"
import NotificationToast from "@/components/NotificationToast"

export const metadata: Metadata = {
    title: "Black Angel | Official Store",
    description: "Platform Katalog Produk Dari Black Angel Official Store",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body>
                <NotificationProvider>
                    {children}
                    <NotificationToast />
                </NotificationProvider>
            </body>
        </html>
    )
}
