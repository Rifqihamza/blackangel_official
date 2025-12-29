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

export type Category = {
    id: number
    name: string
}

export type ProductCreateData = {
    name: string
    slug: string
    description: string
    price: number
    images: string[]
    categoryId: number
    isActive: boolean
}

export type ProductUpdateData = {
    name: string
    slug: string
    description: string
    price: number
    images: FileList | null
    categoryId: number
    isActive: boolean
}
