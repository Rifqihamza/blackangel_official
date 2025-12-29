'use client'

import { useState } from 'react'
import { ProductCreateData, Product } from '@/types/product'

export default function useAddProduct() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const addProduct = async (data: ProductCreateData): Promise<Product> => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error('Failed to add product')
            const product = await res.json()
            return product
        } catch (err) {
            const errorMessage = (err as Error).message
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return { addProduct, loading, error }
}
