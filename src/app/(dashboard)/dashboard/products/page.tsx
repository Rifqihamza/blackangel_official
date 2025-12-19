'use client'

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

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
        </div>
    )
}
