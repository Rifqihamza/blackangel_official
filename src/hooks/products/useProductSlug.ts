'use client'

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

export function useProductSlug(slug?: string) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!slug) return

        let active = true
        setLoading(true)

        fetch(`/api/products/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error("Product not found")
                return res.json()
            })
            .then((data: Product) => {
                if (!active) return
                setProduct(data)
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
    }, [slug])

    return { product, loading, error }
}
