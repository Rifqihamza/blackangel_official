"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAdminSession() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const isLoading = status === "loading"
    const isAuthenticated = status === "authenticated"
    const isAdmin = session?.user?.role === "ADMIN"

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || !isAdmin)) {
            router.replace("/dashboard/login")
        }
    }, [isLoading, isAuthenticated, isAdmin, router])

    return {
        session,
        isLoading,
        isAuthenticated,
        isAdmin,
    }
}
