
'use client'

import { useState } from "react"
import { useProducts } from "@/features/products/hookProducts"
import { useCategories } from "@/features/categories"
import ProductCard from "@/components/ProductCard/ProductCard"

export default function ProductPage() {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const { products, totalPages, loading } = useProducts(page, 12, searchTerm, "active", selectedCategory)
    const { categories } = useCategories()

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setPage(1) // Reset to page 1 when search changes
    }

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        setPage(1) // Reset to page 1 when category changes
    }

    return (
        <section id="collectionPage" className=" mx-auto px-6 py-25">
            <h1 className="text-xl md:text-6xl font-medium font-[Tangerine] text-center mb-8 tracking-wider text-(--primary)">
                The Collection</h1>

            {/* SEARCH AND FILTER CONTROLS */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id.toString()}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="skeleton bg-gray-300 h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

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

        </section>
    )
}
