"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import NavMobileComponent from "./NavMobileComponent"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? " shadow-md" : "bg-transparent"}
      `}
        >
            <div className="px-6 md:px-0 ">
                <div className="mx-auto py-6 px-8 flex items-center justify-between">
                    {/* Logo */}
                    <h1
                        className={`md:text-4xl text-3xl font-[Tangerine] font-medium tracking-widest transition-colors duration-300
              ${scrolled ? "text-primary" : "text-primary"}
            `}
                    >
                        Black Angel
                    </h1>

                    {/* Desktop Menu */}
                    <nav
                        className={`hidden md:flex items-center gap-6 transition-colors duration-300
              ${scrolled ? "text-primary" : "text-primary"}
            `}
                    >
                        {["Home", "Collection", "Concierge"].map((item, i) => (
                            <a
                                key={i}
                                href={`#${item.toLowerCase()}Page`}
                                className="relative group"
                            >
                                <span className="text-md md:text-lg tracking-wider hover:text-accent duration-300">
                                    {item}
                                </span>
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Button */}
                    <button
                        className={`md:hidden btn btn-ghost btn-sm transition-colors
              ${scrolled ? "text-primary" : "text-white"}
            `}
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={22} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <NavMobileComponent open={open} onClose={() => setOpen(false)} />
            </div>
        </header>
    )
}
