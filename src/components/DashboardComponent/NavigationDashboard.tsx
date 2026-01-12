'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Menu, Package, LogOut } from "lucide-react"
import { useAdminLogout } from "@/hooks/dashboard/useAdminLogout"

const menus = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/adminProduct", icon: Package },
]

export default function NavigationDashboard() {
    const pathname = usePathname()
    const { logout } = useAdminLogout()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen sticky top-0 left-0">
            {/* Sidebar */}
            <aside
                className={`bg-white shadow-md flex flex-col transition-all duration-300 ${sidebarOpen ? "w-60" : "w-16"
                    }`}
            >
                {/* Logo & Toggle */}
                <div className="flex items-center justify-between p-4 relative">
                    <div className="flex items-center">
                        {/* Logo selalu terlihat */}
                        <Image
                            src="/img/icon.png"
                            alt="Icon Black Angel"
                            width={40}
                            height={40}
                            className={`rounded-full transition-all duration-300 ${sidebarOpen ? "opacity-100 scale-100" : "opacity-0"
                                }`}
                        />
                        {/* Judul muncul saat sidebar terbuka */}
                        <h1
                            className={`text-xl uppercase tracking-widest font-[SaloonGirls] transition-all duration-300 overflow-hidden whitespace-nowrap ${sidebarOpen ? "opacity-100 scale-100 ml-2" : "opacity-0 scale-95 ml-0"
                                }`}
                        >
                            Black Angel
                        </h1>
                    </div>

                    {/* Toggle Button selalu terlihat */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 rounded hover:bg-gray-200 transition"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Menu */}
                <nav className={`flex-1 mt-4 space-y-4 ${sidebarOpen ? "px-4" : "px-1.5"} transition-all duration-300`}>
                    {menus.map((menu) => {
                        const Icon = menu.icon
                        const active = pathname === menu.href
                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300 ${active ? "bg-(--primary) text-white" : "hover:bg-(--accent)/20"
                                    }`}
                            >
                                {/* Icon selalu terlihat */}
                                <Icon size={20} className="shrink-0" />
                                {/* Teks menu muncul saat sidebar terbuka */}
                                <span
                                    className={`transition-all duration-300 overflow-hidden ${sidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 w-0"
                                        }`}
                                >
                                    {menu.name}
                                </span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4">
                    <button
                        onClick={logout}
                        className="flex items-center justify-center w-full px-4 py-2 rounded-lg transition-all duration-300 bg-red-500/20 border-2 border-red-500 text-red-600 hover:opacity-80"
                    >
                        {sidebarOpen ? (
                            <span className="flex items-center gap-2">
                                <LogOut size={20} />
                                Logout
                            </span>
                        ) : (
                            <span>
                                <LogOut size={20} />
                            </span>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main content placeholder */}
            <div className="flex-1 flex flex-col"></div>
        </div>
    )
}
