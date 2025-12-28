'use client'

import { useState } from 'react'
import Image from 'next/image'
import useProducts from '@/hooks/useProducts'

export default function AdminProductsPage() {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterActive, setFilterActive] = useState<string>('all')

    const { products, loading, error, totalPages } = useProducts(page, 12, searchTerm, filterActive)

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setPage(1) // Reset to page 1 when search changes
    }

    const handleFilterChange = (value: string) => {
        setFilterActive(value)
        setPage(1) // Reset to page 1 when filter changes
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={filterActive}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Products</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    const imageUrl =
                        product.images?.[0] && product.images[0] !== ""
                            ? product.images[0]
                            : "/img/placeholder.jpg"
                    return (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
                        >
                            <div className="relative h-56 rounded-lg overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="mt-10">
                                <h3 className="mt-3 font-semibold text-(--primary)">{product.name}</h3>
                                <p className="text-sm text-(--secondary) line-clamp-2">
                                    {product.description}
                                </p>
                                <p className="mt-2 font-bold text-black">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* PAGINATION */}
            <div className="flex justify-center mt-10">
                <div className="join gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const isActive = page === i + 1

                        return (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`
                        join-item btn border-none
                        ${isActive
                                        ? "bg-(--secondary) text-white"
                                        : "bg-(--primary) text-black hover:bg-(--secondary)"
                                    }
                    `}
                            >
                                {i + 1}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
