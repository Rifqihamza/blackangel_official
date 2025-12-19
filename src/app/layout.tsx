import "./globals.css"
import type { Metadata } from "next";

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
            <body className="antialised">
                {children}
            </body>
        </html>
    )
}
