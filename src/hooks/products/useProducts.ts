'use client'

import { useEffect, useState } from "react"
import { Product, ProductListResponse } from "@/types/product"

export function useProducts(page: number) {
    const [products, setProducts] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let active = true
        setLoading(true)

        fetch(`/api/products?page=${page}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch products")
                return res.json()
            })
            .then((data: ProductListResponse) => {
                if (!active) return
                setProducts(data.products)
                setTotalPages(data.totalPages)
            })
            .catch(err => {
                if (!active) return
                setError(err.message)
            })
            .finally(() => {
                if (!active) return
                setLoading(false)
            })

        return () => {
            active = false
        }
    }, [page])

    return { products, totalPages, loading, error }
}
