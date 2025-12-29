'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'

export default function useAdminProducts(page = 1, limit = 12, search = "", filterActive = "all") {
    const [products, setProducts] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [refresh, setRefresh] = useState(0)

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                    search,
                    filterActive
                })

                const res = await fetch(`/api/admin/products?${params}`)
                if (!res.ok) throw new Error("Failed to fetch products")
                const json = await res.json()
                setProducts(json.data)
                setTotalPages(json.meta.totalPages)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [page, limit, search, filterActive, refresh])

    const refetch = () => setRefresh(r => r + 1)

    return { products, totalPages, loading, error, refetch }
}
