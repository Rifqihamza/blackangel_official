'use client'

import { useState } from "react"
import { useProducts } from "@/hooks/products/useProducts"
import ProductCard from "@/components/ProductCard/ProductCard"

export default function ProductPage() {
    const [page, setPage] = useState(1)
    const { products, totalPages, loading, error } = useProducts({ page })

    return (
        <section id="collectionPage" className=" mx-auto px-6 py-25">
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
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Products</h3>
                        <p className="text-gray-500">{error}</p>
                    </div>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
                        <p className="text-gray-500">We`re working on adding new products to our collection.</p>
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
            <div className="flex justify-center mt-10">
                <div className="join gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const isActive = page === i + 1

                        return (
                            <button
                                key={i}
                                disabled={loading}
                                onClick={() => setPage(i + 1)}
                                className={`join-item btn border-none
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
