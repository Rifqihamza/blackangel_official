'use client'

import { useState } from "react"
import { useAdminProducts } from "@/hooks/dashboard/useAdminProducts"
import { useAdminCategories } from "@/hooks/dashboard/useAdminCategories"
import {
    AddProductForm,
    EditProductModal,
    DeleteProductModal,
    ProductCard
} from "@/components/ProductManagement"
import { Product } from "@/types/product"

export default function AdminProducts() {
    const { products, loading, createProduct, updateProduct, deleteProduct } = useAdminProducts()
    const { categories } = useAdminCategories()

    const [editing, setEditing] = useState<Product | null>(null)
    const [deleting, setDeleting] = useState<Product | null>(null)

    return (
        <section>
            <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

            <AddProductForm categories={categories} onSubmit={createProduct} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-xl" />
                    ))
                    : products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={() => setEditing(product)}
                            onDelete={() => setDeleting(product)}
                        />
                    ))}
            </div>

            <EditProductModal
                key={editing?.id ?? 'new'}
                isOpen={!!editing}
                product={editing}
                categories={categories}
                onClose={() => setEditing(null)}
                onSubmit={async (fd) => {
                    await updateProduct(editing!.id, fd)
                    setEditing(null)
                }}
            />

            <DeleteProductModal
                isOpen={!!deleting}
                product={deleting}
                onClose={() => setDeleting(null)}
                onConfirm={async () => {
                    await deleteProduct(deleting!.id)
                    setDeleting(null)
                }}
            />
        </section>
    )
}
