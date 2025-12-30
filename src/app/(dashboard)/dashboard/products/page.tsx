'use client'

import { useState } from "react"
import { useAdminProducts } from "@/hooks/dashboard/useAdminCategories"
import { EditProductModal, DeleteProductModal } from "@/components/ProductManagement"
import { Product } from "@/types/product"

export default function AdminProductsPage() {
    const { products, loading, refetch } = useAdminProducts()

    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

    if (loading) return <p>Loading...</p>

    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

            <div className="grid gap-4">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded shadow">
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>

                        <button onClick={() => setEditingProduct(product)}>Edit</button>
                        <button onClick={() => setDeletingProduct(product)}>Delete</button>
                    </div>
                ))}
            </div>

            <EditProductModal
                isOpen={!!editingProduct}
                product={editingProduct}
                onClose={() => setEditingProduct(null)}
                onSubmit={async () => {
                    await refetch()
                    setEditingProduct(null)
                }}
            />

            <DeleteProductModal
                isOpen={!!deletingProduct}
                product={deletingProduct}
                onClose={() => setDeletingProduct(null)}
                onConfirm={async () => {
                    await refetch()
                    setDeletingProduct(null)
                }}
            />
        </div>
    )
}
