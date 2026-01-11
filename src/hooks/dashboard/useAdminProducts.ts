"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { adminFetch } from "@/lib/adminFetch"

export function useAdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const data = await adminFetch<Product[]>("/api/admin/products")
            setProducts(data)
        } finally {
            setLoading(false)
        }
    }

    const createProduct = async (formData: FormData) => {
        await fetch("/api/admin/products", {
            method: "POST",
            body: formData,
            credentials: "include",
        })
        await fetchProducts()
    }

    const updateProduct = async (id: number, formData: FormData) => {
        await fetch(`/api/admin/products/${id}`, {
            method: "PUT",
            body: formData,
            credentials: "include",
        })
        await fetchProducts()
    }

    const deleteProduct = async (id: number) => {
        await adminFetch(`/api/admin/products/${id}`, {
            method: "DELETE",
        })
        await fetchProducts()
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return { products, loading, createProduct, updateProduct, deleteProduct }
}
