'use client'

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

export default function useProducts(page: number) {
    const [products, setProducts] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setError("")

            try {
                const res = await fetch(`/api/products?page=${page}&limit=8`)
                if (!res.ok) throw new Error("Failed to fetch products")

                const json = await res.json()

                setProducts(json.data)
                setTotalPages(json.totalPages)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [page])

    return { products, totalPages, loading, error }
}
