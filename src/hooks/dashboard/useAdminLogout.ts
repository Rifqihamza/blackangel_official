'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAdminLogout() {
    const router = useRouter()

    const logout = async () => {
        await signOut({ redirect: false })
        router.push("/dashboard/login")
    }

    return { logout }
}
