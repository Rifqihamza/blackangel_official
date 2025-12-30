"use client"

import { useEffect, useState } from "react"

export function useDashboardStats() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(setStats)
            .finally(() => setLoading(false))
    }, [])

    return { stats, loading }
}
