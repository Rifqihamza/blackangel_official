'use client'

import { useAdminLogout } from '@/features/dashboard/useAdminLogout'

export default function HeaderDashboard() {
    const { logout } = useAdminLogout()

    return (
        <header className="h-16 w-full bg-white px-6 flex items-center justify-end sticky top-0">
            <button
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm text-red-600 bg-error/50 border-2 border-error uppercase tracking-widest hover:opacity-70 cursor-pointer transition"
            >
                Logout
            </button>
        </header>
    )
}