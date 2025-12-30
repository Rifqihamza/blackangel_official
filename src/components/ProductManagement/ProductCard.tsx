'use client'

import Image from 'next/image'
import { Product } from '@/types/product'

interface ProductCardProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const imageUrl =
        product.images?.[0] && product.images[0] !== ""
            ? product.images[0]
            : "/img/placeholder.jpg"

    return (
        <div
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
        >
            <div className="relative h-56 rounded-lg overflow-hidden">
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
            <div className="mt-4 flex gap-2">
                <button onClick={() => onEdit(product)} className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
                    Edit
                </button>
                <button onClick={() => onDelete(product)} className="btn btn-sm bg-red-500 text-white hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>
    )
}
