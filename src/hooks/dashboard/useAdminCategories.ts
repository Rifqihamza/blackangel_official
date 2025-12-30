"use client"

import { useEffect, useState } from "react"

export type Category = {
    id: number
    name: string
}

export function useAdminCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCategories = async () => {
        setLoading(true)
        const res = await fetch("/api/admin/categories")
        const data = await res.json()
        setCategories(data)
        setLoading(false)
    }

    const createCategory = async (name: string) => {
        await fetch("/api/admin/categories", {
            method: "POST",
            body: JSON.stringify({ name }),
        })
        await fetchCategories()
    }

    const updateCategory = async (id: number, name: string) => {
        await fetch(`/api/admin/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name }),
        })
        await fetchCategories()
    }

    const deleteCategory = async (id: number) => {
        await fetch(`/api/admin/categories/${id}`, {
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
        createCategory,
        updateCategory,
        deleteCategory,
        refetch: fetchCategories
    }
}
