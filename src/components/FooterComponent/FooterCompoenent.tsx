import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-18 border-t border-(--accent)">

            <div className="flex flex-col md:flex-row gap-10 justify-between">

                {/* ===== BRAND ===== */}
                <div className="space-y-1">
                    <h1 className="font-semibold text-3xl text-(--primary)">
                        Black Angel Store
                    </h1>
                    <p className="text-xl text-(--secondary)">
                        The Incredible Wear
                    </p>
                    <p className="text-sm text-(--accent)">
                        Find Your Perfect Outfit Now!
                    </p>
                </div>

                {/* ===== SOCIAL MEDIA ===== */}
                <div className="flex flex-col gap-3 md:w-40">
                    <h1 className="text-xl font-semibold text-(--secondary)">
                        Social Media
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 grayscale hover:grayscale-0 transition">
                        <a
                            target="_blank"
                            href="https://www.instagram.com/blackangel.official.id/"
                        >
                            <Image src="/icon/instagram.svg" alt="Instagram" width={24} height={24} />
                        </a>
                        <a href="#">
                            <Image src="/icon/tokopedia.svg" alt="Tokopedia" width={24} height={24} />
                        </a>
                        <a href="#">
                            <Image src="/icon/shopee.svg" alt="Shopee" width={24} height={24} />
                        </a>
                        <a href="#">
                            <Image src="/icon/tiktok.svg" alt="Tiktok" width={24} height={24} />
                        </a>
                        <a href="#">
                            <Image src="/icon/facebook.svg" alt="Facebook" width={24} height={24} />
                        </a>
                    </div>
                </div>

                {/* ===== QUICK MENU ===== */}
                <div>
                    <h1 className="text-xl font-semibold text-(--secondary)">
                        Quick Menu
                    </h1>
                    <ul className="mt-2 space-y-1 text-(--secondary)">
                        {[
                            { label: "Home", href: "#homePage" },
                            { label: "Collection", href: "#collectionPage" },
                            { label: "Concierge", href: "#conciergePage" },
                        ].map(item => (
                            <li key={item.label}>
                                <a href={item.href} className="relative group text-lg">
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-(--primary) transition-all duration-300" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ===== CONTACT ===== */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-semibold text-(--secondary)">
                        Concierge Service
                    </h1>
                    <ul className="text-sm space-y-4 text-(--secondary)">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-(--primary)" />
                            <span>
                                9757 Aspen Lane South Richmond Hill, NY 11419
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone size={18} className="text-(--primary)" />
                            <span>+1 (291) 939 9321</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail size={18} className="text-(--primary)" />
                            <span>info@mywebsite.com</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* ===== COPYRIGHT ===== */}
            <p className="mt-10 text-center text-xs text-(--secondary)">
                &copy; {year} Black Angel Store. All rights reserved.
            </p>

        </footer>
    )
}
