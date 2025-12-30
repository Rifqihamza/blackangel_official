"use client"

import { useAdminLogout } from "@/hooks/dashboardHook/useAdminLogout"
import SidebarDashboard from "./SidebarDashboard"

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

export const AdminSideBar = SidebarDashboard

const AdminComponents = { AdminHeader, AdminSideBar }

export default AdminSideBar
export { AdminComponents }
