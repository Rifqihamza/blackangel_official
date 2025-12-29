'use client'

import { useState } from 'react'
import { ProductUpdateData, Product } from '@/types/product'

export default function useUpdateProduct() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const updateProduct = async (id: number, data: ProductUpdateData): Promise<Product> => {
        setLoading(true)
        setError('')
        try {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('slug', data.slug)
            formData.append('description', data.description)
            formData.append('price', data.price.toString())
            formData.append('categoryId', data.categoryId.toString())
            formData.append('isActive', data.isActive.toString())
            if (data.images) {
                for (let i = 0; i < data.images.length; i++) {
                    formData.append('images', data.images[i])
                }
            }
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'PUT',
                body: formData
            })
            if (!res.ok) throw new Error('Failed to update product')
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

    return { updateProduct, loading, error }
}
