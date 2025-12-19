"use client"

import Link from "next/link"
import { LayoutDashboard, Package, Tags } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAdminLogout } from "@/hooks/useAdminLogout"

const menus = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Categories", href: "/dashboard/categories", icon: Tags },
]

export const AdminSideBar = () => {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 px-6 py-8">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
                <Image
                    src="/img/blackangel_icon.jpg"
                    alt="Icon Black Angel"
                    width={36}
                    height={36}
                    className="rounded-full"
                />
                <h1 className="text-xl uppercase tracking-widest font-[SaloonGirls]">
                    Black Angel
                </h1>
            </div>

            {/* Menu */}
            <nav className="space-y-1">
                {menus.map((menu) => {
                    const Icon = menu.icon
                    const active = pathname === menu.href

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${active ? "bg-primary/20" : "hover:bg-primary/10"}`}>
                            <Icon size={20} />
                            {menu.name}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

export const AdminHeader = () => {
    const { logout } = useAdminLogout()

    return (
        <header className="h-16 w-full bg-black px-6 flex items-center justify-end sticky top-0">
            <button
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm hover:bg-primary hover:text-white transition"
            >
                Logout
            </button>
        </header>
    )
}

const AdminComponents = { AdminHeader, AdminSideBar }

export default AdminSideBar
export { AdminComponents }
