
'use client'

import { useState } from "react"
import useProducts from "@/hooks/useProducts"
import ProductCard from "@/components/ProductCard/ProductCard"

export default function ProductPage() {
    const [page, setPage] = useState(1)
    const { products, totalPages, loading } = useProducts(page)

    return (
        <section id="collectionPage" className=" mx-auto px-6 py-25">
            <h1 className="text-xl md:text-6xl font-medium font-[Tangerine] text-center mb-8 tracking-wider text-(--primary)">
                The Collection</h1>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="skeleton bg-gray-300 h-72 rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
