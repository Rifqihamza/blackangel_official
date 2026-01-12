export type Category = {
    id: number
    name: string
}

export type Product = {
    id: number
    name: string
    slug: string
    description?: string | null
    price: number
    images: string[]
    isActive: boolean
    categoryId: number
    category?: Category
    createdAt: string
    updatedAt: string
}

export type ProductPayload = {
    name: string
    slug: string
    description?: string | null
    price: number
    images?: string[]
    isActive: boolean
    categoryId: number
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
    description?: string | null
    price: number
    images?: string[] | null
    categoryId: number
    isActive: boolean
}
