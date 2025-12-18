import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavbarComponent/NavbarComponent";
import Footer from "@/components/FooterComponent/FooterCompoenent";

export const metadata: Metadata = {
  title: "Black Angel | Official Store",
  description: "Platform Katalog Produk Dari Black Angel Official Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth">
      <body className="antialised">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
