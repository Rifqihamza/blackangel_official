"use client"

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

    const createProduct = async (data: any) => {
        await fetch("/api/admin/products", {
            method: "POST",
            body: JSON.stringify(data),
        })
        fetchProducts()
    }

    const updateProduct = async (id: number, data: any) => {
        await fetch(`/api/admin/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
        fetchProducts()
    }

    const deleteProduct = async (id: number) => {
        await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
        fetchProducts()
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return {
        products,
        loading,
        refetch: fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    }
}
