'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function useAdminLogin() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (email: string, password: string) => {
        setLoading(true)
        setError(null)

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (res?.error) {
            setError("Email atau password salah")
            return
        }

        router.push("/dashboard")
    }

    return { login, loading, error }
}
