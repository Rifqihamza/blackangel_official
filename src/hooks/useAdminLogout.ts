"use client"

import { signOut } from "next-auth/react"

export function useAdminLogout() {
    const logout = async () => {
        await signOut({ callbackUrl: "/dashboard/login" })
    }

    return { logout }
}
