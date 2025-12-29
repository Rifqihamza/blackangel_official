'use client'

import { useEffect, useState } from "react"
import {
    Product,
    ProductCreateData,
    ProductUpdateData
} from "@/types/product"

/* =====================================================
   🔹 GET PRODUCTS (LIST)
===================================================== */
export function useProducts(
    page = 1,
    limit = 12,
    search = "",
    filterActive = "active",
    categoryId = ""
) {
    const [products, setProducts] = useState<Product[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setError("")

            try {
                const params = new URLSearchParams()

                if (limit && limit > 0) {
                    params.append("page", page.toString())
                    params.append("limit", limit.toString())
                }

                if (search) params.append("search", search)
                if (filterActive) params.append("filterActive", filterActive)
                if (categoryId) params.append("categoryId", categoryId)

                const res = await fetch(`/api/products?${params}`)
                if (!res.ok) throw new Error("Failed to fetch products")

                const json = await res.json()

                setProducts(json.data)
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

/* =====================================================
   🔹 GET PRODUCT BY SLUG
===================================================== */
export function useProductSlug(slug?: string) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!slug) return

        const fetchProduct = async () => {
            setLoading(true)
            setError("")

            try {
                const res = await fetch(`/api/products/${slug}`)
                if (!res.ok) throw new Error("Product not found")

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

/* =====================================================
   🔹 CREATE PRODUCT (ADMIN)
===================================================== */
export function useAddProduct() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const addProduct = async (data: ProductCreateData): Promise<Product> => {
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error("Failed to add product")

            return await res.json()
        } catch (err) {
            const msg = (err as Error).message
            setError(msg)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { addProduct, loading, error }
}

/* =====================================================
   🔹 UPDATE PRODUCT (ADMIN)
===================================================== */
export function useUpdateProduct() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const updateProduct = async (
        id: number,
        data: ProductUpdateData
    ): Promise<Product> => {
        setLoading(true)
        setError("")

        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error("Failed to update product")

            return await res.json()
        } catch (err) {
            const msg = (err as Error).message
            setError(msg)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { updateProduct, loading, error }
}

/* =====================================================
   🔹 DELETE PRODUCT (ADMIN)
===================================================== */
export function useDeleteProduct() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const deleteProduct = async (id: number): Promise<void> => {
        setLoading(true)
        setError("")

        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: "DELETE",
            })

            if (!res.ok) throw new Error("Failed to delete product")
        } catch (err) {
            const msg = (err as Error).message
            setError(msg)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { deleteProduct, loading, error }
}
