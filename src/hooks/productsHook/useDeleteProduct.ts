'use client'

import { useState } from 'react'

export default function useDeleteProduct() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const deleteProduct = async (id: number): Promise<void> => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE'
            })
            if (!res.ok) throw new Error('Failed to delete product')
        } catch (err) {
            const errorMessage = (err as Error).message
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return { deleteProduct, loading, error }
}
