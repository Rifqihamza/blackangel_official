"use client"

import { useState } from "react"
import { Home, ShoppingBag, Phone, Menu } from "lucide-react"
import NavMobileComponent from "./NavMobileComponent"
import Image from "next/image"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* --- TOP NAVBAR --- */}
            <header className="sticky top-0 left-0 mb-8 z-50">
                <nav className="navbar w-full mx-auto bg-white shadow">

                    {/* Mobile Menu Button (Left) */}
                    <div className="navbar-start">
                        <div className="lg:hidden">
                            <button
                                onClick={() => setOpen(true)}
                                className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors"
                                aria-label="Open Menu"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Center Logo */}
                    <div className="navbar-center">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative">
                                <Image
                                    src="/img/icon.png"
                                    alt="Black Angel Logo"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <h1 className="md:text-3xl text-2xl font-[Tangerine] font-bold tracking-widest text-(--primary)">
                                Black Angel
                            </h1>
                        </div>
                    </div>

                    {/* Right Side (Placeholder for symmetry or CTA) */}
                    <div className="navbar-end">
                        <div className="hidden lg:flex px-4">
                            {/* Anda bisa menambahkan tombol 'Join' atau Jam di sini jika ingin simetris */}
                        </div>
                    </div>

                </nav>
            </header>

            {/* --- MOBILE DRAWER COMPONENT --- */}
            <NavMobileComponent open={open} onClose={() => setOpen(false)} />

            {/* --- SIDE NAVIGATION (Desktop Only) --- */}
            <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40">
                <div className="flex flex-col gap-4 p-2 bg-white rounded-2xl shadow-lg">
                    <NavItem href="#homePage" icon={<Home size={22} />} label="Home" />
                    <NavItem href="#collectionPage" icon={<ShoppingBag size={22} />} label="Collection" />
                    <NavItem href="#conciergePage" icon={<Phone size={22} />} label="Concierge" />
                </div>
            </nav>
        </>
    )
}

// Sub-component untuk Side Navigation agar kode lebih bersih
function NavItem({ href, icon, label }: { href: string, icon: React.ReactElement, label: string }) {
    return (
        <a
            href={href}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full text-base-content hover:bg-(--primary) hover:text-white transition-all duration-300"
        >
            {icon}
            {/* Tooltip on Hover */}
            <span className="absolute left-14 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest font-sans">
                {label}
            </span>
        </a>
    )
}