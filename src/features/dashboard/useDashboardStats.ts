'use client'

import { useEffect, useState } from "react"
import { JsonValue } from "@prisma/client/runtime/library"

interface DashboardStats {
    totalProducts: number
    activeProducts: number
    totalCategories: number
    totalOrders: number
    totalRevenue: number
    productGrowth: number
    averageOrderValue: number
    conversionRate: number
    customerSatisfaction: number
    recentProducts: Array<{
        id: number
        name: string
        price: number
        images: JsonValue
        isActive: boolean
        category: {
            id: number
            name: string
        }
        createdAt: string
    }>
    categoryStats: Array<{
        id: number
        name: string
        productCount: number
    }>
}

export default function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/dashboard')

                if (!res.ok) throw new Error("Failed to fetch dashboard stats")

                const json = await res.json()

                if (json.success) {
                    setStats(json.data)
                } else {
                    throw new Error(json.error || "Failed to fetch data")
                }
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardStats()
    }, [])

    return { stats, loading, error }
}
