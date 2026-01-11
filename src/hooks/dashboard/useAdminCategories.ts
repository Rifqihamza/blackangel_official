"use client"

import { useEffect, useState } from "react"
import { adminFetch } from "@/lib/adminFetch"

export type Category = {
    id: number
    name: string
}

export function useAdminCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCategories = async () => {
        try {
            setLoading(true)
            const data = await adminFetch<Category[]>("/api/admin/categories")
            setCategories(data)
        } finally {
            setLoading(false)
        }
    }

    const createCategory = async (name: string) => {
        await adminFetch("/api/admin/categories", {
            method: "POST",
            body: JSON.stringify({ name }),
        })
        await fetchCategories()
    }

    const updateCategory = async (id: number, name: string) => {
        await adminFetch(`/api/admin/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name }),
        })
        await fetchCategories()
    }

    const deleteCategory = async (id: number) => {
        await adminFetch(`/api/admin/categories/${id}`, {
            method: "DELETE",
        })
        await fetchCategories()
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return {
        categories,
        loading,
        refetch: fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}
