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
                className={`absolute right-0 top-0 h-screen w-full bg-(--primary)
                    transform transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative flex h-full w-full flex-col py-10 px-8">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-10 rounded-full p-2 text-white transition hover:bg-(--muted) hover:scale-[0.97] hover:text-white"
                        aria-label="Close menu"
                    >
                        <X size={30} />
                    </button>

                    {/* Title */}
                    <div className="flex items-center gap-3 md:w-1/3 w-full">
                        <Image
                            src="/img/icon.png"
                            alt="Icon Black Angel"
                            width={50}
                            height={50}
                            className="rounded-full invert-100"
                        />
                        <h1 className="font-thin text-3xl uppercase tracking-widest font-[SaloonGirls] text-white">
                            Black Angel
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-3 mt-6">
                        <NavItem href="#homePage" onClick={onClose}>
                            Home
                        </NavItem>
                        <NavItem href="#productPage" onClick={onClose}>
                            Collection
                        </NavItem>
                        <NavItem href="#contactPage" onClick={onClose}>
                            Concierge
                        </NavItem>
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-6 text-sm text-gray-400 text-center">
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
                hover:bg-(--accent) hover:text-white
                active:scale-[0.97] hover:scale-[0.97]
            "
        >
            {children}
        </a>
    )
}
