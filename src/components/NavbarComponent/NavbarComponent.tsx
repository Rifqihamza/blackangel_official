"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import NavMobileComponent from "./NavMobileComponent"
import Image from "next/image"
export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 md:w-1/3 w-full">
                    <Image
                        src="/img/blackangel_icon.jpg"
                        alt="Icon Black Angel"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <h1 className="font-thin md:text-3xl text-2xl uppercase tracking-widest font-[SaloonGirls]">
                        Black Angel
                    </h1>
                </div>
                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#homePage" className="relative group text-md md:text-xl tracking-wide">
                        Home
                        <span className="absolute -bottom-2 left-0 w-0 h-1 bg-accent group-hover:w-full duration-300"></span>
                    </a>
                    <a href="#productPage" className="relative group text-md md:text-xl tracking-wide">
                        Products
                        <span className="absolute -bottom-2 left-0 w-0 h-1 bg-accent group-hover:w-full duration-300"></span>
                    </a>
                    <a href="#contactPage" className="relative group text-md md:text-xl tracking-wide">
                        Contact
                        <span className="absolute -bottom-2 left-0 w-0 h-1 bg-accent group-hover:w-full duration-300"></span>
                    </a>
                </nav>

                {/* Mobile Button */}
                <button
                    className="md:hidden btn btn-ghost btn-sm"
                    onClick={() => setOpen(true)}
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* Mobile Menu */}
            <NavMobileComponent open={open} onClose={() => setOpen(false)} />
        </header>
    )
}
