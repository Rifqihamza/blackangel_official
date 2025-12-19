import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="relative w-full max-w-7xl border-t border-gray-300 mx-auto px-5 py-7">
            <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between">
                {/* Title */}
                <div className="">
                    <h1 className="font-semibold text-3xl text-primary">Black Angel Store</h1>
                    <p className="text-2xl">The Incredible Wear</p>
                    <p className="text-sm">Find Your Perfect Outfit Now!</p>
                </div>
                {/* Social Media */}
                <div className="flex flex-col gap-1 md:w-37.5 w-full">
                    <h1 className="text-xl font-semibold text-accent">Social Media</h1>
                    <div className="flex flex-wrap items-center gap-4 grayscale">
                        <a target="_blank" href="https://www.instagram.com/blackangel.official.id/">
                            <Image src="/icon/instagram.svg" alt="Instagram Icon" width={25} height={25} />
                        </a>
                        <a href="">
                            <Image src="/icon/tokopedia.svg" alt="Instagram Icon" width={25} height={25} />
                        </a>
                        <a href="">
                            <Image src="/icon/shopee.svg" alt="Instagram Icon" width={25} height={25} />
                        </a>
                        <a href="">
                            <Image src="/icon/tiktok.svg" alt="Instagram Icon" width={25} height={25} />
                        </a>
                        <a href="">
                            <Image src="/icon/facebook.svg" alt="Instagram Icon" width={25} height={25} />
                        </a>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-accent">Quick Menu</h1>
                    <ul className="font-normal">
                        <li>
                            <a href="#homePage" className="relative group text-lg">
                                Home
                                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 duration-300 bg-secondary"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#productPage" className="relative group text-lg">
                                Product
                                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 duration-300 bg-secondary"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#contactPage" className="relative group text-lg">
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 duration-300 bg-secondary"></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2 items-staret">
                    <h1 className="text-xl font-semibold text-accent">Concierge Service</h1>
                    <ul className="text-sm space-y-4">
                        <li className="flex items-start gap-3">
                            <MapPin size={20} />
                            <span>9757 Aspen Lane South Richmond Hill, NY 11419</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone size={20} />
                            <span>+1 (291) 939 9321</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail size={20} />
                            <span>info@mywebsite.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="absolute bottom-0 inset-x-0 text-center text-xs text-gray-400">&copy; {year} CodersProject. All rights reserved.</p>
        </footer >
    )
}