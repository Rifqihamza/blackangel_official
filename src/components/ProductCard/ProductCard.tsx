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
        return (
            <div className="card bg-gray-300 rounded-xl shadow-inner shadow-black/20">
                <div className="skeleton h-56 rounded-lg"></div>
                <div className="card-body">
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-4 w-1/2"></div>
                    <div className="skeleton h-6 w-1/4"></div>
                </div>
            </div>
        )
    }

    if (!product) return null

    const imageUrl = product.images[0] ?? "/img/placeholder.jpg"

    return (
        <Link
            href={`/products/${product.slug}`}
            className="overflow-hidden bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1 transition"
        >
            <figure>
                <div className="relative h-full overflow-hidden bg-gray-50">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="mx-auto object-contain p-4 aspect-square"
                    />
                </div>
            </figure>
            <div className="card-body p-4">
                <div className="badge badge-xs badge-outline">
                    {product.category?.name}
                </div>
                <h3 className="card-title text-md text-(--primary) line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>
                <p className="mt-4 text-lg font-bold text-(--secondary)">
                    Rp {product.price.toLocaleString("id-ID")}
                </p>
            </div>
        </Link>
    )
}
