
import Navbar from "@/components/NavbarComponent/NavbarComponent";
import Footer from "@/components/FooterComponent/FooterCompoenent";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
