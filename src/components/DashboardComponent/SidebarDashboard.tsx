'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, Package } from 'lucide-react'
import { usePathname } from 'next/navigation'

const menus = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/dashboard/products', icon: Package },
]

export default function SidebarDashboard() {
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
                <h1 className="text-2xl font-semibold tracking-widest font-[Tangerine]">
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
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${active ? 'bg-(--primary) text-white' : 'hover:bg-(--primary)'
                                }`}
                        >
                            <Icon size={20} />
                            {menu.name}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

