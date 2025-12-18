// src/types/product.ts
export type Product = {
    id: number
    name: string
    slug: string
    description?: string
    price: number
    images: string[]
    isActive: boolean
    createdAt: string
    category?: {
        id: number
        name: string
    }
}
