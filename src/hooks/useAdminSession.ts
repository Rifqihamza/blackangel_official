import { useSession } from "next-auth/react"

export function useAdminSession() {
    const session = useSession()
    return {
        ...session,
        isAdmin: session.data?.user.role === "ADMIN",
    }
}
