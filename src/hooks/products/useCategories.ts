"use client"

import { useEffect, useState } from "react"

type Category = {
    id: number
    name: string
}

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories")
                const data = await res.json()
                setCategories(data)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return { categories, loading }
}
