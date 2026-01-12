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
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-base-content">Manage Products</h1>
                <div className="badge badge-primary badge-lg">
                    {products.length} Products
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                    <AddProductForm categories={categories} onSubmit={createProduct} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="skeleton h-72 rounded-box"></div>
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

            {/* Modals */}
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
