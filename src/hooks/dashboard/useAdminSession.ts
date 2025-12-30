'use client'

import { useSession } from "next-auth/react"

export function useAdminSession() {
    const { data, status } = useSession()

    const isAdmin = data?.user && (data.user).role === "ADMIN"

    return {
        session: data,
        isAdmin,
        loading: status === "loading",
    }
}
