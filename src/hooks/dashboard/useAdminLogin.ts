"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

interface LoginPayload {
    email: string
    password: string
}

export const useAdminLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const login = async ({ email, password }: LoginPayload) => {
        setLoading(true)
        setError(null)
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/dashboard"
        })

        if (res?.error) {
            setError(res.error || "Email atau Password Salah!")
            setLoading(false)
            return
        }

        router.push("/dashboard")
        setLoading(false)
        return res
    }

    return { login, loading, error }
}
