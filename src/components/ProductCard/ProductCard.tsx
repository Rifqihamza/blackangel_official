import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"

export default function ProductCard({
    product,
    isLoading = false,
}: {
    product?: Product
    isLoading?: boolean
}) {
    if (isLoading) {
        return <div className="skeleton h-72 rounded-xl" />
    }

    if (!product) return null

    const imageUrl = product.images[0] ?? "/img/placeholder.jpg"

    return (
        <Link
            href={`/products/${product.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
        >
            <div className="relative h-40 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="mt-10">
                <h3 className="mt-3 font-semibold text-(--primary)">
                    {product.name}
                </h3>
                <p className="text-sm text-(--secondary) line-clamp-2">
                    {product.description}
                </p>
                <p className="mt-2 font-bold text-black">
                    Rp {product.price.toLocaleString("id-ID")}
                </p>
            </div>
        </Link>
    )
}
