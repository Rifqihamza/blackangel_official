'use client'

import { useParams, useRouter } from "next/navigation"
import { useProductSlug } from "@/hooks/products/useProductSlug"
import { ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import SkeletonComponent from "@/components/SkeletonComponent/SkeletonComponent"
import Image from "next/image"
import { useState } from "react"

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter()
    const { product, loading, error } = useProductSlug(slug)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    if (loading) return <SkeletonComponent />
    if (error || !product) {
        return (
            <main className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-3xl font-bold text-error mb-2">Product Not Found</h1>
                    <p className="text-neutral-600">The product you`re looking for doesn`t exist.</p>
                </div>
            </main>
        )
    }

    const imageUrl = product.images[currentImageIndex] ?? "/img/placeholder.jpg"

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }

    return (
        <main className="w-full h-max max-w-6xl mx-auto py-15">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => router.push("/")}
                    className="flex flex-row items-center justify-center gap-2 hover:text-gray-500 transition cursor-pointer mb-6"
                >
                    <ArrowLeft size={20} /> Back Home
                </button>

                <div className="flex flex-col md:flex-row justify-center gap-5 relative">
                    <div className="w-fit h-full">
                        <figure className="aspect-square w-100 h-100 flex items-center justify-center bg-gray-50 rounded-xl shadow-xl relative">
                            <Image
                                src={imageUrl}
                                alt={product.name}
                                width={300}
                                height={300}
                                className="object-contain p-5"
                            />
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 border-none text-gray-400 hover:text-gray-600 transition cursor-pointer"
                                    >
                                        <ChevronLeft size={30} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 border-none text-gray-400 hover:text-gray-600 transition cursor-pointer"
                                    >
                                        <ChevronRight size={30} />
                                    </button>
                                </>
                            )}
                        </figure>

                        {product.images.length > 1 && (
                            <div className="flex gap-2 mt-4">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-(--primary)/40' : 'border-gray-100'
                                            }`}
                                    >
                                        <Image
                                            src={img || "/img/placeholder.jpg"}
                                            alt={`${product.name} ${index + 1}`}
                                            width={64}
                                            height={64}
                                            className="object-cover w-full h-full"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-full">

                        <div className="card-body">
                            <div className="badge badge-outline mb-2">
                                {product.category?.name}
                            </div>

                            <h1 className="card-title text-3xl text-(--primary) mb-3">
                                {product.name}
                            </h1>

                            <div className="text-4xl font-bold text-(--secondary) mb-5">
                                Rp {product.price.toLocaleString("id-ID")}
                            </div>

                            <p className="text-neutral-600 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            <div className="card-actions justify-start">
                                <button className="btn border-2 border-(--primary) rounded-xl text-(--primary) hover:bg-(--primary) hover:text-white transition">
                                    <ShoppingBag size={20} />
                                    Make It Yours
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
