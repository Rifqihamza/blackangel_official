'use client'

import Image from 'next/image'
import { Product } from '@/types/product'

interface ProductCardProps {
    product: Product
    onEdit: () => void
    onDelete: () => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const imageUrl =
        product.images?.length && product.images[0]
            ? product.images[0]
            : "/img/placeholder.jpg"

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
            <div className="relative h-40 rounded-lg overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                />
            </div>

            <div className="mt-4">
                <h3 className="font-semibold text-(--primary)">
                    {product.name}
                </h3>
                <p className="text-sm text-(--secondary) line-clamp-2">
                    {product.description}
                </p>
                <p className="mt-2 font-bold">
                    Rp {product.price.toLocaleString("id-ID")}
                </p>
            </div>

            <div className="mt-4 flex gap-2">
                <button
                    onClick={onEdit}
                    className="btn btn-sm border-none rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="btn btn-sm border-none rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
