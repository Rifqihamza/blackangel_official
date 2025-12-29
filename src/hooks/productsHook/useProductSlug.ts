"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

export default function useProductSlug(slug?: string) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!slug) return

        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${slug}`)

                if (!res.ok) {
                    throw new Error("Product not found")
                }

                const data: Product = await res.json()
                setProduct(data)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [slug])

    return { product, loading, error }
}
