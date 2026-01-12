"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { adminFetch } from "@/lib/adminFetch"
import { useNotifications } from "@/lib/notificationContext"

export function useAdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const { addNotification } = useNotifications()

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
        try {
            await fetch("/api/admin/products", {
                method: "POST",
                body: formData,
                credentials: "include",
            })
            addNotification('success', 'Product created successfully!')
            await fetchProducts()
        } catch (error) {
            addNotification('error', 'Failed to create product. Please try again.')
            throw error
        }
    }

    const updateProduct = async (id: number, formData: FormData) => {
        try {
            await fetch(`/api/admin/products/${id}`, {
                method: "PUT",
                body: formData,
                credentials: "include",
            })
            addNotification('success', 'Product updated successfully!')
            await fetchProducts()
        } catch (error) {
            addNotification('error', 'Failed to update product. Please try again.')
            throw error
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            await adminFetch(`/api/admin/products/${id}`, {
                method: "DELETE",
            })
            addNotification('success', 'Product deleted successfully!')
            await fetchProducts()
        } catch (error) {
            addNotification('error', 'Failed to delete product. Please try again.')
            throw error
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return { products, loading, createProduct, updateProduct, deleteProduct }
}
