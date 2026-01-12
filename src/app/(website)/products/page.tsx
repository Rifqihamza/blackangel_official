'use client'

import { useState } from "react"
import { useProducts } from "@/hooks/products/useProducts"
import ProductCard from "@/components/ProductCard/ProductCard"

export default function ProductPage() {
    const [page, setPage] = useState(1)
    const { products, totalPages, loading, error } = useProducts({ page })

    return (
        <section id="collectionPage" className="mx-auto px-6 py-25 bg-base-100">
            <div className="container mx-auto">
                <h1 className="text-xl md:text-6xl font-medium font-[Tangerine] text-center mb-8 tracking-wider text-(--primary)">
                    The Collection
                </h1>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <ProductCard key={i} isLoading />
                        ))}
                    </div>
                ) : error ? (
                    <div className="hero min-h-96 bg-base-200 rounded-box">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h1 className="text-3xl font-bold text-error">Error Loading Products</h1>
                                <p className="py-6 text-neutral-600">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="hero min-h-96 bg-base-200 rounded-box">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <div className="text-6xl mb-4">📦</div>
                                <h1 className="text-3xl font-bold">No Products Found</h1>
                                <p className="py-6 text-neutral-600">We`re working on adding new products to our collection.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                        <div className="join space-x-2">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const isActive = page === i + 1

                                return (
                                    <button
                                        key={i}
                                        disabled={loading}
                                        onClick={() => setPage(i + 1)}
                                        className={`join-item btn rounded-lg border-none ${isActive ? 'bg-(--primary) text-white' : 'bg-gray-200'}`}
                                    >
                                        {i + 1}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
