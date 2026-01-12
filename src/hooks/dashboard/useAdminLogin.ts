"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useNotifications } from "@/lib/notificationContext"

interface LoginPayload {
    email: string
    password: string
}

export const useAdminLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const { addNotification } = useNotifications()

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
            const errorMessage = res.error && "Incorrect Email or Password!"
            setError(errorMessage)
            addNotification('error', `Login failed: ${errorMessage}`)
            setLoading(false)
            return
        }

        addNotification('success', 'Login successful! Welcome back.')
        router.push("/dashboard")
        setLoading(false)
        return res
    }

    return { login, loading, error }
}
