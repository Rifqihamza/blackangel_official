import { X } from "lucide-react"
import Image from "next/image"
type NavMobileProps = {
    open: boolean
    onClose: () => void
}

export default function NavMobileComponent({
    open,
    onClose,
}: NavMobileProps) {
    return (
        <div
            className={`fixed md:hidden inset-0 z-50 transition-opacity duration-300
                ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
            onClick={onClose}
        >
            <aside
                className={`absolute right-0 top-0 h-screen w-[80%] max-w-sm bg-black
                    transform transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative flex h-full flex-col p-8">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-6 rounded-full p-2 text-white transition hover:bg-gray-100 hover:text-black"
                        aria-label="Close menu"
                    >
                        <X size={30} />
                    </button>

                    {/* Title */}
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

                    {/* Navigation */}
                    <nav className="flex flex-col gap-3 mt-6">
                        <NavItem href="#homePage" onClick={onClose}>
                            Home
                        </NavItem>
                        <NavItem href="#productPage" onClick={onClose}>
                            Products
                        </NavItem>
                        <NavItem href="#contactPage" onClick={onClose}>
                            Contact
                        </NavItem>
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-6 text-sm text-gray-400">
                        © 2025 Black Angel
                    </div>
                </div>
            </aside>
        </div>
    )
}
function NavItem({
    href,
    children,
    onClick,
}: {
    href: string
    children: React.ReactNode
    onClick: () => void
}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className="
                rounded-xl px-4 py-3 text-xl font-medium text-white
                transition-all duration-200
                hover:bg-black hover:text-white
                active:scale-[0.97]
            "
        >
            {children}
        </a>
    )
}
