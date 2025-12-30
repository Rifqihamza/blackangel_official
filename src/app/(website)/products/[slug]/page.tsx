'use client'

import { useParams, useRouter } from "next/navigation"
import { useProductSlug } from "@/hooks/products/useProductSlug"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import SkeletonComponent from "@/components/SkeletonComponent/SkeletonComponent"
import Image from "next/image"

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter()
    const { product, loading, error } = useProductSlug(slug)

    if (loading) return <SkeletonComponent />
    if (error || !product) return <p className="w-full h-[50vh] flex items-center justify-center">Product Not Found</p>

    const imageUrl = product.images[0] ?? "/img/placeholder.jpg"

    return (
        <main className="w-full h-max max-w-7xl mx-auto py-15">
            <button
                onClick={() => router.push("/")}
                className="cursor-pointer flex items-center gap-2 mb-6 hover:opacity-70 transition"
            >
                <ArrowLeft size={20} /> Back Home
            </button>

            <div className="grid lg:grid-cols-3 gap-8 relative">
                <div className="col-span-1">
                    <div className="relative aspect-square w-auto h-100 bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="col-span-1">
                    <p className="text-sm text-(--secondary) mb-1">
                        {product.category?.name}
                    </p>

                    <h1 className="text-2xl text-(--primary) font-semibold mb-3">
                        {product.name}
                    </h1>

                    <p className="text-3xl text-(--secondary) font-bold mb-5">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>

                    <p className="text-(--accent) leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-8">
                        <button className="flex flex-row items-center justify-center gap-2 font-semibold tracking-wider px-4 py-2 border rounded-xl text-(--secondary) hover:text-white hover:bg-(--accent)">
                            Make It Yours <ShoppingBag />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
