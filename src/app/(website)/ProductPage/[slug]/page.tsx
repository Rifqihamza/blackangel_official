"use client"

import useProductSlug from "@/hooks/useProductSlug"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton/ProductDetailSkeleton"

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter()
    const { product, loading, error } = useProductSlug(slug)

    if (loading) return <ProductDetailSkeleton />
    if (error || !product) return <p className="text-center py-10">Product Not Found</p>

    const images: string[] = Array.isArray(product.images)
        ? product.images
        : JSON.parse(String(product.images ?? "[]"))

    const imageUrl =
        typeof images?.[0] === "string" && images[0].startsWith("/")
            ? images[0]
            : "/img/placeholder.jpg"

    return (
        <main className="h-[90vh] max-w-7xl mx-auto py-30 px-6">
            {/* BACK BUTTON */}
            <button
                onClick={() => router.push("/")}
                className="cursor-pointer flex items-center gap-2 mb-6 hover:opacity-70 transition"
            >
                <ArrowLeft size={20} /> Back Home
            </button>

            {/* === GRID PRODUK === */}
            <div className="grid lg:grid-cols-3 gap-8 relative">
                {/* LEFT: IMAGE */}
                <div className="col-span-1">
                    <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            loading="eager"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* MIDDLE: DETAIL */}
                <div className="col-span-1">
                    <p className="text-sm text-gray-500 mb-1">
                        {product.category?.name}
                    </p>

                    <h1 className="text-2xl font-semibold mb-3">
                        {product.name}
                    </h1>

                    <p className="text-3xl font-bold text-secondary mb-5">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="mt-2">
                        <button
                            className="flex flex-row items-center justify-center gap-2 font-semibold tracking-wider px-4 py-2 border border-secondary rounded text-secondary hover:text-white hover:bg-secondary duration-300 cursor-pointer"
                        >
                            Make It Yours
                            <ShoppingBag />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
