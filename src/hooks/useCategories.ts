'use client'

import { useEffect, useState } from "react"

interface Category {
    id: number
    name: string
}

export default function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/categories")

                if (!res.ok) throw new Error("Failed to fetch categories")

                const json = await res.json()

                setCategories(json.data)
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return { categories, loading, error }
}
