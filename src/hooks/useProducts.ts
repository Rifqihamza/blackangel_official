'use client'

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

export default function useProducts(page = 1, limit = 8, search = "", filterActive = "active", categoryId = "") {
    const [products, setProducts] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                    search,
                    filterActive,
                    categoryId
                })

                const res = await fetch(`/api/products?${params}`)

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
    }, [page, limit, search, filterActive, categoryId])

    return { products, totalPages, loading, error }
}
