"use client"

import { signOut } from "next-auth/react"
import { useNotifications } from "@/lib/notificationContext"

export const useAdminLogout = () => {
    const { addNotification } = useNotifications()

    const logout = async () => {
        await signOut({
            callbackUrl: "/dashboard/login",
        })
        addNotification('info', 'You have been logged out successfully.')
    }

    return { logout }
}
