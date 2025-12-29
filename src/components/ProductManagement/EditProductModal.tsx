'use client'

import { useState } from 'react'
import { Product, Category, ProductUpdateData } from '@/types/product'

interface EditProductModalProps {
    isOpen: boolean
    product: Product | null
    categories: Category[]
    onClose: () => void
    onSubmit: (data: ProductUpdateData) => Promise<void>
}

type FormData = {
    name: string
    slug: string
    description: string
    price: string
    images: FileList | null
    categoryId: string
    isActive: boolean
}

export default function EditProductModal({ isOpen, product, categories, onClose, onSubmit }: EditProductModalProps) {
    const [form, setForm] = useState<FormData>(() => {
        if (product) {
            return {
                name: product.name,
                slug: product.slug,
                description: product.description || '',
                price: product.price.toString(),
                images: null,
                categoryId: product.category?.id.toString() || '',
                isActive: product.isActive
            }
        }
        return {
            name: '',
            slug: '',
            description: '',
            price: '',
            images: null,
            categoryId: '',
            isActive: true
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            ...form,
            price: parseInt(form.price),
            images: form.images,
            categoryId: parseInt(form.categoryId)
        }
        await onSubmit(data)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Product</h3>
                <form onSubmit={handleSubmit} className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => {
                            const newName = e.target.value
                            setForm({
                                ...form,
                                name: newName,
                                slug: newName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                            })
                        }}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Slug"
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <select
                        value={form.categoryId}
                        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setForm({ ...form, images: e.target.files })}
                        className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2"
                    />
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                            className="mr-2"
                        />
                        Active
                    </label>
                    <div className="modal-action md:col-span-2">
                        <button type="button" onClick={onClose} className="btn">Cancel</button>
                        <button type="submit" className="btn bg-(--primary) text-white hover:bg-(--secondary)">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
