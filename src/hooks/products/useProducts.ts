"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

type Params = {
    page: number
    category?: number | null
    search?: string
}

export function useProducts({ page, category, search }: Params) {
    const [products, setProducts] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const params = new URLSearchParams()
        params.set("page", String(page))

        if (category) params.set("category", String(category))
        if (search) params.set("search", search)

        const fetchProducts = async () => {
            setLoading(true)
            setError(null)

            try {
                const res = await fetch(`/api/products?${params.toString()}`)
                if (!res.ok) throw new Error()

                const json = await res.json()
                setProducts(json.data)
                setTotalPages(json.pagination.totalPages)
            } catch {
                setError("Failed to load products")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [page, category, search])

    return { products, totalPages, loading, error }
}
