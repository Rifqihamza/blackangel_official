"use client"

import { useState } from "react"
import { Home, ShoppingBag, Phone, Menu } from "lucide-react"
import NavMobileComponent from "./NavMobileComponent"
import Image from "next/image"
export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="w-full max-w-7xl mx-auto rounded-2xl z-50 py-4 px-2 transition-all duration-300">
            <div className="flex flex-row-reverse md:flex-row items-center justify-between">

                {/* Left spacer */}
                <div className="flex-1" />

                {/* Center Logo */}
                <div className="flex-2 md:flex-1 text-center">
                    <div className="flex items-center justify-center">
                        <Image src="/img/icon.png" alt="Icon of black Angel" width={60} height={60} />
                        <h1 className="md:text-3xl text-2xl font-[Tangerine] font-semibold tracking-widest">
                            Black Angel
                        </h1>
                    </div>
                </div>

                {/* Right Navigation Icons */}
                <div className="flex-1 flex justify-start md:justify-end">
                    <nav className="hidden md:flex items-center gap-10">
                        <a href="#homePage" className="hover:opacity-70 transition">
                            <Home size={26} strokeWidth={1.5} />
                        </a>

                        <a href="#collectionPage" className="hover:opacity-70 transition">
                            <ShoppingBag size={26} strokeWidth={1.5} />
                        </a>

                        <a href="#conciergePage" className="hover:opacity-70 transition">
                            <Phone size={26} strokeWidth={1.5} />
                        </a>
                    </nav>
                    <div className="flex md:hidden">
                        <button onClick={() => setOpen(true)} className="text-(--primary) hover:shadow-xl duration-400">
                            <Menu size={30} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <NavMobileComponent open={open} onClose={() => setOpen(false)} />
        </header>
    )
}
