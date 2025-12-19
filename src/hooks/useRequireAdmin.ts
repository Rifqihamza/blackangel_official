// src/hooks/useRequireAdmin.ts
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminSession } from "./useAdminSession"

export function useRequireAdmin() {
    const router = useRouter()
    const { isAdmin, isLoading } = useAdminSession()

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.replace("/dashboard/login")
        }
    }, [isLoading, isAdmin, router])

    return { isLoading }
}
