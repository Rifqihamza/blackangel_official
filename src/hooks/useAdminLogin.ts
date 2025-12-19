"use client"

import { useState } from "react"

export function useAdminLogin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (email: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
                const data = await res.json()
                setError(data.message || "Login failed")
                setLoading(false)
                return false
            }

            window.location.href = "/dashboard"
            return true
        } catch (err) {
            setError("Network error")
            setLoading(false)
            return false
        }
    }

    return {
        login,
        loading,
        error,
    }
}
