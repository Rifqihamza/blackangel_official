"use client"

import { useState } from "react"
import { Home, ShoppingBag, Phone, Menu } from "lucide-react"
import NavMobileComponent from "./NavMobileComponent"
import Image from "next/image"
export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Top Header - Logo Centered */}
            <header className="w-full max-w-7xl mx-auto rounded-2xl z-40 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 transition-all duration-300">
                <div className="flex items-center justify-center">
                    {/* Center Logo */}
                    <div className="text-center">
                        <div className="flex items-center justify-center">
                            <Image src="/img/icon.png" alt="Icon of black Angel" width={40} height={40} className="sm:w-10 sm:h-12 md:w-14 md:h-16" />
                            <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-[Tangerine] font-semibold tracking-widest">
                                Black Angel
                            </h1>
                        </div>
                    </div>

                    {/* Mobile Menu Button - Only on mobile */}
                    <div className="absolute right-4 sm:hidden">
                        <button onClick={() => setOpen(true)} className="text-(--primary) hover:shadow-xl duration-400">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <NavMobileComponent open={open} onClose={() => setOpen(false)} />
            </header>

            {/* Fixed Bottom Navigation - Desktop Only */}
            <nav className="hidden sm:flex fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-1 py-0.5 z-50 items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 border border-gray-200">
                <a href="#homePage" className="hover:opacity-70 transition hover:bg-(--primary) hover:text-white p-4 rounded-full">
                    <Home className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" strokeWidth={1.5} />
                </a>

                <a href="#collectionPage" className="hover:opacity-70 transition hover:bg-(--primary) hover:text-white p-4 rounded-full">
                    <ShoppingBag className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" strokeWidth={1.5} />
                </a>

                <a href="#conciergePage" className="hover:opacity-70 transition hover:bg-(--primary) hover:text-white p-4 rounded-full">
                    <Phone className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" strokeWidth={1.5} />
                </a>
            </nav>
        </>
    )
}
