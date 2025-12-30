'use client'

import { useState } from "react"
import { useProducts } from "@/hooks/products/useProducts"
import ProductCard from "@/components/ProductCard/ProductCard"

export default function ProductPage() {
    const [page, setPage] = useState(1)
    const { products, totalPages, loading, error } = useProducts(page)

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
                <p className="text-center text-red-500">{error}</p>
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
