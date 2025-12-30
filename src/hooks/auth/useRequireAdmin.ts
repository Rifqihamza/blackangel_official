import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminSession } from "./useAdminSession"

export function useRequireAdmin() {
    const { isAdmin, loading } = useAdminSession()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAdmin) {
            router.replace("/dashboard/login")
        }
    }, [loading, isAdmin, router])
}
