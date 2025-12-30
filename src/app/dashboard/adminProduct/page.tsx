'use client'

import { useState } from "react"
import { useAdminProducts } from "@/hooks/dashboard/useAdminProducts"
import { EditProductModal, DeleteProductModal, ProductCard } from "@/components/ProductManagement"
import { Product } from "@/types/product"

export default function AdminProducts() {
    const { products, loading, refetch } = useAdminProducts()

    const [editing, setEditing] = useState<Product | null>(null)
    const [deleting, setDeleting] = useState<Product | null>(null)

    if (loading) return <p>Loading...</p>

    return (
        <section>
            <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={() => setEditing(product)}
                        onDelete={() => setDeleting(product)}
                    />
                ))}
            </div>

            <EditProductModal
                isOpen={!!editing}
                product={editing}
                categories={[]}
                onClose={() => setEditing(null)}
                onSubmit={async () => {
                    await refetch()
                    setEditing(null)
                }}
            />

            <DeleteProductModal
                isOpen={!!deleting}
                product={deleting}
                onClose={() => setDeleting(null)}
                onConfirm={async () => {
                    await refetch()
                    setDeleting(null)
                }}
            />
        </section>
    )
}
