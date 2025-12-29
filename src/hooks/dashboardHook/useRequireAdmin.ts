// src/hooks/useRequireAdmin.ts
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
<<<<<<<< HEAD:src/features/dashboard/useRequireAdmin.ts
import { useAdminSession } from "../auth/useAdminSession"
========
import { useAdminSession } from "../authHook/useAdminSession"
>>>>>>>> 970c784 (huge update):src/hooks/dashboardHook/useRequireAdmin.ts

export default function useRequireAdmin() {
    const router = useRouter()
    const { isAdmin, isLoading } = useAdminSession()

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.replace("/dashboard/login")
        }
    }, [isLoading, isAdmin, router])

    return { isLoading }
}
