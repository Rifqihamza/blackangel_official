'use client'

import { useEffect, useState } from "react"

type DashboardStats = {
    totalProducts: number
    activeProducts: number
    totalCategories: number
    productGrowth: number
    recentProducts: any[]
    categoryStats: {
        id: number
        name: string
        productCount: number
    }[]
}

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/admin/dashboard/stats")
            .then(res => res.json())
            .then(data => setStats(data))
            .finally(() => setLoading(false))
    }, [])

    return { stats, loading }
}
