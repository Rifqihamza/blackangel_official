import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="w-full max-w-7xl mx-auto bg-white text-base-content p-10 border-t border-base-300">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* ===== BRAND ===== */}
                    <div className="space-y-3">
                        <div>
                            <h1 className="font-bold text-3xl text-(--primary)">
                                Black Angel Store
                            </h1>
                            <p className="text-lg text-(--secondary) font-medium">
                                The Incredible Wear
                            </p>
                        </div>
                        <p className="text-sm text-neutral-600">
                            Find Your Perfect Outfit Now!
                        </p>
                    </div>

                    {/* ===== SOCIAL MEDIA ===== */}
                    <div className="space-y-3">
                        <h1 className="text-lg font-semibold text-(--secondary)">
                            Social Media
                        </h1>
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                target="_blank"
                                href="https://www.instagram.com/blackangel.official.id/"
                                className="btn btn-md btn-circle border-none bg-(--secondary)/10 hover:ring-6 hover:ring-(--primary)"
                            >
                                <Image src="/icon/instagram.svg" alt="Instagram" width={20} height={20} />
                            </a>
                            <a href="#" className="btn btn-md btn-circle border-none bg-(--secondary)/10 hover:ring-6 hover:ring-(--primary)">
                                <Image src="/icon/tokopedia.svg" alt="Tokopedia" width={20} height={20} />
                            </a>
                            <a href="#" className="btn btn-md btn-circle border-none bg-(--secondary)/10 hover:ring-6 hover:ring-(--primary)">
                                <Image src="/icon/shopee.svg" alt="Shopee" width={20} height={20} />
                            </a>
                            <a href="#" className="btn btn-md btn-circle border-none bg-(--secondary)/10 hover:ring-6 hover:ring-(--primary)">
                                <Image src="/icon/tiktok.svg" alt="Tiktok" width={20} height={20} />
                            </a>
                            <a href="#" className="btn btn-md btn-circle border-none bg-(--secondary)/10 hover:ring-6 hover:ring-(--primary)">
                                <Image src="/icon/facebook.svg" alt="Facebook" width={20} height={20} />
                            </a>
                        </div>
                    </div>

                    {/* ===== QUICK MENU ===== */}
                    <div className="space-y-3">
                        <h1 className="text-lg font-semibold text-(--secondary)">
                            Quick Menu
                        </h1>
                        <ul className="space-y-2">
                            {[
                                { label: "Home", href: "#homePage" },
                                { label: "Collection", href: "#collectionPage" },
                                { label: "Concierge", href: "#conciergePage" },
                            ].map(item => (
                                <li key={item.label}>
                                    <a href={item.href} className="font-medium tracking-wider relative group w-full">
                                        {item.label}
                                        <span className="absolute bottom-0 left-0 bg-(--secondary) w-0 h-0.5 group-hover:w-full duration-300"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ===== CONTACT ===== */}
                    <div className="space-y-3">
                        <h1 className="text-lg font-semibold text-(--secondary)">
                            Concierge Service
                        </h1>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-(--primary) mt-0.5 shrink-0" />
                                <span className="text-neutral-600">
                                    9757 Aspen Lane South Richmond Hill, NY 11419
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={16} className="text-(--primary) mt-0.5 shrink-0" />
                                <span className="text-neutral-600">+1 (291) 939 9321</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={16} className="text-(--primary) mt-0.5 shrink-0" />
                                <span className="text-neutral-600">info@mywebsite.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ===== COPYRIGHT ===== */}
                <div className="divider my-8"></div>
                <p className="text-center text-sm text-neutral-600">
                    &copy; {year} CodersProject. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
