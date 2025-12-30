import { useSession } from "next-auth/react"

export function useAdminSession() {
    const { data, status } = useSession()
    return {
        isAdmin: data?.user?.role === "ADMIN",
        loading: status === "loading",
    }
}
