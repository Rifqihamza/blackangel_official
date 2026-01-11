"use client"

import { useEffect, useState } from "react"
import { adminFetch } from "@/lib/adminFetch"
import { DashboardStats } from "@/types/dashboardStats"

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        adminFetch<DashboardStats>("/api/admin/stats")
            .then(setStats)
            .catch(() => setStats(null))
            .finally(() => setLoading(false))
    }, [])

    return { stats, loading }
}
