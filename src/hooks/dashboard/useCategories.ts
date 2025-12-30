'use client'

import { useEffect, useState } from "react"
import { Category } from "@/types/product"

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/admin/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .finally(() => setLoading(false))
    }, [])

    return { categories, loading }
}
