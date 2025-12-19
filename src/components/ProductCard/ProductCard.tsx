import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"

export default function ProductCard({
    product,
    isLoading,
}: {
    product?: Product
    isLoading?: boolean
}) {
    if (isLoading || !product) {
        return <div className="skeleton h-72 rounded-xl" />
    }
    const imageUrl =
        product.images?.[0]?.startsWith("http")
            ? product.images[0]
            : "/img/placeholder.jpg"

    console.log(product.images)

    return (
        <Link
            href={`/ProductPage/${product.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-lg hover:shadow-accent transition p-4"
        >
            <div className="relative h-56 rounded-lg overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="text-primary">
                <h3 className="mt-3 font-semibold">{product.name}</h3>
                <p className="text-sm text-secondary line-clamp-2">
                    {product.description}
                </p>
                <p className="mt-2 font-bold text-secondary">
                    Rp {product.price.toLocaleString("id-ID")}
                </p>
            </div>
        </Link>
    )
}
