'use client'

import { useState } from "react"
import useProducts from "@/hooks/useProducts"
import ProductCard from "@/components/ProductCard/ProductCard"

export default function ProductPage() {
    const [page, setPage] = useState(1)
    const { products, totalPages, loading } = useProducts(page)

    return (
        <section id="productPage" className="container mx-auto px-6 py-25">
            <h2 className="text-primary text-3xl font-semibold text-center tracking-wider uppercase mb-8">The Collection</h2>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="skeleton h-72 rounded-xl" />
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
                <div className="join">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            className={`join-item btn ${page === i + 1 ? "btn-active" : ""
                                }`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
