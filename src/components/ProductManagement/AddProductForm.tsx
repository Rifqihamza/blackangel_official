'use client'

import { useState } from 'react'

interface Category {
    id: number
    name: string
}

interface ProductData {
    name: string
    slug: string
    description: string
    price: number
    images: string[]
    categoryId: number
    isActive: boolean
}

interface AddProductFormProps {
    categories: Category[]
    onSubmit: (data: ProductData) => Promise<void>
}

export default function AddProductForm({ categories, onSubmit }: AddProductFormProps) {
    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        images: '',
        categoryId: '',
        isActive: true
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            ...form,
            price: parseInt(form.price),
            images: form.images.split(',').map(s => s.trim()).filter(s => s),
            categoryId: parseInt(form.categoryId)
        }
        await onSubmit(data)
        // Reset form
        setForm({
            name: '',
            slug: '',
            description: '',
            price: '',
            images: '',
            categoryId: '',
            isActive: true
        })
    }

    return (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                    type="text"
                    placeholder="Images (comma separated URLs)"
                    value={form.images}
                    onChange={(e) => setForm({ ...form, images: e.target.value })}
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
                <button type="submit" className="btn bg-(--primary) text-white hover:bg-(--secondary) md:col-span-2">
                    Add Product
                </button>
            </form>
        </div>
    )
}
