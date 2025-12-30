'use client'

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

export function useAdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        setLoading(true)
        const res = await fetch("/api/admin/products")
        const data = await res.json()
        setProducts(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const createProduct = async (payload: any) => {
        await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        fetchProducts()
    }

    const updateProduct = async (id: number, payload: any) => {
        await fetch(`/api/admin/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        fetchProducts()
    }

    const deleteProduct = async (id: number) => {
        await fetch(`/api/admin/products/${id}`, {
            method: "DELETE",
        })
        fetchProducts()
    }

    return {
        products,
        loading,
        createProduct,
        updateProduct,
        deleteProduct,
        refetch: fetchProducts,
    }
}
