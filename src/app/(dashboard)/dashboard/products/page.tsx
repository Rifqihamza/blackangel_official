'use client'

import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { EditProductModal, DeleteProductModal } from "@/components/ProductManagement"

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
    const [categories] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/admin/products', {
                    headers: {
                        'x-admin-key': 'lglcqsa2A8VxbiW5ztgUb+50xGjqx3rGgh7WBBc7A/Y='
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    setProducts(data)
                }
            } catch (error) {
                console.error('Failed to fetch products:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const handleEditSubmit = async () => {
        // Implement edit logic
        setEditModalOpen(false)
        setEditingProduct(null)
    }

    const handleDeleteConfirm = async () => {
        if (deletingProduct) {
            // Implement delete logic
            setDeleteModalOpen(false)
            setDeletingProduct(null)
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
            <div className="grid gap-4">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded shadow">
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
            <EditProductModal
                key={editingProduct?.id}
                isOpen={editModalOpen}
                product={editingProduct}
                categories={categories}
                onClose={() => setEditModalOpen(false)}
                onSubmit={handleEditSubmit}
            />
            <DeleteProductModal
                isOpen={deleteModalOpen}
                product={deletingProduct}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    )
}
