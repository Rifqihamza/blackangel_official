'use client'

import { useState } from 'react'
import { useCategories } from '@/features/categories'
import { useAdminProducts } from '@/features/dashboard'
import { useAddProduct, useUpdateProduct, useDeleteProduct } from '@/features/products/hookProducts'
import { Product, ProductCreateData, ProductUpdateData } from '@/types/product'
import { AddProductForm, ProductCard, EditProductModal, DeleteProductModal } from '@/components/ProductManagement'

export default function AdminProductsPage() {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterActive, setFilterActive] = useState<string>('all')
    const { categories } = useCategories()
    const { products, totalPages, loading, error, refetch } = useAdminProducts(page, 12, searchTerm, filterActive)
    const { addProduct } = useAddProduct()
    const { updateProduct } = useUpdateProduct()
    const { deleteProduct } = useDeleteProduct()

    // Modal states
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

    const handleAddSubmit = async (data: ProductCreateData) => {
        try {
            await addProduct(data)
            refetch()
        } catch (err) {
            alert((err as Error).message)
        }
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setEditModalOpen(true)
    }

    const handleDelete = (product: Product) => {
        setDeletingProduct(product)
        setDeleteModalOpen(true)
    }

    const handleEditSubmit = async (data: ProductUpdateData) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, data)
                setEditModalOpen(false)
                refetch()
            }
        } catch (err) {
            alert((err as Error).message)
        }
    }

    const handleDeleteConfirm = async () => {
        try {
            if (deletingProduct) {
                await deleteProduct(deletingProduct.id)
                setDeleteModalOpen(false)
                refetch()
            }
        } catch (err) {
            alert((err as Error).message)
        }
    }

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setPage(1) // Reset to page 1 when search changes
    }

    const handleFilterChange = (value: string) => {
        setFilterActive(value)
        setPage(1) // Reset to page 1 when filter changes
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
            <AddProductForm categories={categories} onSubmit={handleAddSubmit} />
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={filterActive}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Products</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>
            {/* PAGINATION */}
            <div className="flex justify-center mt-10">
                <div className="join gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const isActive = page === i + 1

                        return (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`
                        join-item btn border-none
                        ${isActive
                                        ? "bg-(--secondary) text-white"
                                        : "bg-(--primary) text-black hover:bg-(--secondary)"
                                    }
                    `}
                            >
                                {i + 1}
                            </button>
                        )
                    })}
                </div>
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
