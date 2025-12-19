"use client"

export function useAdminLogout() {
    const logout = async () => {
        await fetch("/api/admin/logout", { method: "POST" })
        window.location.href = "/dashboard/login"
    }

    return { logout }
}
