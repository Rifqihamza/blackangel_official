'use client'

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

export default function useProducts(page = 1, limit = 12, search = "", filterActive = "active", categoryId = "") {
    const [products, setProducts] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams()

                // Only add page parameter if limit > 0 (pagination mode)
                // If limit is 0 or falsy, fetch all products without pagination
                if (limit && limit > 0) {
                    params.append('page', page.toString())
                    params.append('limit', limit.toString())
                }

                params.append('search', search)
                params.append('filterActive', filterActive)
                params.append('categoryId', categoryId)

                const res = await fetch(`/api/products?${params}`)

                if (!res.ok) throw new Error("Failed to fetch products")

                const json = await res.json()

                setProducts(json.data)
                // Set totalPages to 1 when fetching all products (no pagination)
                setTotalPages(limit && limit > 0 ? json.meta.totalPages : 1)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [page, limit, search, filterActive, categoryId])

    return { products, totalPages, loading, error }
}
