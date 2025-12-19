
import Navbar from "@/components/NavbarComponent/NavbarComponent";
import Footer from "@/components/FooterComponent/FooterCompoenent";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialised">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
