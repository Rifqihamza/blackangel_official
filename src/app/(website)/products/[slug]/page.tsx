

"use client"


import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useProductSlug } from "@/hooks/productsHook"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import SkeletonComponent from "@/components/SkeletonComponent/SkeletonComponent"

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter()
    const { product, loading, error } = useProductSlug(slug)

    if (loading) return <SkeletonComponent />
    if (error || !product) return <p className="text-center py-10">Product Not Found</p>

    const images: string[] = Array.isArray(product.images)
        ? product.images
        : JSON.parse(String(product.images ?? "[]"))

    const imageUrl =
        typeof images?.[0] === "string" && images[0].startsWith("/")
            ? images[0]
            : "/img/placeholder.jpg"

    return (
        <main className="w-full h-max max-w-7xl mx-auto py-0 md:py-15 px-6">
            {/* BACK BUTTON */}
            <button
                onClick={() => router.push("/")}
                className="cursor-pointer flex items-center gap-2 mb-6 hover:opacity-70 transition"
            >
                <ArrowLeft size={20} /> Back Home
            </button>

            {/* === GRID PRODUK === */}
            <div className="grid lg:grid-cols-3 gap-10 md:gap-30 relative px-6 w-full">
                {/* LEFT: IMAGE */}
                <div className="col-span-1">
                    <div className="relative aspect-square w-auto h-full md:h-100 bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            loading="eager"
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* MIDDLE: DETAIL */}
                <div className="col-span-1 md:col-span-2">
                    <p className="text-sm text-(--secondary) mb-1">
                        {product.category?.name}
                    </p>

                    <h1 className="text-2xl md:text-3xl text-(--primary) font-semibold mb-3">
                        {product.name}
                    </h1>

                    <p className="text-xl md:text-2xl text-(--primary) font-bold mb-5">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>

                    <p className="text-(--primary)/50 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="mt-4 md:mt-8 mb-8 md:mb-0 w-full md:w-fit">
                        <button
                            className="w-full md:w-fit flex flex-row items-center justify-center gap-2 font-semibold tracking-wider px-4 py-2 border rounded-xl text-(--secondary) hover:text-white hover:bg-(--primary) duration-300 cursor-pointer"
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